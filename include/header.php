<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <title> Administration simulateur </title>
    <link rel="icon" type="image/x-icon" href="assets/img/mdg-favicon.ico" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/plugins.css" rel="stylesheet" type="text/css" />
    <!-- END GLOBAL MANDATORY STYLES -->

    <!-- BEGIN PAGE LEVEL PLUGINS/CUSTOM STYLES -->
    <link href="assets/css/support-chat.css" rel="stylesheet" type="text/css" />
    <link href="plugins/maps/vector/jvector/jquery-jvectormap-2.0.3.css" rel="stylesheet" type="text/css" />
    <link href="plugins/charts/chartist/chartist.css" rel="stylesheet" type="text/css">
    <link href="assets/css/default-dashboard/style.css" rel="stylesheet" type="text/css" />
    <!-- END PAGE LEVEL PLUGINS/CUSTOM STYLES -->
    <!-- BEGIN PAGE LEVEL PLUGINS/CUSTOM STYLES -->
    <link href="plugins/loaders/csspin.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/ecommerce/product-catalog.css" rel="stylesheet" type="text/css">
    <link href="plugins/loaders/custom-loader.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="plugins/jConfirm/jquery-confirm.css">
    <link rel="stylesheet" type="text/css" href="assets/css/modules/modules-card.css">
    <link rel="stylesheet" type="text/css" href="plugins/table/datatable/datatables.css" />
    <link rel="stylesheet" type="text/css" href="plugins/table/datatable/custom_dt_customer.css">
    <link href="plugins/file-upload/file-upload-with-preview.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="assets/css/modules/modules-widgets.css">
    <link rel="stylesheet" type="text/css" href="plugins/sweetalert2/sweetalert2.min.css">
    <link href="assets/css/components/custom-counter.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" type="text/css" href="plugins/dropify/dropify.min.css">

</head>

<body class="default-sidebar">

    <!-- Tab Mobile View Header -->
    <header class="tabMobileView header navbar fixed-top d-lg-none">
        <div class="nav-toggle">
            <a href="javascript:void(0);" class="nav-link sidebarCollapse" data-placement="bottom">
                <i class="flaticon-menu-line-2"></i>
            </a>
            <a href="index.html" class=""> <img src="assets/img/logo-3.png" class="img-fluid" alt="logo"></a>
        </div>
        <ul class="nav navbar-nav">
            <li class="nav-item d-lg-none">
                <form class="form-inline justify-content-end" role="search">
                    <input type="text" class="form-control search-form-control mr-3">
                </form>
            </li>
        </ul>
    </header>
    <!-- Tab Mobile View Header -->

    <!--  BEGIN NAVBAR  -->
    <header class="header navbar fixed-top navbar-expand-sm">
        <!-- To hide sidebar -->
        <a href="javascript:void(0);" class="sidebarCollapse d-none d-lg-block" data-placement="bottom"><i
                class="flaticon-menu-line-2"></i></a>
        <!-- Liste des langue -->
        <!-- <ul class="navbar-nav flex-row">
            <li class="nav-item dropdown language-dropdown ml-1  ml-lg-0">
                <a href="javascript:void(0);" class="nav-link dropdown-toggle" id="flagDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="assets/img/ca.svg" alt=""> <span class="d-lg-inline-block d-none"></span>
                </a>
                <div class="dropdown-menu position-absolute" aria-labelledby="flagDropdown">
                    <a class="dropdown-item" href="javascript:void(0);"><img src="assets/img/de.svg" class="flag-width" alt=""> &#xA0;German</a>
                    <a class="dropdown-item" href="javascript:void(0);"><img src="assets/img/jp.svg" class="flag-width" alt=""> &#xA0;Japanese</a>
                    <a class="dropdown-item" href="javascript:void(0);"><img src="assets/img/fr.svg" class="flag-width" alt=""> &#xA0;French</a>
                    <a class="dropdown-item" href="javascript:void(0);"><img src="assets/img/ru.svg" class="flag-width" alt=""> &#xA0;Russian</a>
                    <a class="dropdown-item" href="javascript:void(0);"><img src="assets/img/ca.svg" class="flag-width" alt=""> &#xA0;English</a>
                </div>
            </li>
        </ul> -->

        <!-- Massage et notification -->
        <!-- <ul class="navbar-nav flex-row mr-lg-auto ml-lg-0  ml-auto">
           
            <li class="nav-item dropdown message-dropdown ml-lg-4">
                <a href="javascript:void(0);" class="nav-link dropdown-toggle" id="messageDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="flaticon-mail-10"></span><span class="badge badge-primary">13</span>
                </a>
                <div class="dropdown-menu  position-absolute" aria-labelledby="messageDropdown">
                    <a class="dropdown-item title" href="javascript:void(0);">
                        <i class="flaticon-chat-line mr-3"></i><span>You have 13 new messages</span>
                    </a>
                    <a class="dropdown-item" href="javascript:void(0);">
                        <div class="media">
                            <div class="usr-img online mr-3">
                                <img class="usr-img rounded-circle" src="assets/img/90x90.jpg" alt="Generic placeholder image">
                            </div>
                            <div class="media-body">
                                <div class="mt-0">
                                    <p class="text mb-0">Browse latest projects...</p>
                                </div>

                                <div class="d-flex justify-content-between">
                                    <p class="meta-user-name mb-0">Kara Young</p>
                                    <p class="meta-time mb-0  align-self-center">1 min ago</p>
                                </div>
                            </div>
                        </div>

                        <div class="media">
                            <div class="usr-img mr-3">
                                <img class="usr-img rounded-circle" src="assets/img/90x90.jpg" alt="Generic placeholder image">
                            </div>
                            <div class="media-body">
                                <div class="mt-0">
                                    <p class="text mb-0">Design, Development and...</p>
                                </div>

                                <div class="d-flex justify-content-between">
                                    <p class="meta-user-name mb-0">Amy Diaz</p>
                                    <p class="meta-time mb-0  align-self-center">5 mins ago</p>
                                </div>
                            </div>
                        </div>

                        <div class="media">
                            <div class="usr-img online mr-3">
                                <img class="usr-img rounded-circle" src="assets/img/90x90.jpg" alt="Generic placeholder image">
                            </div>
                            <div class="media-body">
                                <div class="mt-0">
                                    <p class="text mb-0">We can ensure...</p>
                                </div>

                                <div class="d-flex justify-content-between">
                                    <p class="meta-user-name mb-0">Shaun Park</p>
                                    <p class="meta-time mb-0  align-self-center">1 day ago</p>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a class="footer dropdown-item" href="javascript:void(0);">
                        <div class="btn btn-info mb-3 mr-2 btn-rounded"><i class="flaticon-arrow-right mr-3"></i> View more</div>
                    </a>
                </div>
            </li>

  
            <li class="nav-item dropdown notification-dropdown ml-3">
                <a href="javascript:void(0);" class="nav-link dropdown-toggle" id="notificationDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="flaticon-bell-4"></span><span class="badge badge-success">15</span>
                </a>
                <div class="dropdown-menu position-absolute" aria-labelledby="notificationDropdown">
                    <a class="dropdown-item title" href="javascript:void(0);">
                        <i class="flaticon-bell-13 mr-3"></i> <span>You have 15 new notifications</span>
                    </a>

                    <a class="dropdown-item text-center  p-1" href="javascript:void(0);">

                        <div class="notification-list ">
                            
                            <div class="notification-item position-relative  mb-3">
                                <div class="c-dropdown text-right">
                                    <span id="c-dropdonbtn" class="c-dropbtn mr-2"><i class="flaticon-dots"></i></span>
                                    <div class="c-dropdown-content">
                                        <div class="c-dropdown-item">View</div>
                                        <div class="c-dropdown-item">Delete</div>
                                    </div>
                                </div>
                               
                                <h6 class="mb-1">5 new members joined today</h6>
                                <p><span class="meta-time">1 minute ago</span> . <span class="meta-member-notification">4 members</span></p>
                                <ul class="list-inline badge-collapsed-img mt-3">
                                    <li class="list-inline-item chat-online-usr">
                                        <img src="assets/img/90x90.jpg" alt="admin-profile" class="ml-0">
                                    </li>
                                    <li class="list-inline-item chat-online-usr">
                                        <img src="assets/img/90x90.jpg" alt="admin-profile">
                                    </li>
                                    <li class="list-inline-item chat-online-usr">
                                        <img src="assets/img/90x90.jpg" alt="admin-profile">
                                    </li>
                                    <li class="list-inline-item chat-online-usr">
                                        <img src="assets/img/90x90.jpg" alt="admin-profile">
                                    </li>
                                </ul>

                            </div>

                            <div class="notification-item position-relative  mb-3">

                                <div class="c-dropdown text-right">
                                    <span id="c-dropdonbtn2" class="c-dropbtn mr-2"><i class="flaticon-dots"></i></span>
                                    <div class="c-dropdown-content">
                                        <div class="c-dropdown-item">View</div>
                                        <div class="c-dropdown-item">Delete</div>
                                    </div>
                                </div>
                                
                                <h6 class="mb-1">Very long description...</h6>
                                <p><span class="meta-time">5 minutes ago</span> . <span class="meta-member-notification">5 members</span></p>
                                <ul class="list-inline badge-collapsed-img mt-3">
                                    <li class="list-inline-item chat-online-usr">
                                        <img alt="admin-profile" src="assets/img/90x90.jpg" class="ml-0">
                                    </li>
                                    <li class="list-inline-item chat-online-usr">
                                        <img alt="admin-profile" src="assets/img/90x90.jpg">
                                    </li>
                                    <li class="list-inline-item chat-online-usr">
                                        <img alt="admin-profile" src="assets/img/90x90.jpg">
                                    </li>
                                    <li class="list-inline-item chat-online-usr">
                                        <img alt="admin-profile" src="assets/img/90x90.jpg">
                                    </li>
                                    <li class="list-inline-item chat-online-usr">
                                        <img alt="admin-profile" src="assets/img/90x90.jpg">
                                    </li>
                                </ul>

                            </div>

                            <div class="notification-item position-relative  mb-3">
                                <div class="c-dropdown text-right">
                                    <span class="c-dropbtn mr-2"><i class="flaticon-dots"></i></span>
                                    <div class="c-dropdown-content">
                                        <div class="c-dropdown-item">View</div>
                                        <div class="c-dropdown-item">Delete</div>
                                    </div>
                                </div>
                                
                                <h6 class="mb-1">New item are in queue</h6>
                                <p><span class="meta-time">25 minutes ago</span> . <span class="meta-member-notification">3 members</span></p>
                                <ul class="list-inline badge-collapsed-img mt-3">
                                    <li class="list-inline-item chat-online-usr">
                                        <img alt="admin-profile" src="assets/img/90x90.jpg" class="ml-0">
                                    </li>
                                    <li class="list-inline-item chat-online-usr">
                                        <img alt="admin-profile" src="assets/img/90x90.jpg">
                                    </li>
                                    <li class="list-inline-item chat-online-usr">
                                        <img alt="admin-profile" src="assets/img/90x90.jpg">
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </a>
                    <a class="footer dropdown-item text-center p-2">
                        <span class="mr-1">View All</span>
                        <div class="btn btn-gradient-warning rounded-circle"><i class="flaticon-arrow-right flaticon-circle-p"></i></div>
                    </a>
                </div>
            </li>
        </ul> -->


        <ul class="navbar-nav flex-row ml-lg-auto">
            <!-- Champ de racherche -->
            <li class="nav-item  d-lg-block d-none">
                <form class="form-inline" role="search">
                    <input type="text" class="form-control search-form-control" placeholder="Search...">
                </form>
            </li>

            <!-- <li class="nav-item dropdown app-dropdown  ml-lg-4 mr-lg-2 order-lg-0 order-2">
                <a href="javascript:void(0);" class="nav-link dropdown-toggle" id="appDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="flaticon-bulb"></span>
                </a>
                <div class="dropdown-menu  position-absolute" aria-labelledby="appDropdown">
                    <a class="dropdown-item" href="ecommerce_dashboard.html">
                        <i class="flaticon-commerce"></i><span>eCommerce</span>
                    </a>
                    <a class="dropdown-item" href="form_bootstrap_basic.html">
                        <i class="flaticon-edit-3"></i><span>Forms</span>
                    </a>
                    <a class="dropdown-item" href="table_basic.html">
                        <i class="flaticon-table"></i><span>Tables</span>
                    </a>
                    <a class="dropdown-item" href="ui_buttons.html">
                        <i class="flaticon-switch"></i><span>Buttons</span>
                    </a>
                    <a class="dropdown-item" href="ui_flaticon_icon.html">
                        <i class="flaticon-edit"></i><span>Font Icons</span>
                    </a>
                    <a class="dropdown-item" href="modules_widgets.html">
                        <i class="flaticon-computer-5"></i><span>Modules</span>
                    </a>
                    <a class="dropdown-item" href="map_google_basic.html">
                        <i class="flaticon-location"></i><span>Maps</span>
                    </a>
                    <a class="dropdown-item" href="apps_drag_n_drop_calendar.html">
                        <i class="flaticon-calendar-1"></i><span>Calendar</span>
                    </a>
                    <a class="dropdown-item" href="am_column_and_barchart.html">
                        <i class="flaticon-chart-3"></i><span>Charts</span>
                    </a>
                </div>
            </li> -->


            <li class="nav-item dropdown user-profile-dropdown ml-lg-0 mr-lg-2 ml-3 order-lg-0 order-1">
                <a href="javascript:void(0);" class="nav-link dropdown-toggle user" id="userProfileDropdown"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="flaticon-user-12"></span>
                </a>
                <div class="dropdown-menu  position-absolute" aria-labelledby="userProfileDropdown">
                    <div class="dropdown-divider"></div>
                    <span class="dropdown-item deconnecter" style="cursor:pointer">
                        <i class="mr-1 flaticon-power-button"></i> <span>Se deconnecter</span>
                    </span>
                </div>
            </li>

            <li class="nav-item dropdown cs-toggle order-lg-0 order-3">
                <a href="#" class="nav-link toggle-control-sidebar suffle">
                    <span class="flaticon-menu-dot-fill d-lg-inline-block d-none"></span>
                    <span class="flaticon-dots d-lg-none"></span>
                </a>
            </li>
        </ul>
    </header>
    <!--  END NAVBAR  -->

    <!--  BEGIN MAIN CONTAINER  -->
    <div class="main-container" id="container">

        <div class="overlay"></div>
        <div class="cs-overlay"></div>

        <!--  BEGIN SIDEBAR  -->

        <div class="sidebar-wrapper sidebar-theme">

            <div id="dismiss" class="d-lg-none"><i class="flaticon-cancel-12"></i></div>

            <nav id="sidebar">

                <ul class="navbar-nav theme-brand flex-row  d-none d-lg-flex">
                    <li class="nav-item d-flex">
                        <a href="index.php" class="navbar-brand">
                            <img src="assets/img/mgp.png" class="img-fluid" alt="logo">
                        </a>
                        <p class="border-underline"></p>
                    </li>
                    <li class="nav-item theme-text">
                        <a href="index.php" style="font-size : 14px !important" class="nav-link"> MadagreenPower </a>
                    </li>
                </ul>


                <ul class="list-unstyled menu-categories" id="accordionExample">
                    <li class="menu">
                        <a href="#dashboard" data-toggle="collapse" aria-expanded="true" class="dropdown-toggle">
                            <div class="">
                                <i class="flaticon-computer-6 ml-3"></i>
                                <span>Tableau de bord</span>
                            </div>
                        </a>
                        <ul class="collapse submenu list-unstyled show onglet" id="dashboard"
                            data-parent="#accordionExample">
                            <li
                                class=" <?php if($_SERVER['SCRIPT_NAME'] == '/Sim2022-MD/index.php'): ?> active <?php endif; ?>">
                                <a href="index.php"> <i class="flaticon-home-fill"></i> Accueil </a>
                            </li>
                            <!-- <li
                                class="<?php if($_SERVER['SCRIPT_NAME'] == '/Sim2022-MD/panneau.php'): ?> active <?php endif; ?>">
                                <a href="panneau.php"> <i class="fas fa-solar-panel"></i> Panneaux </a>
                            </li>
                            <li>
                                <a href="regulateur.php"> <i class="flaticon-computer-2"></i> Régulateurs </a>
                            </li> 
                            <li>
                                <a href="convertisseur.php"> <i class="flaticon-car"></i> Convertisseurs </a>
                            </li>-->
                            <li>
                                <a href="categorie.php"> <i class="flaticon-package"></i> Catégories </a>
                            </li>
                            <li>
                                <a href="equipement.php"> <i class="flaticon-computer-line"></i> Equipements </a>
                            </li>
                            <li>
                                <a href="kit.php"> <i class="flaticon-bulb"></i> Kits </a>
                            </li>
                        </ul>
                    </li>

                </ul>
            </nav>
        </div>

        <!--  END SIDEBAR  -->

        <!--  BEGIN CONTENT PART  -->
        <div id="content" class="main-content">
            <div class="container">