/*Print all courses*/

$(document).ready(ready);

function ready(){
    console.log("I'm ready!");
    var id=1;

    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://ourgym.altervista.org/getElencoCorsi.php", //Relative or absolute path to file.php file
        data: {corso:id},

        success: function(response) {
            console.log(JSON.parse(response));
            var corso=JSON.parse(response);
            var el="";
            for(var i=0;i<corso.length;i++){

                el += '<div class="owl-item"> <figure class="owl-classes-item image-over"><img src="'+corso[i].percorso+'" alt="//"><a href="#"></a><figcaption><p>'+corso[i].titolo+'</p></figcaption></figure></div>';
            }

            $("#owl-classes").html(el);
            $("#owl-classes").css("height","auto");
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });

}