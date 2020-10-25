<?php
include('logSQL.php');// Accès à mes logs SQL

//DECLARATIONS TABLEAUX RECUPERATION DONNEES SQL
$availability = [];
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

// RECUPERATION DES BORNES DE LA STATION
$i=1;
$Query_Check_terminalID = "SELECT terminal_id FROM terminals WHERE station_id = '10'";
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
$Query_Check_Avail = "SELECT availability_id FROM terminals WHERE station_id = '10'";
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


// RECUPERATION DES VELOS
$Query_Check_Bike = "SELECT serial_nb,terminal_id FROM bikes WHERE terminal_id = '91' OR terminal_id = '92' OR terminal_id = '93' OR terminal_id = '94' OR terminal_id = '95' OR terminal_id = '96' OR terminal_id = '97' OR terminal_id = '98' OR terminal_id = '99' OR terminal_id = '100'";//STATE NULL
$execute = mysqli_query($handler,$Query_Check_Bike);
while($datas = mysqli_fetch_array($execute)){
    for($i=1; $i<=10; $i++){
        if ($datas[1] === ${'Terminal'.$i}[0]){
            array_push(${'Terminal'.$i}, $datas[0]);
            array_push(${'Terminal'.$i}, $availability[0]);
        }
    }
};
for($i=1; $i<=10; $i++){
    if (${'Terminal'.$i}[1] === "Disponible" ){
        array_push(${'Terminal'.$i}, "∅");
        array_push(${'Terminal'.$i}, $availability[1]);
    }
    if (${'Terminal'.$i}[1] === "Non Disponible" && count(${'Terminal'.$i}) == 2){
        array_push(${'Terminal'.$i}, "∅");
        array_push(${'Terminal'.$i}, $availability[1]);
    }
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