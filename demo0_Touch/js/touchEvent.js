//<script src="https://jyunming-chen.github.io/tutsplus/js/KeyboardState.js"></script>
import {Line2} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/Line2.js';
import {LineMaterial} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineMaterial.js';
import {LineGeometry} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineGeometry.js';
import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {cameraOnPlayer,renderer,textureAnimate,start,scene,HUDPress,cameraButtons,cameraSlider,sliderGroup,level,isOver,HUDForInHole} from './render.js'
import {steve,balls,writeObstaclePos,setObstaclePos} from './main.js'
import {stop,stopTrue} from './Steve.js'
import {inholeSoundBuffer} from './main.js'

var beforeHit = true;
var countSwing = 1;
var power = 0,sign = 1.0,theta = 0.5;
var lineList = [];
var matLine4;


var ballMove = false;
var useOrb = false;

var touch = new THREE.Vector2();
var rotateX = 0,rotateY = 0;
var cancelCharge = false;
var cancelMove = false;
var firstTouch = false;
var startMove = false;
var fingerNum = 0;
var touchHUD = false;
var cameraMove = false;

var isCharge = false;

var fovVal = 40,fovX = 0;
var inHoleSound = 'https://flyyu5683.github.io/project2/demo0_Touch/sound/inhole.wav';
const context = new AudioContext();

function predictLine(){
	if(!cancelCharge){
		
		var positions = [];
		var colors = []
		var EPS = 0.1
		balls[1].pos.copy(balls[0].pos);
		balls[1].runInHole = false;
		do{
			let dt = 0.032;
			let thisPos = new THREE.Vector3();
			balls[1].update(dt)
			
			thisPos.copy(balls[1].pos);
			
			positions.push(thisPos.x,thisPos.y,thisPos.z);
			colors.push(255,0,0)
			if(balls[1].runInHole === true)
				break;
			if(positions.length >=500)
				break
		}while(balls[1].vel.length() > EPS && balls[1].pos.y >= -10);

		for(var i = lineList.length; i > 0;i--){
			scene.remove(lineList[i-1])
		}
		var geometry = new LineGeometry();
		geometry.setPositions(positions);
		geometry.setColors(colors);
		matLine4 = new LineMaterial({
			color: 0xffffff,
			linewidth: 3, 
			vertexColors: THREE.VertexColors
		});
		var predictLine = new Line2(geometry, matLine4);
		predictLine.computeLineDistances();
				
		scene.add(predictLine);
				
		matLine4.resolution.set(window.innerWidth, window.innerHeight); 
		
		lineList.push(predictLine)
				
		balls[1].pos.copy(balls[0].pos);
		balls[1].vel.copy(new THREE.Vector3(0,0,0))	
		
	}
}
function touchStart(event){
	event.preventDefault();
	var source = context.createBufferSource();
    source.buffer = inholeSoundBuffer;
    source.connect(context.destination);
    source.start();
	touchHUD = HUDPress();
	if(start && touchHUD === 0){
		touch.x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
		touch.y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
	}
	

}
function touchMove(event){

	event.preventDefault();
	if(firstTouch && touchHUD === 0){
		if(!startMove){
			fingerNum = event.touches.length;
			startMove = true;
		}
		if(startMove && fingerNum != event.touches.length){
			cancelMove = true;
		}
		if(!cancelMove){
			if(fingerNum === 1){
				isCharge = true;
				
				balls[1].runInHole = false;
				steve.direct.position.copy(balls[0].pos)
				steve.arrow.visible = true;
				var x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
				var y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
				var vector = new THREE.Vector3(touch.x - x,0,touch.y - y)
				power = clamp(vector.length() * 12,0,10);
				steve.power = power;
				power = Math.floor(power)
				theta = power / 10 / 2.5;
				/*
				var angle = new THREE.Vector3(1,0,0).angleTo(vector)
				
				steve.camera.rotation.y = angle - Math.PI / 2 + rotateY;
				steve.direct.rotation.y = angle - Math.PI / 2 + rotateY;
				*/
				for(var i = 0; i < steve.arrow.children.length; i++)
					steve.arrow.children[i].visible = false;
				for(var i = 0;i < 9 + power; i++)
					steve.arrow.children[i].visible = true;
			}
			if(fingerNum === 2){
				var x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
				var y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
				x -= touch.x;
				y -= touch.y;
				touch.x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
				touch.y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
				
				rotateY -= x
				
				//console.log(steve.camera.rotation.x,rotateX)
				
				steve.camera.rotation.order = 'YXZ';
				steve.camera.rotation.y -= x;
				steve.direct.rotation.y -= x;
				
				rotateX += y
				steve.camera.rotation.x += y;
				steve.direct.children[3].rotation.x += y;
				if(steve.camera.rotation.x < -1){
					rotateX = -1;
					steve.camera.rotation.x = -1;
				}
				else if (steve.camera.rotation.x > 0.53){
					rotateX = 0.53;
					steve.camera.rotation.x = 0.53;
				}
				if(steve.direct.children[3].rotation.x < -1){
					rotateX = -1;
					steve.direct.children[3].rotation.x = -1;
				}
				else if (steve.direct.children[3].rotation.x > 0.53){
					rotateX = 0.53;
					steve.direct.children[3].rotation.x = 0.53;
				}
			}
		}
	}
	if(touchHUD === 1){
		fovX = ((event.touches[0].pageX / window.innerWidth) * 2 - 1) * 10;
		fovX = clamp(fovX,-7.5,7.5)
		cameraSlider.position.x = fovX ;
		
		steve.camera.children[0].fov = fovVal + fovX * 2;
		steve.direct.children[3].children[0].fov = fovVal + fovX * 2;
		
		steve.camera.children[0].updateProjectionMatrix();
		steve.direct.children[3].children[0].updateProjectionMatrix();
	}
}
function touchEnd(event){
	event.preventDefault();
	if(firstTouch && event.touches.length === 0){
		if(touchHUD === 4){
			if(!cancelCharge && steve.power != 0){		
				steve.puttPos.copy(steve.direct.children[3].children[0].localToWorld(new THREE.Vector3(0, 0, 0)))
				
				beforeHit = false;
				isCharge = false;
				
				steve.direct.position.copy(balls[0].pos.clone());
				playDatas[level].power.push(steve.power)
				playDatas[level].rotation.push(steve.direct.clone().rotation.y)
				playDatas[level].ballPos.push(balls[0].pos.clone())
				playDatas[level].putt.push(steve.puttPos.clone())
				playDatas[level].theta.push(theta)
				if(level === 2)
					writeObstaclePos();
				
			}
			else{
				cancelCharge = false;
			}
		}
		else if (touchHUD === 5 && playDatas[level].power.length != 0){
			inReplay = true;
			mode = 0
		}
		else if (touchHUD === 6 && playDatas[level].power.length != 0){
			inReplay = true;
			mode = 1;
		}
		startMove = false;
		cancelMove = false;
	}
	else{
		firstTouch = true;
	}
	touchHUD = -1;
}
function touchEvent(){
	if(level !== 3)
		checkBallZ(balls[0].pos.z)
	else
		checkBallX(balls[0].pos.x)
    textureAnimate()
    sliderMove()
	
    if(inReplay && !ballMove && !swing){
	  replay()
    }
   	if(touchHUD === 2){
		turnLeft();
	}
	if(touchHUD === 3){
		turnRight();
	}
   if(balls[1].vel != 0 && isCharge){
		let temp = new THREE.Vector3(0, 0, 0);
		var vel = new THREE.Vector3(0, 0, 0);

		temp.copy(balls[0].pos.clone().sub(steve.direct.children[3].children[0].localToWorld(new THREE.Vector3(0, 0, 0))));
		vel.copy(new THREE.Vector3(temp.x, 0, temp.z)).normalize();
		vel.multiplyScalar(steve.power*8);
		balls[1].vel.copy(vel);
		predictLine()
   }
  if(steve.putt.worldToLocal(balls[0].pos.clone()).length() <= (0.5 + 0.5) && !beforeHit)
  {
	  for(var i = lineList.length; i > 0;i--){
		scene.remove(lineList[i-1])
	  }
	  steve.lastPos.copy(balls[0].pos);
	  for(var i = lineList.length; i > 0;i--)
		scene.remove(lineList[i-1])
	  let temp = new THREE.Vector3(0, 0, 0);
	  var vel = new THREE.Vector3(0, 0, 0);
      temp.copy(balls[0].pos.clone().sub(steve.puttPos));
      vel.copy(new THREE.Vector3(temp.x, 0, temp.z)).normalize();
      vel.multiplyScalar(steve.power*8);
      balls[0].vel.copy(vel)
	  setTimeout(function(){if(balls[0].vel.length() >= 0.7 / 3) ballMove = true;},1000);
      //ballMove = true;
	  power = 0;
	  steve.power = 0;
	  beforeHit = true;
	  steve.arrow.visible = false
	  if(!inReplay)
		cameraMove = true;
	  swing = false;
  }
  if(ballMove === true && balls[0].vel.length() <= 0.7 / 3 && !cameraMove){
	if(!inReplay)
	  countSwing++;
	ballMove = false
	
	steve.direct.position.copy(balls[0].pos)
	steve.body.visible = false;
	if(balls[0].runInHole !== true && !inReplay)
	{
		steve.goal.copy(balls[0].pos)
		steve.begin.copy(steve.lastPos)
		steve.footPath.position.copy(steve.lastPos)
		stopTrue(); 
	}
	else{
		//steve.camera.rotation.y = steve.direct.rotation.y;
		balls[0].runInHole = false;
	}
  }
  
  if(steve.camera.rotation.y > Math.PI * 2)
	steve.camera.rotation.y -= Math.PI * 2;
  if(steve.camera.rotation.y < -Math.PI * 2)
	steve.camera.rotation.y += Math.PI * 2;

  if(ballMove){
	  let temp = levelTrack[level-1][index].angle - steve.camera.rotation.y;
	  if(fovVal <= 60)
		fovVal += 1
	  steve.camera.children[0].fov = fovVal + fovX * 2
	  steve.direct.children[3].children[0].fov = fovVal + fovX * 2;
	  steve.camera.children[0].updateProjectionMatrix();
	  steve.direct.children[3].children[0].updateProjectionMatrix();
		
	  if(temp >= Math.PI/90){
		  steve.camera.rotation.y += Math.PI/90;
	  }
	  else if (temp <= -Math.PI/90){
		  steve.camera.rotation.y -= Math.PI/90;
	  }
	  else{
		cameraMove = false;
	  }
  }
  if(steve.moveFin && !ballMove){
	//let temp = (levelTrack[level-1][index].angle < 0 ? levelTrack[level-1][index].angle + Math.PI / 2 : levelTrack[level-1][index].angle - Math.PI/2) - steve.camera.rotation.y;
	let temp = levelTrack[level-1][index].angleBack - steve.camera.rotation.y;
	if(fovVal >= 40)
		fovVal -= 1
	steve.camera.children[0].fov = fovVal + fovX * 2
	steve.direct.children[3].children[0].fov = fovVal + fovX * 2;
	steve.camera.children[0].updateProjectionMatrix();
	steve.direct.children[3].children[0].updateProjectionMatrix();
	
	  if(temp >= Math.PI/90){
		  steve.camera.rotation.y += Math.PI/90;
	  }
	  else if (temp <= -Math.PI/90){
		  steve.camera.rotation.y -= Math.PI/90;
	  }	
	  else{
			steve.direct.rotation.y = steve.camera.rotation.y;
			steve.moveFin = false
	  }	  
  }
  
  
}
function countSwingReset(){
	countSwing = 1;
}
function sliderMove(){
	if(sliderGroup.onTop === true){
		if(sliderGroup.position.y < -8.5){
			sliderGroup.position.y += 0.2;
		}
		else{
			sliderGroup.children[2].rotation.x = Math.PI;
			sliderGroup.position.y = -8.5
		}
	}
	else{
		if(sliderGroup.position.y > -11.5){
			sliderGroup.position.y -= 0.2;
		}
		else{
			sliderGroup.children[2].rotation.x = 0;			
			sliderGroup.position.y = -11.5
		}
	}
}
function turnLeft(){
	steve.camera.rotation.y += Math.PI / 720
	steve.direct.rotation.y += Math.PI / 720
}
function turnRight(){
	steve.camera.rotation.y -= Math.PI / 720
	steve.direct.rotation.y -= Math.PI / 720
}
function setCameraMove(){
	cameraMove = true;
}
function clamp(val, min, max){
	return Math.min(Math.max(val, min), max);
}
var playData1 = {power: [],rotation : [], ballPos: [], putt : [],theta : []};
var playData2 = {power: [],rotation : [], ballPos: [], putt : [],theta : []};
var playData3 = {power: [],rotation : [], ballPos: [], putt : [],theta : []};
var playDatas = [playData1,playData2,playData3]
var inReplay = false,swing = false;
var replayCount = 0;
var mode = -1;
var repalyEnd = true;
function replay(){
	if(mode === 1){
		replayCount = playDatas[level].power.length - 1;
		mode = -1
	}
	if(replayCount < playDatas[level].power.length){
		for(var i = lineList.length; i > 0;i--)
			scene.remove(lineList[i-1])
		sliderGroup.children[5].visible = false;
		steve.arrow.visible = false;
		steve.power = playDatas[level].power[replayCount]
		balls[0].pos.copy(playDatas[level].ballPos[replayCount])
		steve.direct.position.copy(balls[0].pos)
		steve.direct.rotation.y = playDatas[level].rotation[replayCount]
		steve.puttPos.copy(playDatas[level].putt[replayCount])
		theta = playDatas[level].theta[replayCount];
		if(level === 2)
			setObstaclePos(replayCount)
		beforeHit = false;
		swing = true;
		isCharge = false;
		replayCount++;
		}
	else {
		sliderGroup.children[5].visible = true;
		//steve.arrow.visible = true;
		steve.power = power;
		steve.theta = theta;
		inReplay = false;
		replayCount = 0;
		if(mode === 2)
			repalyEnd = true;
	}
}
function resetPlayData(level){
	playDatas[level] = {power: [],rotation : [], ballPos: [], putt : [],theta : []}
}

var levelTrack = []
var index = 0

function setPos(){
	
	{
		let pos = []
		let temp = {pos : new THREE.Vector3(0,30, 20),angle : -Math.PI/2,angleBack:0}
		let temp1 = {pos : new THREE.Vector3(0,30,-50),angle : -Math.PI/2,angleBack:0}
		let temp2 = {pos : new THREE.Vector3(0,30,-60),angle : -Math.PI,angleBack:-Math.PI/2}
		pos.push(temp,temp1,temp2);
		levelTrack.push(pos)
	}
	{
		let pos = [];
		let temp = {pos : new THREE.Vector3(0,30, -120),angle : -Math.PI/2,angleBack:0}
		let temp1 = {pos : new THREE.Vector3(0,30,-270),angle : -Math.PI/2,angleBack:0}
		let temp2 = {pos : new THREE.Vector3(0,30,-275),angle : -Math.PI,angleBack:-Math.PI/2}
		pos.push(temp,temp1,temp2);
		levelTrack.push(pos)
	}
	{
		let pos = [];
		let temp = {pos : new THREE.Vector3(230,30, -300),angle : -Math.PI,angleBack: -Math.PI/2}
		let temp1 = {pos : new THREE.Vector3(270,30, -300),angle : -Math.PI,angleBack: -Math.PI/2}
		let temp2 = {pos : new THREE.Vector3(380,30,-300),angle : -Math.PI/2 * 3,angleBack:-Math.PI/2}
		let temp3 = {pos : new THREE.Vector3(390,30,-300),angle : -Math.PI,angleBack:-Math.PI/2}
		pos.push(temp,temp1,temp2,temp3);
		levelTrack.push(pos)
	}
	
	/*
	for(var i = 10;i >= -50; i = i - 10)
		pos.push(new THREE.Vector3(0,30,i))
	pos.push(new THREE.Vector3(-40,30,10))
	pos.push(new THREE.Vector3(-40,30,0))
	pos.push(new THREE.Vector3(-40,30,-10))
	pos.push(new THREE.Vector3(-40,30,-20))
	pos.push(new THREE.Vector3(-40,30,-30))
	pos.push(new THREE.Vector3(-40,30,-40))
	pos.push(new THREE.Vector3(-40,30,-50))
	
	pos.push(new THREE.Vector3(-20,30,-70))
	pos.push(new THREE.Vector3(-10,30,-90))
	pos.push(new THREE.Vector3(0,30,-110))
	*/
	
}
function checkBallZ(ballZ){
	for(var i = 0; i < levelTrack[level - 1].length; i++){
		if(ballZ >= levelTrack[level - 1][i].pos.z){
			index = i;
			return;
		}
	}
}
function checkBallX(ballX){
	for(var i = 0; i < levelTrack[level - 1].length; i++){
		if(ballX <= levelTrack[level - 1][i].pos.x){
			index = i;
			return;
		}
	}
}
function replayAll(){
	inReplay = true;
	mode = 2
	repalyEnd = false;
	steve.camera.rotation.y = levelTrack[level - 1][0].angleBack;
}
function resetCameraAngle(){
	steve.camera.rotation.y = levelTrack[level - 1][0].angleBack;
	steve.direct.rotation.y = steve.camera.rotation.y
}
function inHoleBreak(){
	fovVal = 40;
	stopTrue();
}
export {theta,beforeHit,useOrb,countSwingReset,countSwing}
export {touchStart,touchMove,touchEnd,touchEvent}
export {resetPlayData,setPos,replayAll,resetCameraAngle,inHoleBreak}
export {fovX}