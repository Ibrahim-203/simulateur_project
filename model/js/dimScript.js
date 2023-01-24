
import { numberDayInMonth, chartJS, loadKitAdapte } from "../../utils/function.js";
import {
  energieAProduire,
  choixPanneau,
  capaciteBatterie,
  intensiteRegulateur,
  puissanceOnduleur,
  chooseBatterie
} from "./calcul.js";

const urlEquip = "./admin/model/php/DAOEquip.php";
const urlCat = "./admin/model/php/DAOCat.php";

//Liste of variable
//array which one we store the information of equipements
let InfoAllEquipement = [];

let capacite_batterie = 0.0;
let intensite_regulateur = 0.0;
let puissance_onduleur = 0.0;
let energie_used = 0;
let irradiation = 0.0;
let puissance_crete = 0.0;
let partie_localisation = '';
let demarrage = 0;
let energie_a_produire = ''
let sectionPanReg = ''
let sectionRegBatt = ''
let sectionBattOnd = ''
let voltage_systeme = 0
//End liste  of variable
const message_dynamique = (_enTete, _message) => {
  $(".head-description").html(_enTete)
  $("#dynamique_mssg").html(_message)
}
// function to show the list of equipement on open
let fillCardCat = () => {
  $.confirm({
    content: function () {
      var self = this;
      return $.ajax({
        url: urlCat,
        dataType: "json",
        method: "post",
        data: { SELECT_CAT: "SELECT_CAT" },
      })
        .done(function (response) {
          self.close();
          let value = response;
          let card = "";
          value.forEach((val) => {
            card += `<div class="card equipement col-xl-2 w-xl-3 col-md-3 col-5 p-1 m-1" data-libelle ="${val.libelle_cat}" data-image='${val.image_cat}' data-id="${val.id}" style="width: 10rem; cursor:pointer">
            <img class="card-img-top img-thumbnail  m-1 w-4"  src="./admin/upload/${val.image_cat}" alt="Card image cap">
            <div class="card-body p-0 align-center">
                <p class="card-text" style="font-size: 50%;">${val.libelle_cat}</p>
            </div>
        </div>`;
          });
          card += `<div class="card equipement col-xl-2 col-md-2 col-5 p-1 m-1" data-id="perso" data-image="point_interrogation.png" style="width: 10rem;cursor:pointer">
          <img class="card-img-top img-thumbnail  m-1 w-4" src="./admin/upload/point_interrogation.png" alt="Card image cap">
          <div class="card-body p-0 align-center">
              <p class="card-text" style="font-size: 50%;">Personnalisée</p>
          </div>
      </div>`;
          $("#list_categorie").html(card);
        })
        .fail(function () {
          self.close();
        });
    },
  });
};

const ToNextStep = () => {
  $(".item-card").each(function (i) {
    console.log($(".libelle_equip").val());
    let val_libelle = "";
    let coeff_demarrage = 1;
    //Test if the value of libelle is from input or select
    if (!$(this).find(".libelle_equip :selected").data("libelle")) {
      //
      val_libelle = $(this).find(".libelle_equip").data("libelle");
      //console.log(val_libelle);
    } else {
      // data from database
      val_libelle = $(this).find(".libelle_equip :selected").data("libelle");
      coeff_demarrage = $(this).find(".libelle_equip :selected").data("courant")
      // console.log("select");
      // console.log(val_libelle);
    }
    //End Test if the value of libelle is from input or select
    let quantite = $(this).find(".quantite").val();
    let heure_utilisation = $(this).find(".heure").val();
    let texte_heure_utilisation = $(this).find(".heure :selected").text();
    let puissance_equip = $(this).find(".libelle_equip").val();
    //Insert all info inside InfoAllEquipement
    InfoAllEquipement.push({
      libelle_equip: val_libelle,
      puissance_equip: puissance_equip,
      quantite: quantite,
      heure_utilisation: heure_utilisation,
      texte_heure_utilisation: texte_heure_utilisation,
      energie_consommée: quantite * heure_utilisation * puissance_equip,
      courant_demarrage: quantite * puissance_equip * coeff_demarrage
    });
  });
  console.log(InfoAllEquipement);
  //check if InfoAllEquipement is empty
  if (InfoAllEquipement.length == 0) {
    showErrorWal('Veillez choisir au moin une équipement')
  }
  //check if inside info have empty value
  InfoAllEquipement.forEach((element, index) => {
    if (element.puissance_equip && element.quantite && element.heure_utilisation) {
      //get value of energie used by user
      energie_used = energie_used + InfoAllEquipement[index].energie_consommée;
      demarrage = demarrage + InfoAllEquipement[index].courant_demarrage;

      $(".step_2").addClass("disabled")
      $(".step_3").removeClass("disabled")
      message_dynamique("Autonomie", `Veuillez entrer le jour d'autonomie que vous souhaiter tenir sans éléctricité <b>comprise entre l'intervalle ]0,2]</b>`)
      next();

    } else {
      console.log('Valeurs vide dans la liste' + index);
      InfoAllEquipement = []
      showWarningWal('Veillez bien remplir les équipements')
    }
  });
  //Calculate energie to produce
  energie_a_produire = energieAProduire(energie_used);
  console.log("utiliser : ", energie_used, "produire : ", energie_a_produire);
  //choose voltage systeme
  voltage_systeme = chooseBatterie(energie_a_produire)
  //calculate power peak solar panel
  puissance_crete = Math.ceil(choixPanneau(energie_a_produire, irradiation));
  console.log("puissance_crete :", puissance_crete);
  //Calculate intensity
  intensite_regulateur = Math.ceil(intensiteRegulateur(puissance_crete, voltage_systeme));
  console.log("intensite_regulateur :", intensite_regulateur);
  //Calculate inverter power
  console.log("demarrage", demarrage);
  puissance_onduleur = Math.ceil(puissanceOnduleur(demarrage));
  console.log("puissance_onduleur", puissance_onduleur);
};
const next = () => {
  $(".next").click()
}

const fillQuantite = () => {
  let quantite =
    "<option value='' disabled selected>Choisir la quantite</option>";
  for (let i = 1; i <= 30; i++) {
    quantite += "<option value=" + i + ">" + i + "</option>";
  }
  return quantite;
};

const fillHeure = () => {
  let heure = `<option disabled selected>Heure d'utilisations</option>
                <option value="0.08">5 minutes</option>
                <option value="0.1">10 minutes</option>
                <option value="0.25">15 minutes</option>
                <option value="0.50">30 minutes</option>
                <option value="1">1 heure</option>`;
  for (let i = 2; i < 25; i++) {
    heure += `<option value="${i}">${i} heures</option>`;
  }
  return heure;
};

$(function () {
  message_dynamique("Localisation", "Sur cette étapes veillez choisir votre emplacement géographique")
  console.clear()
  fillCardCat();



  //Desable btn to valide the first stape
  //$("#valide_equip").attr("disabled", "disabled");
  //Disable top link
  $(".step_2").addClass("disabled")
  $(".step_3").addClass("disabled")
  $(".step_4").addClass("disabled")
  $(".step_5").addClass("disabled")

  //Variable to identifie different field inside card
  let index = 0;
  let id_for_perso = 0;

  let heure = fillHeure();
  let quantite = fillQuantite();

  //Add an equipement
  $(document).on("click", ".equipement", function () {
    console.clear();
    index++;
    console.log(index);
    let id = $(this).data("id");
    let image_cat = $(this).data("image");
    let libelle_cat = $(this).data("libelle");
    let cardPerso = "";
    if (id == "perso") {
      id_for_perso++;
      cardPerso = `<div class="item-card col-xl-3 col-lg-5 col-md-4 col-sm-6  mb-xl-0 mb-2 m-2">
      <div class="widget-content-area total-coins br-4">
          <div class="row">
              <div class="col-sm-12 col-12">
                  <p class="widget-icon">
                      <img alt="image-widget" src="./admin/upload/${image_cat}" class="img-fluid">
                  </p>
              </div>
              <div class="col-sm-12 col-12 mt-5">
              <p class="widget-title text-info">Perso${id_for_perso}</p>
                  <input type="number" data-libelle="perso ${id_for_perso}" class="form-control form-control-sm libelle_equip w-100 mb-1 " placeholder="puissance">
              <select class="custom-select custom-select-sm w-100 quantite mb-1" id="quantite${index}">
              ${quantite}
              </select>
              <select class="custom-select custom-select-sm w-100 heure" id="heure${index}">
              ${heure}
              </select>
              </div>
              <div class="col-sm-12 col-12 mt-2 ml-2">
              <button  data-id_equipement="" data-id_categorie="" class="btn btn-sm btn-danger btn-supp-element-in-list" "   >Supprimer</button>
              </div>
              
          </div>
      </div>
  </div>`;
      $("#content-list-dimenssionnement").prepend(cardPerso);
    } else {
      let cardBase = `<div class="item-card col-xl-3 col-lg-5 col-md-4 col-sm-6  mb-xl-0 mb-2 m-2">
      <div class="widget-content-area total-coins br-4">
          <div class="row">
              <div class="col-sm-12 col-12">
                  <p class="widget-icon">
                      <img alt="image-widget" src="./admin/upload/${image_cat}" class="img-fluid">
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
              <button  data-id_equipement="" data-id_categorie="" class="btn btn-sm btn-danger btn-supp-element-in-list" " >Supprimer</button>
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
          let select =
            "<option selected disabled>Selectionner une équipement</option>";
          response.forEach((element) => {
            select += `<option value='${element.puissance_equip}' data-courant="${element.courant_demarrage}" data-libelle="${element.libelle_equip}">${element.libelle_equip} ${element.puissance_equip} W</option>`;
          });
          console.log("passer");
          $("#content-list-dimenssionnement").prepend(cardBase);
          $("#libelle_equip" + index).html(select);
        },
      });
    }
  });

  //remove equipement added
  $(document).on("click", ".btn-supp-element-in-list", function () {
    $(this).parent().parent().parent().parent().remove();
  });

  // Wizard manipulation
  //check if step 1 is clicked
  $(document).on("click", ".step_1", () => {
    console.log("Step 1 clicked");
  });

  //Valide the first stape "Localisation"
  $(document).on("click", "#valide_localisation", () => {

    if (!$("#localisation").val()) {
      showWarningWal("Ce champ est obligatoire")
    } else {
      irradiation = $("#localisation").val();
      partie_localisation = $("#localisation :selected").text()
      console.log('irradiation :', irradiation, 'partie_localisation :', partie_localisation);
      $(".step_1").addClass("disabled")
      $(".step_2").removeClass("disabled")
      next();
      message_dynamique("Choix equipement", "Sur cette étape veuillez choisir votre équipement afin de calculer votre consommation")
    }
  });
  //Valide the second stape "Equipement"
  $(document).on("click", "#valide_equipement", function (e) {
    ToNextStep();

    console.log(InfoAllEquipement.length);
  });
  $(document).on("click", "#valider_autonomie", function (e) {
    let jour_autonomie = $("#nbr_jour").val()
    if (!jour_autonomie) {
      showWarningWal("Champ obligatoire")
    } else if (jour_autonomie <= 0 || jour_autonomie > 2) {
      showWarningWal("Choisissez une valeur dans cette intervalle ]0,2]")
    } else {
      $(".step_4").removeClass("disabled")
      $(".step_3").addClass("disabled")
      next()
      message_dynamique("Section du cables", "Veuillez definir la distance entre les differentes équipement")
      //Calcule capacite_batterie 
      capacite_batterie = Math.ceil(capaciteBatterie(energie_a_produire, jour_autonomie, voltage_systeme));
      console.log("capacite_batterie :", capacite_batterie);

    }
  });
  $(document).on("click", "#valider_section", function () {
    let conso_user = []
    const section1 = $("#pannReg").val()
    const section2 = $("#regBatt").val()
    const section3 = $("#battOnd").val()
    if (!section1 || !section2 || !section3) {
      console.log(section1);
      console.log(section2);
      console.log(section3);
      showWarningWal("Tout les champs sont obligatoire")
    } else {

      $(".step_4").addClass("disabled")
      $(".step_5").removeClass("disabled")
      message_dynamique("Resultat", "Félicitation vous pouvez maintenant consulter le résultat de votre dimensionnement")
      next()
      for (let i = 0; i < 12; i++) {
        conso_user.push((energie_a_produire * numberDayInMonth[i].day) / 1000)
      }

      let resultat_pann = ""
      let unite_pann = ""
      if (puissance_crete < 1000) {
        resultat_pann = puissance_crete
        unite_pann = "Wc"
      } else {
        resultat_pann = puissance_crete / 1000
        unite_pann = "KWc"
      }
      let puissance_pann_get
      loadKitAdapte(puissance_crete, intensite_regulateur, puissance_onduleur / 1000, capacite_batterie, voltage_systeme, puissance_pann_get)
      console.log("_puissance_pann_get dans dim: ", puissance_pann_get);
      chartJS(puissance_crete, conso_user, partie_localisation);
      let resultat = ""
      for (let i = 0; i < InfoAllEquipement.length; i++) {
        resultat += `<tr class="">
        <td scope="row">${i + 1}</td>
        <td>${InfoAllEquipement[i].libelle_equip}</td>
        <td>${InfoAllEquipement[i].puissance_equip} W</td>
        <td>${InfoAllEquipement[i].quantite}</td>
        <td>${InfoAllEquipement[i].texte_heure_utilisation}</td>
        <td>${InfoAllEquipement[i].energie_consommée} W</td>
    </tr>`
      }
      let config_kit = `
      <tr class="">
        <td>${resultat_pann} ${unite_pann}</td>
        <td>${intensite_regulateur} A</td>
        <td>${capacite_batterie} Ah</td>
        <td>${puissance_onduleur} W</td>
    </tr>
      `
      $("#resultat_dimmensionnement").html(resultat)
      $("#config_kit").html(config_kit)
    }
  });




  $(document).on("click", ".previous", () => {
    console.log("prev clicked");
  })
  $(document).on("click", ".print", () => {
    $("#to_print").printThis()
  })
  $(document).on("click", "#return_step_1", () => {
    $(".step_2").addClass("disabled")
    $(".step_1").removeClass("disabled")
    message_dynamique("Localisation", "Sur cette étapes veillez choisir votre emplacement géographique")

    $(".previous").click()
  });
  $(document).on("click", "#return_step_2", () => {
    InfoAllEquipement = []
    console.log(InfoAllEquipement);
    energie_used = 0
    demarrage = 0
    puissance_onduleur = 0.0
    console.log("puissance_onduleur", puissance_onduleur);
    console.log("energie_used", energie_used);
    $(".step_2").removeClass("disabled")
    $(".previous").click()
  });
  $(document).on("click", "#return_step_3", () => {
    $(".step_3").removeClass("disabled")
    $(".previous").click()
  });



});
