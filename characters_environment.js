// Variáveis
 
var mario, bricks, clouds, mountains, enemyMushroons, pipes, platforms, coins;

var control={
    up:  "UP_ARROW",
    left: "LEFT_ARROW",
    right: "RIGHT_ARROW",
    revive: 32 // 32 = barra de espaço
}

var gameConfig={

 status: "start",

 initialLifes: 4,

 moveSpeed: 5,
enemyMoveSpeed: 1,

gravity: 1,
gravityEnemy: 10,
jump: -15,

startingPointX: 500,
startingPointY: 0,

screenX:1240,
screenY:336,

timeScores: 0,
scores: 0
}

//  Fim das Variáveis


// Status do Jogo

noseX = "";
noseY = "";
GameStatus = "";

function game(){
    console.log("noseX = " + noseX +" ,noseY =  " + noseY);
    initializeInDraw();
    moveEnvirorment(mario);
    drawSprites();

    if(gameConfig.status === "start"){
        fill(0,0,0,150);
        rect(0,0,gameConfig.screenX, gameConfig.screenY);

        fill(255,255,255);
        textSize(40);
        textAlign(CENTER);
        text("Pressione o botão JOGAR para iniciar o jogo", gameConfig.screenX/2, gameConfig.screenY/2);
        textSize(40);
        stroke(255);
        strokeWeight(7);
        noFill();
        
        changeGameStatus();
    }

    if(gameConfig.status === "play"){
        positionOfCharacter(mario);
        enemys(enemyMushroons);
        checkStatus(mario);
        manualControl(mario)
    }

    if(gameConfig.status === "gameover"){
        fill(0,0,0,150);
        rect(0,0,   gameConfig.screenX, gameConfig.screenY);

        fill(255,255,255);
        textSize(40);
        textAlign(CENTER);
        text("GAME OVER", gameConfig.screenX/2, gameConfig.screenY/2+105);
        textSize(15);
        text("pressioe a barra de espaço para recomeçar", gameConfig.screenX/2, gameConfig.screenY/2+135);
        textSize(40);
        text(round(gameConfig.scores),gameConfig.screenX/2,gameConfig.screenY/2-35)
        text("Pontos",gameConfig.screenX/2,gameConfig.screenY/2);

        stroke(255);
        strokeWeight(7);
        noFill();
        ellipse(gameConfig.screenX/2,gameConfig.screenY/2-30,160,160);
        changeGameStatus(mario)
    }

 


}

function changeGameStatus(character){
     if(noseX!="" && gameConfig.status === "start" && GameStatus=== "start"){
         document.getElementById("status").innerHTML = "Carregado";
          world_start.play();
           initializeCharacterStatus(mario);
 gameConfig.status = "play" }
  if(gameConfig.status === "gameover" && keyDown(control.revive))
  { gameConfig.status = "start" } }

function startGame(){
    GameStatus = "start";
    document.getElementById("status").innerHTML = "Carregando";
}


function initializeInSetup(character){
    frameRate(120);
    character.scale=0.35;
    initializeCharacterStatus(character);

    bricks.displace(bricks);
    platforms.displace(platforms);
    coins.displace(cois);
    coins.displace(platforms);
    coins.displace(pipes);
    coins.displace(bricks);

    clouds.forEach(function(element){
        element.scale=random(1,2);
    })
}

function initializeCharacterStatus(character){
    character.scale=0.35;
    character["killing"]=0;
    character["kills"]=0;
    character["live"]=true;
    character["liveNumber"]=gameConfig.initialLifes;
    character["status"]='live';
    character["coins"]=0;
    character["dying"]=0;
    character.position.x=gameConfig.startingPointX;
    character.position.y=gameConfig.startingPointy;
}

function initializeInDraw(){
    background(109,143,252);
    if(mario.killing>0){
        mario.killing-=1;
    }else{
        mario.killing=0;
    }

    pipes.displace(pipes);
    enemyMushroons.displace(enemyMushroons);
    enemyMushroons.collide(pipes);
    clouds.displace(clouds);

    if(mario.live){
        bricks.displace(mario);
        pipes.displace(mario);
        enemyMushroons.displace(mario);
        platforms.displace(mario);
    }

    mario["standOnObj"]=false;
    mario.velocity.x=0;
    mario.maxSpeed=20;
}

function getCoins(coin,character){
    if (character.overlap(coin) && character.live && coins.get ==false){
        character.coin +=1;
        coin.get=true;
        mario_coin.play();

    }
}

function coinVanish(coin){
    if(coin.get){
        coin.position.x=random(50,gameConfig.screenX)+gameConfig.screenX;
        coin.get=false;
    }
}
