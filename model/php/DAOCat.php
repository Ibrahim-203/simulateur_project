<?php

require_once  '../../include/connection.php';
require_once 'function.php';

// return table more clean **Your the best BROO**
function dump($content)
{
    echo '<pre>';
    return var_dump($content);
    echo '</pre>';
}

// End function return table more clean

if (isset($_POST['SELECT_CAT'])) {
    if (isset($_POST['id_cat'])) {
        //Select specific categorie
        $id_cat = $_POST['id_cat'];
        $requette = "SELECT * FROM categorie WHERE `id` ='$id_cat'";
    } else {
        //select all categorie
        $requette = "SELECT * FROM categorie";
    }
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
if (isset($_POST['ADD_EDIT'])) {
    if (isset($_POST['id_cat'])) {
        $id_cat = $_POST['id_cat'];
        $libelle = $_POST['libelle_cat'];
        $size_image = $_FILES['image_cat']['size'];
        if ($size_image>0) {
            $image_cat =  $_FILES['image_cat']['name'] ;
            $temp_location = $_FILES['image_cat']['tmp_name'];
            $file_extention = pathinfo($image_cat, PATHINFO_EXTENSION);
            $file_extention = strtolower($file_extention);
            $image_name = $id_cat.'.'.$file_extention;
            $location = "../../upload/".$image_name;
            $requette = "UPDATE `categorie` SET `libelle_cat`='$libelle',`image_cat`='$image_name' WHERE id ='$id_cat'";
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
            $requette = "UPDATE `categorie` SET `libelle_cat`='$libelle' WHERE id ='$id_cat'";
            $connection->query($requette);
            if ($connection->affected_rows>0) {
                success();
            } else {
                echec();
            }
        }





        /* if ($connection->affected_rows>0) {
            if (move_uploaded_file($temp_location, $location)) {
                echo success();
            } else {
                echo "Importation de l'image a échoué";
            }
        } else {
            if (move_uploaded_file($temp_location, $location)) {
                echo success();
            }
        } */
    } else {
        //Add categorie
        $libelle = $_POST['libelle_cat'];
        $image_cat =  $_FILES['image_cat']['name'] ;
        $size_image = $_FILES['image_cat']['size'];
        $temp_location = $_FILES['image_cat']['tmp_name'];
        $file_extention = pathinfo($image_cat, PATHINFO_EXTENSION);
        $file_extention = strtolower($file_extention);
        $maxID = getLastId("categorie");
        $image_name = $maxID.'.'.$file_extention;
        $location = "../../upload/".$image_name;

        $requette = "INSERT INTO categorie (`libelle_cat`, `image_cat`) VALUES ('$libelle','$image_name')";
        $check = "SELECT * FROM categorie where `libelle_cat` = '$libelle'";
        $checkIfExist = $connection->query($check);
        // Tester l'existance de linformation (libelle)
        if ($checkIfExist->num_rows>0) {
            echo "Contenu avec le nom existant";
        } else {
            if (!file_exists("../../upload")) {
                mkdir("../../upload");
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
if (isset($_POST['DELETE_CAT'])) {
    $id_cat = $_POST['id'];
    $image_cat = $_POST['image_cat'];
    $image_cat ="../../upload/".$image_cat;
    $requette = "DELETE FROM categorie WHERE id = '$id_cat'";
    $Check = "SELECT * FROM `equipement` WHERE `id_cat`='$id_cat'";
    $CheckUsed=$connection->query($Check);
    if ($CheckUsed->num_rows>0) {
        echo "Cette catégorie est encore utiliser par une/des équipement(s)";
    } else {
        $connection -> query($requette);
        if ($connection->affected_rows>0) {
            if (file_exists($image_cat)) {
                if (unlink($image_cat)) {
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
}