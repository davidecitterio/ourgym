$(document).ready(ready);

function ready(){
    console.log("I'm ready!");
    var id=1;
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://ourgym.altervista.org/getRaggiungerci.php", //Relative or absolute path to file.php file
        data: {contatti:id},

        success: function(response) {
            var contatti=JSON.parse(response);
            var el="";
            for(var i=0;i<contatti.length;i++){

                el += '<li>'+contatti[i].modo+'</li>';   
                
            }

            $("#raggiungerci").html(el);
           
            
            
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://ourgym.altervista.org/getContattarci.php", //Relative or absolute path to file.php file
        data: {contatti:id},

        success: function(response) {
           
            var contatti=JSON.parse(response);
            var el="";
            for(var i=0;i<contatti.length;i++){

                el += '<p><i class="'+contatti[i].icona+'"></i>   '+contatti[i].modo+'</p>';   
                
            }

            $("#contattarci").html(el);
           
            
            
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
    
    
}