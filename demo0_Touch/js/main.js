import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {buildTerrain,table1,planes,walls,smallEraser1,smallEraser2} from './buildTerrain.js';
import {class1Rotate,class2Rotate,class3Rotate} from './buildTerrain.js';
import {obstacle1,obstacle2,obstacle3,car,car2,redhorse2G,steveg,wall49,wall50,wall51,pressButton,textureTest,ctexture} from './buildTerrain.js';
import {Particle} from './Particle.js'
import {buildCamAndSen,render,scene,sceneMap,start,levelChose,context} from './render.js'
import {Steve} from './Steve.js'
import {touchStart,touchMove,touchEnd,touchEvent} from "./touchEvent.js"
import {setPos} from "./touchEvent.js"

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

var goalkeeper,goalkeeper2,goalkeeper3,goalkeeper4,goalkeeper5,goalkeeper6,goalkeeper7,goalkeeper8,goalkeeper9,connect1,handle1,handle2;
var timeclass=new THREE.Group();
var timeclass2=new THREE.Group();
var timeclass3=new THREE.Group();

var class2g=new THREE.Group();
var handleg=new THREE.Group();

var hitSound = "https://flyyu5683.github.io/project2/demo0_Touch/sound/hit.mp3", inHoleSound = "https://flyyu5683.github.io/project2/demo0_Touch/sound/inhole.wav";
var hitSoundBuffer,inholeSoundBuffer;

let class3Button = new THREE.Vector3(300 - 9,21.6,-300 + 90)
var pressed = false

function init() {
  window.ontouchstart = function (e){ e.preventDefault()};
  //camera && sence
  buildCamAndSen()
  //light
  buildLight()
  //grid
  
  var gridXZ = new THREE.GridHelper(1000, 100, 'red', 'white');
  //gridXZ.position.set(75,1,-80);
  gridXZ.position.y = 0
  scene.add(gridXZ);
  
  //steve
  steve=new Steve(4,12);
  goalkeeper=new Steve(3,9);
  goalkeeper2=new Steve(3,9);
  goalkeeper3=new Steve(3,9);
  goalkeeper4=new Steve(3,9);
  goalkeeper5=new Steve(3,9);
  goalkeeper6=new Steve(3,9);
  goalkeeper7=new Steve(3,9);
  goalkeeper8=new Steve(3,9);
  goalkeeper9=new Steve(3,9);
  steve.buildsteve();
  goalkeeper.buildsteve();
  goalkeeper2.buildsteve();
  goalkeeper3.buildsteve();
  goalkeeper4.buildsteve();
  goalkeeper5.buildsteve();
  goalkeeper6.buildsteve();
  goalkeeper7.buildsteve();
  goalkeeper8.buildsteve();
  goalkeeper9.buildsteve();
  steve.buildFootPrint();
  //balls
  buildBalls()
  //class 2
  buildtimeclass();
  //terrain
  buildTerrain() 
  setTimeout(rgb, 0); 
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
  /////

  
}
function animate() {
	
  if(balls[0].pos.distanceTo(class3Button) <= 2.5 + 1)
	pressed  = true
  if(pressed && smallEraser1.rotation.y <= Math.PI /180 * 60){
	smallEraser1.rotation.y += Math.PI / 180 * 2
	smallEraser2.rotation.y -= Math.PI / 180 * 2
  }
  if(!levelChose){
	smallEraser1.rotation.y = 0
	smallEraser2.rotation.y = 0
	pressed = false; 
  }

  var dt = clock.getDelta();
  class1Rotate.rotation.y += Math.PI / 160/2 ;
  class2Rotate.rotation.y += Math.PI / 160/2 ;
  class3Rotate.rotation.y += Math.PI / 160/2 ;


  table1.updateMatrixWorld();
  
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
  render();
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
  goalkeeper.direct.rotation.x=-Math.PI
  goalkeeper2.direct.rotation.y=-Math.PI/2
  goalkeeper3.direct.rotation.y=-Math.PI/2
  goalkeeper4.direct.rotation.y=-Math.PI/2
  goalkeeper5.direct.rotation.y=-Math.PI/2
  goalkeeper6.direct.rotation.y=-Math.PI/2
  goalkeeper7.direct.rotation.y=Math.PI/2
  goalkeeper8.direct.rotation.y=Math.PI/2
  goalkeeper9.direct.rotation.y=Math.PI/2
  goalkeeper.direct.position.set(20, 20,0 );
  goalkeeper2.direct.position.set(47, -20,0 );
  goalkeeper3.direct.position.set(-7, -20,0);
  
  goalkeeper4.direct.position.set(20, -20,0 );
  goalkeeper5.direct.position.set(47, -20,0 );
  goalkeeper6.direct.position.set(-7, -20,0);
  
  goalkeeper7.direct.position.set(20, -20,0 );
  goalkeeper8.direct.position.set(47, -20,0 );
  goalkeeper9.direct.position.set(-7, -20,0);
  connect1=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,160, 32,1),new THREE.MeshPhongMaterial( {color: 0xffffff,side:THREE.DoubleSide})
)
  connect1.rotation.x=Math.PI/2;
  connect1.rotation.z=-Math.PI/2;
  connect1.position.set(20,20,-295);
  handle1=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10, 32,1),new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide})
)
  handle1.rotation.x=Math.PI/2;
  handle1.rotation.z=-Math.PI/2;
  handle1.position.set(100,20,-295);
  handle2=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10, 32,1),new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide})
)
  handle2.rotation.x=Math.PI/2;
  handle2.rotation.z=-Math.PI/2;
  handle2.position.set(-60,20,-295);
  let handle5=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10, 32,1),new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide})
)
  handle5.rotation.x=Math.PI/2;
  handle5.rotation.z=-Math.PI/2;
  handle5.position.set(100,20,-235);
  let handle6=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10, 32,1),new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide})
)
  handle6.rotation.x=Math.PI/2;
  handle6.rotation.z=-Math.PI/2;
  handle6.position.set(-60,20,-235);
  timeclass.add(goalkeeper.direct,goalkeeper2.direct,goalkeeper3.direct)
  timeclass.position.set(0,20,-295);
  timeclass2.add(goalkeeper4.direct,goalkeeper5.direct,goalkeeper6.direct)
  timeclass2.position.set(0,20,-375);
  timeclass3.add(goalkeeper7.direct,goalkeeper8.direct,goalkeeper9.direct)
  timeclass3.position.set(0,20,-235);
  let connect2=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,160, 32,1),new THREE.MeshPhongMaterial( {color: 0xffffff,side:THREE.DoubleSide})
)
  connect2.rotation.x=Math.PI/2;
  connect2.rotation.z=-Math.PI/2;
  connect2.position.set(0,0,0);
  let connect3=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,160, 32,1),new THREE.MeshPhongMaterial( {color: 0xffffff,side:THREE.DoubleSide})
)
  connect3.rotation.x=Math.PI/2;
  connect3.rotation.z=-Math.PI/2;
  connect3.position.set(20,20,-235);
  let handle3=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10, 32,1),new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide})
)
  handle3.position.set(80,0,0);
  handle3.rotation.x=Math.PI/2;
  handle3.rotation.z=-Math.PI/2;
  let handle4=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10, 32,1),new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide})
)
  handle4.position.set(-80,0,0);
  handle4.rotation.x=Math.PI/2;
  handle4.rotation.z=-Math.PI/2;
  handleg.add(connect2,handle3,handle4)
  handleg.position.set(20,20,-375);
  class2g.add(handleg,connect1,connect3,handle2,handle1,handle5,handle6,timeclass,timeclass2,timeclass3);
  scene.add(class2g);
}
function goalkeeperMove(){
	handle1.rotation.x+=0.1;
	handle2.rotation.x+=0.1;
	connect1.rotation.x+=0.1;	
	timeclass.rotation.x-=0.1;
	steveg.rotation.x-=0.1;
	if(timeclass2.position.x > 15 || timeclass2.position.x <-5)
	  car2MoveSign *= -1;
  timeclass2.position.x += car2MoveSign * 0.5;
  wall49.mesh.position.x += car2MoveSign * 0.5;
  wall50.mesh.position.x += car2MoveSign * 0.5;
  wall51.mesh.position.x += car2MoveSign * 0.5;  
  handleg.position.x+=car2MoveSign * 0.5;
}
function rgb(){
    textureTest.offset.y +=1/5;
	/*
    rtexture.offset.y +=1/5;
    ltexture.offset.y +=1/5;
	*/
    ctexture.offset.y +=1/5;
    setTimeout(rgb, 1000);
} 
export {init,animate,steve,balls,writeObstaclePos,setObstaclePos}
export {hitSoundBuffer,inholeSoundBuffer,context,class2g}