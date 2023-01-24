<?php
session_start();
include('./include/header.php')
?>

<div class="page-header">
    <div class="page-title">
        <h3>Kits</h3>
    </div>
</div>
<div class="MySpinner">

</div>

<div class="widget-content widget-content-area">
    <div class="row mb-3">
        <div class="col-md-6 col-6">
            <h4>Liste des Kits</h4>
        </div>
        <div class="col-md-6 col-6 text-right">
            <div class="d-flex justify-content-end">
                <div class="float-right">
                    <a href="#"><i class="flaticon-refresh-1 js-refresh mr-1 refresh_kit"
                            style="font-size : 20px !important"></i></a>
                </div>
            </div>
        </div>
    </div>
    <div id="product-catalog-container" class="container">
        <div class="row list_kit" id="list_kit">

        </div>
    </div>
</div>

<?php include('./include/footer.php')?>
<script type="module" src="./model/js/ApiWooCommerce.js?version=<?=date("Y-m-d h:i:s") ?>"></script>