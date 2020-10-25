<?php
include('logSQL.php');// Accès à mes logs SQL

//DECLARATIONS TABLEAUX RECUPERATION DONNEES SQL
$Terminal1 = [];
$Terminal2 = [];
$Terminal3 = [];
$Terminal4 = [];
$Terminal5 = [];
$Terminal6 = [];
$Terminal7 = [];
$Terminal8 = [];
$Terminal9 = [];
$Terminal10 = [];
$availability = [];
// RECUPERATION DES BORNES DE LA STATION
$i=1;
$Query_Check_terminalID = "SELECT terminal_id FROM terminals WHERE station_id = '3'";
$execute = mysqli_query($handler,$Query_Check_terminalID);
while($datas = mysqli_fetch_array($execute)){
     array_push(${'Terminal'.$i}, $datas[0]);
     $i++;
};

// RECUPERATION DES ETATS DE DISPONIBILITES
$i=1;
$Query_Avail = "SELECT availability FROM availabilities";
$execute = mysqli_query($handler,$Query_Avail);
while($datas = mysqli_fetch_array($execute)){
        array_push($availability, $datas[0]);
    $i++;
   };

// RECUPERATION DES DISPONIBILITES
$i=1;
$Query_Check_Avail = "SELECT availability_id FROM terminals WHERE station_id = '3'";
$execute = mysqli_query($handler,$Query_Check_Avail);
while($datas = mysqli_fetch_array($execute)){
    if($datas[0] == 1){
        array_push(${'Terminal'.$i}, $availability[0]);
    }
    else if ($datas[0] == 2){
        array_push(${'Terminal'.$i}, $availability[1]);
    }
    else{
        array_push(${'Terminal'.$i}, $availability[2]);
    }
    $i++;
};

//TRANSFORMATION EN OBJET ET TRANSFORMATION EN JSON;
$object = (object) [
    'Terminal1' => $Terminal1,
    'Terminal2' => $Terminal2,
    'Terminal3' => $Terminal3,
    'Terminal4' => $Terminal4,
    'Terminal5' => $Terminal5,
    'Terminal6' => $Terminal6,
    'Terminal7' => $Terminal7,
    'Terminal8' => $Terminal8,
    'Terminal9' => $Terminal9,
    'Terminal10' => $Terminal10
];

$myJSON = json_encode($object);
echo $myJSON;
mysqli_close($handler);