import { verifObligatory, loadEquip } from "../../utils/function.js";

const urlEquip = "./model/php/DAOEquip.php";
const urlCat = "./model/php/DAOCat.php";
let fillSelectCat = () => {
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
          let option = `<option selected disabled>Selectionner une catégorie</option>`;
          value.forEach((val) => {
            option += `<option value="${val.id}">${val.libelle_cat}</option>`;
          });
          $("#list_cat").html(option);
        })
        .fail(function () {
          self.close();
        });
    },
  });
};
let fillCardCat = () => {
  $.confirm({
    content: function () {
      var self = this;
      return $.ajax({
        url: urlEquip,
        dataType: "json",
        method: "post",
        data: { SELECT_EQUIP: "SELECT_EQUIP" },
      })
        .done(function (response) {
          self.close();
          let value = response;
          let card = "";
          value.forEach((val) => {
            card += `<div class="card col-md-2 col-5 p-1 m-1" style="width: 10rem;">
            <img class="card-img-top  m-1" src="./upload/${value.image_cat}" alt="Card image cap">
            <div class="card-body p-0 align-center">
                <p class="card-text" style="font-size: 75%;">${value.libelle_cat}</p>
            </div>
        </div>`;
          });
          $("#list_categorie").html(card);
        })
        .fail(function () {
          self.close();
        });
    },
  });
};

$(function () {
  loadEquip();
  $(document).on("click", "#add_equip_from_equip", function () {
    $.confirm({
      columnClass: "large",
      title: "Ajouter une équipement",
      content:
        "" +
        `<div class="widget-content widget-content-area">
        <form class="formEquip" enctype="multipart/form-data" novalidate>
        <!-- columns -->
        <div class="form-group">
        <div class="form-row align-items-center">
            <div class="col-md-6 mb-3">
         <!-- select -->
            <label for="id_cat">Catégorie</label>
            <select class="custom-select obligatoire" name="list_cat" id="list_cat">
            </select>
            </div>
        
            <div class="col-md-6 mb-3">
         <!-- Input type text -->
            <label for="libelle_equip">Libelle équipement</label>
            <input type="text" class="form-control obligatoire" name="libelle_equip" id="libelle_equip">
            </div>
        </div>   
        </div>
        <!-- Input type text -->
        <div class="form-group">
        <div class="form-row align-items-center">
        <div class="col-md-6 mb-3">
            <label for="puissance-equip">Puissance équipement</label>
            <input type="number" class="form-control integer obligatoire" name="puissance_equip" id="puissance_equip">
        </div>
        <div class="col-md-6 mb-3">
            <label for="courant_demarrage">Courant de demarrage</label>
            <select class="custom-select obligatoire" name="courant_demarrage" id="courant_demarrage">
              <option value="1"> 1 </option>
              <option value="2"> 2 </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="5"> 5 </option>
            </select>
        </div>
        </div>
        </div>
        <div class="form-group">
        <div class="form-row align-items-center">
        <div class="custom-file-container" data-upload-id="myFirstImage">
      <label>Upload (Single File) <a href="javascript:void(0)" class="custom-file-container__image-clear clear" title="Clear Image">x</a></label>
      <label class="custom-file-container__custom-file" >
    <input type="file" class="custom-file-container__custom-file__custom-file-input obligatoire" name="image_equip" accept="image/png, image/jpg, image/jpeg">
      <span class="custom-file-container__custom-file__custom-file-control"></span>
      </label>
      <div class="custom-file-container__image-preview"></div>
      </div>


        </div>
        </div>
               
      </form>
      </div>`,
      buttons: {
        valider: {
          text: "Ajouter",
          btnClass: "btn-blue",
          action: function () {
            var formulaire = $(".formEquip")[0];
            var formData = new FormData(formulaire);
            formData.append("ADD_EQUIP", "ADD_EQUIP");

            $.confirm({
              content: function () {
                var self = this;
                return $.ajax({
                  url: urlEquip,
                  method: "POST",
                  data: formData,
                  cache: false,
                  processData: false,
                  contentType: false,
                })
                  .done(function (response) {
                    if (response.indexOf("success") > -1) {
                      self.close();
                      showSuccedWal("Information enregistrée");
                      loadEquip();
                    } else {
                      self.close();
                      showErrorWal(response);
                      loadEquip();
                    }
                  })
                  .fail(function () {
                    self.setContent("Something went wrong.");
                  });
              },
            });
          },
        },
        cancel: function () {
          //close
        },
      },
      onContentReady: function () {
        var firstUpload = new FileUploadWithPreview("myFirstImage");
        fillSelectCat();
        var jc = this;
        console.clear();
        jc.buttons.valider.disable();
        verifObligatory(jc, "keyup change");
        // verifObligatory(jc);

        // bind to events
        this.$content.find("form").on("submit", function (e) {
          // if the user submits the form by pressing enter in the field.
          e.preventDefault();
          jc.$$formSubmit.trigger("click"); // reference the button and click it
        });

        //Déclancheur
        jc.$content.find("form input").on("keyup keydown", (e) => {
          jc.$content.find(".integer").each((key, value) => {
            if (
              !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
                e.key
              )
            ) {
              var valArr = $(value).val();
              $(value).val(valArr.replaceAll(e.key, ""));
            }
          });
        });
      },
    });
  });
  $(document).on("click", "#edit_equip", function () {
    let id = $(this).data("id");
    let libelle = $(this).data("libelle");
    console.clear();
    $.confirm({
      columnClass: "large",
      title: "Modifier l'équipement " + libelle,
      content:
        "" +
        `<div class="widget-content widget-content-area">
        <form class="simple-example" enctype="multipart/form-data" novalidate>
        <!-- Input type text -->
        <div class="form-group">
          <label for="libelle_equip">Libelle équipement</label>
          <input type="text" class="form-control obligatoire" name="libelle_equip" id="libelle_equip">
        </div>
        <!-- Input type text -->
        <div class="form-group">
        <div class="form-row align-items-center">
        <div class="col-md-6 mb-3">
            <label for="puissance-equip">Puissance équipement</label>
            <input type="number" class="form-control integer obligatoire" name="puissance_equip" id="puissance_equip">
        </div>
        <div class="col-md-6 mb-3">
            <label for="courant_demarrage">Courant de demarrage</label>
            <select class="custom-select obligatoire" name="courant_demarrage" id="courant_demarrage">
              <option value="1"> 1 </option>
              <option value="2"> 2 </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="5"> 5 </option>
            </select>
        </div>
        </div>
        <div class="form-group">
	<label for="input_file">Image equipement</label>
	<input type="file" class="form-control form-control-sm" name="image_equip" id="imgInp" placeholder="file">
  <img id="blah" src="#" alt="Votre image" />
</div>
        </div>       
      </form>
      </div>`,
      buttons: {
        valider: {
          text: "Modifier",
          btnClass: "btn-blue",
          action: function () {
            libelle_equip = $("#libelle_equip").val();
            puissance_equip = $("#puissance_equip").val();
            let courant_demarrage = $("#courant_demarrage").val();
            $.confirm({
              content: function () {
                var self = this;
                var formulaire = $(".simple-example")[0];
                var formData = new FormData(formulaire);

                formData.append("ADD_EQUIP", "ADD_EQUIP");
                formData.append("id_equip", id)
                return $.ajax({
                  url: urlEquip,
                  method: "POST",
                  data: formData,
                  cache: false,
                  processData: false,
                  contentType: false,
                })
                  .done(function (response) {
                    if (response.indexOf("success") > -1) {
                      self.close();
                      showSuccedWal("Information modifiée");
                      loadEquip();
                    } else {
                      self.close();
                      showErrorWal(response);
                      loadEquip();
                    }
                  })
                  .fail(function () {
                    self.setContent("Something went wrong.");
                  });
              },
            });
          },
        },
        annuler: function () {
          //close
        },
      },
      onContentReady: function () {
        imgInp.onchange = evt => {
          const [file] = imgInp.files
          if (file) {
            blah.src = URL.createObjectURL(file)
          }
        }
        var jc = this;
        $(document).on("click", ".clear", function () {
          jc.buttons.valider.disable();
        });
        jc.buttons.valider.disable();
        verifObligatory(jc, "keyup change");
        // verifObligatory(jc);

        // bind to events
        this.$content.find("form").on("submit", function (e) {
          // if the user submits the form by pressing enter in the field.
          e.preventDefault();
          jc.$$formSubmit.trigger("click"); // reference the button and click it
        });

        //Déclancheur
        jc.$content.find("form input").on("keyup keydown", (e) => {
          jc.$content.find(".integer").each((key, value) => {
            if (
              !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
                e.key
              )
            ) {
              var valArr = $(value).val();
              $(value).val(valArr.replaceAll(e.key, ""));
              // console.log(
              //   "$(value).closest()",
              //   $(value).parent().append("<b>Champ numérique<b/>")
              // );
            }
          });
        });
      },
      onOpenBefore: function () {
        $.confirm({
          content: function () {
            var self = this;
            return $.ajax({
              url: urlEquip,
              dataType: "JSON",
              method: "POST",
              data: { SELECT_EQUIP: "SELECT_EQUIP", id_equip: id },
            }).done(function (response) {
              self.close();
              // console.log(response);
              let value = response[0];
              $("#libelle_equip").val(value.libelle_equip);
              $("#puissance_equip").val(value.puissance_equip);
              $("#courant_demarrage option[value='" + value.courant_demarrage + "']").attr("selected", "selected");
              $("#blah").attr('src', './upload/equipement/' + value.image_equip + '')

            });
          },
        });
      },
    });
  });
  $(document).on("click", "#delete_equip", function () {
    let id_equip = $(this).data("id");
    let libelle = $(this).data("libelle");
    let image_equip = $(this).data("image");
    $.confirm({
      columnClass: "large",
      title: "Supprimer catégorie",
      content: `Voulez-vous vraiment supprimer '${libelle}'?`,
      type: "red",
      typeAnimated: true,
      buttons: {
        Supprimer: {
          text: "Supprimer",
          btnClass: "btn-red",
          action: function () {
            $.confirm({
              content: function () {
                var self = this;
                return $.ajax({
                  url: urlEquip,
                  method: "POST",
                  data: {
                    id_equip: id_equip,
                    image_equip: image_equip,
                    DELETE_EQUIP: "DELETE_EQUIP",
                  },
                })
                  .done(function (response) {
                    if (response.indexOf("success") > -1) {
                      self.close();
                      showSuccedWal("Information supprimée");
                      loadEquip();
                    } else {
                      self.close();
                      showErrorWal(response);
                      loadEquip();
                    }
                  })
                  .fail(function () {
                    self.setContent("Something went wrong.");
                  });
              },
            });
          },
        },
        annuler: function () { },
      },
    });
  });
});
