//AFFICHAGE FENETRE STATION ALESIA
function alesia(data){
    let stationInfo = JSON.parse(data);//PARSING DE MON OBJET JSON
    //MANIPULATION DE L OBJET AFIN D AFFICHER TOUTES LES INFOS STATION DE MES REQUETES SQL
    let j =0
    $(".right").append("<h3>Station Alésia</h3><br><table class='infoTable'><th>Borne Numéro</th><th>Disponibilité Borne</th><th>Identifiant Vélo</th><th>Disponibilité Vélo</th><th>louer Vélo</th>");
    jQuery.each(stationInfo,function(key,value){
            $(".infoTable").append("<tr>")
            for(let i=0; i<value.length; i++){
                $(".infoTable").find('tr').eq(j+1).append("<td>" + value[i] + "</td>")
            }
            j++
    });
    $(".infoTable").append("</table>");

    let i = 0;//Me servira d'ID afin de savoir quelle borne l'user choisira !
    $('.infoTable tr').each(function() {//Pour chaque elements TR de ma table
        let makeButton = "<input type='button' value='Choisir' id='"+ i +"'>"//Ajout d un bouton qui permet de selectionner un vélo
        let terminalAva = $(this).find('td').eq(1).html()//ciblage du premier td du tr
        let bikeAVa = $(this).find('td').eq(3).html()//ciblage du 3 eme td du tr
        if(terminalAva === "Disponible" && bikeAVa == "Non Disponible"){//Condition d'etat de disponibilité afin de donner un style css de couleur
        //Vert pour le dispo Rouge pour le non dispo
            $(this).find('td').eq(1).addClass("dispo");
            $(this).find('td').eq(3).addClass("undispo");
            $(this).append("<td>∅</td></tr>");
        }
        if (terminalAva === "Non Disponible" && bikeAVa == "Disponible"){//Comme au dessus mais j inverse les possibilités de disponibilités
            $(this).find('td').eq(1).addClass("undispo");
            $(this).find('td').eq(3).addClass("dispo");
            $(this).append("<td>" + makeButton + "</td></tr>");
        }
        if (terminalAva === "Non Disponible" && bikeAVa == "Non Disponible"){
            $(this).find('td').eq(1).addClass("undispo");
            $(this).find('td').eq(3).addClass("undispo");
            $(this).append("<td>∅</td></tr>");
        }
        i++;//A chaque tour de boucle je l incremente, se cale sur le numero de borne pour avoir un referencement aux petits oignons ;)
    });
    choiceAlesia();//Une fois terminée, lance choiceAlesia()
};

let alesiaBorne;
function choiceAlesia(){
    $("input[value='Choisir']").click(function(){//Au clic du bouton généré au dessus
        alesiaBorne = $(this).attr('id'); //Recuperation du numero de borne grace a l id de mon "i"
        $.post('php/user_choose-bike.php',//Methode Ajax pour recuperer le nom du velo
        {borne_nb: alesiaBorne},
        function(data){
            userAlesia(data);//envoie le nom du velo dans la fonction userAlesia
        });
    });
}

function userAlesia(data){//FONCTION RELAIS
    let departure = "Alesia";//Nom de la station
    let dep_terminal = alesiaBorne;//ID de la borne
    let usr_bike = data;// Nom du velo
    showMapterminus(departure, dep_terminal, usr_bike);//On envoie tout ça en parametre a showMapterminus present dans map-interface.js
}

//FONCTION QUI AFFICHERA LES BORNES DISPONIBLE DE LA STATION AVEC DIFFERENTES INFOS
function alesia_deposit(departure, dep_terminal, usr_bike, arr_station , data){
    let count = 0;
    let stationInfo = JSON.parse(data);//Objet des bornes dispos
    $(".right").append("<h3>Station Alesia</h3>Distance avec la station de départ : " + distanceBetweenStation[0] + "m<br><br><table class='thisStation'><th>Borne Numéro</th><th>Disponibilité Borne</th><th>Séléctionner Borne de dépôt</th>")
    $.each( stationInfo, function( key, value ) {
        if (value[1] == "Non Disponible"){
            count++;
        }
        else {
            return false;
        }
    });
    if (count != 10){
       $.each( stationInfo, function( key, value ) {
            if (value[1] == "Disponible"){
                $(".thisStation").append("<tr><td>" + value[0] + "</td><td>" + value[1] +  "</td><td><input type='button' value='Deposer' id='"+ value[0] + "'></td></tr>");
            }
        });
        $(".alesia").append("<table>");
        $('.thisStation tr').each(function() {
            let terminalAva = $(this).find('td').eq(1).html()
            if(terminalAva === "Disponible"){
                $(this).find('td').eq(1).addClass("dispo");//ajout de la couleur verte
            }
        });
        
        $("input[value='Deposer']").click(function(){//AU CLIC SELON LA BORNE CHOISI
            booking(departure, dep_terminal, usr_bike, arr_station, $(this).attr('id'))//ENVOIE DE LA FONCTION BOOKING AVEC TROP D INFOS ... sur booking.js
        });
    }
    else {
        $(".thisStation").remove();
        $(".right").append("<h3>Il n'y a plus de borne disponible</h3>");
    }
}