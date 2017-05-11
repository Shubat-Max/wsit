<?php
include_once "db_connection.php";

$a = new Database();

$sql = "SELECT p.name
        FROM professions as p";
$result = $a->query($sql);
$a->close();

$rows = array();
while($r = mysqli_fetch_assoc($result)){
    $rows[] = $r;
}
$data = array("professions" => $rows);

print json_encode($data);

