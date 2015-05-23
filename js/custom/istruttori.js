


$(document).ready(ready);

function ready(){
    console.log("I'm ready!");
    var id=1;

    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://ourgym.altervista.org/getElencoCategorie.php", //Relative or absolute path to file.php file
        data: {cat:id},

        success: function(response) {
            console.log(JSON.parse(response));
            var cat=JSON.parse(response);
            var el='<a href="#" data-filter="*" class="btn btn-filters active">Tutti</a>';
            for(var i=0;i<cat.length;i++){

                   el+=('<a href="#" data-filter=".'+cat[i].nome+'" class="btn btn-filters">'+cat[i].nome+'</a>');
                  
            }

            $(".filters").html(el);
             $(".filters")
                                            .trigger("update")
                                            .trigger("appendCache")
                                            .trigger("applyWidgets");
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
        url: "http://ourgym.altervista.org/getElencoIstruttori.php", //Relative or absolute path to file.php file
        data: {istr:id},

        success: function(response) {
            console.log(JSON.parse(response));
            var istr=JSON.parse(response);
            var el="";
            for(var i=0;i<istr.length;i++){

                   el+=('<a href="'+istr[i].id+'" class="'+istr[i].nomecategoria+'"><figure class="image-over"><img src="'+istr[i].percorso+'" alt="//"><figcaption> <p>'+istr[i].nomeistruttore+'</p></figcaption></figure></a>');
                  
            }

            $(".grid").html(el);
             $(".grid")
                                            .trigger("update")
                                            .trigger("appendCache")
                                            .trigger("applyWidgets");
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
    
    
}
