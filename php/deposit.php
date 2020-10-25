<?php
include('logSQL.php');// Accès à mes logs SQL

//RECUPERATION INFOS
$UserNameData=$_POST['userNameData'];
$UserBikeChoosen=$_POST['userbike'];

//REQUETES POUR DEPOSER LE VELO

//ETAPE 1: RECUPERER L'ID DU VELO DE L USER
$Query_UserID_Bike = 'SELECT bike_id FROM users_datas WHERE username = "'.$UserNameData.'"';
$exec_UserID_Bike = mysqli_query($handler,$Query_UserID_Bike);
$UserID_Bike = mysqli_fetch_row($exec_UserID_Bike);

//ETAPE 2 : RECUPERATION ID DU NUMERO DE RESERVATION GRACE A L ID DU VELO
$Query_User_Reservation_Nb = 'SELECT reservation_nb_id FROM bikes WHERE bike_id = "'.$UserID_Bike[0].'"';
$exec_User_Reservation_Nb = mysqli_query($handler,$Query_User_Reservation_Nb);
$User_Reservation_Nb = mysqli_fetch_row($exec_User_Reservation_Nb);


//ETAPE 3 : RECUPERATION BORNE D'ARRIVEE
$Query_Get_Terminal_Nb = 'SELECT terminal_id FROM arrival_station WHERE reservation_nb_id = "'.$User_Reservation_Nb[0].'"';
$exec_Get_Terminal_Nb = mysqli_query($handler,$Query_Get_Terminal_Nb);
$User_Terminal_Nb = mysqli_fetch_row($exec_Get_Terminal_Nb);

//ETAPE 4 : UPDATE DES INFOS DE DEPOT DANS BIKE
$Query_deposit_Usrbike = 'UPDATE bikes SET terminal_id = "'.$User_Terminal_Nb[0].'", availability_id = "1", reservation_nb_id = NULL WHERE bike_id = "'.$UserID_Bike[0].'"';
mysqli_query($handler,$Query_deposit_Usrbike);

//ETAPE 5 : RECUPERATION BORNE DE DEPART
$Query_Get_Departure_Nb = 'SELECT terminal_id FROM departure_station WHERE reservation_nb_id = "'.$User_Reservation_Nb[0].'"';
$exec_Get_Departure_Nb = mysqli_query($handler,$Query_Get_Departure_Nb);
$User_Departure_Nb = mysqli_fetch_row($exec_Get_Departure_Nb);

//ETAPE 6 : UPDATE DES INFOS USER
$Query_user_datas = 'UPDATE users_datas SET bike_id= NULL WHERE username = "'.$UserNameData.'"';
mysqli_query($handler,$Query_user_datas);