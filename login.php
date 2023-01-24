<?php
session_start();
$error = null;
if (!empty($_SESSION)) {
    header('Location:./index.php');
}
$resultget = "";
if (!empty($_POST['login']) && !empty($_POST['mdp'])) {
    $user = $_POST['login'];
    $mdp = $_POST['mdp'];
    $mdp = sha1($mdp);
    $connection = new mysqli('localhost', 'root', '', 'simulateur');
    $requete = "SELECT `id`, `nom_utilisateur`, `mdp_utilisateur`,`pseudo_utilisateur` FROM `utilisateur` WHERE `nom_utilisateur` = '$user' AND `mdp_utilisateur` = '$mdp'";
    $result = $connection->query($requete);
    if (($result->num_rows)>0) {
        $resultget = $result->fetch_assoc();
        $username= $resultget["nom_utilisateur"];
        $password = $resultget["mdp_utilisateur"];
        $pseudo = $resultget["pseudo_utilisateur"];
        $_SESSION['user'] = ['id'=>"$username",'mdp' => "$password",'pseudo' => "$pseudo"];
        header('Location:./index.php');
    } else {
        $error = '<div class="alert alert-danger">Idenfiant invalide</div>';
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <title>MadaGreenPower - Auth </title>
    <link rel="icon" type="image/x-icon" href="assets/img/mdg-favicon.ico" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/plugins.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/users/login-1.css" rel="stylesheet" type="text/css" />
    <!-- END GLOBAL MANDATORY STYLES -->

</head>

<body class="login">
    <form class="form-login" method="post">
        <div class="row">
            <div class="col-md-12 text-center mb-4">
                <img alt="logo" src="assets/img/logo-mgp-apk.png" class="theme-logo">
            </div>

            <div class="col-md-12">
                <label for="inputEmail" class="">Login</label>
                <input type="text" id="inputEmail" class="form-control mb-4" name="login" placeholder="Login" required>
                <label for="inputPassword" class="">Mot de passe</label>
                <input type="password" id="inputPassword" class="form-control mb-5" name="mdp" placeholder="Password"
                    required>
                <?php echo $error ?>
                <button class="btn btn-lg btn-gradient-danger btn-block btn-rounded mb-4 mt-5"
                    type="submit">Login</button>
            </div>

        </div>
    </form>

    <!-- BEGIN GLOBAL MANDATORY SCRIPTS -->
    <script src="assets/js/libs/jquery-3.1.1.min.js"></script>
    <script src="bootstrap/js/popper.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>

    <!-- END GLOBAL MANDATORY SCRIPTS -->
</body>

</html>