<?php
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    include_once "db_connection.php";

    $pathFull = '../assets/img/portraits/';
    $pathThumb = '../assets/img/portraits/thumb/';

    $empFName = $_POST['empFName'];
    $empSName = $_POST['empSName'];
    $empProf = $_POST['empProf'];
    $empSalary = $_POST['empSalary'];

    //Proceeding the Portrait
    //TODO: Add tests and checks for an uploaded image (size, extension and so on)
    if(!empty($_FILES['empPortrait'])){
        $temp = explode('.', $_FILES['empPortrait']['name']);
        $newFileName = explode('.', microtime(true));
        $newFileName = $newFileName[0].$newFileName[1].'.'.end($temp);
        $savePath = $pathFull.$newFileName;
        $savePathThumb = $pathThumb.$newFileName;

        //creating thumbnail
        $fn = $_FILES['empPortrait']['tmp_name'];
        $size = getimagesize($fn);
        $ratio = $size[0]/$size[1];
        if(ratio > 1) {
            $width = 48;
            $height = 48/$ratio;
        }else{
            $width = 48*$ratio;
            $height = 48;
        }
        $src = imagecreatefromstring(file_get_contents($fn));
        $dst = imagecreatetruecolor($width,$height);
        imagecopyresampled($dst, $src, 0,0,0,0,$width,$height,$size[0],$size[1]);
        imagedestroy($src);
        imagejpeg($dst, $savePathThumb);
        imagedestroy($dst);

        move_uploaded_file($_FILES['empPortrait']['tmp_name'], $savePath);
    }

    $db = new Database();

    $sql = "INSERT INTO wsit_db.workers (id,f_name,s_name,prof_id, salary, portrait)
            VALUES (NULL,'$empFName', '$empSName', (SELECT p.id FROM professions as p WHERE p.name = '$empProf' LIMIT 1), '$empSalary', '$newFileName');";
    $db->query($sql);

    $date = date('Y-m-d');
    $sql = "INSERT INTO wsit_db.payments (worker_id, date)
            VALUES ((SELECT w.id FROM workers as w WHERE w.portrait = '$newFileName'), '$date')";
    $db->query($sql);
    $db->close();

    print json_encode(array("response" => "true"));
/*
 * (V) PARSE POST
 * ADD NEW EMPLOYEE
 * RETURN TRUE/FALSE RESPONSE
*/
}
