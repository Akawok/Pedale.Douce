//TABLEAUX DE COORDONNEES DE CHAQUE STATIONS
let alesiaXY = [150,100];
let pompeiXY = [500,100];
let angkorXY = [800,100];
let ysXY = [50,350];
let atlantideXY = [350,350];
let shangrilaXY = [650,350];
let mycenesXY = [950,350];
let yamataiXY = [150,600];
let machupicchuXY = [500,600];
let babyloneXY = [800,600];
let userPositionXY = [];//Tableau qui recupere plus bas les valeurs aleatoire X et Y de la position de l'user
let whereToGo = [];//Tableau qui recupere dans la fonction locate le calcul de la distance entre la station de départ et les autres stations
let depUserPositionXY = [];////Tableau qui recupere plus bas les valeurs aleatoire X et Y de la position de  la station de depart de l'user afin de connaitre la distance qui le separe des autres stations une fois qu'il aura son velo
let whereIGO = [];//Tableau qui recupere la distance entre l user et chaque station afin de determiner laquelle est la plus proche
userPositionXY.push(userX, userY)

function locate(){//utilisation de la fonction pythagore afin de calculer la distance entre les coordonnées user et une station, afin de savoir laquelle est la plus proche
    whereToGo.push(pythagore(userPositionXY,alesiaXY))
    whereToGo.push(pythagore(userPositionXY,pompeiXY))
    whereToGo.push(pythagore(userPositionXY,angkorXY))
    whereToGo.push(pythagore(userPositionXY,ysXY))
    whereToGo.push(pythagore(userPositionXY,atlantideXY))
    whereToGo.push(pythagore(userPositionXY,shangrilaXY))
    whereToGo.push(pythagore(userPositionXY,mycenesXY))
    whereToGo.push(pythagore(userPositionXY,yamataiXY))
    whereToGo.push(pythagore(userPositionXY,machupicchuXY))
    whereToGo.push(pythagore(userPositionXY,babyloneXY))
    return whereToGo;
}

function pythagore(A,B){//Fonction qui calcule les distance grace aux coordonnées
    let AB = Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2);
    return Math.round(Math.sqrt(AB));
}

function depart_arrival(depX,depY){//Calcul de la distance entre la station de depart et celle qu on choisira pour l arrivée
    depUserPositionXY = [];//Remise du tableau a zero a chaque calcul pour l empecher d etre infini
    depUserPositionXY.push(depX,depY);
    whereIGO.push(pythagore(depUserPositionXY,alesiaXY))
    whereIGO.push(pythagore(depUserPositionXY,pompeiXY))
    whereIGO.push(pythagore(depUserPositionXY,angkorXY))
    whereIGO.push(pythagore(depUserPositionXY,ysXY))
    whereIGO.push(pythagore(depUserPositionXY,atlantideXY))
    whereIGO.push(pythagore(depUserPositionXY,shangrilaXY))
    whereIGO.push(pythagore(depUserPositionXY,mycenesXY))
    whereIGO.push(pythagore(depUserPositionXY,yamataiXY))
    whereIGO.push(pythagore(depUserPositionXY,machupicchuXY))
    whereIGO.push(pythagore(depUserPositionXY,babyloneXY))
    return whereIGO;
}