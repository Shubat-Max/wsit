<?php
    $currencies->eurusd = "1.1";
    $currencies->eurrub = "64";
    $currencies->eureur = "1";

    $data = array("currencies" => $currencies);

    $json = json_encode($data);

    print $json;