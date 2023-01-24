<?php

require_once  '../../include/connection.php';
require_once 'function.php';


if (isset($_POST['COUNT_DATA'])) {
    $requette ="SELECT  (SELECT COUNT(*) FROM   categorie) AS nbr_cat,
    (SELECT COUNT(*) FROM   equipement) AS nbr_equip,
    ( SELECT COUNT(*) FROM   kit ) AS nbr_kit;";
    //Execution of request
    $result = $connection->query($requette);
    $JSON_obj = array();
    if ($result->num_rows>0) {
        while ($row = $result->fetch_assoc()) {
            $JSON_obj[] = $row;
        }
        //Convert the table to JSON
        echo json_encode($JSON_obj);
    }
}