<?php
include('logSQL.php');// Accès à mes logs SQL

//RECUPERATION INFOS
$UserNameInfo=$_POST['userNameInfo'];
$departure_station="Station ".$_POST['departure_station'];
$departure_terminal=$_POST['departure_terminal'];
$user_bike=$_POST['user_bike'];
$arrival_station="Station ".$_POST['arrival_station'];
$arrival_terminal=$_POST['arrival_terminal'];
$userCard=$_POST['user_cardInfo'];
$CryptedUserCard = sha1($userCard);
$reservation_nb=$_POST['reservation_nb'];

//RECUPERATION ID STATION DEPART
$Query_id_DepStation = 'SELECT station_id FROM stations WHERE station_name = "'.$departure_station.'"';
$execDep = mysqli_query($handler,$Query_id_DepStation);
$IdDepStation = mysqli_fetch_row($execDep);

//RECUPERATION ID STATION ARRIVE
$Query_id_ArrStation = 'SELECT station_id FROM stations WHERE station_name = "'.$arrival_station.'"';
$execArr = mysqli_query($handler,$Query_id_ArrStation);
$IdArrStation = mysqli_fetch_row($execArr);

//RECUPERATION USERNAME ID
$Query_id_User = 'SELECT user_id FROM users_datas WHERE username = "'.$UserNameInfo.'"';
$execUsr = mysqli_query($handler,$Query_id_User);
$IdUsr = mysqli_fetch_row($execUsr);

// //PARTIE DECLARATION NUMERO DE RESERVATION
$Insertreserv_nb = 'INSERT INTO reservation_nb(reservation_nb) VALUES ("'.$reservation_nb.'")';
mysqli_query($handler,$Insertreserv_nb);

//PARTIE ENREGISTREMENT CB
$cb_User = 'INSERT INTO credit_cards(credit_card_nb, user_id) VALUES ("'.$CryptedUserCard.'","'.$IdUsr[0].'")';
mysqli_query($handler,$cb_User);

//RECUPERER ID NUMERO DE RESERVATION
$Query_ID_resNb = 'SELECT reservation_nb_id FROM reservation_nb WHERE reservation_nb = "'.$reservation_nb.'"';
$execIDresNB = mysqli_query($handler,$Query_ID_resNb);
$IdresNB = mysqli_fetch_row($execIDresNB);

//RECUPERATION BIKE ID
$Query_id_Bike = 'SELECT bike_id FROM bikes WHERE serial_nb = "'.$user_bike.'"';
$execBike = mysqli_query($handler,$Query_id_Bike);
$IdBike = mysqli_fetch_row($execBike);

// PARTIE BORNE DECLARATION INDISPONIBILITÉ
$Query_Term = 'UPDATE terminals SET availability_id = "1" WHERE terminal_id  = "'.$departure_terminal.'"';
mysqli_query($handler,$Query_Term);

// PARTIE BIKE DECLARATION INDISPONIBILITÉ ET ATTRIBUTION NUMERO DE RESA
$Query_bike = 'UPDATE bikes SET terminal_id = NULL, availability_id = "2", reservation_nb_id = "'.$IdresNB[0].'" WHERE bikes.serial_nb = "'.$user_bike.'"';
mysqli_query($handler,$Query_bike);

//PARTIE DECLARATION STATION DE DEPART
$InsertDep = 'INSERT INTO departure_station(station_id, terminal_id, bike_id, reservation_nb_id) VALUES ("'.$IdDepStation[0].'","'.$departure_terminal.'","'.$IdBike[0].'","'.$IdresNB[0].'")';
mysqli_query($handler,$InsertDep);

//PARTIE DECLARATION STATION D'ARRIVEE
$InsertArr = 'INSERT INTO arrival_station(station_id, terminal_id, bike_id, reservation_nb_id) VALUES ("'.$IdArrStation[0].'","'.$arrival_terminal.'","'.$IdBike[0].'","'.$IdresNB[0].'")';
mysqli_query($handler,$InsertArr);

//PARTIE DECLARATION ID VELO SUR USERDATA
$updateUsr = 'UPDATE users_datas SET bike_id = "'.$IdBike[0].'" WHERE username = "'.$UserNameInfo.'"';
mysqli_query($handler,$updateUsr);

//RECUPERATION ID CB
$Query_cb_ID = 'SELECT credit_card_id FROM credit_cards WHERE credit_card_nb = "'.$CryptedUserCard.'"';
$exec_cbID = mysqli_query($handler,$Query_cb_ID);
$cbID = mysqli_fetch_row($exec_cbID);
echo $cbID[0];
//PARTIE DECLARATION BILL
$billUsr = 'INSERT INTO bills(credit_card_id, bill_value) VALUES ("'.$cbID[0].'", "2")';
mysqli_query($handler,$billUsr);

//RECUPERATION DEPARTURE STATION ID
$Query_iddepStation = 'SELECT departure_station_id FROM departure_station WHERE reservation_nb_id = "'.$IdresNB[0].'"';
$execid_dep = mysqli_query($handler,$Query_iddepStation);
$IdDep = mysqli_fetch_row($execid_dep);

//RECUPERATION ARRIVAL STATION ID
$Query_idarrStation = 'SELECT arrival_station_id FROM arrival_station WHERE reservation_nb_id = "'.$IdresNB[0].'"';
$execid_arr = mysqli_query($handler,$Query_idarrStation);
$IdArr = mysqli_fetch_row($execid_arr);

//PARTIE DECLARATION HISTORIQUE
$reservation_history = 'INSERT INTO reservations_history(departure_station_id, arrival_station_id) VALUES ("'.$IdDep[0].'", "'.$IdArr[0].'")';
mysqli_query($handler,$reservation_history);

// //UPDATE DES INFOS DE DEPOT DANS TERMINAL A IMPLEMENTER ET ENLEVER CETTE MANIPULATION DE DEPOSIT.PHP
$Query_terminal_availability = 'UPDATE terminals SET availability_id = "2" WHERE terminal_id = "'.$arrival_terminal.'"';
mysqli_query($handler,$Query_terminal_availability);

mysqli_close($handler);//Deconnection de la base SQL