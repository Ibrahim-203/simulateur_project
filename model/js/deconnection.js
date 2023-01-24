$(function () {
    console.log("deconnection");
    $(document).on("click", ".deconnecter", () => {
        $.ajax({
            url: "./model/php/deconnection.php",
            method: "POST",
            data: { DECONNECTION: "DECONNECTION" },
            success: function (response) {
                window.location = "./login.php";
            },
        })
    })
    $(document).on("click", ".session", () => {
        $.ajax({
            url: "./model/php/deconnection.php",
            method: "POST",
            data: { SESSION: "SESSION" },
            success: function (response) {
                window.location = "./session.php";
            },
        })
    })
})