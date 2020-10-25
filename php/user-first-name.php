<?php
include('logSQL.php');// Accès à mes logs SQL
//RECHERCHE DU PRENOM GRACE A L'USERNAME
$Username=$_POST['Username'];
$Query_Check = "SELECT first_name FROM users_datas WHERE username = '$Username'";
$execute = mysqli_query($handler,$Query_Check);
$datas = mysqli_fetch_row($execute);
if($datas[0]){
    echo $datas[0];
}
else{
    echo $Username;
}
mysqli_close($handler);//Deconnection de la base SQL;