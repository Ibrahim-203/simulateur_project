<?php 
session_start();
if(!empty($_SESSION)){

}else{
    header ('Location:./login.php');
}
include ('./include/header.php')
?>
<div class="page-header">
        <div class="page-title">
            <h3>Convertisseurs</h3>
        </div>
    </div>

<?php include ('./include/footer.php')?>