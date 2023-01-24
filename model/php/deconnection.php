<?php

if (isset($_POST['DECONNECTION'])) {
    session_start();
    session_destroy();
    echo "Successfully";
}