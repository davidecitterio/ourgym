/*Print menu*/

$(document).ready(ready);

function ready(){
    console.log("I'm ready!");
    var id=1;

    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "./php/getMenu.php", //Relative or absolute path to file.php file
        data: {menu:id},

        success: function(response) {
            console.log(JSON.parse(response));
            var menu=JSON.parse(response);
            var el="";
            for(var i=0;i<menu.length;i++){

                    console.log("<li><a href='"+menu[i].link+"'>"+menu[i].name+"</a></li>");
                     el+="<li><a href='"+menu[i].link+"'>"+menu[i].name+"</a></li>";
            }

            $(".collapse navbar-collapse").html(el);
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });

}




