function depositMap(data){
    let usrTips = ["Votre vélo penche sur la gauche ?? Tirez à droite !!", "Evitez les burnes, y'a pas de moteur !!", "Hey !! Ne regardez pas sous ma selle !!", "A vélo ou en anatomie, tout est question d'équilibre !!", "Ne roulez pas trop vite si vos paquets sont mal attachés !!" ];
    let random_index = Math.floor(Math.random() * usrTips.length);
    $(".center").text("");
    $(".center").append('<h3>Tips : ' + usrTips[random_index] + ' </h3></br><img src="css/ball1.jpg" alt="balls">');
    $(".head_container").append("<div class='infos'><p>Vélo en location " + data + "</p><input type='button' value='Déposer Vélo' id='return' class='button'></div>");
    $("#return").click(function (){
        $.post('php/deposit.php',{//On fait une requete avec l username et le numero de serie de velo qui a été loué
            userNameData: thisUsername,
            userbike: data
            }
        );
        $(".center").text("");
        $(".center").append("<div><p>Merci d'avoir utilisé notre service de location !! Nous esperons vous revoir bientôt ;)<br>Vous allez être redirigé vers la page principale !</p></div>")
        setTimeout("disconnected()", 3000)//Deconnection automatique quand tout est terminé en appellant fonction disconnected
    });
};