<?php
include('logSQL.php');// Accès aux logs SQL
//STOCKAGE INFOS FORMULAIRE INSCRIPTION
$Username=$_POST['Username'];
$Password=$_POST['Password'];
$Crypted_Password = sha1($Password);
$LastName=$_POST['LastName'];
$FirstName=$_POST['FirstName'];
$Email=$_POST['Email'];
$Query_Check = "SELECT * FROM users_datas WHERE username = '".$Username."'";//Selection qui verifiera si un username existe déjà ou non dans la bdd
$execute = mysqli_query($handler,$Query_Check);
if(mysqli_num_rows($execute)!=0){//Condition de verification doublon username dans la bdd
    echo "FAIL";
}
else{
    $Query_Creation = 'INSERT INTO users_datas(username, user_password, last_name, first_name, mail_address) VALUES ("'.$Username.'","'.$Crypted_Password.'","'.$LastName.'","'.$FirstName.'","'.$Email.'")';//Ajout des infos user dans la bdd
    mysqli_query($handler,$Query_Creation);//Requete SQL
    echo "SUCCES";
}
mysqli_close($handler);//Deconnection de la base SQL