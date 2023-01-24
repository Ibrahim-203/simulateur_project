
const updateCounter = () => {
    $.ajax({
        url: "./model/php/DAOIndex.php",
        dataType: "JSON",
        method: "POST",
        data: { COUNT_DATA: "COUNT_DATA" },
        success: function (response) {

            $(".nombre_cat").text(response[0].nbr_cat)
            $(".nombre_equip").text(response[0].nbr_equip)
            $(".nombre_kit").text(response[0].nbr_kit)
            console.log(response[0].nbr_cat);
        },

    });
}
$(function () {
    updateCounter()
})