
//Url to DOA
const urlCat = "./admin/model/php/DAOCat.php";
const urlEquip = "./admin/model/php/DAOEquip.php";
const urlKit = "./admin/model/php/DAOKit.php";

//Variables 
let production_min = 0
let production_max = 0
let irradiation_min = 0
let irradiation_max = 0
let puissance_pann_valide = 0
let depart = 0
let puissance_max = 0
let puissance_crete = 0
let nosolarpanel = 0
let consommation_total = 0
//----------------------------- BEGIN OF FUNCTION------------------

// Get puissance max of solar panel in database
let puissance_maximum = () => {
    let value = 0
    $.ajax({
        url: urlKit,
        dataType: "JSON",
        method: "POST",
        data: { PUISSANCE_PAN: "PUISSANCE_PAN" },
        success: function (response) {
            value = response[0].puissance;
            console.log("value inside : ", value);
        },
        async: false
    });
    return value;
}

// function to fill list category 
let fillCardCat = () => {
    $.confirm({
        content: function () {
            var self = this;
            return $.ajax({
                url: urlCat,
                dataType: "json",
                method: "post",
                data: { SELECT_CAT: "SELECT_CAT" },
            }).done(function (response) {
                self.close();
                let value = response;
                let card = "";

                value.forEach((val) => {
                    card += `<a class="equipement" data-defaultmodel="100" data-libelle ="${val.libelle_cat}" data-image='${val.image_cat}' data-id="${val.id}" style="background-image: url(./admin/upload/${val.image_cat});">${val.libelle_cat}</a>`;
                });
                card += `
                <a class="equipement" data-defaultmodel="100" data-id="perso" data-image="point_interrogation.png" style="background-image: url(./admin/upload/point_interrogation.png);">Personnalisée</a>
                `;
                $("#list_categorie").html(card);
            })
                .fail(function () {
                    self.close();
                });
        },
    });
};

//update progress bar of production
let updateProgressProduice = (_puissance = 0, _limite = 0) => {
    if (_puissance == 0) {
        $(".energie_produit").removeAttr("style")
        $(".energie_produit_min").attr("style", `width:0%`)
        $(".energie_produit_max").attr("style", `width:0%`)
    } else {
        production_min = _puissance * irradiation_min
        production_max = _puissance * irradiation_max
        _limite = parseInt(_limite) + parseInt(_limite * 0.1)
        let pourcentage_min = (production_min * 100) / (_limite * 9)
        let pourcentage_max = (production_max * 100) / (_limite * 9)
        pourcentage_min = Math.floor(pourcentage_min)
        console.log(production_min);
        pourcentage_max = Math.floor(pourcentage_max) - pourcentage_min
        console.log(production_max);

        $(".energie_produit").removeAttr("style")
        $(".energie_produit_min").attr("style", `width:${pourcentage_min}%`)
        $(".energie_produit_max").attr("style", `width:${pourcentage_max}%`)
    }

}

// Get solar panel from database
let getPannDataBase = (_puissance_crete, _back = "") => {
    let donnee = ""
    if (_back == "") {
        donnee = { SELECT_KIT: "SELECT_KIT", puissance_crete: _puissance_crete }
    } else {
        donnee = { SELECT_KIT: "SELECT_KIT", puissance_crete: _puissance_crete, back: "back" }
    }
    $.ajax({
        url: urlKit,
        dataType: "JSON",
        method: "POST",
        data: donnee,
        success: function (response) {
            depart = 1
            let value = response[0]
            puissance_pann_valide = value.puissance_pann
            updateProgressProduice(puissance_pann_valide, puissance_max)
            calculeConsommation(puissance_max)
            fillCarousselKit(_puissance_crete)
            console.log(puissance_pann_valide)
        },
        error: function (response) {
            nosolarpanel = 1
            calculeConsommation(puissance_max)
        },

        async: false,

    })
}

//
let calculeConsommation = (_puissance_max) => {
    consommation_total = 0
    $(".item-card").each(function () {
        let heure_utilisation = $(this).find(".heure").val();
        let quantite = $(this).find(".quantite option:selected").val();
        let texte_heure_utilisation = $(this).find(".heure :selected").text();
        let puissance_equip = $(this).find(".libelle_equip").val();
        let consommation_equip = quantite * heure_utilisation * puissance_equip
        consommation_total = consommation_total + consommation_equip
        console.log("quantite :", quantite);
        $('.dynamique_class').addClass("progress_sticky")
        console.log("heure_utilisation :", heure_utilisation);
    })

    if (depart == 0) {
        puissance_crete = (consommation_total + ((consommation_total * 1) / 100)) / (irradiation_min * 0.9 * 0.95)
        console.log("puissance_crete", puissance_crete);
        getPannDataBase(puissance_crete)
        console.log(puissance_pann_valide);
    }

    if (consommation_total > production_min && consommation_total < production_max) {
        updateMessageDynamic(`AVERTISSEMENT, ce kit ${puissance_pann_valide}Wc couvre vos besoins en été, mais pas totalement en hiver pendant les périodes les moins ensoleillées.`, "warning", production_min, production_max, consommation_total)
        //kit pas assez puissant pour les tâches 
        console.log("warning");
        $(".energie_produit_min").removeClass("bg-danger")
        $(".energie_produit_max").removeClass("bg-danger")
        $(".energie_produit_max").addClass("bg-success")
        $(".energie_produit_min").addClass("bg-warning")

    } else if (consommation_total > production_max) {
        //puissance kit inssuffisante
        puissance_crete = (consommation_total + ((consommation_total * 1) / 100)) / (irradiation_min)
        if (nosolarpanel == 0) {
            getPannDataBase(puissance_crete)
        } else {
            updateMessageDynamic("Nous ne disposons pas de kit assez puissant pour couvrir vos besoins", "danger", production_min, production_max, consommation_total)
            $(".energie_produit_min").removeClass("success")
            $(".energie_produit_max").removeClass("bg-warning")
            $(".energie_produit_max").addClass("bg-danger")
            $(".energie_produit_min").addClass("bg-danger")
        }


        console.log("progress rouge");
    } else {
        if (consommation_total != 0) {
            updateMessageDynamic(`PARFAIT, ce kit ${puissance_pann_valide}Wc sera assez puissant pour couvrir vos besoins énergétiques toute l'année.`, "success", production_min, production_max, consommation_total)
        } else {
            updateMessageDynamic();
            depart = 0
            updateProgressProduice()
            $(".carousel_kit").html("")
            // $('.dynamique_class').removeClass("progress_sticky")
            $(".kit_select").prop("disabled", "disabled")
        }

        $(".common_class").removeClass("bg-warning bg-danger")
        $(".common_class").addClass("bg-success")
        console.log("progress vert");
    }
    updateProgressConso(consommation_total, _puissance_max)
    console.log("consommation_total", consommation_total)
}
let updateProgressConso = (_conso, _limite) => {
    _limite = parseInt(_limite) + parseInt(_limite * 0.1)
    let pourcentage = (_conso * 100) / (_limite * 9)
    $(".consommation").removeAttr("style")
    $(".consommation").attr("style", `width:${pourcentage}%`)
}

// function to fill select "puissance_kit"
let fillSelectOfKit = () => {
    $.ajax({
        url: urlKit,
        dataType: "JSON",
        method: "POST",
        data: { SELECT_KIT: "SELECT_KIT" },
        success: function (response) {
            let select = "";
            response.forEach((element) => {
                select += `<option value='${element.libelle_kit}' data-id="${element.id_kit}" data-puissance="${element.puissance_pann}" data-libelle="${element.libelle_kit}">${element.puissance_pann} Wc</option>`;
            });
            console.log("passer");
            $("#puissance_kit").html(select);
        },
    });
}

let fillCarousselKit = (_puissance_crete, current = 0) => {
    let donne = ""
    if (current == 0) {
        donne = { SELECT_KIT: "SELECT_KIT", puissance_crete: _puissance_crete }


    } else {
        donne = { SELECT_KIT: "SELECT_KIT", puissance_crete: _puissance_crete, current: "current" }
    }
    $.ajax({
        url: "./admin/model/php/DAOKit.php",
        dataType: "JSON",
        async: false,
        method: "POST",
        data: donne,
        success: function (response) {
            let Kits = "";
            let val = response[0]

            /*
                        <div class="widget-content widget-content-area">
                            <div class="top-seller-container">
                                
                                <div class="top-seller-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <img src="${val.image_kit}" class="img-fluid w-100 text-center" alt="car-1">
                                        </div>
                                        <div class="col-md-7 col-6">
                                            
                                        <h5 class="post-heading mt-3">${val.libelle_kit}</h5>
                                        <p class="post-text mb-2">Onduleur : ${val.marque_ond}</p>
                                        <p class="post-text mb-2">Puissance onduleur: ${val.puissance_ond} KVA</p>
                                        </div>
                                        <div class="col-md-12 text-center mt-3">
                                            <button class="btn btn-danger btn-rounded mb-3">
                                               Commander
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    <div class="col-md-5 col-6" id="kit_choisi">
            <img alt="image du kit" src="${val.image_kit}" class="img-fluid mb-md-0 mb-4">
        </div>
        <div class="col-md-7 col-6">
            <h5 class="post-heading mt-3">${val.libelle_kit}</h5>
            <p class="post-text mb-2">Onduleur : ${val.marque_ond}</p>
            <p class="post-text mb-2">Puissance onduleur: ${val.puissance_ond} KVA</p>
            <a href="${val.lien_kit}" target="_blank">
            <button class="btn btn-outline-secondary btn-rounded mb-5">Commander</button>
            </a>
        </div>

            */

            Kits = `<div class="widget-content widget-content-area ">
            <div class="top-seller-container">
                
                <div class="top-seller-body">
                    <div class="row">
                        <div class="col-md-12 col-sm-4">
                            <img src="${val.image_kit}" class="img-fluid w-100 text-center" alt="image-kit">
                        </div>
                        <div class="col-md-12 col-8">
                            
                        <h5 class="post-heading mt-3">${val.libelle_kit}</h5>
                        <p class="post-text mb-2">Puissance panneau : ${val.puissance_pann} Wc</p>
                        <p class="post-text mb-2">Onduleur : ${val.marque_ond}</p>
                        <p class="post-text mb-2">Puissance onduleur: ${val.puissance_ond} KVA</p>
                        </div>
                        <div class="col-md-12 text-center mt-3">
                        <a href="${val.lien_kit}" target="_blank">
                            <button class="btn btn-danger btn-rounded mb-3">
                               Commander
                            </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
            $(".carousel_kit").html(Kits)
        },

    });
}

//function to fill select of category
const fillQuantite = () => {
    let quantite = "";
    for (let i = 1; i <= 30; i++) {
        quantite += "<option value=" + i + ">" + i + "</option>";
    }
    return quantite;
};

// update message dynamique
let updateMessageDynamic = (_message = "", _kind = "", _production_min = "", _production_max = "", _consommation = "") => {
    let message = "";
    _production_min = Math.floor(_production_min)
    _production_max = Math.floor(_production_max)
    _consommation = Math.floor(_consommation)
    if (_production_min != "") {
        message = `<div class="message">
        <div class="petit">
        <span>Votre consommation : ${_consommation}</span><br>
    <span>Production minimum panneau : ${_production_min}</span><br>
    <span>Production maximum panneau : ${_production_max}</span><br>
    </div>
    <div class="alert info alert-${_kind} mb-4" role="alert"> <i class="flaticon-cancel-12 close" data-dismiss="alert"></i>
    ${_message}
    </div>
    </div>`;
    }

    $("#dynamique_mssg").html(message)
}

//function to fill select hour 
const fillHeure = () => {
    let heure = ` <option value="0.08">5 minutes</option>
                  <option value="0.1">10 minutes</option>
                  <option value="0.25">15 minutes</option>
                  <option value="0.50">30 minutes</option>
                  <option value="1">1 heure</option>`;
    for (let i = 2; i < 25; i++) {
        heure += `<option value="${i}">${i} heures</option>`;
    }
    return heure;
};
//----------------------------- END OF FUNCTION------------------


$(function () {

    // Variable global
    let index = 0;
    let id_for_perso = 0;
    let puissance_kit = "";
    let consommation = 0
    nosolarpanel = 0

    $(".kit_select").prop("disabled", "disabled")

    //get max value of solar panel
    puissance_max = puissance_maximum()
    //initialize quatite by his function
    let quantite = fillQuantite();
    //initialize quatite by his function
    let heure = fillHeure();
    fillSelectOfKit()
    fillCardCat()
    puissance_kit = $("#puissance_kit selected").text()
    fillCarousselKit(puissance_kit)
    //fill list equipement
    $(document).on("click", ".equipement", function () {

        if (irradiation_min == 0 && irradiation_min == 0) {
            showWarningWal('Veuillez choisir votre localisation')
            $('.btn_localisation').click()
        } else {
            $(".kit_select").prop("disabled", "")
            index++;
            console.log(index);
            let id = $(this).data("id");
            let image_cat = $(this).data("image");
            let libelle_cat = $(this).data("libelle");


            let my_modal = ''
            if (id == "perso") {
                my_modal = `<div class="modal-header">
            <h5 class="modal-title">Perso</h5>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="col-sm-12 col-12 mt-5">
                    <p class="widget-title text-info">Puissance equipement</p>
                    <input type="number" value="1" data-libelle="${libelle_cat}"
                        id="libelle_equip${index}"
                        class="form-control form-control-sm libelle_equip_modal w-100 mb-1 "
                        placeholder="puissance">
                    <p class="widget-title text-info">Quantité</p>
                    <select class="custom-select custom-select-sm w-100 quantite_modal mb-1"
                        id="quantite${index}">
                        ${quantite}
                    </select>
                    <p class="widget-title text-info">Heure utilisation</p>
                    <select class="custom-select custom-select-sm w-100 heure_modal"
                        id="heure${index}">
                        ${heure}
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"
                    data-dismiss="modal">Annuler</button>
                <button type="button" data-image="point_interrogation.png" class="btn btn-primary choisir_equip" data-id="perso" data-dismiss="modal">Choisir</button>
            </div>`;
                $(".modal-content").html(my_modal)
                $("#myModal").modal('show');
            } else {
                my_modal = `<div class="modal-header">
            <h5 class="modal-title">${libelle_cat}</h5>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="col-sm-12 col-12 mt-5">
                    <p class="widget-title text-info">Equipement</p>
                    <select class="custom-select custom-select-sm w-100 libelle_equip_modal mb-1" id="libelle_equip_modal${index}">
                    </select>
                    <p class="widget-title text-info">Quantité</p>
                    <select class="custom-select custom-select-sm w-100 quantite_modal mb-1"
                        id="quantite${index}">
                        ${quantite}
                    </select>
                    <p class="widget-title text-info">Heure utilisation</p>
                    <select class="custom-select custom-select-sm w-100 heure_modal"
                        id="heure${index}">
                        ${heure}
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"
                    data-dismiss="modal">Annuler</button>
                <button type="button" class="btn btn-primary choisir_equip" data-image="${image_cat}" data-libelle_cat="${libelle_cat}" data-id="${id}" data-dismiss="modal">Choisir</button>
            </div>`;
                $.ajax({
                    url: urlEquip,
                    dataType: "JSON",
                    method: "POST",
                    data: { id_equip: id, card: "card", SELECT_EQUIP: "SELECT_EQUIP" },
                    success: function (response) {
                        let select = "";
                        response.forEach((element) => {
                            select += `<option value='${element.puissance_equip}' data-name = "${element.libelle_equip} ${element.puissance_equip} W" data-cat = "${element.image_cat}" data-courant="${element.courant_demarrage}" data-image="${element.image_equip}" data-libelle="${element.libelle_equip}">${element.libelle_equip} ${element.puissance_equip} W</option>`;
                        });
                        console.log("passer");
                        $(".modal-content").html(my_modal)
                        $(".libelle_equip_modal").html(select);
                        $("#myModal").modal('show');
                    },
                });
            }


            /*if (id == "perso") {
                id_for_perso++;
                cardPerso = `<div class="item-card col-xl-3 col-lg-12 col-md-12 col-sm-12 p-2 mb-xl-0 mb-2 p-0 m-2">
              <div class="widget-content-area total-coins br-4">
                  <div class="row">
                      <div class="col-sm-12 col-12">
                          <p class="widget-icon">
                              <img alt="image-widget" src="./admin/upload/${image_cat}" class="img-fluid">
                          </p>
                      </div>
                      <div class="col-sm-12 col-12 mt-5">
                      <p class="widget-title text-info">Perso${id_for_perso}</p>
                          <input type="number" value="1" data-libelle="perso ${id_for_perso}" id="libelle_equip${index}" class="form-control form-control-sm libelle_equip w-100 mb-1 " placeholder="puissance">
                      <select class="custom-select custom-select-sm w-100 quantite mb-1" id="quantite${index}">
                      ${quantite}
                      </select>
                      <select class="custom-select custom-select-sm w-100 heure" id="heure${index}">
                      ${heure}
                      </select>
                      </div>
                      <div class="col-sm-12 col-12 mt-2 ml-2">
                      <button  data-id_equipement="" data-id_categorie="" data-puiss ="libelle_equip${index}" data-heure ="heure${index}" data-quant ="quantite${index}" class="btn btn-sm btn-danger btn-supp-element-in-list" "   >Supprimer</button>
                      </div>
                      
                  </div>
              </div> 
              </div>`;
                $("#content-list-dimenssionnement").prepend(cardPerso);
                calculeConsommation(puissance_max)

                //         let quatite_perso = $("#quantite" + index + " option:selected").val();
                //         let heure_perso = $("#heure" + index + " option:selected").val();
                //         let puissance_perso = $("#libelle_equip" + index).val();

                //         let total = quatite_perso * heure_perso * puissance_perso
                //         consommation += parseFloat(total)
                //         console.log(consommation);
            } else {
                let cardBase = `<div class="item-card col-xl-3 col-lg-5 col-md-12 col-sm-12 p-2 mb-xl-0 mb-2 m-2">
              <div class="widget-content-area total-coins br-4">
                  <div class="row">
                      <div class="col-sm-12 col-12">
                          <p class="widget-icon">
                              <img alt="image-widget" src="./admin/upload/${image_cat}" class="img-fluid image_dynamic_equip">
                          </p>
                      </div>
                      <div class="col-sm-12 col-12 mt-5">
                      <p class="widget-title text-info">${libelle_cat}</p>
                      <select class="custom-select custom-select-sm w-100 libelle_equip mb-1" id="libelle_equip${index}">
                      </select>
                      <select class="custom-select custom-select-sm w-100 quantite mb-1" id="quantite${index}">
                      ${quantite}
                      </select>
                      <select class="custom-select custom-select-sm w-100 heure" id="heure${index}">
                      ${heure}
                      </select>
                      </div>
                      <div class="col-sm-12 col-12 mt-2 ml-2">
                      <button  data-id_equipement="" data-id_categorie="" data-puiss ="libelle_equip${index}" data-heure ="heure${index}" data-quant ="quantite${index}" class="btn btn-sm btn-danger btn-supp-element-in-list" " >Supprimer</button>
                      </div>
                  </div>
                    </div>
                    </div>`;
                    $.ajax({
                    url: urlEquip,
                    dataType: "JSON",
                    method: "POST",
                    data: { id_equip: id, card: "card", SELECT_EQUIP: "SELECT_EQUIP" },
                    success: function (response) {
                        let select = "";
                        response.forEach((element) => {
                            select += `<option value='${element.puissance_equip}' data-cat = "${element.image_cat}" data-courant="${element.courant_demarrage}" data-image="${element.image_equip}" data-libelle="${element.libelle_equip}">${element.libelle_equip} ${element.puissance_equip} W</option>`;
                        });
                        console.log("passer");
                        $("#content-list-dimenssionnement").prepend(cardBase);
                        $("#libelle_equip" + index).html(select);

                        calculeConsommation(puissance_max)
                    },
                });
            }*/
        }

    });

    $(document).on("click", ".choisir_equip", function () {
        let id = $(this).data("id")
        let image_cat = $(this).data("image");
        let image_equip = $(this).parent().parent().find(".libelle_equip_modal :selected").data("image")
        let src = ''
        if (image_equip) {
            src = "./admin/upload/equipement/" + image_equip
        } else {
            src = "./admin/upload/" + image_cat
        }
        index++;
        let libelle = ''
        let quantite_get = ''
        let heure_get = ''
        if (id == "perso") {
            id_for_perso++;
            libelle = $(".libelle_equip_modal").val()
            quantite_get = $(".quantite_modal").val()
            heure_get = $(".heure_modal").val()
            let cardPerso = `<div class="item-card col-xl-3 col-lg-12 col-md-12 col-sm-12 p-2 mb-xl-0 mb-2 p-0 m-2">
          <div class="widget-content-area total-coins br-4">
              <div class="row">
                  <div class="col-sm-12 col-12">
                      <p class="widget-icon">
                          <img alt="image-widget" src="./admin/upload/${image_cat}" class="img-fluid">
                      </p>
                  </div>
                  <div class="col-sm-12 col-12 mt-5">
                  <p class="widget-title text-info">Perso${id_for_perso}</p>
                      <input type="number" value="1" data-libelle="perso ${id_for_perso}" id="libelle_equip${index}" class="form-control form-control-sm libelle_equip w-100 mb-1 " placeholder="puissance">
                  <select class="custom-select custom-select-sm w-100 quantite mb-1" id="quantite${index}">
                  ${quantite}
                  </select>
                  <select class="custom-select custom-select-sm w-100 heure" id="heure${index}">
                  ${heure}
                  </select>
                  </div>
                  <div class="col-sm-12 col-12 mt-2 ml-2">
                  <button  data-id_equipement="" data-id_categorie="" data-puiss ="libelle_equip${index}" data-heure ="heure${index}" data-quant ="quantite${index}" class="btn btn-sm btn-danger btn-supp-element-in-list" "   >Supprimer</button>
                  </div>
                  
              </div>
          </div> 
          </div>`;
            $("#content-list-dimenssionnement").prepend(cardPerso);
            $("#libelle_equip" + index).val(libelle)
            $("#quantite" + index).val(quantite_get)
            $("#heure" + index).val(heure_get)

            //         let quatite_perso = $("#quantite" + index + " option:selected").val();
            //         let heure_perso = $("#heure" + index + " option:selected").val();
            //         let puissance_perso = $("#libelle_equip" + index).val();

            //         let total = quatite_perso * heure_perso * puissance_perso
            //         consommation += parseFloat(total)
            //         console.log(consommation);
        } else {
            libelle = $(".libelle_equip_modal :selected").text()
            let libelle_cat = $(this).data("libelle_cat")
            quantite_get = $(".quantite_modal :selected").val()
            heure_get = $(".heure_modal :selected").val()
            let cardBase = `<div class="item-card col-xl-3 col-lg-5 col-md-12 col-sm-12 p-2 mb-xl-0 mb-2 m-2">
          <div class="widget-content-area total-coins br-4">
              <div class="row">
                  <div class="col-sm-12 col-12">
                      <p class="widget-icon">
                          <img alt="image-widget" src="${src}" class="img-fluid image_dynamic_equip">
                      </p>
                  </div>
                  <div class="col-sm-12 col-12 mt-5">
                  <p class="widget-title text-info">${libelle_cat}</p>
                  <select class="custom-select custom-select-sm w-100 libelle_equip mb-1" id="libelle_equip${index}">
                  </select>
                  <select class="custom-select custom-select-sm w-100 quantite mb-1" id="quantite${index}">
                  ${quantite}
                  </select>
                  <select class="custom-select custom-select-sm w-100 heure" id="heure${index}">
                  ${heure}
                  </select>
                  </div>
                  <div class="col-sm-12 col-12 mt-2 ml-2">
                  <button  class="btn btn-sm btn-danger btn-supp-element-in-list" >Supprimer</button>
                  </div>
              </div>
          </div>
        </div>`;
            $.ajax({
                url: urlEquip,
                dataType: "JSON",
                method: "POST",
                data: { id_equip: id, card: "card", SELECT_EQUIP: "SELECT_EQUIP" },
                success: function (response) {
                    let select = "";
                    response.forEach((element) => {
                        select += `<option value='${element.puissance_equip}' data-cat = "${element.image_cat}" data-name = "${element.libelle_equip} ${element.puissance_equip} W" data-courant="${element.courant_demarrage}" data-image="${element.image_equip}" data-libelle="${element.libelle_equip}">${element.libelle_equip} ${element.puissance_equip} W</option>`;
                    });
                    console.log("passer");
                    $("#content-list-dimenssionnement").prepend(cardBase);
                    $("#libelle_equip" + index).html(select);
                    console.log("#libelle_equip" + index + " option[data-name='" + libelle + "']");
                    $("#libelle_equip" + index + " option[data-name='" + libelle + "']").attr("selected", "selected");
                    $("#quantite" + index).val(quantite_get)
                    $("#heure" + index).val(heure_get)
                    calculeConsommation(puissance_max)

                },
            });
        }

        calculeConsommation(puissance_max)
    })

    //remove equipement added
    $(document).on("click", ".btn-supp-element-in-list", function () {

        // let idPuiss = $('.btn-supp-element-in-list').data("puiss")
        // let idQuant = $('.btn-supp-element-in-list').data("quant")
        // let idHeure = $('.btn-supp-element-in-list').data("heure")
        // let valPuiss = $("#" + idPuiss + "").val()
        // let valQuant = $("#" + idQuant + "").val()
        // let valHeur = $("#" + idHeure + "").val()
        // let substr = valPuiss * valQuant * valHeur
        // console.log("substr : ", substr);
        // console.log("idPuiss : ", idPuiss);
        // console.log("valPuiss : ", valPuiss);
        // console.log("valQuant : ", valQuant);
        // console.log("valHeur : ", valHeur);
        // consommation -= substr
        // console.log("consommation: ", consommation);
        $(this).parent().parent().parent().parent().remove();
        calculeConsommation(puissance_max)
    });
    //Change kit 
    $(document).on("change", "#puissance_kit", function () {
        let libelle_kit = $("#puissance_kit option:selected").val()
        updateProgressProduice(puissance_max)

        fillCarousselKit(libelle_kit)
    });
    $(document).on("change keyup", ".libelle_equip", function () {
        let image_equip = $(this).parent().parent().find(".libelle_equip :selected").data("image")
        let image_cat = $(this).parent().parent().find(".libelle_equip :selected").data("cat")
        if (image_equip) {
            $(this).parent().parent().find(".image_dynamic_equip").attr('src', './admin/upload/equipement/' + image_equip + '')
        } else {
            $(this).parent().parent().find(".image_dynamic_equip").attr('src', './admin/upload/' + image_cat + '')
        }
        calculeConsommation(puissance_max)
        if (consommation_total > production_max) {
            getPannDataBase(puissance_crete)
        } else if (consommation_total < (production_min * 50) / 100) {
            puissance_crete = (consommation_total + ((consommation_total * 1) / 100)) / (irradiation_min)
            getPannDataBase(puissance_crete)
        }
        // if (consommation_total < ((production_min * 50) / 100)) {
        //     console.log("sur consommation");
        //     console.log("consommation_total", consommation_total);
        //     console.log("production_min", (production_min * 50) / 100);
        //     alert("Consommation basse")
        //     getPannDataBase(puissance_crete, 1)
        //     consommation_total = 0
        // } else {
        //     console.log("consommation normale");
        //     console.log("consommation_total", consommation_total);
        //     console.log("production_min", (production_min * 50) / 100);
        //     consommation_total = 0
        //     alert("Consommation normal")
        // }

    });
    $(document).on("change", ".quantite", function () {
        calculeConsommation(puissance_max)
        if (consommation_total > production_max) {
            getPannDataBase(puissance_crete)
        } else if (consommation_total < (production_min * 50) / 100) {
            puissance_crete = (consommation_total + ((consommation_total * 1) / 100)) / (irradiation_min)
            getPannDataBase(puissance_crete)
        }
        // if (consommation_total < ((production_min * 50) / 100)) {
        //     console.log("sur consommation");
        //     console.log("consommation_total", consommation_total);
        //     console.log("production_min", (production_min * 50) / 100);
        //     getPannDataBase(puissance_pann_valide, 1)
        //     updateProgressProduice(puissance_max)
        //     console.log("Consommation basse");
        //     console.log(puissance_pann_valide);
        //     consommation_total = 0
        // } else {
        //     console.log("consommation normale");
        //     console.log("consommation_total", consommation_total);
        //     console.log("production_min", (production_min * 50) / 100);
        //     consommation_total = 0
        //     console.log("Consommation normal")
        //     console.log(puissance_pann_valide);
        // }
    });
    $(document).on("change", ".heure", function () {
        calculeConsommation(puissance_max)
        if (consommation_total > production_max) {
            getPannDataBase(puissance_crete)
        } else if (consommation_total < (production_min * 50) / 100) {
            puissance_crete = (consommation_total + ((consommation_total * 1) / 100)) / (irradiation_min)
            getPannDataBase(puissance_crete)
        }
        // if (consommation_total < ((production_min * 50) / 100)) {
        //     console.log("sur consommation");
        //     console.log("consommation_total", consommation_total);
        //     console.log("production_min", (production_min * 50) / 100);
        //     getPannDataBase(puissance_crete, 2)
        //     console.log("puissance_pann_valide", puissance_pann_valide);
        //     alert("Consommation basse")
        //     consommation_total = 0
        // } else {
        //     console.log("consommation normale");
        //     console.log("consommation_total", consommation_total);
        //     console.log("production_min", (production_min * 50) / 100);
        //     consommation_total = 0
        //     console.log("Consommation normal")
        //     calculeConsommation(puissance_max)

        // }
    });
    $(document).on("change", "#localisation", function () {
        calculeConsommation(puissance_max)
        if (consommation_total > production_max) {
            getPannDataBase(puissance_crete)
        } else if (consommation_total < (production_min * 50) / 100) {
            console.log("Inférieur à 50% puissance min");
            puissance_crete = (consommation_total + ((consommation_total * 1) / 100)) / (irradiation_min)
            getPannDataBase(puissance_crete)
        }
        // if (consommation_total < ((production_min * 50) / 100)) {
        //     console.log("sur consommation");
        //     console.log("consommation_total", consommation_total);
        //     console.log("production_min", (production_min * 50) / 100);
        //     getPannDataBase(puissance_pann_valide)
        //     alert("Consommation basse")
        //     consommation_total = 0
        // } else {
        //     console.log("consommation normale");
        //     console.log("consommation_total", consommation_total);
        //     console.log("production_min", (production_min * 50) / 100);
        //     getPannDataBase(puissance_pann_valide)
        //     consommation_total = 0
        //     alert("Consommation normal")
        // }
    });

    $(document).on("click", ".close", function () {
        updateMessageDynamic()
    });
    $(document).on("click", ".mada_ouest", function () {
        irradiation_min = 5.36
        irradiation_max = 7.41
        showSuccedWal("Partie Ouest sélectionnée")
        $(".puissance_kit").prop("disabled", false)
        $("#view_localisation").val("Madagascar Ouest");
        if (depart != 0) {
            console.log("irradiation_max : ", irradiation_max);
            console.log("irradiation_min : ", irradiation_min);
            console.log("puissance_pann_valide", puissance_pann_valide);
            updateProgressProduice(puissance_pann_valide, puissance_max)
            calculeConsommation(puissance_max)

        }

    });
    $(document).on("click", ".mada_est", function () {
        irradiation_min = 3.25
        irradiation_max = 5.64
        showSuccedWal("Partie Est sélectionnée")
        $("#view_localisation").val("Madagascar Est");
        if (depart != 0) {
            console.log("irradiation_max : ", irradiation_max);
            console.log("irradiation_min : ", irradiation_min);
            console.log("puissance_pann_valide", puissance_pann_valide);
            updateProgressProduice(puissance_pann_valide, puissance_max)
            calculeConsommation(puissance_max)

        }

    });


})