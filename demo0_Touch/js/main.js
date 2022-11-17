import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {buildTerrain,table1,table2,planes,walls} from './buildTerrain.js';
import {class1Rotate,class2Rotate,class3Rotate} from './buildTerrain.js';
import {obstacle1,obstacle2,obstacle3,car,car2,redhorse2G} from './buildTerrain.js';
import {Particle} from './Particle.js'
import {buildCamAndSen,render,scene,sceneMap,start} from './render.js'
import {Steve} from './Steve.js'
import {touchStart,touchMove,touchEnd,touchEvent} from "./touchEvent.js"
import {setPos,context} from "./touchEvent.js"

var steve,balls = [];
var clock = new THREE.Clock();
var backgroundMusic,hitSound;
var wallchange=true;
var wallchange2=true;
var chesschange=false;
var chesschange2=false;
var car1MoveSign = 1,car2MoveSign = -1;
var inholeSound;
var sceneDatas = []
var goalkeeper,goalkeeper2,goalkeeper3,goalkeeper4,connect1,handle1,handle2;
var timeclass=new THREE.Group();
var handleg=new THREE.Group();

var hitSound = 'https://flyyu5683.github.io/project2/demo0_Touch/sound/hit.mp3';
var inHoleSound = 'https://flyyu5683.github.io/project2/demo0_Touch/sound/inhole.wav';
let hitSoundBuffer;
let inholeSoundBuffer;

function init() {
  window.ontouchstart = function (e){ e.preventDefault()};
  //camera && sence
  buildCamAndSen()
  //light
  buildLight()
  //grid
  
  var gridXZ = new THREE.GridHelper(600, 60, 'red', 'white');
  //gridXZ.position.set(75,1,-80);
  gridXZ.position.y = 1
  //scene.add(gridXZ);
  
  //steve
  steve=new Steve(4,12);
  goalkeeper=new Steve(3,9);
  goalkeeper2=new Steve(3,9);
  goalkeeper3=new Steve(3,9);
  goalkeeper4=new Steve(3,9);
  steve.buildsteve();
  goalkeeper.buildsteve();
  goalkeeper2.buildsteve();
  goalkeeper3.buildsteve();
  goalkeeper4.buildsteve();
  steve.buildFootPrint();
  //balls
  buildBalls()
  //terrain
  buildTerrain() 
  //class 2
  buildtimeclass();
  //set touchEvent
  document.addEventListener('touchstart', touchStart, false );
  document.addEventListener('touchmove', touchMove, false );
  document.addEventListener('touchend', touchEnd, false );
  //setSound
  window.fetch(hitSound)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      hitSoundBuffer = audioBuffer;
  });
  window.fetch(inHoleSound)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      inholeSoundBuffer = audioBuffer;
  });
  //////
  setPos();
  unlock();
  /////

}
function animate() {
  //backgroundMusic.play();

  var dt = clock.getDelta();
  class1Rotate.rotation.y += Math.PI / 160/2 ;
  class2Rotate.rotation.y += Math.PI / 160/2 ;
  class3Rotate.rotation.y += Math.PI / 160/2 ;


  table1.updateMatrixWorld();
  table2.updateMatrixWorld();
  
  steve.update(dt);
  if(!start)
  {
   balls[0].mesh.visible=false;
  }
  else{
	touchEvent();
    balls[0].mesh.visible=true;
  }
  balls[0].update();
  planes.forEach(function(b) {
    b.update()
  });

  walls.forEach(function(b) {
    b.forEach(function(c){c.update()})
  });
  wallMove()
  carMove()
  render();
  chessMove();
  goalkeeperMove();
  requestAnimationFrame(animate);	
}
function buildLight(){
  
  let light2 = new THREE.DirectionalLight(0xffffff);
  light2.position.set(50, 70, 50);
  light2.castShadow = true;
  
  light2.shadow.camera.left = -50;
  light2.shadow.camera.right = 100;
  light2.shadow.camera.top = -100;
  light2.shadow.camera.bottom = 100;
  light2.shadow.camera.near = 1;
  light2.shadow.camera.far = 200;
  light2.shadow.mapSize.width = light2.shadow.mapSize.height = 1024;
  light2.shadow.bias = -0.007
  
  scene.add(light2);
  sceneMap.add(light2.clone());
  var dlshelper = new THREE.CameraHelper (light2.shadow.camera) 
  //scene.add ( dlshelper );
  
}
function buildBalls(){
  var ballMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load(
      'https://i.imgur.com/GjnQxsb.jpg'
    )
  });
  
  var ballGeometry = new THREE.SphereGeometry(1, 64);
  var ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  var ball = new Particle(ballMesh,0.016,"player");
  balls.push(ball);
  
  var ballGeometry2 = new THREE.SphereGeometry(1, 64);
  var ballMesh2 = new THREE.Mesh(ballGeometry2, ballMaterial);
  ballMesh2.visible = false;
  var ball2 = new Particle(ballMesh2,0.054,"predict")
  balls.push(ball2);
  
}
function wallMove(){
  if(obstacle1.position.y>-15&&wallchange==true){
    obstacle1.position.y-=0.1;
  }
  if(obstacle1.position.y<=-15&&wallchange==true){
	obstacle1.position.y=-15;
	wallchange=false;
  }
  if(obstacle1.position.y<3&&wallchange==false){
    obstacle1.position.y+=0.1;
  } 
  if(obstacle1.position.y>=3&&wallchange==false)
  { 
    obstacle1.position.y=3;
	wallchange=true;  
  }
  
  if(obstacle2.position.y>3&&wallchange2==true){
  obstacle2.position.y-=0.1;
  obstacle3.position.y-=0.1;
  }
  if(obstacle2.position.y<=3&&wallchange2==true){
	obstacle2.position.y=3;
	obstacle3.position.y=3;
	wallchange2=false;
	play(inholeSoundBuffer);
  }
  if(obstacle2.position.y<21&&wallchange2==false){
    obstacle2.position.y+=0.1;
	obstacle3.position.y+=0.1;
  } 
  if(obstacle2.position.y>=21&&wallchange2==false)
  { 
    obstacle2.position.y=21;
	obstacle3.position.y=21;
	wallchange2=true;  
  }
  
}
function carMove(){
  if(car.position.z < -350 || car.position.z > -250)
	  car1MoveSign *= -1;
  car.position.z += car1MoveSign * 0.5;
  if(goalkeeper4.direct.position.z > -285 || goalkeeper4.direct.position.z <-315)
	  car2MoveSign *= -1;
  goalkeeper4.direct.position.z += car2MoveSign * 0.6;   
}
function chessMove(){
	if(redhorse2G.position.y<30&&chesschange==false)
	{
		redhorse2G.position.y+=0.5;
	}
	else if(redhorse2G.position.y>=30&&chesschange==false)
	{
	 if(redhorse2G.position.x>27&&chesschange2==false)
	 {
	  chesschange=true;
	  redhorse2G.position.x=27;
      redhorse2G.position.z=237;	  
	 }
	 else if(redhorse2G.position.x>-23&&chesschange2==true)
	 {			 
	  redhorse2G.position.x-=0.4;
      redhorse2G.position.z+=0.2;
	  redhorse2G.position.y=30;
	 }
	 else if(redhorse2G.position.x<=-23&&chesschange2==true)
	 {
	  redhorse2G.position.x=-23;
      redhorse2G.position.z=262;
	  chesschange=true;
	  chesschange2=false;
	 }
	 else if(redhorse2G.position.x<=27&&chesschange==false)
	 {
	 redhorse2G.position.x+=0.4;
	 redhorse2G.position.z-=0.2;
     redhorse2G.position.y=30;	 
	 }
    }
    else if(chesschange==true)
	{
     if(redhorse2G.position.y<=3.6&&redhorse2G.position.x==27)
	 {
		redhorse2G.position.y=3.6;
		chesschange=false;
		chesschange2=true;
	 }
	 else if(redhorse2G.position.y<=3.6&&redhorse2G.position.x==-23)
	 {
		redhorse2G.position.y=3.6;
		chesschange=false;
	 }
     else{
	  redhorse2G.position.y-=1;
	 }    
	}		
	
}
function writeObstaclePos(){
	var temp = []
	temp.push(obstacle1.position.clone(),obstacle2.position.clone(),obstacle3.position.clone(),car.position.clone(),car2.position.clone(),wallchange,wallchange2,car1MoveSign,car2MoveSign)
	sceneDatas.push(temp);
}
function setObstaclePos(index){
	obstacle1.position.copy(sceneDatas[index][0])
	obstacle2.position.copy(sceneDatas[index][1])
	obstacle3.position.copy(sceneDatas[index][2])
	car.position.copy(sceneDatas[index][3])
	car2.position.copy(sceneDatas[index][4])
	wallchange = sceneDatas[index][5]
	wallchange2 = sceneDatas[index][6]
	car1MoveSign = sceneDatas[index][7]
	car2MoveSign = sceneDatas[index][8]
}
function buildtimeclass(){
  goalkeeper.direct.rotation.y=-Math.PI/2
  goalkeeper2.direct.rotation.y=-Math.PI/2
  goalkeeper3.direct.rotation.y=-Math.PI/2
  goalkeeper4.direct.rotation.y=Math.PI
  goalkeeper.direct.position.set(0, -20,0 );
  goalkeeper2.direct.position.set(17, -20,0 );
  goalkeeper3.direct.position.set(-17, -20,0);
  goalkeeper4.direct.position.set(125,0,-300);
  connect1=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,60, 32,1),new THREE.MeshPhongMaterial( {color: 0xffffff,side:THREE.DoubleSide})
)
  connect1.rotation.x=Math.PI/2;
  connect1.rotation.z=-Math.PI/2;
  connect1.position.set(0,20,-225);
  scene.add(connect1);
  handle1=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10, 32,1),new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide})
)
  handle1.rotation.x=Math.PI/2;
  handle1.rotation.z=-Math.PI/2;
  handle1.position.set(35,20,-225);
  scene.add(handle1);
  handle2=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10, 32,1),new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide})
)
  handle2.rotation.x=Math.PI/2;
  handle2.rotation.z=-Math.PI/2;
  handle2.position.set(-35,20,-225);
  scene.add(handle2);
  timeclass.add(goalkeeper.direct,goalkeeper2.direct,goalkeeper3.direct)
  scene.add(timeclass);
  timeclass.position.set(0,20,-225);
  let connect2=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,60, 32,1),new THREE.MeshPhongMaterial( {color: 0xffffff,side:THREE.DoubleSide})
)
  connect2.rotation.x=Math.PI/2;
  connect2.position.set(0,0,0);
  let handle3=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10, 32,1),new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide})
)
  handle3.rotation.x=Math.PI/2;
  handle3.position.set(0,0,35);
  let handle4=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10, 32,1),new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide})
)
  handle4.rotation.x=Math.PI/2;
  handle4.position.set(0,0,-35);
  handleg.add(connect2,handle3,handle4)
  handleg.position.set(125,20,-300);
  scene.add(handleg);
}
function goalkeeperMove(){
	handle1.rotation.x+=0.1;
	handle2.rotation.x+=0.1;
	connect1.rotation.x+=0.1;	
	timeclass.rotation.x-=0.05;
	if(goalkeeper4.direct.position.z > -285 || goalkeeper4.direct.position.z <-315)
	  car2MoveSign *= -1;
  goalkeeper4.direct.position.z += car2MoveSign * 0.5; 
  handleg.position.z+=car2MoveSign * 0.5;
}
function play(audioBuffer) {
    var source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
  }
function unlock() {
        console.log("unlocking")
        // create empty buffer and play it
        var buffer = context.createBuffer(1, 1, 22050);
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        // play the file. noteOn is the older version of start()
        source.start ? source.start(0) : source.noteOn(0);
      }	
export {init,animate,steve,balls,writeObstaclePos,setObstaclePos}
export {hitSoundBuffer,inholeSoundBuffer,context}