$(document).ready(ready);

function ready(){
    console.log("I'm ready!");
    var id=1;

    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://ourgym.altervista.org/getElencoIstruttori.php", //Relative or absolute path to file.php file
        data: {istr:id},

        success: function(response) {
            console.log(JSON.parse(response));
            var istr=JSON.parse(response);
            var el="";
            for(var i=0;i<istr.length;i++){

                   el+=('<a href="'+istr[i].id+'>"" class="crossfit"><figure class="image-over"><img src="'+istr[i].percorso+'" alt="//"><figcaption><p>'+istr[i].nome+'</p></figcaption></figure></a>');
                  
            }

            $(".grid").html(el);
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });

}
