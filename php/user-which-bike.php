<?php
include('logSQL.php');// Accès à mes logs SQL
//RECUPERATION VELO USER
$thisUser=$_POST['thisUser'];
$Query_Check_bike_user = "SELECT bike_id FROM users_datas WHERE username = '$thisUser'";
$execute = mysqli_query($handler,$Query_Check_bike_user);
$datas = mysqli_fetch_row($execute);

$Query_Check_which_bike_user = "SELECT serial_nb FROM bikes WHERE bike_id = '$datas[0]'";
$exec = mysqli_query($handler,$Query_Check_which_bike_user);
$datas2 = mysqli_fetch_row($exec);

echo $datas2[0];
mysqli_close($handler);