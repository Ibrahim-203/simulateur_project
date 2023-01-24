</div>
</div>
<!--  END CONTENT PART  -->

</div>
<!-- END MAIN CONTAINER -->

<!--  BEGIN CHAT  -->

<!--  END CHAT  -->

<!--  BEGIN FOOTER  -->
<footer class="footer-section theme-footer">

    <div class="footer-section-1  sidebar-theme">

    </div>

    <div class="footer-section-2 container-fluid">
        <div class="row">
            <div class="col-12">
                <ul class="list-inline mb-0 d-flex justify-content-sm-end justify-content-center mr-sm-3 ml-sm-0 mx-3">
                    <li class="list-inline-item  mr-3">
                        <p class="bottom-footer">&#xA9; 2022 <a target="_blank"
                                href="https://www.mada-digital.net/">Mada-Digital</a></p>
                    </li>
                    <li class="list-inline-item align-self-center">
                        <div class="scrollTop"><i class="flaticon-up-arrow-fill-1"></i></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</footer>
<!--  END FOOTER  -->

<!--  BEGIN CONTROL SIDEBAR  -->
<aside class="control-sidebar control-sidebar-light-color cs-content">
    <div class="">

        <div class="row">
            <div class="col-md-12 text-right">
                <div class="close-sidebar">
                    <i class="flaticon-close-fill p-3 toggle-control-sidebar"></i>
                </div>
            </div>
            <div class="col-md-12">
                <div class="usr-info text-center mb-5">
                    <img alt="admin-profile" src="assets/img/120x120.jpg" class="img-fluid rounded-circle mb-3">
                    <div class=" mt-2">
                        <h5 class="usr-name mb-0"><?php echo $_SESSION['user']['pseudo']?></h5>
                        <p class="usr-occupation mb-0 mt-1">Administrateur</p>
                    </div>

                </div>

            </div>
        </div>
        <div class="row">
            <div class="col-md-2 col-sm-1 col-2 m-1">
                <button type="button" class="btn btn-success mb-4 mr-2 change_name"><i
                        class="flaticon-edit-1 "></i></button>
            </div>
            <div class="col-md-9 col-sm-9 col-9 m-1">
                <button type="button" class="btn btn-primary w-100 mb-4 mr-2 change_password"><i
                        class="flaticon-lock-2 mr-1"></i>
                    Changer mon mot de passe</button>
            </div>

        </div>
    </div>
</aside>
<!--  END CONTROL SIDEBAR  -->
<!-- BEGIN GLOBAL MANDATORY SCRIPTS -->
<script type="text/javascript" src="assets/js/libs/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="bootstrap/js/popper.min.js"></script>
<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="plugins/scrollbar/jquery.mCustomScrollbar.concat.min.js"></script>
<script type="text/javascript" src="assets/js/app.js"></script>
<script type="text/javascript" src="plugins/jConfirm/jquery-confirm.js"></script>
<script src="plugins/table/datatable/datatables.js"></script>
<script type="text/javascript">
$(document).ready(function() {
    App.init();
});
</script>
<script type="javascript" src="assets/js/custom.js"></script>
<!-- END GLOBAL MANDATORY SCRIPTS -->

<!-- BEGIN PAGE LEVEL PLUGINS/CUSTOM SCRIPTS -->
<script src="plugins/charts/chart.min.js"></script>
<script type="text/javascript" src="plugins/maps/vector/jvector/jquery-jvectormap-2.0.3.min.js"></script>
<script type="text/javascript" src="plugins/maps/vector/jvector/worldmap_script/jquery-jvectormap-world-mill-en.js">
</script>
<script type="text/javascript" src="./model/js/deconnection.js"></script>
<script type="text/javascript" src="plugins/calendar/pignose/moment.latest.min.js"></script>
<script type="text/javascript" src="plugins/calendar/pignose/pignose.calendar.js"></script>
<script type="text/javascript" src="plugins/progressbar/progressbar.min.js"></script>
<script type="text/javascript" src="assets/js/support-chat.js"></script>
<!--  BEGIN CUSTOM SCRIPTS FILE  -->
<script src="assets/js/forms/bootstrap_validation/bs_validation_script.js"></script>
<script type="text/javascript" src="plugins/file-upload/file-upload-with-preview.js"></script>
<script src="plugins/bootstrap-wizard/jquery.bootstrap.wizard.js"></script>
<script type="module" src="./model/js/userScript.js"></script>
<script src="plugins/sweetalert2/sweetalert2.min.js"></script>
<script src="./model/js/element.js?v=<?php echo date('l jS of F Y h:i:s A'); ?>"></script>

<!--  END CUSTOM SCRIPTS FILE  -->
<!-- BEGIN PAGE LEVEL PLUGINS/CUSTOM SCRIPTS -->
<!--  BEGIN CUSTOM SCRIPTS FILE  -->
<script>
$('#simple-1').bootstrapWizard();
$('#simple-2').bootstrapWizard();
$('#p-1').bootstrapWizard({
    onTabShow: function(tab, navigation, index) {
        var $total = navigation.find('li').length;
        var $current = index + 1;
        var $percent = ($current / $total) * 100;
        $('#p-1 .progress-bar').css({
            width: $percent + '%'
        });
    }
});
</script>
<!--  END CUSTOM SCRIPTS FILE  -->
</body>

</html>