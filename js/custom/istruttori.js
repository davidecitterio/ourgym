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

                el += ('<div class="owl-item" style="width: 320px;"><div class="owl-wrapper-outer"><a href="trainers-single.html"><figure><img src="'+istr[i].percorso+'" alt="//"><figcaption>'+istr[i].nome+'</figcaption></figure></a></div></div>');
                
            }

            $("#owl-trainers").html(el);
           
            
            
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
    
    
}
