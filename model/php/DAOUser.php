<?php

require_once  '../../include/connection.php';
require_once 'function.php';

if (isset($_POST["UPDATE_PASS"])) {
    $old_pass=sha1($_POST["old_pass"]);
    $new_pass_1 = $_POST["new_pass_1"];
    $new_pass_2 = $_POST["new_pass_2"];
    $crypt_pass = sha1($new_pass_1);

    $check_pass_exist = "SELECT * from utilisateur where `mdp_utilisateur` = '$old_pass' ";
    $resultat = $connection->query($check_pass_exist);
    if ($resultat->num_rows>0) {
        if ($new_pass_1==$new_pass_2) {
            $requette = "update utilisateur set `mdp_utilisateur` = '$crypt_pass'";
            $connection ->query($requette);
            if ($connection->affected_rows>0) {
                session_start();
                $_SESSION['user']['mdp'] = "$crypt_pass";
                success();
            } else {
                echec();
            }
        } else {
            echo("mot de passe different");
        }
    } else {
        echo("Mot de passe incorrecte!!");
    }
    // old_pass new_pass_1
}
if (isset($_POST["INFO_USER"])) {
    $identifiant=$connection->real_escape_string($_POST["identifiant"]);
    $pseudo = $connection->real_escape_string($_POST["pseudo"]);
    $requette = "update utilisateur set `pseudo_utilisateur` = '$pseudo',`nom_utilisateur`='$identifiant'";

    $connection ->query($requette);
    if ($connection->affected_rows>0) {
        session_start();
        $_SESSION['user']['id'] = "$identifiant";
        $_SESSION['user']['pseudo']="$pseudo";
        success();
    } else {
        echec();
    }
}
if (isset($_POST["SELECT_INFO_USER"])) {
    $requette = "SELECT `pseudo_utilisateur`, `nom_utilisateur` FROM utilisateur";
    $resultat = $connection->query($requette);
    $JSON_obj = array();
    if ($resultat->num_rows> 0) {
        while ($row = $resultat->fetch_assoc()) {
            $JSON_obj[] = $row;
        }
        echo json_encode($JSON_obj);
    } else {
        print_r($requette);
    }
}