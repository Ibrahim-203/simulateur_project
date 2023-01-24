<?php

require  '../../vendor/autoload.php';
require_once  '../../include/connection.php';
require_once './function.php';
use Automattic\WooCommerce\Client;

if (isset($_POST["JSON"])) {
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=utf-8');

    $woocommerce = new Client(
        'https://madagreenpower.mada-digital.net',
        'ck_a0d1a80e15c95da50bea37644d5bd9e74adc075b',
        'cs_a0197d11db62ed33d181b6608079b2ec183b0733',
        [
        'wp_api' => true,
        'version' => 'wc/v3',
        'query_string_auth' => true,
        'timeout' => 400
        ]
    );
    $customer = $woocommerce->get('products');
    $json = json_encode($customer);
    echo $json;
}

if (isset($_POST['stringData'])) {
    $data = json_decode(stripslashes($_POST['stringData']));
    $a = 0;
    foreach ($data as $key => $value) {
        $libelle_kit = $value->libelle_kits;
        $link_to_mgp = $value->link;
        $image_link = $value->image_link;
        //Solar panel information
        $puissance_panneau = $value->puissancePv * $value->nombrePv;
        //converteur information
        $libelle_ond = $value->libelleOnd;
        $tension_Ond = $value->tensionOnd;
        $puissance_ond = $value->puissanceOnd;
        //Regulateur information
        $libelle_reg = $value->libelleReg;
        $tension_Reg = $value->tensionReg;
        $intensiteReg = $value->intensiteReg;
        // Battery information capacite, tension, quantite

        $capacite_batt = $value->capacite * $value->quantite /($value->quantite/2);
        $tension_batt = $value->tension * ($value->quantite/2);
        $energie_store = $capacite_batt * $tension_batt;

        $checkIfKitExist = "SELECT * FROM kit where libelle_kit = '$libelle_kit'";
        $result = $connection->query($checkIfKitExist);
        if ($result->num_rows>0) {
            continue;
        } else {
            $a +=1;
            // Begin transaction
            $connection->begin_transaction();
            $connection->autocommit(false);

            //Get current id of the equipement
            $batterie = getLastId("batterie");
            $regulateur = getLastId("regulateur");
            $onduleur = getLastId("onduleur");
            $panneau = getLastId("panneau");

            //The requests to insert the informations
            $insert_batt ="INSERT INTO `batterie`( `tension_batt`, `capacite_batt`, `energie_stocke`) VALUES ('$tension_batt','$capacite_batt','$energie_store')";
            $insert_pv = "INSERT INTO `panneau`(`puissance_pann`) VALUES ('$puissance_panneau')";
            $insert_onduleur = "INSERT INTO `onduleur`( `marque_ond`, `tension_ond`, `puissance_ond`) VALUES ('$libelle_ond','$tension_Ond','$puissance_ond')";
            $insert_regulateur = "INSERT INTO `regulateur`( `marque_reg`, `tension_reg`, `intensite_reg`) VALUES ('$libelle_reg','$tension_Reg','$intensiteReg')";
            $insert_kit = "INSERT INTO `kit`( `libelle_kit`, `id_onduleur`, `id_regulateur`, `id_panneau`, `id_batterie`, `lien_kit`, `image_kit`) VALUES ('$libelle_kit','$onduleur','$regulateur','$panneau','$batterie','$link_to_mgp','$image_link')";

            //Execute requests
            $connection->query($insert_batt);
            $connection->query($insert_pv);
            $connection->query($insert_onduleur);
            $connection->query($insert_regulateur);

            $connection->query($insert_kit);
            $connection->commit();
        }
    }
    if ($a==0) {
        echo "existe";
    } else {
        echo $a." Information enregistrer";
    }
}