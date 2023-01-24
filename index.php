<?php
session_start();
if (!empty($_SESSION)) {
} else {
    header('Location:./login.php');
}
include('./include/header.php')
?>

<div class="page-header">
    <div class="page-title">
        <h3>Accueil</h3>
    </div>
</div>

<div class="col-lg-12 layout-spacing">
    <div class="statbox widget box box-shadow">
        <div class="widget-header">
            <div class="row">
                <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                    <h4>Statistique</h4>
                </div>
            </div>
        </div>
        <div class="widget-content widget-content-area text-center circle-counter-container">
            <div class="row mb-5">
                <div class="col-xl-3 col-lg-3 mb-md-0 mb-4 col-md-3 col-sm-6">
                    <div class="circle-counter mx-auto">
                        <h1 class="c-counter1 c-counter nombre_cat"></h1>
                        <p class="c-counter-text">Catégories</p>
                    </div>
                </div>

                <div class="col-xl-3 col-lg-3 mb-md-0 mb-4 col-md-3 col-sm-6">
                    <div class="circle-counter mx-auto">
                        <h1 class="c-counter1 c-counter nombre_equip"></h1>
                        <p class="c-counter-text">Equipements</p>
                    </div>
                </div>

                <div class="col-xl-3 col-lg-3 mb-sm-0 mb-4 col-md-3 col-sm-6">
                    <div class="circle-counter mx-auto">
                        <h1 class="c-counter1 c-counter nombre_kit"></h1>
                        <p class="c-counter-text">Kits</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>


<?php include('./include/footer.php') ?>
<script src="./model/js/index.js"></script>
<script src="assets/js/components/custom-counter.js"></script>