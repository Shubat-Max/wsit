<?php
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once "db_connection.php";

    $date = $_POST['settingsDate'];

    $db = new Database();

    $sql = "SELECT w.f_name, w.s_name, prof.name AS prof, w.salary, pay.bonus, w.portrait
            FROM workers AS w, professions AS prof, payments AS pay
            WHERE DATE_FORMAT( pay.date,  '%m' ) = DATE_FORMAT(  '$date',  '%m' )
            AND w.prof_id = prof.id
            AND pay.worker_id = w.id
            AND pay.toPay = 1
            LIMIT 50";

    $result = $db->query($sql);
    $db->close();

    $rows = array();
    while ($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    $data = array("workers" => $rows);

    print json_encode($data);
}