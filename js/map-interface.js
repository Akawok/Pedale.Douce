//VERIFICATION SI USER A UN VELO EN LOCATION
function userBikes(){
    $.post('php/user-has-bike.php',
        {thisUser: thisUsername},
        function(data){
            makeChoice(data)//renvoie la requete sql en parametre de fonction
        });
}

//USER DOIT FAIRE UN CHOIX
function makeChoice(data){
    let bike_user = data; //recuperation de la requete sql de la fonction userBikes
    if (bike_user === "NULL"){// SI VELO NON LOUE
        $(".head_container").append("<div class='infos'><p>Aucun vélo en location</p><input type='button' value='Me Géolocaliser' onclick='geolocate()' class='button'></div>");
        showMap();//Affiche la map afin de louer un velo si aucun vélo n'a été loué
    }
    else{ // SI VELO LOUE
        $.post('php/user-which-bike.php',//On souhaite connaitre quel velo a été loué ainsi que son numéro de  série afin de gérer le dépot
        {thisUser: thisUsername},
        function(data){
            depositMap(data);// Envoie des données reçu dans les parametre de la fonction depositMap presente dans le fichier deposit.js
        });
    }
}

//GEOLOCALISATION
let userX = Math.floor(Math.random() * (1000 + 15) + 1);//Position X aléatoire de l'user
let userY = Math.floor(Math.random() * (650 + 20) + 1);//Position Y aléatoire de l'user
let distanceUserToStation = [];//Recuperera les valeurs de la fonction locate du fichier distance.js
function geolocate(){
    distanceUserToStation = locate();
    $(".userGeolocate").css({'top': userY, 'left': userX});//Place l'user sur la map grace aux proprietés top et left en CSS
    $(".userGeolocate").show();//Affiche le div position de l'user qui était caché depuis le début AHAHAH
};

//AFFICHAGE ET MANIPULATION DE LA MAP
function showMap(){
    $(".center").text("");
    $(".center").append(myJSON[2]);//Affichage div du JSON
    $(".userGeolocate").hide();//De base on cache la position de l user, on l'affichera seulement quand il cliquera sur me Geolocaliser !

    //SECTION ALESIA
    $(".alesia").mouseenter(function(event){//Au passage de la souris
        $(".right").text("");
        $.post('php/alesia.php',//Requete Ajax méthode POST
        {station: 'Station Alesia'},//On envoie le nom de la station
        function(data){
            alesia(data);//Reception des données de la requete puis envoie de la fonction alesia avec les datas en parametres. Fonction presente dans alesia.js
            //La data sera un objet JSON ( voir alesia.PHP)
        });
    });

    //SECTION POMPEI
    $(".pompei").mouseenter(function(event){
        $(".right").text("");
        $(".pompei").addClass("pompei2");
        $.post('php/pompei.php',
        {station: 'Station Pompei'},
        function(data){
            pompei(data);
        });
    });

    //SECTION ANGKOR
    $(".angkor").mouseenter(function(event){
        $(".right").text("");
        $(".angkor").addClass("angkor2");
        $.post('php/angkor.php',
        {station: 'Station Angkor'},
        function(data){
            angkor(data);
        });
    });

    //SECTION YS
    $(".ys").mouseenter(function(event){
        $(".right").text("");
        $(".ys").addClass("ys2");
        $.post('php/ys.php',
        {station: 'Station Ys'},
        function(data){
            ys(data);
        });
    });

    //SECTION ATLANTIDE
    $(".atlantide").mouseenter(function(event){
        $(".right").text("");
        $(".atlantide").addClass("atlantide2");
        $.post('php/atlantide.php',
        {station: 'Station Atlantide'},
        function(data){
            atlantide(data);
        });
    });

    //SECTION SHANGRI-LA
    $(".shangrila").mouseenter(function(event){
        $(".right").text("");
        $(".shangrila").addClass("shangrila2");
        $.post('php/shangrila.php',
        {station: 'Station Shangri-La'},
        function(data){
            shangrila(data);
        });
    });

    //SECTION MYCENES
    $(".mycenes").mouseenter(function(event){
        $(".right").text("");
        $(".mycenes").addClass("mycenes2");
        $.post('php/mycenes.php',
        {station: 'Station Mycenes'},
        function(data){
            mycenes(data);
        });
    });

    //SECTION YAMATAI
    $(".yamatai").mouseenter(function(event){
        $(".right").text("");
        $(".yamatai").addClass("yamatai2");
        $.post('php/yamatai.php',
        {station: 'Station Yamatai'},
        function(data){
            yamatai(data);
        });
    });

    //SECTION MACHU PICCHU
    $(".machupicchu").mouseenter(function(event){
        $(".right").text("");
        $(".machupicchu").addClass("machupicchu2");
        $.post('php/machupicchu.php',
        {station: 'Station Machu Picchu'},
        function(data){
            machupicchu(data);
        });
    });

    //SECTION BABYLONE
    $(".babylone").mouseenter(function(event){
        $(".right").text("");
        $(".babylone").addClass("babylone2");
        $.post('php/babylone.php',
        {station: 'Station Babylone'},
        function(data){
            babylone(data);
        });
    });

    //SECTION USER
    $(".userGeolocate").mouseenter(function(event){
        $(".left").text("");
        let closest_station = Math.min(...distanceUserToStation);//Dans ce tableau j'ai toutes les distances entre les stations et l user, et je cherche la plus proche
        let stationNamed;//Stockera le nom de la station la plus proche
        let indx; // servira d index a distnceUsertoStation afin de l afficher
        for(let i=0; i<=distanceUserToStation.length; i++){//Sert a connaitre le nom de la station car elles sont dans l ordre dans le tableau; y'a plus qu a connaitre l index pour connaitre la station la plus proche
            if (distanceUserToStation[i] === closest_station){
                switch (i) {
                    case 0 : stationNamed = "Alésia";break;
                    case 1 : stationNamed = "Pompéi";break;
                    case 2 : stationNamed = "Angkor";break;
                    case 3 : stationNamed = "Ys";break;
                    case 4 : stationNamed = "Atlantide";break;
                    case 5 : stationNamed = "Shangri-La";break;
                    case 6 : stationNamed = "Mycènes";break;
                    case 7 : stationNamed = "Yamatai";break;
                    case 8 : stationNamed = "Machu Picchu";break;
                    case 9 : stationNamed = "Babylone";break;
                }
                indx = i;
            }
        }
        $(".left").append("<div id='usrPos'><h3>Votre Position</h3><br><table><th>Station</th><th>Distance</th><tr><td>Alésia</td><td>" + distanceUserToStation[0] + "m</td></tr><tr><td>Pompéi</td><td>" + distanceUserToStation[1] + "m</td></tr><tr><td>Angkor</td><td>" + distanceUserToStation[2] + "m</td></tr><tr><td>Ys</td><td>" + distanceUserToStation[3] + "m</td></tr><tr><td>Atlantide</td><td>" + distanceUserToStation[4] + "m</td></tr><tr><td>Shangri-La</td><td>" + distanceUserToStation[5] + "m</td></tr><tr><td>Mycènes</td><td>" + distanceUserToStation[6] + "m</td></tr><tr><td>Yamatai</td><td>" + distanceUserToStation[7] + "m</td></tr><tr><td>Machu Picchu</td><td>" + distanceUserToStation[8] + "m</td></tr><tr><td>Babylone</td><td>" + distanceUserToStation[9] + "m</td></tr></table><br>Station la plus proche :<br>" + stationNamed + " " + distanceUserToStation[indx] + "m</div>");
    });
};//fin showmap()

//ICI ON CALCULE LA DISTANCE ENTRE LES STATIONS
let distanceBetweenStation = [];
function showMapterminus(departure, dep_terminal, usr_bike){
    if (departure === "Alesia"){
        distanceBetweenStation = depart_arrival(150,100)
    }
    else if (departure === "Pompei"){
        distanceBetweenStation = depart_arrival(500,100)
    }
    else if (departure === "Angkor"){
        distanceBetweenStation = depart_arrival(800,100)
    }
    else if (departure === "Ys"){
        distanceBetweenStation = depart_arrival(50,350)
    }
    else if (departure === "Atlantide"){
        distanceBetweenStation = depart_arrival(350,350)
    }
    else if (departure === "Shangri-La"){
        distanceBetweenStation = depart_arrival(650,350)
    }
    else if (departure === "Mycenes"){
        distanceBetweenStation = depart_arrival(950,350)
    }
    else if (departure === "Yamatai"){
        distanceBetweenStation = depart_arrival(150,600)
    }
    else if (departure === "Machu Picchu"){
        distanceBetweenStation = depart_arrival(500,600)
    }
    else {
        distanceBetweenStation = depart_arrival(800,600)
    }
    $(".left").text("");
    $(".left").append("<div id='dep_booked'><div id='border_booked'><h2>Station de départ</h2><br><table><th><h3>Station "+ departure + "</h3></th><tr><td>Velo selectionné : " + usr_bike + "</td></tr><tr><td>Borne selectionnée : " + dep_terminal + "</td></tr></table></div></div>")
    $(".center").text("");
    $(".center").append("<h2 class='pHide'>Veuillez désormais choisir votre station de dépot</h2><br>" + myJSON[2]);
    $(".userGeolocate").css({'top': userY, 'left': userX});

    //AFFICHAGE DES STATIONS DE DEPOTS ET DES BORNES DISPONIBLES
    //SECTION ALESIA
    $(".alesia").mouseenter(function(event){ 
        $(".right").text("");      
        $.post('php/alesia_deposit.php',//Ici je requete pour trouver les bornes disponibles
        {station: 'Station Alesia'},
        function(data){
            alesia_deposit(departure, dep_terminal, usr_bike, "Alesia", data);//Ici je passe en parametre departure qui est la station de depart, dep_terminal qui est le terminal de depart, usr_bike qui est le nom du velo, Alesia qui est la station d arrivé, et data qui sont les bornes dispo, la suite sur alesia.js
        });
    });

    //SECTION POMPEI
    $(".pompei").mouseenter(function(event){
        $(".right").text(""); 
        $.post('php/pompei_deposit.php',
        {station: 'Station Pompei'},
        function(data){
            pompei_deposit(departure, dep_terminal, usr_bike, "Pompei", data);
        });
    });

    //SECTION ANGKOR
    $(".angkor").mouseenter(function(event){
        $(".right").text(""); 
        $.post('php/angkor_deposit.php',
        {station: 'Station Angkor'},
        function(data){
            angkor_deposit(departure, dep_terminal, usr_bike, "Angkor", data);
        });
    });

    //SECTION YS
    $(".ys").mouseenter(function(event){
        $(".right").text(""); 
        $.post('php/ys_deposit.php',
        {station: 'Station Ys'},
        function(data){
            ys_deposit(departure, dep_terminal, usr_bike, "Ys", data);
        });
    });

    //SECTION ATLANTIDE
    $(".atlantide").mouseenter(function(event){
        $(".right").text(""); 
        $.post('php/Atlantide_deposit.php',
        {station: 'Station Atlantide'},
        function(data){
            atlantide_deposit(departure, dep_terminal, usr_bike, "Ys", data);
        });
    });

    //SECTION SHANGRI-LA
    $(".shangrila").mouseenter(function(event){
        $(".right").text(""); 
        $.post('php/shangrila_deposit.php',
        {station: 'Station Shangri-La'},
        function(data){
            shangrila_deposit(departure, dep_terminal, usr_bike, "Shangri-La", data);
        });
    });

    //SECTION MYCENES
    $(".mycenes").mouseenter(function(event){
        $(".right").text(""); 
        $.post('php/mycenes_deposit.php',
        {station: 'Station Mycenes'},
        function(data){
            mycenes_deposit(departure, dep_terminal, usr_bike, "Mycenes", data);
        });
    });

    //SECTION YAMATAI
    $(".yamatai").mouseenter(function(event){
        $(".right").text(""); 
        $.post('php/yamatai_deposit.php',
        {station: 'Station Yamatai'},
        function(data){
            yamatai_deposit(departure, dep_terminal, usr_bike, "Yamatai", data);
        });
    });

    //SECTION MACHU PICCHU
    $(".machupicchu").mouseenter(function(event){
        $(".right").text(""); 
        $.post('php/machupicchu_deposit.php',
        {station: 'Station Machu Picchu'},
        function(data){
            machuPicchu_deposit(departure, dep_terminal, usr_bike, "Machu Picchu", data);
        });
    });

    //SECTION BABYLONE
    $(".babylone").mouseenter(function(event){
        $(".right").text(""); 
        $.post('php/babylone_deposit.php',
        {station: 'Station Babylone'},
        function(data){
            babylone_deposit(departure, dep_terminal, usr_bike, "Babylone", data);
        });
    });
}