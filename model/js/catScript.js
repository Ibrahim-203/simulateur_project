import { verifObligatory, loadCat } from "../../utils/function.js";

const urlCat = "./model/php/DAOCat.php";
const urlEquip = "./model/php/DAOEquip.php";

$(function () {
  loadCat();

  $(document).on("click", "#add_cat", function () {
    $.confirm({
      columnClass: "large",
      title: "Ajouter une catégorie",
      content:
        "" +
        `<div class="widget-content widget-content-area">
        <form class="simple-example" enctype="multipart/form-data" novalidate>
        <div class="form-row">
      <div class="col-md-12 mb-4">
      <label for="fullName">Libelle catégorie</label>
      <input type="text" class="form-control obligatoire" name="libelle_cat" id="fullName" placeholder="" required>
      </div>
      <div class="custom-file-container" data-upload-id="myFirstImage">
      <label>Upload (Single File) <a href="javascript:void(0)" class="custom-file-container__image-clear clear" title="Clear Image">x</a></label>
      <label class="custom-file-container__custom-file" >
    <input type="file" class="custom-file-container__custom-file__custom-file-input obligatoire" name="image_cat" accept="image/png, image/jpg, image/jpeg">
      <span class="custom-file-container__custom-file__custom-file-control"></span>
      </label>
      <div class="custom-file-container__image-preview"></div>
      </div>
      </div>
      </form>
      </div>`,
      buttons: {
        valider: {
          text: "Ajouter",
          btnClass: "btn-blue",
          action: function () {
            $.confirm({
              content: function () {
                var formulaire = $(".simple-example")[0];
                var formData = new FormData(formulaire);

                formData.append("ADD_EDIT", "ADD_EDIT");
                var self = this;
                return $.ajax({
                  url: urlCat,
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
                      loadCat();
                    } else {
                      self.close();
                      showErrorWal(response);
                      loadCat();
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
        //For file upload
        var firstUpload = new FileUploadWithPreview("myFirstImage");
        var jc = this;
        console.clear();
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
    });
  });
  $(document).on("click", "#edit_cat", function () {
    let id = $(this).data("id");
    let libelle = $(this).data("libelle");
    console.clear();
    $.confirm({
      columnClass: "large",
      title: "Modifier la catégorie " + libelle,
      content:
        "" +
        `<div class="widget-content widget-content-area">
        <form class="simple-example" enctype="multipart/form-data" novalidate>
        <div class="form-row">
      <div class="col-md-12 mb-4">
      <label for="fullName">Libelle catégorie</label>
      <input type="text" class="form-control obligatoire" name="libelle_cat" id="fullName" placeholder="" required>
      </div>
      <div class="form-group">
	<label for="input_file">Image categorie</label>
	<input type="file" class="form-control form-control-sm" name="image_cat" id="imgInp" placeholder="file">
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
            $.confirm({
              content: function () {
                var formulaire = $(".simple-example")[0];
                var formData = new FormData(formulaire);

                formData.append("ADD_EDIT", "ADD_EDIT");
                formData.append("id_cat", id);
                var self = this;
                return $.ajax({
                  url: urlCat,
                  method: "POST",
                  data: formData,
                  cache: false,
                  processData: false,
                  contentType: false,
                })
                  .done(function (response) {
                    if (response.indexOf("success") > -1) {
                      self.close();
                      showSuccedWal("Information modifiée avec succès");
                      loadCat();
                    } else {
                      self.close();
                      showErrorWal(response);
                      loadCat();
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
        //For file upload
        var firstUpload = new FileUploadWithPreview("myFirstImage");
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
              url: urlCat,
              dataType: "JSON",
              method: "POST",
              data: { SELECT_CAT: "SELECT_CAT", id_cat: id },
            }).done(function (response) {
              self.close();
              // console.log(response);
              let value = response[0];
              $("#fullName").val(value.libelle_cat);
              let base64 = "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';"
              $("#blah").attr('src', './upload/' + value.image_cat + '')
            });
          },
        });
      },
    });
  });
  $(document).on("click", "#delete_cat", function () {
    let id = $(this).data("id");
    let libelle = $(this).data("libelle");
    let image_cat = $(this).data("image");
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
                  url: urlCat,
                  method: "POST",
                  data: {
                    id: id,
                    image_cat: image_cat,
                    DELETE_CAT: "DELETE_CAT",
                  },
                })
                  .done(function (response) {
                    if (response.indexOf("success") > -1) {
                      self.close();
                      showSuccedWal("Information supprimée");
                      loadCat();
                    } else {
                      self.close();
                      showErrorWal(response);
                      loadCat();
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
  $(document).on("click", "#add_equip", function () {
    let id_cat = $(this).data("id");
    $.confirm({
      columnClass: "large",
      title: "Ajouter une équipement",
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
          <label for="puissance-equip">Puissance équipement</label>
          <input type="number" class="form-control obligatoire" name="puissance_equip" id="puissance_equip">
        </div>
        <div class="form-group">
            <label for="courant_demarrage">Courant de demarrage</label>
            <select class="custom-select obligatoire" name="courant_demarrage" id="courant_demarrage">
              <option value="1"> 1 </option>
              <option value="2"> 2 </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="5"> 5 </option>
            </select>
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

            var formulaire = $(".simple-example")[0];
            var formData = new FormData(formulaire);
            formData.append("ADD_EQUIP", "ADD_EQUIP");
            formData.append("list_cat", id_cat)
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
                      loadCat();
                    } else {
                      self.close();
                      showErrorWal(response);
                      loadCat();
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
});
