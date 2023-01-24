import { verifObligatory } from "../../utils/function.js";
$(function () {
    $(document).on("click", ".change_password", () => {
        $.confirm({
            columnClass: "large",
            title: "Changer mon mot de passe",
            content:
                "" +
                `<div class="widget-content widget-content-area">
        <form class="simple-example" enctype="multipart/form-data" novalidate>
        <div class="form-row">
      <div class="col-md-12 mb-4">
      
      <label for="old_pass">Ancien mot de passe</label>
      <input type="text" class="form-control obligatoire" name="old_pass" id="old_pass" >
      </div>
      <div class="col-md-12 mb-4">
      <label for="fullName">Nouveau mot de passe</label>
      <input type="password" class="form-control obligatoire" name="new_pass_1" id="new_pass_1" >
      </div>
      <div class="col-md-12 mb-4">
      <label for="fullName">Nouveau mot de passe</label>
      <input type="password" class="form-control obligatoire" name="new_pass_2" id="new_pass_2" >
      </div>
      </div>
      </form>
      </div>`,
            buttons: {
                valider: {
                    text: "Modifier",
                    btnClass: "btn-blue",
                    action: function () {
                        let old_pass = $("#old_pass").val();
                        let new_pass_1 = $("#new_pass_1").val();
                        let new_pass_2 = $("#new_pass_2").val();
                        $.confirm({
                            content: function () {
                                var self = this;
                                return $.ajax({
                                    url: "./model/php/DAOUser.php",
                                    method: "POST",
                                    data: { old_pass, new_pass_1, new_pass_2, UPDATE_PASS: "UPDATE_PASS" },
                                })
                                    .done(function (response) {
                                        if (response.indexOf("success") > -1) {
                                            self.close();
                                            showSuccedWal(response);
                                            window.location = "./";
                                        } else {
                                            self.close();
                                            showErrorWal(response);
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
                var jc = this;
                jc.buttons.valider.disable();
                verifObligatory(jc, "keyup ");
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
    })
    $(document).on("click", ".change_name", () => {
        $.confirm({
            columnClass: "large",
            title: "Changer mon mot de passe",
            content:
                "" +
                `<div class="widget-content widget-content-area">
        <form class="simple-example" enctype="multipart/form-data" novalidate>
        <div class="form-row">
      <div class="col-md-12 mb-4">
      <label for="identifiant">Identifiant</label>
      <input type="text" class="form-control obligatoire" name="identifiant" id="identifiant" >
      </div>
      <div class="col-md-12 mb-4">
      <label for="pseudo">Pseudo</label>
      <input type="text" class="form-control obligatoire" name="pseudo" id="pseudo" >
      </div>
      </div>
      </form>
      </div>`,
            buttons: {
                valider: {
                    text: "Modifier",
                    btnClass: "btn-blue",
                    action: function () {
                        let identifiant = $("#identifiant").val();
                        let pseudo = $("#pseudo").val();
                        $.confirm({
                            content: function () {
                                var self = this;
                                return $.ajax({
                                    url: "./model/php/DAOUser.php",
                                    method: "POST",
                                    data: { identifiant, pseudo, INFO_USER: "INFO_USER" },
                                })
                                    .done(function (response) {
                                        if (response.indexOf("success") > -1) {
                                            self.close();
                                            showSuccedWal(response);
                                            window.location = "./";
                                        } else {
                                            self.close();
                                            showErrorWal(response);
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
                var jc = this;
                jc.buttons.valider.disable();
                verifObligatory(jc, "keyup ");
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
            onOpenBefore: function () {
                $.confirm({
                    content: function () {
                        var self = this;
                        return $.ajax({
                            url: "./model/php/DAOUser.php",
                            dataType: "JSON",
                            method: "POST",
                            data: { SELECT_INFO_USER: "SELECT_INFO_USER" },
                        }).done(function (response) {
                            self.close();
                            // console.log(response);
                            let value = response[0];
                            $("#identifiant").val(value.nom_utilisateur);
                            $("#pseudo").val(value.pseudo_utilisateur);
                        });
                    },
                });
            },
        });
    })
})