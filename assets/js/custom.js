//Initializing vars
var currency = "eur";   //Default currency
var salaryList = [];    //To prevent differences in calculation back and forth
var ratios = {};
var now = new Date();
var day = now.getDate();
var month = now.getMonth()+1; //January = 0
var year = now.getFullYear();
if(day < 10){ day = '0' + day; }
if(month < 10){ month = '0' + month; }
var today = year+'-'+month+'-'+day;


$(document).ready(function(){
    $('#settingsDate').attr('value', today);
    $('#bnsMonth').attr('value', today);


    $.ajax({
        url: "http://wsit.ru/api/currencies.php",
        success: function(json){
            var list = JSON.parse(json);
            ratios = list.currencies;
        }
    });


    $.ajax({
        url: "http://wsit.ru/api/professions.php",
        success: function(json){
            var list = JSON.parse(json);
            $.each(list.professions, function(i, val){
                var option = `<option value='${val.name}'>`;
                $("#profList").append(option);
            });
        }
    });

    renderEmployeeList();

    $(document).on('click','#rub,#eur,#usd',function(event){
        if(event.target.classList.contains('currOff')){
            var currOn = $('.currOn');
            currOn[0].classList.remove('currOn');
            currOn[0].classList.add('currOff');

            event.target.classList.remove('currOff');
            event.target.classList.add('currOn');

            var pickedCurr = event.target.id;
            var allSalaries = document.querySelectorAll(`.salary`);
            for(var i = 0, length = allSalaries.length; i < length; i++){
                allSalaries[i].firstChild.textContent = Math.floor(salaryList[i] * ratios['eur'+pickedCurr]);
                allSalaries[i].firstElementChild.classList.remove(`glyphicon-${currency}`);
                allSalaries[i].firstElementChild.classList.add(`glyphicon-${pickedCurr}`);
            }
            currency = pickedCurr;
        }
    });

    $('#empSubmit').on('click',function(event){
        event.preventDefault();
        event.stopPropagation();

        var data = new FormData();

        data.append('empFName',$('#empFName').val());
        data.append('empSName',$('#empSName').val());
        data.append('empProf',$('#empProf').val());
        data.append('empSalary',$('#empSalary').val());
        data.append('empPortrait',$('#empPortrait')[0].files[0]);
        /*
        for (var pair of data.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }
        */

        $.ajax({
            type: "POST",
            url: "http://wsit.ru/api/employment.php",
            data: data,
            async: true,
            success: function(data){
                var response = JSON.parse(data);
                if(response.response){
                    $('#empModal').modal('hide');
                    $('#empFName,#empSName,#empProf,#empSalary,#empPortrait').val('');
                    renderEmployeeList();
                }
            },
            cache: false,
            contentType: false,
            processData: false
        });


    });

    $('#bnsSumbit').on('click', function(event){
        event.preventDefault();
        event.stopPropagation();
    });

    $('#settingsDate').on('change',function(event){
        renderEmployeeList(event.target.value);
    });
});

function renderEmployeeList(date = today){
    $.ajax({
        type:"POST",
        url: "http://wsit.ru/api/workers.php",
        data: `settingsDate=${date}`,
        success: function(response){
            var list = JSON.parse(response);
            salaryList = []; //Clean up from previous data to be able to refresh the employeeList in future being in the function

            $('#employeeTable tr:not(:first)').remove(); //Clear previous employee list
            $('#modals .modal:not(#bnsModal,#empModal)').remove(); //Clear image pop ups for previous employee list

            $.each(list.workers, function(i, val){
                var overallSalary = parseInt(val.salary) + parseInt(val.bonus);
                salaryList.push(overallSalary);
                var employeeCard = `<tr>
                                        <td class='text-center'>
                                            <a data-toggle='modal' data-target="#personalPage${i}">
                                                <img class='img-circle zoom-in' src='assets/img/portraits/thumb/${val.portrait}' alt='${val.f_name} ${val.s_name}' width="58" height="58">
                                            </a>
                                        </td>
                                            <td class='text-left'>
                                            <h3 class='name'>${val.f_name} ${val.s_name}</h3>
                                        <cite class='profession'>${val.prof}</cite>
                                        </td>
                                        <td class='text-center'>
                                            <h3><span class='label label-info salary'>${Math.floor(overallSalary*ratios['eur'+currency])}<span class='glyphicon glyphicon-${currency}' aria-hidden='true'></span></span></h3>
                                        </td>
                                    </tr>`;
                $("#employeeTable").append(employeeCard);

                var imgModal = `<div id="personalPage${i}" class="modal fade" role="dialog">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                <h4 class="modal-title">${val.f_name} ${val.s_name}</h4>
                                            </div>
                                            <div class="modal-body text-center">
                                                <img class='img-circle' src="assets/img/portraits/${val.portrait}" alt="${val.f_name} ${val.s_name}" width="140px" height="140px">
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                $("#modals").append(imgModal);
            });
        },
    });
}

