<?php
session_start();
if (!empty($_SESSION)) {
} else {
    header('Location:./login.php');
}
include('./include/header.php');

?>

<div class="page-header">
    <div class="page-title">
        <h3>Equipements</h3>
    </div>
</div>
<div class="widget-content widget-content-area">
    <div class="row mb-3">
        <div class="col-md-6 col-6">
            <h4>Liste des équipements</h4>
        </div>
        <div class="col-md-6 col-6 text-right">
            <div class="d-flex justify-content-end">
                <button id="add_equip_from_equip" class="btn btn-primary mb-4 mr-2 btn-sm" type="button">Ajouter une
                    Equipement</button>
            </div>
        </div>
    </div>
    <div class="table-responsive mb-4">
        <table class="table table-striped table-hover table-bordered style-3" style="width: 100%" id="table_equip">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Libelle équipement</th>
                    <th>Puissance équipement</th>
                    <th>Catégorie</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody></tbody>
            <tfoot>
                <tr>
                    <th>id</th>
                    <th>Libelle équipement</th>
                    <th>Puissance équipement</th>
                    <th>Catégorie</th>
                    <th>Action</th>
                </tr>
            </tfoot>
        </table>
    </div>
</div>

<?php include('./include/footer.php')?>
<script src="./model/js/element.js?v=<?php echo date('l jS of F Y h:i:s A'); ?>"></script>
<script type="module" src="./model/js/equipScript.js?v=<?php echo date('l jS of F Y h:i:s A'); ?>"></script>