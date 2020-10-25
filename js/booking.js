//Genere le code de reservation
let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let nbrs = '12345679';
let reservation_nb = "";
for(let i=0; i<=8; ++i){
    reservation_nb += nbrs.charAt(Math.floor(Math.random() * nbrs.length));
    reservation_nb += letters.charAt(Math.floor(Math.random() * letters.length));
}
//Fonction qui sert a booker le velo et donc a faire les requete SQL afin de modifier les infos de la bdd
function booking(dep_station, dep_terminal, usr_bike, arr_station, arr_terminal){
    $("#arr_booked").remove();
    $(".pHide").text("");
    $(".left").append("<div id='arr_booked'><div id='border_booked'><h2>Station d'arrivée</h2><br><table><th><h3>Station " + arr_station + "</h3></th><tr><td>Borne de dépôt : " + arr_terminal + "</td></tr></table></div><br><br><p>Coût de la réservation : 2€</p><br><label>Numéro Carte Bleue : </label><input type='text' name='user_payment'><br><br><input type='button' value='Confirmer' id='payment' class='button'></div>")
    $("#payment").click(function(){
        let user_card = $("input[name='user_payment']").val()//Carte bleue de l user
        if (user_card.length == 0){
            $(".left").append("<br>Numéro de carte bleue inexistant ! Veuillez recommencer").addClass("undispo")
        }
        else{
            $.post('php/booking.php',{ //Requete pour mettre a jour la bdd pour cette location
                departure_station: dep_station,
                departure_terminal: dep_terminal,
                user_bike: usr_bike,
                arrival_station: arr_station,
                arrival_terminal: arr_terminal,
                userNameInfo: thisUsername,
                user_cardInfo: user_card,
                reservation_nb: reservation_nb
                },
                function(data){
                    console.log(data);
                }
            );
            $(".left").text("");
            $(".center").text("");
            $(".right").text("");
            showimg()//envoie l image de chargement
        }
    });
}

function showimg(){
    $(".center").append("<div><img src='css/loading.gif'></div>")
    setTimeout("confirmation()", 3000)//Envoie confirmation au bout de 3 secondes
}

function confirmation(){ //FINITO !!!
    $(".center").text("");
    $(".center").append("<div><p>Votre réservation à réussi !!<br> Voici votre code de reservation : " + reservation_nb + "<br> N'oubliez pas d'entrer ce code à la borne afin de récuperer votre vélo !!<br>Pedale Douce vous souhaite une agréable journée & une belle balade !</p></div>");
}