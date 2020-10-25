<?php
include('logSQL.php');// Accès à mes logs SQL
//STOCKAGE INFOS FORMULAIRE CONNEXION
$Username=$_POST['Username'];
$Password=$_POST['Password'];
$Uncrypted_Password = sha1($Password);
//REQUETE SQL
$Query_Check = "SELECT * FROM users_datas WHERE username = '".$Username."' AND user_password = '".$Uncrypted_Password."'";
$exec_requete = mysqli_query($handler,$Query_Check);
//CHECKING
if(mysqli_num_rows($exec_requete)!=0){ // VERIFIE SI USERNAME ET PASSWORD SONT CORRECTS 
    echo "SUCCES";
} 
else{
    echo "FAIL"; // MESSAGE D'ERREUR SI MDP OU USERNAME INCORRECTE
}
mysqli_close($handler);//Deconnection de la base SQL