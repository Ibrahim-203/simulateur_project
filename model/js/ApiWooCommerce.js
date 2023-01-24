import { loadKit } from "../../utils/function.js";
//Organise the descrition of the kit to work with this last one
const repairDescription = (_description) => {
  _description = $(_description).text()
  _description = _description.replace(/\n/g, ' ');
  _description = _description.replace("Informations techniques", '')
  _description = _description.trim()
  return _description
}
//get value before specific word in string
const getValueContentKitInString = (_name, _text, _valueAfter) => {
  let i = 0
  while (i < _text.indexOf(_valueAfter)) {
    _name += _text[i]
    i++
  }
  i = 0
  return _name
}
const GetValueAfterTwoPoint = (_string) => {
  let arrayStorage = _string.split(':')
  let value = arrayStorage[1]
  return value = value.trim()
}
//get all information of the solar panel
const getInfoOfSolarPanel = (_equipement) => {
  let value = GetValueAfterTwoPoint(_equipement)
  let puissance_panneau = ""
  let nombre = ""
  puissance_panneau = getValueContentKitInString(puissance_panneau, value, "Wc").trim()
  value = value.replace(`${puissance_panneau} Wc`, '')
  nombre = getValueContentKitInString(nombre, value, "u")
  nombre = parseInt(nombre)
  console.log("nombre panneau: ", nombre, "Puissance panneau: ", puissance_panneau);
  return [puissance_panneau, nombre]
}

//Get equipement that have a name before their content (ex : solar panel 100 Wc)
const getInfoOfEquipementWithName = (_equipement, _unit = "") => {
  let puissance = ""
  let value = GetValueAfterTwoPoint(_equipement)
  let libelle = ""
  console.log(value);
  for (let i = 0; i < value.length; i++) {
    if (!parseInt(value[i])) {
      libelle += value[i];
    } else {
      break
    }
  }
  libelle = libelle.trim()
  console.log("libelle ", libelle);
  value = value.replace(libelle, '')
  const [tension, puissanceString] = value.split('/')
  console.log("tension", tension);
  console.log("puissance", puissanceString);
  if (_unit == "kVA") {
    puissance = getValueContentKitInString(puissance, puissanceString, _unit)
  } else {
    puissance = puissanceString
  }
  console.log("puissance", puissance);
  return [libelle, tension, puissance]
}
const getInfoOfBattery = (_equipement) => {
  let value = GetValueAfterTwoPoint(_equipement)
  let [capacite, tension, quantite] = value.split('/')
  console.log(tension);
  capacite = capacite.trim()
  capacite = capacite.split(' ')[0]
  tension = tension.trim()
  tension = tension.split(' ')[0]
  quantite = quantite.trim()
  quantite = quantite.split(' ')[0]
  console.log("capacite ", capacite, "tension ", tension, "quantite ", quantite);
  return [capacite, tension, quantite]
}
$(function () {
  loadKit()
  $(document).on("click", ".refresh_kit", () => {

    let spin = `<div class="row d-flex justify-content-center align-items-center">
              <div class="cp-spinner cp-skeleton"></div>
            </div>
            <div class="row d-flex justify-content-center align-items-center mb-3">
              <div>Ceci peut prendre quelque seconde</div>
            </div>`;

    console.log(spin);
    $(".MySpinner").show()
    $(".MySpinner").html(spin)
    $.ajax({
      url: "./model/php/API.php",
      dataType: "JSON",
      method: "POST",
      data: { JSON: "JSON", },
      success: function (response) {
        let information_kit = []
        response.forEach((element, index) => {
          console.log();
          if (element.categories[0]["name"] == "Anti-délestage") {
            console.log("Anti-délestage");
          } else {
            console.log("Solaire photovoltaïque");
            const lien = element.permalink
            let description = element.description;
            let libelle_kits = element.name
            let link = element.permalink
            let image_link = element.images[0].src
            console.log(image_link);
            description = repairDescription(description)
            console.log(description);
            let pv = ""
            let regulateur = ""
            let onduleur = ""
            let batterie = ""
            pv = getValueContentKitInString(pv, description, "RÉGULATEUR")
            description = description.replace(pv, '')
            regulateur = getValueContentKitInString(regulateur, description, "ONDULEUR")
            description = description.replace(regulateur, '')
            onduleur = getValueContentKitInString(onduleur, description, "BATTERIE")
            description = description.replace(onduleur, '')
            batterie = getValueContentKitInString(batterie, description, "PUISSANCE CONSO")
            console.log("pv: ", pv);
            console.log("regulateur: ", regulateur);
            console.log("onduleur: ", onduleur);
            console.log("batterie: ", batterie);
            console.log("___________________________After All Extract______________________________");
            let [puissancePv, nombrePv] = getInfoOfSolarPanel(pv)
            console.log("puissancePv", puissancePv, "nombrePv", nombrePv);
            let [libelleOnd, tensionOnd, puissanceOnd] = getInfoOfEquipementWithName(onduleur, "kVA")
            console.log("libelleOnd", libelleOnd, "tensionOnd", tensionOnd, "puissanceOnd", puissanceOnd);
            let [libelleReg, tensionReg, intensiteReg] = getInfoOfEquipementWithName(regulateur)
            console.log("libelleReg", libelleReg, "tensionReg", tensionReg, "intensiteReg", intensiteReg);
            let [capacite, tension, quantite] = getInfoOfBattery(batterie)
            console.log("capacite", capacite, "tension", tension, "quantite", quantite);
            information_kit.push({ libelle_kits: libelle_kits, link: link, image_link, puissancePv, nombrePv, libelleReg, tensionReg, intensiteReg, libelleOnd, tensionOnd, puissanceOnd, capacite, tension, quantite })

          }
        });
        console.log(information_kit);
        let stringData = JSON.stringify(information_kit)
        $.ajax({
          url: "./model/php/API.php",
          method: "POST",
          data: { stringData: stringData, INSERT_KIT: 'INSERT_KIT' },
          success: (response) => {
            $(".MySpinner").hide()
            if (response.indexOf("existe") > -1) {
              showWarningWal("Les kits sont tous déjà present")
            } else {
              showSuccedWal(response)
              loadKit()
            }
          },
        })

      },
    });
  })

})
