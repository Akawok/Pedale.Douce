let thisUsername; //Variable qui servira à récuperer le nom d'utilisateur
let thisName;//Variable qui servira à récuperer le prénom d'utilisateur
let myJSON = [];

//QUAND PAGE CHARGEE
$(document).ready(function() {
    $.getJSON('json/Div-Creation.json',function(data){
        myJSON = data;
        forms();
    });
});

//CHOIX FONCTION ENREGISTREMENT OU CREATION
function forms(){
    let usrTips = ["Si comme nous vous aimez les gros engins à pédale...<br>Louez en un !!" , "Vous aimez le vent dans les cheveux ? Sur les bonbons c'est encore mieux...<br>Louez & Experimentez !!", "Vous désirez monter un étalon ??<br>Louez et chevauchez un de nos vélos !!", "Vous êtes pudique ??<br>Osez le vélo nudiste et sans complexe ! Louez en un !!", "Pour celle qui veulent savoir ce que ça fait quand ça balance !!<br>Louez & Experimentez"];
    let random_index = Math.floor(Math.random() * usrTips.length);
    $(".intro").append(usrTips[random_index]);
    $(".connect").mouseenter(function(){
        $(".center").text("");
        $(".center").append(myJSON[0]);//Affiche l'élément de l'index 0 du tableau de JSON
        $('#login').click(function(){
            userLoggin()//Envoie la fonction userLoggin si l'utilisateur clique sur se connecter
        });
    });
    $('.inscription').mouseenter(function(){//Quand l'user clic sur s'inscrire, affiche l'index 1 du tableau JSON et envoie la fonction userRegister pour s'inscrire
        $(".center").text("");
        $(".center").append(myJSON[1]);
        userRegister()
    });
};

//BOUTON ENREGISTREZ-VOUS
function userRegister(){
    $("#create").click(function(){// Bouton de validation
        $.post('php/account-creation.php',//Requete Ajax méthode POST
        {//Recuperation des valeurs du formulaire
            Username : $("input[name='create_username']").val(),
            Password : $("input[name='create_password']").val(),
            LastName : $("input[name='last_name']").val(),
            FirstName : $("input[name='first_name']").val(),
            Email : $("input[name='mail']").val()
        },
        function(data){
            if (data == "FAIL"){
                $(".center").append("<br>Nom d'utilisateur déja utilisé ! Veuillez en choisir un autre");
            }
            else{
                $(".center").append("<br>Enregistrement Réussi\nVous pouvez désormais vous connecter");
                thisUsername = $("input[name='create_username']").val();//Recuperation du nom utilisateur
                setTimeout("showName()", 2000)//Si l'enregistrement est terminé, renvoi à la fonction précédente qui permet de se logger
            }
        });
    });// Fin bouton de validation formulaire d'enregistrement
};// Fin fonction UserRegister()

//BOUTON CONNEXION
function userLoggin(){
    $.post('php/account-login.php',//Requete Ajax méthode POST
    {//Recuperation des valeurs du formulaire
        Username : $("input[name='login_username']").val(),
        Password : $("input[name='login_password']").val(),
    },
    function(data){
        if (data == "FAIL"){
            $(".center").append("<br>Votre identifiant ou mot de passe sont incorrects !");
            forms();
        }
        else{
            thisUsername = $("input[name='login_username']").val();//Recuperation du nom utilisateur
            showName();//Envoie la fonction showName si l'utilisateur se log correctement
        }
    });
};//Fin fonction userLoggin()

//AFFICHAGE DU PRENOM DE L'USER EN MESSAGE DE BIENVENUE METHODE AJAX
function showName(){
    $("div[class='connect'], div[class='inscription']").remove();
    $.post('php/user-first-name.php',
    {
        Username : thisUsername
    },
    function(data){
        if (data == "FAIL"){
            console.log("La requête a echouée");
        }
        else{
            thisName = data; //Enregistrement du prénom de l'user dans variable
            $("main").text("");
            $(".head_container").append("<div class='welcome'><p>♥ Bienvenue " + data + " ♥</p><input type='button' value='Déconnexion' onclick='disconnect()' class='button'></div>");//Message de bienvenue personnalisé & bouton deconnexion dans le header HTML
            userBikes();//Une fois connecté, appel de la fonction userBikes sur map-interface.js
        }
    });
}

//BOUTON DECONNEXION
function disconnect(){//Fonction qui est appelé sur le click du bouton deconnexion
    document.location.href = "index.html";
}

//DECONNEXION FIN
function disconnected(){//Fonction de deconnexion automatisée
    document.location.href = "index.html";
}