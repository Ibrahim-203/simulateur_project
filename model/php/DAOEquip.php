<?php

require_once  '../../include/connection.php';
require_once 'function.php';

if (isset($_POST['SELECT_EQUIP'])) {
    if (isset($_POST['id_equip']) && isset($_POST['card'])) {
        $id = $_POST['id_equip'];
        $requette = "SELECT A.`id`, `libelle_equip`, `puissance_equip`, `id_cat`,`libelle_cat`,`image_cat`, `courant_demarrage`,`image_equip` FROM `equipement` A LEFT JOIN `categorie` B ON A.id_cat = B.id WHERE B.`id` = '$id' ";
    } elseif (isset($_POST['id_equip'])) {
        $id = $_POST['id_equip'];
        $requette = "SELECT `id`, `libelle_equip`, `puissance_equip`, `courant_demarrage`, `image_equip` FROM `equipement` WHERE `id` = '$id' ";
    } else {
        $requette = "SELECT A.`id`, `libelle_equip`, `puissance_equip`, `image_equip`, `id_cat`,`libelle_cat`,`image_cat`, `courant_demarrage` FROM `equipement` A LEFT JOIN `categorie` B ON A.id_cat = B.id ORDER BY `libelle_cat`";
    }
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

/* begin add equip  */
if (isset($_POST['ADD_EQUIP'])) {
    if (isset($_POST['id_equip'])) {
        $id_equip = $_POST['id_equip'];
        $libelle_equip = $connection->real_escape_string($_POST['libelle_equip']);
        $puissance_equip = $connection->real_escape_string($_POST['puissance_equip']);
        $courant_demarrage = $connection->real_escape_string($_POST['courant_demarrage']);

        $size_image = $_FILES['image_equip']['size'];
        if ($size_image>0) {
            $image_equip =  $_FILES['image_equip']['name'] ;
            $temp_location = $_FILES['image_equip']['tmp_name'];
            $file_extention = pathinfo($image_equip, PATHINFO_EXTENSION);
            $file_extention = strtolower($file_extention);
            $image_name = $id_equip.'.'.$file_extention;
            $location = "../../upload/equipement/".$image_name;
            $requette = "UPDATE `equipement` SET `libelle_equip`='$libelle_equip',`puissance_equip`='$puissance_equip', `courant_demarrage` = '$courant_demarrage', `image_equip` = '$image_name' WHERE `id`='$id_equip'";
            print_r($requette);
            if (file_exists($location)) {
                if (unlink($location)) {
                    $connection->query($requette);
                    upload_file($temp_location, $location);
                }
            } else {
                $connection->query($requette);
                upload_file($temp_location, $location);
            }
        } else {
            $requette = "UPDATE `equipement` SET `libelle_equip`='$libelle_equip',`puissance_equip`='$puissance_equip', `courant_demarrage` = '$courant_demarrage' WHERE `id`='$id_equip'";
            $connection->query($requette);
            if ($connection->affected_rows>0) {
                success();
            } else {
                echec();
            }
        }
    } else {
        //Add categorie
        $libelle_equip = $connection->real_escape_string($_POST['libelle_equip']);
        $puissance_equip = $connection->real_escape_string($_POST['puissance_equip']);
        $courant_demarrage = $connection->real_escape_string($_POST['courant_demarrage']);
        $id_cat = $connection->real_escape_string($_POST['list_cat']);
        $image_equip =  $_FILES['image_equip']['name'] ;
        $size_image = $_FILES['image_equip']['size'];
        $temp_location = $_FILES['image_equip']['tmp_name'];
        $file_extention = pathinfo($image_equip, PATHINFO_EXTENSION);
        $file_extention = strtolower($file_extention);
        $maxID = getLastId("equipement");
        $image_name = $maxID.'.'.$file_extention;
        $location = "../../upload/equipement/".$image_name;

        $requette = "INSERT INTO `equipement`( `libelle_equip`, `puissance_equip`, `id_cat`, `courant_demarrage`,`image_equip`) VALUES ('$libelle_equip','$puissance_equip','$id_cat', '$courant_demarrage','$image_name')";
        $check = "SELECT * FROM equipement where `libelle_equip` = '$libelle_equip' and `puissance_equip` = '$puissance_equip'";
        $checkIfExist = $connection->query($check);
        // Tester l'existance de linformation (libelle)
        if ($checkIfExist->num_rows>0) {
            echo "Contenu avec le nom existant";
        } else {
            if (!file_exists("../../upload/equipement")) {
                mkdir("../../upload/equipement");
            }
            if (move_uploaded_file($temp_location, $location)) {
                $connection->query($requette);
                if ($connection->affected_rows>0) {
                    success();
                } else {
                    erreur();
                }
            } else {
                erreur();
            }
        }
    }
}
/* end add equip  */


if (isset($_POST['DELETE_EQUIP'])) {
    $id_equip = $_POST['id_equip'];
    $image_equip = $_POST['image_equip'];
    $image_equip ="../../upload/equipement/".$image_equip;
    $requette = "DELETE FROM equipement WHERE id = '$id_equip'";
    $connection -> query($requette);
    if ($connection->affected_rows>0) {
        if (file_exists($image_equip)) {
            if (unlink($image_equip)) {
                success();
            } else {
                echo "impossible de supprimmer l'image";
            }
        } else {
            success();
        }
    } else {
        erreur();
    }
}