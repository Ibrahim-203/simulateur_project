<?php
session_start();
if (!empty($_SESSION)) {
} else {
    header('Location:./login.php');
}
include('./include/header.php');

?>

<div class="page-header">
    <div class="page-title col-6">
        <h3>Catégories</h3>
    </div>
</div>
<div class="widget-content widget-content-area">
    <div class="row mb-3">
        <div class="col-md-6 col-6">
            <h4>Liste des catégories</h4>
        </div>
        <div class="col-md-6 col-6 text-right">
            <div class="d-flex justify-content-end">
                <button id="add_cat" class="btn btn-primary mb-4 mr-2 btn-sm" type="button">Ajouter une
                    catégorie</button>
            </div>
        </div>
    </div>
    <div class="table-responsive mb-4">
        <table class="table table-striped table-hover table-bordered style-3" style="width: 100%" id="table_cat">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Libelle categorie</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody></tbody>
            <tfoot>
                <tr>
                    <th>id</th>
                    <th>Libelle categorie</th>
                    <th>Action</th>
                </tr>
            </tfoot>
        </table>
    </div>
</div>
<?php include('./include/footer.php')?>
<script src="./model/js/element.js?v=<?php echo date('l jS of F Y h:i:s A'); ?>"></script>
<script type="module" src="./model/js/catScript.js?v=<?php echo date('l jS of F Y h:i:s A'); ?>"></script>