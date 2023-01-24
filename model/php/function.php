<?php

function echec()
{
    echo "Information non enregistrer";
}
function success()
{
    echo "success";
}
function getLastId($name_table)
{
    global $connection;
    $sql = "SHOW TABLE STATUS LIKE '$name_table'";
    $rst = $connection->query($sql);
    $maxID = '';
    if ($rst->num_rows > 0) {
        $row = $rst->fetch_assoc();
        $maxID = $row['Auto_increment'];
    }
    return $maxID;
}
function upload_file($temp_location, $location)
{
    global $connection;
    if (move_uploaded_file($temp_location, $location)) {
        if ($connection->affected_rows>0) {
            success();
        } else {
            success();
        }
    } else {
        echec();
    }
}
