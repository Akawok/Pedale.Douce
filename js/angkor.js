//AFFICHAGE FENETRE STATION ANGKOR
function angkor(data){
    let stationInfo = JSON.parse(data);
    let j = 0;
    $(".right").append("<h3>Station Angkor</h3><br><table class='infoTable'><th>Borne Numéro</th><th>Disponibilité Borne</th><th>Identifiant Vélo</th><th>Disponibilité Vélo</th><th>louer Vélo</th>");
    jQuery.each(stationInfo,function(key,value){
            $(".infoTable").append("<tr>")
            for(let i=0; i<value.length; i++){
                $(".infoTable").find('tr').eq(j+1).append("<td>" + value[i] + "</td>");
            }
            j++;
    });
    $(".infoTable").append("</table>");

    let i = 20;
    $('.infoTable tr').each(function() {
        let makeButton = "<input type='button' value='Choisir' id='"+ i +"'>";
        let terminalAva = $(this).find('td').eq(1).html();
        let bikeAVa = $(this).find('td').eq(3).html();
        if(terminalAva === "Disponible" && bikeAVa == "Non Disponible"){
            $(this).find('td').eq(1).addClass("dispo");
            $(this).find('td').eq(3).addClass("undispo");
            $(this).append("<td>∅</td></tr>");
        }
        if (terminalAva === "Non Disponible" && bikeAVa == "Disponible"){
            $(this).find('td').eq(1).addClass("undispo");
            $(this).find('td').eq(3).addClass("dispo");
            $(this).append("<td>" + makeButton + "</td></tr>");
        }
        if (terminalAva === "Non Disponible" && bikeAVa == "Non Disponible"){
            $(this).find('td').eq(1).addClass("undispo");
            $(this).find('td').eq(3).addClass("undispo");
            $(this).append("<td>∅</td></tr>");
        }
        i++
    });
    choiceAngkor();
};

let angkorBorne;
function choiceAngkor(){
    $("input[value='Choisir']").click(function(){
        angkorBorne = $(this).attr('id');
        $.post('php/user_choose-bike.php',
        {borne_nb: angkorBorne},
        function(data){
            userAngkor(data);
        });
    });
}

function userAngkor(data){
    let departure = "Angkor";
    let dep_terminal = angkorBorne;
    let usr_bike = data;
    showMapterminus(departure, dep_terminal, usr_bike);
}

function angkor_deposit(departure, dep_terminal, usr_bike, arr_station , data){
    let count = 0;
    let stationInfo = JSON.parse(data);
    $(".right").append("<h3>Station Angkor</h3>Distance avec la station de départ : " + distanceBetweenStation[2] + "m<br><br><table class='thisStation'><th>Borne Numéro</th><th>Disponibilité Borne</th><th>Séléctionner Borne de dépôt</th>")
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
        $(".angkor").append("<table>");
        $('.thisStation tr').each(function() {
            let terminalAva = $(this).find('td').eq(1).html()
            if(terminalAva === "Disponible"){
                $(this).find('td').eq(1).addClass("dispo");
            }
        });
        
        $("input[value='Deposer']").click(function(){
            booking(departure, dep_terminal, usr_bike, arr_station, $(this).attr('id'))
        });
    }
    else {
        $(".thisStation").remove();
        $(".right").append("<h3>Il n'y a plus de borne disponible</h3>");
    }   
}