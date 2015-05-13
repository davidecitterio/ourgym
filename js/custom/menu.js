/*Print menu*/

$(document).ready(ready);

function ready(){
    console.log("Downloading menu from DB..");
    var id=1;

    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "../php/getMenu.php", //Relative or absolute path to file.php file
        data: {menu:id},

        success: function(response) {
            console.log(JSON.parse(response));

            var courses=JSON.parse(response);
            var el="";

            for(var i=0;i<menu.length;i++){

                el+="<li><a href='"+menu[i].link+"'>"+menu[i].name+"</a></li>";

            }

            $("#menu").html(el);
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });

}
