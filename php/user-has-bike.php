<?php
include('logSQL.php');// Accès aux logs SQL
//RECUPERATION VELO USER
$thisUser=$_POST['thisUser'];
$Query_Check_bike_user = "SELECT bike_id FROM users_datas WHERE username = '$thisUser'";
$execute = mysqli_query($handler,$Query_Check_bike_user);
$datas = mysqli_fetch_row($execute);
if(is_null($datas[0])){
    echo "NULL";
}
else{
    echo $datas[0];
}
mysqli_close($handler);