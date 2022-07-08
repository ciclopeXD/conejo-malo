const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var estrella,estrella_apagada_1,estrella_apagada_2;
var colitaDeAlgodon;
var barrita;
var boton
var comiendo,cortar,fondo,cojinpeddorreta,triste;
//createEdgeSprites();
var blink, eat, sad;

let engine;
let world;
var mute,miut;
var ground;
var bandera=0
var fruit,rope;
var fruit_con;
var varrita;
var bg_img;
var vacio1;
var vacio;
var food;
var estrella1,estrella2;
var rabbit;
var link2, link3;
var boton2,boton3;
var cuerda2,cuerda3;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink= loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  comiendo=loadSound("eating_sound.mp3");
  fondo=loadSound("sound1.mp3");
  cortar=loadSound("rope_cut.mp3");
varrita=loadImage("barrita.jpg");
  cojinpeddorreta=loadSound("air.wav");
estrella=loadImage("star.png");
vacio=loadAnimation("empty.png");
estrella_apagada_1=loadAnimation("one_star.png");
estrella_apagada_2=loadAnimation("stars.png");
  triste=loadSound("sad.wav");
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  blink.playing=true;
  eat.playing=true;
  sad.playing=true;
  eat.looping=false;
  sad.looping=false;

}

function setup() 
{
  var isMobile=/iPhone | iPad | iPod | Android/i.test(navigator.userAgent);
  if(isMobile){
canw=displayWidth;
canh=displayHeight;
createCanvas(displayWidth-20,displayHeight-20);
  }else{
    canw=windowWidth;
    canh=windowHeight;
    createCanvas(windowWidth-20,windowHeight-20);
  }
//  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  /*fondo.play();
  fondo.setVolume(0.1);*/
  world = engine.world;
  boton=createImg("cut_button.png");
  boton.position(225,20);
  boton.size(40,40);
  boton2=createImg("cut_button.png");
  boton2.position(width-200,100);
  boton2.size(40,40);
  boton2.mouseClicked(drop2)
  boton3=createImg("cut_button.png");
  boton3.position(width/2,50);
  boton3.size(40,40);
  boton3.mouseClicked(drop3)
  barrita=createSprite(100,140,20,20);
  barrita.addImage(varrita);
  mute=createImg("mute.png");
  mute.position(40,127)
  mute.size(30,30)

estrella1=createSprite(width/2+19,110,10,10);
estrella1.addImage(estrella);
estrella1.scale=0.019;
estrella2=createSprite(225,height/2+100,10,10);
estrella2.addImage(estrella)
estrella2.scale=0.019;
vacio1=createSprite(100,200,20,20);
vacio1.scale=0.2;
vacio1.addAnimation('vacio',vacio);
vacio1.addAnimation('estrella_apagada_1',estrella_apagada_1);
vacio1.addAnimation('estrella_apagada_2',estrella_apagada_2);
vacio1.changeAnimation('vacio');
/*cojinpeddorreta= createImg('balloon.png');
cojinpeddorreta.position(width/2,height/2);
cojinpeddorreta.size(200,200);*/

  mute.visible=true;
//mute.mouseClicked(volumen);
mute.mouseClicked(volumen1);
  barrita.scale=0.3
  blink.frameDelay=15;
  sad.frameDelay=30;
eat.frameDelay=15;
colitaDeAlgodon = createSprite(width/2,height-50,10,10);

colitaDeAlgodon.scale=0.2;
colitaDeAlgodon.addAnimation("blink",blink);
colitaDeAlgodon.addAnimation("sad",sad);
colitaDeAlgodon.addAnimation("eat",eat);
colitaDeAlgodon.changeAnimation("blink");
boton.mouseClicked(drop);
  ground = new Ground(width-20,height-50,width-20,20);

  rope = new Rope(12,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);
  cuerda2 = new Rope(20,{x:width-200,y:100});
  cuerda3 = new Rope(9,{x:width/2,y:50});
  fruit_con = new Link(rope,fruit);
link2= new Link(cuerda2, fruit);
link3= new Link(cuerda3, fruit);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,width,height);
if(fruit !=null){
image(food,fruit.position.x,fruit.position.y,70,70);
}
  
  rope.show();
  cuerda2.show();
  cuerda3.show();
  Engine.update(engine);
  ground.show();
//colitaDeAlgodon.velocityX=2;
if(colitaDeAlgodon.x>=500){
  colitaDeAlgodon.velocityX=-2;
}
if(colitaDeAlgodon.x<=0){
  colitaDeAlgodon.velocityX=2;
}
  if(collide(fruit,colitaDeAlgodon)==true){ 
    colitaDeAlgodon.changeAnimation('eat');
    comiendo.play(); 
  }
  if(collide(fruit,ground.body)==true){ 
    colitaDeAlgodon.changeAnimation('sad');
  triste.play(); 
  }
  if(estrella1.isTouching(fruit)){
estrella1.visible=false;
vacio1.changeAnimation('estrella_apagada_1');

  }
  if(collide(fruit, estrella2)){
    estrella2.visible=false;
    vacio1.changeAnimation('estrella_apagada_1');
  }
/*  if(collide(estrella2,fruit,20)==true){
    estrella2.visible=false;
    vacio1.changeAnimation('estrella_apagada_1')
      }*/
  drawSprites();
}
function collide(cuerpo1,cuerpo2){
  if(cuerpo1 !=null){
var distancia=dist(cuerpo1.position.x,cuerpo1.position.y,cuerpo2.position.x,cuerpo2.position.y);
if(distancia<=80){
World.remove(engine.world,fruit);
fruit=null;
return true;
}else{return false;}
  }
}
function drop(){
rope.break();
cortar.play();
fruit_con.botonDoofenshmirtz();
fruit_con=null
}
function drop2(){
  cuerda2.break();
  cortar.play();
  link2.botonDoofenshmirtz();
  link2=null
  }
  function drop3(){
    cuerda3.break();
    cortar.play();
    link3.botonDoofenshmirtz();
    link3=null
    }
function puntaje(){
  if(mute.mouseClicked){
  bandera=+1;
  }
}
function volumen1(){
  fondo.play();
  if(bandera===1){
fondo.setVolume(0.1);
mute.position(50,127);
}}
function volumen2(){
  fondo.setVolume(1);
mute.position(80,127);
}