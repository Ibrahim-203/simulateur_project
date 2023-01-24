<?php

require_once  '../../include/connection.php';
require_once 'function.php';


/* if (isset($_POST['_puissance_pv'])) {
        $puissance_pv = $_POST['_puissance_pv'];
        $intensite_reg = $_POST['_intensite_reg'];
        $puissance_ond = $_POST['_puissance_ond'];
        $capacite_batt = $_POST['_capacite_batt'];
        $tension_sys = $_POST['_tension_sys'];
        $energie_store = $capacite_batt * $tension_sys;

        $requette = "SELECT libelle_kit, lien_kit, image_kit, marque_ond, tension_ond, puissance_ond, puissance_pann, marque_reg, tension_reg, intensite_reg, tension_batt, capacite_batt FROM kit K LEFT JOIN onduleur O ON k.id_onduleur = O.id LEFT JOIN regulateur R ON K.id_regulateur = R.id LEFT JOIN panneau P on K.id_panneau = P.id LEFT JOIN batterie B ON k.id_batterie = B.id where P.puissance_pann >= $puissance_pv and R.intensite_reg >= $intensite_reg and B.energie_stocke >= $energie_store AND puissance_ond >= $puissance_ond ORDER BY puissance_pann";
    }*/

if (isset($_POST['SELECT_KIT'])) {
    if (isset($_POST['puissance_crete'])) {
        $puissance_crete = $_POST['puissance_crete'];
        if (isset($_POST['back'])) {
            $requette = "SELECT libelle_kit, lien_kit, image_kit, marque_ond, tension_ond, puissance_ond, puissance_pann, marque_reg, tension_reg, intensite_reg, tension_batt, capacite_batt FROM kit K LEFT JOIN onduleur O ON k.id_onduleur = O.id LEFT JOIN regulateur R ON K.id_regulateur = R.id LEFT JOIN panneau P on K.id_panneau = P.id LEFT JOIN batterie B ON k.id_batterie = B.id where puissance_pann<$puissance_crete ORDER BY puissance_pann";
        } elseif (isset($_POST['current'])) {
            $puissance_crete = $_POST['puissance_crete'];
            $requette = "SELECT libelle_kit, lien_kit, image_kit, marque_ond, tension_ond, puissance_ond, puissance_pann, marque_reg, tension_reg, intensite_reg, tension_batt, capacite_batt FROM kit K LEFT JOIN onduleur O ON k.id_onduleur = O.id LEFT JOIN regulateur R ON K.id_regulateur = R.id LEFT JOIN panneau P on K.id_panneau = P.id LEFT JOIN batterie B ON k.id_batterie = B.id where puissance_pann=$puissance_crete ORDER BY puissance_pann";
        } else {
            $puissance_crete = $_POST['puissance_crete'];
            $requette = "SELECT libelle_kit, lien_kit, image_kit, marque_ond, tension_ond, puissance_ond, puissance_pann, marque_reg, tension_reg, intensite_reg, tension_batt, capacite_batt FROM kit K LEFT JOIN onduleur O ON k.id_onduleur = O.id LEFT JOIN regulateur R ON K.id_regulateur = R.id LEFT JOIN panneau P on K.id_panneau = P.id LEFT JOIN batterie B ON k.id_batterie = B.id where puissance_pann>=$puissance_crete ORDER BY puissance_pann";
        }
    } else {
        $requette = "SELECT libelle_kit, lien_kit, image_kit, marque_ond, tension_ond, puissance_ond, puissance_pann, marque_reg, tension_reg, intensite_reg, tension_batt, capacite_batt FROM kit K LEFT JOIN onduleur O ON k.id_onduleur = O.id LEFT JOIN regulateur R ON K.id_regulateur = R.id LEFT JOIN panneau P on K.id_panneau = P.id LEFT JOIN batterie B ON k.id_batterie = B.id ORDER BY puissance_pann";
    }


    $result = $connection->query("$requette");
    $JSON_obj = array();
    if ($result->num_rows> 0) {
        while ($row = $result->fetch_assoc()) {
            $JSON_obj[] = $row;
        }
        echo json_encode($JSON_obj);
    } else {
        print_r($requette) ;
        // ;
    }
}
if (isset($_POST["PUISSANCE_PAN"])) {
    $requette = "SELECT Max(puissance_pann) as puissance FROM panneau";
    $result = $connection->query("$requette");
    if ($result->num_rows> 0) {
        while ($row = $result->fetch_assoc()) {
            $JSON_obj[] = $row;
        }
        echo json_encode($JSON_obj);
    } else {
        print_r($requette);
    }
}