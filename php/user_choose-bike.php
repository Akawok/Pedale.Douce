<?php
include('logSQL.php');// Accès à mes logs SQL
//RECUPERATION VELO USER
$thisBorne=$_POST['borne_nb'];
$Query_Check_bike_user_choice = "SELECT serial_nb FROM bikes WHERE terminal_id = '$thisBorne'";
$execute = mysqli_query($handler,$Query_Check_bike_user_choice);
$datas = mysqli_fetch_row($execute);
echo $datas[0];
mysqli_close($handler);