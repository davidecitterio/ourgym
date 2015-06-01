/*Print all courses*/

$(document).ready(ready);

function ready(){
    console.log("I'm ready!");
    var id=1;

    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://ourgym.altervista.org/getElencoCategorie.php", //Relative or absolute path to file.php file
        data: {corso:id},

        success: function(response) {
            console.log(JSON.parse(response));
            var corso=JSON.parse(response);
            var el="";
            for(var i=0;i<corso.length;i++){

              el+='<a href="categoria.html?cat='+corso[i].id+'" class="retro"><figure class="image-over"><img src="'+corso[i].percorso+'" alt="//"><figcaption><p>'+corso[i].nome+'</p></figcaption></figure></a>';
            }

            $(".grid").html(el);
            $(".grid").css("height","auto");
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });

}