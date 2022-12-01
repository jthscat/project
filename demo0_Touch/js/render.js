import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import {balls,steve,inholeSoundBuffer} from './main.js'
import {useOrb,countSwing,resetPlayData,replayAll,resetCameraAngle,fovX,inHoleBreak,moveMode,aimModeChange,setOther} from './touchEvent.js'
import {portalsRenderer} from './portal.js'
import {createMultiMaterialObject} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/utils/SceneUtils.js';
import {setClassVisible} from './buildTerrain.js';

var look = false;
var cameraOnPlayer,cameraForMap,cameraHUD,cameraOrbit,cameraOnBall,scene,sceneHUD,sceneMap,renderer;
var controls;

var textureHUD1,textureHUD2,textureHUD3;
var startButton;

var start = false;
var switchCameraButton, cameraButton1, cameraButton2, cameraButton3, cameraButtons = new THREE.Group();
var switchCamera = 1;

var cameraSlider;
var sliderGroup;
var isOpen = false;

var scores = [];
var manipulateButton = new THREE.Group();
var levelChangeButton = new THREE.Group();

var isOver = false;
var levelPos =  [new THREE.Vector3(0,1,10),new THREE.Vector3(0,2,-135),new THREE.Vector3(250,81,-300)]

var level = 1;
var sign1,sign2,sign3;


var gearButton,replayGroup = new THREE.Group();

var modeChose = false, mode = -1;
var levelChose = true;
var chooseLevelButton = new THREE.Group();


var i = 0;
var sign = 1;
var sceneLoading,cameraLoading;
var inLoading = false;
var loadingOpened = false
var loadingClosing = false;
var chooseHoles,whichHoles;

var ballMoveMode = false;
var ballMoveControl = new THREE.Group();

var vec = new THREE.Vector3();
var hintPages = 0;
var hintPagePress = false;
var hintPage = [];

var context = new AudioContext();

function render() {
  renderer.setScissorTest(false);
  var WW = window.innerWidth;
  var HH = window.innerHeight;
  var WWPlus = window.innerWidth / 100;
  var HHPlus = window.innerHeight / 100;
	  if (levelChose) {
		if(switchCamera - 1 === 0){
			look = false
			//portalsRenderer(cameraOnPlayer,false);
			renderer.render(scene,cameraOnPlayer);
		}
		else if(switchCamera - 1 === 1){
			look = false
			cameraOnBall.lookAt(balls[0].pos)
			
			//portalsRenderer(cameraOnBall,false);
			renderer.render(scene,cameraOnBall);
		}
		else if(switchCamera - 1 === 2){
			if (!look) {
			  cameraOrbit.position.copy(cameraOnPlayer.localToWorld(new THREE.Vector3(0,0,0)))
			  cameraOrbit.lookAt(balls[0].pos)
			  controls.target.copy(balls[0].pos.clone())
			  controls.update();
			  look = !look;
			}
			//portalsRenderer(cameraOrbit,false);
			renderer.render(scene,cameraOrbit);
		}
	  } 
	  else{
		  renderer.render(sceneMap, cameraForMap)
	  }
  renderer.render(sceneHUD, cameraHUD);
  if(inLoading){
	if(!loadingOpened)
		loadingOpen(WW,WWPlus)
	if(loadingClosing)
		loadingClose(WWPlus)
	
	renderer.setScissorTest(true);
	renderer.setScissor(WW / 2 - WWPlus*i / 2, HH / 2 - HHPlus *i /2, WWPlus*i, HHPlus *i );
	renderer.render(sceneLoading, cameraLoading);  
  }
    

}
function buildCamAndSen(){
  
  scene = new THREE.Scene();
  var textureLoader = new THREE.TextureLoader();
  var texture = textureLoader.load('https://i.imgur.com/JHaU4X4.jpg');
  
  scene.background = texture;
  //scene.fog = new THREE.FogExp2( 0x21384f, 0.0050,1000);
  //scene.background = new THREE.Color( 0x21384f );
  sceneHUD = new THREE.Scene();
  sceneMap = new THREE.Scene();
  //sceneMap.background = texture;
  sceneMap.background = new THREE.Color( 0xf5f37f );
  sceneLoading = new THREE.Scene();

  var amblight = new THREE.AmbientLight(0x255483); // soft white light
  scene.add(amblight);
  amblight.intensity=0.7
  
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  //renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.localClippingEnabled = true;
  
  cameraOnPlayer = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
  cameraOnPlayer.position.set(0, 30, 70);
  cameraOnPlayer.lookAt(0, 5.68, 10);
  
  
  cameraForMap = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  cameraForMap.position.set(0, 200, 600);
  cameraForMap.lookAt(0, 5.68, 10);

  cameraHUD = new THREE.OrthographicCamera(-10, 10, 10, -10, -10, 1600);
  cameraHUD.position.z = 1580;
  
  cameraLoading = new THREE.OrthographicCamera(-10, 10, 10, -10, -10, 1600);
  cameraLoading.position.z = 1580;  
  
  cameraOrbit = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
  cameraOrbit.position.set(0, 30, 70);
  cameraOrbit.lookAt(0,1,10);
  
  cameraOnBall = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
  cameraOnBall.position.set(0, 30, 70);
  cameraOnBall.lookAt(0,1,10);
  
  controls = new OrbitControls(cameraOrbit, renderer.domElement);
    
  renderer.autoClear = false;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  let loader3 = new THREE.TextureLoader();
  var texture4 = loader3.load("https://i.imgur.com/PegGW4D.png")
  var startButtonMaterial = new THREE.MeshBasicMaterial({
	  opacity: 1,
	  alphaTest:0.5,
	  transparent: true,
	  depthTest: false,
	  depthWrite: false,
	  map: texture4});
  startButton = new THREE.Mesh(new THREE.PlaneGeometry(12, 8), startButtonMaterial);
  startButton.position.set(0, 0, 0);
  //startButton.visible = false////////////////////////////////////////////////////////////////////////////////////////////////////////
  sceneHUD.add(startButton)
  buildHUD()
  
  //洞標
	let loader1 = new THREE.TextureLoader();
  loader1.crossOrigin = '';
  var texture1 = loader1.load('https://i.imgur.com/E3yqlrK.png');

  var texMat1 = new THREE.MeshBasicMaterial({
    map: texture1,
    //transparent: true
    alphaTest: 0.5,
	side:THREE.DoubleSide
  });

  sign1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 20), texMat1);
  sign1.position.set(-10,5,100);
  sign1.rotation.y = Math.PI / 9
  scene.add(sign1);
  
  
  let loader2 = new THREE.TextureLoader();
  loader2.crossOrigin = '';
  var texture2 = loader2.load('https://i.imgur.com/62bVwfm.png');

  var texMat2 = new THREE.MeshBasicMaterial({
    map: texture2,
    //transparent: true
    alphaTest: 0.5,
	side:THREE.DoubleSide
  });

	sign2 = new THREE.Mesh(new THREE.PlaneGeometry(10, 20), texMat2);
	sign2.position.set(-10,5,-125);
	sign2.rotation.y = Math.PI / 9
	scene.add(sign2);
  
  
  let loader4 = new THREE.TextureLoader();
  loader4.crossOrigin = '';
  var texture4 = loader3.load('https://i.imgur.com/gGw3I9S.png');

  var texMat3 = new THREE.MeshBasicMaterial({
    map: texture4,
    //transparent: true
    alphaTest: 0.5,
	side:THREE.DoubleSide
  });

	sign3 = new THREE.Mesh(new THREE.PlaneGeometry(10, 20), texMat3);
	sign3.position.set(230,85,-310);
	sign3.rotation.y = -Math.PI / 2 + Math.PI / 9;
	//scene.add(sign3);
  
  
  
}
function buildHUD(){
	////計分板
        var textureloader = new THREE.TextureLoader();
        // load a resource
        textureHUD1 = textureloader.load(
        // URL ...
        'https://i.imgur.com/humdukl.jpg',
        // onLoad ...
        function(textureHUD1) {
        // do something with the texture
        // Plane with default texture coordinates [0,1]x[0,1]
        },
            undefined, // onProgress
        // onError ...
        function(xhr) {
          console.log('An error happened');
        }
        );
        var texMat1 = new THREE.MeshBasicMaterial({
             opacity: 1,
             transparent: true,
             depthTest: false,
             depthWrite: false,
             map: textureHUD1
        });
        
        
        var score1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 2), texMat1);
        textureHUD1.wrapS = THREE.RepeatWrapping;
        textureHUD1.wrapT = THREE.RepeatWrapping;
        textureHUD1.repeat.set (1,1/12);
		textureHUD1.offset.x = 0;
		textureHUD1.offset.y = 11/12;
		
        score1.position.set(-5, 9, 102);
        sceneHUD.add(score1);

        // load a resource
        textureHUD2 = textureloader.load(
        // URL ...
        'https://i.imgur.com/8ec7043.jpg',
        // onLoad ...
        function(textureHUD2) {
        // do something with the texture
        // Plane with default texture coordinates [0,1]x[0,1]
        },
            undefined, // onProgress
        // onError ...
        function(xhr) {
          console.log('An error happened');
        }
        );
        var texMat2 = new THREE.MeshBasicMaterial({
             opacity: 1,
             transparent: true,
             depthTest: false,
             depthWrite: false,
             map: textureHUD2
        });
        
        
        var score2 = new THREE.Mesh(new THREE.PlaneGeometry(10, 2), texMat2);
        textureHUD2.wrapS = THREE.RepeatWrapping;
        textureHUD2.wrapT = THREE.RepeatWrapping;
        textureHUD2.repeat.set (1,1/12);
		textureHUD2.offset.x = 0;
		textureHUD2.offset.y = 11/12;
		
        score2.position.set(-5, 9, 101);
        sceneHUD.add(score2);

        // load a resource
        textureHUD3 = textureloader.load(
        // URL ...
        'https://i.imgur.com/2NqRqm5.jpg',
        // onLoad ...
        function(textureHUD3) {
        // do something with the texture
        // Plane with default texture coordinates [0,1]x[0,1]
        },
            undefined, // onProgress
        // onError ...
        function(xhr) {
          console.log('An error happened');
        }
        );
        var texMat3 = new THREE.MeshBasicMaterial({
             opacity: 1,
             transparent: true,
             depthTest: false,
             depthWrite: false,
             map: textureHUD3
        });
        
        
        var score3 = new THREE.Mesh(new THREE.PlaneGeometry(10, 2), texMat3);
        textureHUD3.wrapS = THREE.RepeatWrapping;
        textureHUD3.wrapT = THREE.RepeatWrapping;
        textureHUD3.repeat.set (1,1/12);
		textureHUD3.offset.x = 0;
		textureHUD3.offset.y = 11/12;
		
        score3.position.set(-5, 9, 100);
        sceneHUD.add(score3);
		scores.push(score1,score2,score3)
		for(var k = 0; k < scores.length; k++){
			scores[k].visible = false;
		}
	////Camera按鈕
		var texture5 = textureloader.load("https://i.imgur.com/dhvNfiN.png")
		var switchCameraButtonMaterial = new THREE.MeshBasicMaterial({
			opacity: 1,
			alphaTest:0.5,
			transparent: true,
			depthTest: false,
			depthWrite: false,
			map: texture5});

		switchCameraButton = new THREE.Mesh(new THREE.PlaneGeometry(4, 2),switchCameraButtonMaterial)
		switchCameraButton.position.set(8,9,0);
		
		cameraButton1 = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.25),switchCameraButtonMaterial)
		cameraButton1.position.set(4.5,9.1,0);
		cameraButton1.scale.set(0.8,0.8,0.8)

		cameraButton2 = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.25),switchCameraButtonMaterial)
		cameraButton2.position.set(4.8,7.5,0);
		
		cameraButton3 = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.25),switchCameraButtonMaterial)
		cameraButton3.position.set(8.1,7.3,0);
		
		cameraButtons.add(switchCameraButton,cameraButton1,cameraButton2,cameraButton3)
		sceneHUD.add(cameraButtons)
		cameraButtons.visible = false;
		for(var k = 1; k < cameraButtons.children.length; k++)
			cameraButtons.children[k].visible = false;
		
	////fov縮放滑條
	  var shape1 = new THREE.Shape();
	  shape1.moveTo(0, 10);
	  shape1.absarc(-7, 0, 3, Math.PI / 3 * 2, Math.PI / 3 * 4, false);
	  shape1.lineTo(8.5, -2.6)
	  shape1.absarc(7, 0, 3, Math.PI / 3 * 5, Math.PI / 3, false);
	  shape1.lineTo(-8.5, 2.6)

	  var holePath = new THREE.Path();
	  holePath.moveTo(0, -10);

	  holePath.absarc(-7.0, 0, 2.5, Math.PI / 3 * 2, Math.PI / 3 * 4, false);
	  holePath.lineTo(8.5, -2.1)
	  holePath.absarc(7.0, 0, 2.5, Math.PI / 3 * 5, Math.PI / 3, false);
	  holePath.lineTo(-8.5, 2.1)
	  shape1.holes.push(holePath);

	  var extrudeSettings1 = {};
	  var mesh1 = new THREE.Mesh(new THREE.ExtrudeGeometry(shape1, extrudeSettings1), new THREE.MeshBasicMaterial({
		color: 0x00AA00,
		shininess: 200,
	  }));
	  mesh1.position.z = 10
	  
	  var board = new THREE.Mesh(new THREE.PlaneGeometry(20,6),new THREE.MeshBasicMaterial({color:0xAAAAAA}))
	  board.position.z = -10
	  var click = new THREE.Mesh(new THREE.PlaneGeometry(6,2),new THREE.MeshBasicMaterial({color:0x444444}))
	  click.position.y = 4;
	  //var ball = new THREE.Mesh(new THREE.SphereGeometry(0.5),new THREE.MeshBasicMaterial({color:0xffffff}))
	  var ball = new THREE.Mesh(new THREE.ConeGeometry(0.5,0.5,32),new THREE.MeshBasicMaterial({color:0xffffff}))
	  ball.position.y = 4
	  
	  var texture = textureloader.load("https://i.imgur.com/eH3hFaS.png")
	  var FOVMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture});
	  cameraSlider = new THREE.Mesh(new THREE.CircleGeometry(2.0,32),FOVMaterial);

	  sliderGroup = new THREE.Group();
	  sliderGroup.add(mesh1,cameraSlider,ball,click,board)
	  sliderGroup.scale.set(1,0.5,1)
	  sliderGroup.position.set(0,-11.5,200)
	  sliderGroup.onTop = false;
	  ///操控
	  var texture6 = textureloader.load("https://i.imgur.com/RZ7HuLd.png")
	  var arrowMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture6});
	  
	  var arrow = new THREE.Mesh(new THREE.PlaneGeometry(8, 4),arrowMaterial)
	  arrow.position.set(-6,0.2,0);
	  
	  var texture7 = textureloader.load("https://i.imgur.com/X0fOF3h.png")
	  var arrowMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture7});

	  var arrow1 = new THREE.Mesh(new THREE.PlaneGeometry(8, 4),arrowMaterial)
	  arrow1.position.set(6,0.2,0);
	  sceneHUD.add(arrow,arrow1);
	  var texture8 = textureloader.load("https://i.imgur.com/eHdPwDG.png")
	  var arrowMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture8});
		
		var textureChoose = textureloader.load("https://i.imgur.com/k2jGSlw.png")
		var chooseMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: textureChoose});
		

	  var swingButton = new THREE.Mesh(new THREE.PlaneGeometry(6, 1.8),arrowMaterial)
	  swingButton.position.set(0,0,0);
	  
	  var chooseButton = new THREE.Mesh(new THREE.PlaneGeometry(6, 1.8),chooseMaterial)
	  chooseButton.position.set(0,0,0);
	  
	  manipulateButton.add(arrow,arrow1,swingButton);
	  manipulateButton.position.y = 7
	  manipulateButton.scale.set(1,2,1)
	  sliderGroup.add(manipulateButton.clone())
	  
	  manipulateButton.scale.set(1,1,1)
	  swingButton.visible = false;
	  manipulateButton.position.y = -8;
	  manipulateButton.add(chooseButton);
	  
	  sceneHUD.add(sliderGroup,manipulateButton)
	  
	  sliderGroup.visible = false;
	  manipulateButton.visible = false;
	   /// 齒輪
	
		var texture15 = textureloader.load("https://i.imgur.com/hPNtuny.png")
		var gearMaterial = new THREE.MeshBasicMaterial({
			opacity: 1,
			alphaTest:0.5,
			transparent: true,
			depthTest: false,
			depthWrite: false,
			map: texture15});
		gearButton = new THREE.Mesh(new THREE.PlaneGeometry(2,2),gearMaterial);
		gearButton.position.set(-8.9,9.5,500);
		gearButton.scale.set(1,0.5,1)
		sceneHUD.add(gearButton)
		gearButton.visible = false;
		
	  ///replay Button
	  var texture2 = textureloader.load("https://i.imgur.com/Y7SXNIN.png")
	  var replay1Material = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture2});
	  var texture3 = textureloader.load("https://i.imgur.com/aUG7vH9.png")
	  var replay2Material = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture3});
		
	  var textureAim = textureloader.load("https://i.imgur.com/tPJjSqq.png")
	  var aimMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: textureAim});

	  var textureHint = textureloader.load("https://i.imgur.com/S4OLZLK.png")
	  var hintMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: textureHint});
		
	  var aimButton = new THREE.Mesh(new THREE.PlaneGeometry(3.5,1),aimMaterial);
	  aimButton.position.set(-6.5,5.3,500);
	  //aimButton.scale.set(1,0.5,1)
		
	  var gearBoard = new THREE.Mesh(new THREE.PlaneGeometry(9,2.8),new THREE.MeshBasicMaterial({color:0xAAAAAA}))
	  gearBoard.position.set(-4.4,6.0,300)
	  
	  var replay1Button = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1),replay1Material)
	  replay1Button.position.set(-6.5,6.6,100);
	  
	  var replay2Button = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 1),replay2Material)
	  replay2Button.position.set(-2.5,6.6,100);

	  var hintButton = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 1),hintMaterial)
	  hintButton.position.set(-2.5,5.3,100);
	  
	  replayGroup.add(gearBoard,replay1Button,replay2Button,aimButton,hintButton)
	  replayGroup.visible = false;
	  replayGroup.position.set(0,2,0)
	  sceneHUD.add(replayGroup)
	  
	/// 進球後
	
	var texture13 = textureloader.load("https://i.imgur.com/Bz90jwT.png")
	var nextLevelMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture13});

	var texture14 = textureloader.load("https://i.imgur.com/JqLutbX.png")
	var watchReplayMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture14});
		
	var nextLevelButton = new THREE.Mesh(new THREE.PlaneGeometry(7,2.5),nextLevelMaterial);
	nextLevelButton.position.set(5,0,100);
	var watchReplayButton = new THREE.Mesh(new THREE.PlaneGeometry(7,2.5),watchReplayMaterial);
	watchReplayButton.position.set(-5,0,100);

	var textureSelect = textureloader.load("https://i.imgur.com/p4ycMph.png")
	var selectMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: textureSelect});
		
	var selectButton = new THREE.Mesh(new THREE.PlaneGeometry(7,2.5),selectMaterial);
	selectButton.position.set(5,0,100);
	
	levelChangeButton.add(watchReplayButton,nextLevelButton,selectButton)
	sceneHUD.add(levelChangeButton)
	levelChangeButton.visible = false;
	/// modeChoose
	
	var textureMode = textureloader.load("https://i.imgur.com/2RvgFys.png")
	var modeMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: textureMode});	

	var texturePractice = textureloader.load("https://i.imgur.com/ckhlDxg.png")
	var practiceMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texturePractice});
		
	var texturePlay = textureloader.load("https://i.imgur.com/KIy07mB.png")
	var playMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texturePlay});	
		
	var modeButton = new THREE.Mesh(new THREE.PlaneGeometry(10, 6),modeMaterial);
    modeButton.position.set(0, 2, 0);
	
	var practiceButton = new THREE.Mesh(new THREE.PlaneGeometry(8, 2), practiceMaterial);
    practiceButton.position.set(-5, -2.5, 0);	
	
	var playButton = new THREE.Mesh(new THREE.PlaneGeometry(8, 2), playMaterial);
    playButton.position.set(5, -2.5, 0);
		
	chooseLevelButton.add(modeButton,practiceButton,playButton)
	chooseLevelButton.visible = false;
	sceneHUD.add(chooseLevelButton)
	//第幾關+par
	parAndHole();
	// loading
	let textureLoad= textureloader.load('https://i.imgur.com/XjJUoNb.png')
	let loadMaterial = new THREE.MeshBasicMaterial({
		map:textureLoad,
		opacity: 1,
        transparent: true,
	})
	let load = new THREE.Mesh(new THREE.PlaneGeometry(20,20),loadMaterial)
	load.position.z = 900
	sceneLoading.add(load)
	// ball move Button
	
	let perpleArrowTexture = textureloader.load("https://i.imgur.com/8dUcgUV.png")
	let perpleArrowMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: perpleArrowTexture});
	  
	let perpleArrow = new THREE.Mesh(new THREE.PlaneGeometry(5, 2),perpleArrowMaterial)
	perpleArrow.position.set(4.5,0,0);
	ballMoveControl.add(perpleArrow.clone());
	perpleArrow.rotation.z = Math.PI;
	
	perpleArrow.position.set(-4.5,0,0);
	ballMoveControl.add(perpleArrow.clone());
	
	perpleArrow.scale.set(0.5,2,1);
	perpleArrow.position.set(0,-2.25,0);
	perpleArrow.rotation.z = -Math.PI/2;
	ballMoveControl.add(perpleArrow.clone());
	
	perpleArrow.position.set(0,2.25,0);
	perpleArrow.rotation.z = Math.PI/2;
	ballMoveControl.add(perpleArrow.clone());

	

	//https://i.imgur.com/KzOa1Ue.png
	let setTexture = textureloader.load("https://i.imgur.com/KzOa1Ue.png");
	
	let setButtonMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: setTexture});
		
	let setButton = new THREE.Mesh(new THREE.PlaneGeometry(2, 2),setButtonMaterial)
	setButton.scale.set(2,1,1);
	
	let upTexture = textureloader.load("https://i.imgur.com/iMKdBln.png");
	let upButtonMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: upTexture});
	let upButton = new THREE.Mesh(new THREE.PlaneGeometry(5, 2),upButtonMaterial)	
	upButton.position.set(-6,-2.5,0)
	
	let downTexture = textureloader.load("https://i.imgur.com/1Suvg84.png")
	let downButtonMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: downTexture});
	let downButton = new THREE.Mesh(new THREE.PlaneGeometry(5, 2),downButtonMaterial)	
	downButton.position.set(6,-2.5,0)
	
	ballMoveControl.add(setButton,upButton,downButton);
	ballMoveControl.position.set(0,-6,0);
	sceneHUD.add(ballMoveControl);
	ballMoveControl.visible = false;
	// buildHint
	buildHint()
	//hintPage[0].visible = true;
}
function HUDPress(){
	
	event.preventDefault();
	var touch = new THREE.Vector2();
	touch.x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
    touch.y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
	//console.log(touch.x,touch.y)
	if(Math.abs(touch.x) <= 0.4 && Math.abs(touch.y) <= 0.4){
	    if(start === false){
			start = true;
			var source = context.createBufferSource();
            source.buffer = inholeSoundBuffer;
            source.connect(context.destination);
            source.start();
			startButton.visible = false
			switchCamera = 1;
			chooseLevelButton.visible = true;
		}
	}
	else if(start === true && modeChose === false){
		if(between(touch.x,1,0.02) && between(touch.y,-0.1,-0.33)){
			balls[0].start();
			balls[1].start();
			steve.start();
			modeChose = true;
			mode = 0 // 標準
			level = 1;
			levelChangeButton.children[2].visible = false;
			chooseLevelButton.visible = false;
			
			//cameraButtons.visible = true;
			sliderGroup.visible = true;
			//gearButton.visible = true;
		}
		else if (between(touch.x,-0.1,-1) && between(touch.y,-0.1,-0.33)){
			modeChose = true;
			mode = 1 // 練習
			levelChangeButton.children[1].visible = false;
			levelChose = false;
			chooseLevelButton.visible = false;
			manipulateButton.visible = true;
		}
	}
	if(ballMoveMode){//ballMoveControl
		let FB = new THREE.Vector3(cameraOnPlayer.localToWorld(new THREE.Vector3()).x,balls[0].pos.y,cameraOnPlayer.localToWorld(new THREE.Vector3()).z);
		FB.copy(balls[0].pos.clone().sub(FB).normalize()).multiplyScalar(0.5);
		//LR.sub(cameraOnPlayer.position).normalize();
		let LR = FB.clone().applyAxisAngle(new THREE.Vector3(0,1,0),Math.PI/2).multiplyScalar(0.5);
		if(between(touch.x,-0.27,-0.75) && between(touch.y,-0.46,-0.67)){//左
			vec.copy(LR)
			return 7;
		}
		else if (between(touch.x,0.64,0.17) && between(touch.y,-0.46,-0.67)){//右
			vec.copy(LR.negate())
			return 7;
		}
		else if	(between(touch.x,0.15,-0.26) && between(touch.y,-0.21,-0.46)){//前
			vec.copy(FB)
			return 7;
		}
		else if	(between(touch.x,0.15,-0.26) && between(touch.y,-0.69,-0.92)){//後
			vec.copy(FB.negate())
			return 7;
		}
		else if (between(touch.x,-0.37,-0.92) && between(touch.y,-0.71,-0.93)){//上
			vec.copy(new THREE.Vector3(0,0.5,0))
			return 7;
		}
		else if (between(touch.x,0.82,0.27) && between(touch.y,-0.71,-0.93)){//下
			vec.copy(new THREE.Vector3(0,-0.5,0))
			return 7;
		}
		else if (between(touch.x,0.17,-0.27) && between(touch.y,-0.46,-0.69)){//確定
			balls[0].useG = true;
			ballMoveMode = false;
			ballMoveControl.visible = false
			sliderGroup.visible = true;
		}
		
	}
	if(start && modeChose && levelChose && !inLoading && !ballMoveMode && !hintPagePress){//開始玩的操作
		if(isOver === false){
			///Camera按鈕
			if(touch.x >= 0.6 && touch.y >= 0.84){
				if(!isOpen){
					cameraButtons.children[0].scale.set(0.8,0.8,0.8);
					for(var k = 1; k < cameraButtons.children.length; k++)
						cameraButtons.children[k].visible = true;
					isOpen = !isOpen;
				}
				else{
					for(var k = 1; k < cameraButtons.children.length; k++)
						cameraButtons.children[k].visible = false;
					cameraButtons.children[0].scale.set(1,1,1);
					isOpen = !isOpen;
				}
				return 1;
			}
			///gear pressed
			if(mode === 1){
				if(between(touch.x,-0.82,-1) && between(touch.y,1,0.92)){
					if(replayGroup.visible === false){
						gearButton.scale.set(0.6,0.3,0.6)
						replayGroup.visible = true;
					}
					else{
						gearButton.scale.set(1,0.5,1)
						replayGroup.visible = false;		
					}
				}
				/// select level or move ball
				else if(replayGroup.visible === true){
					if(between(touch.x,-0.5,-0.9) && between(touch.y,0.94,0.81)){//從選關
						
						balls[0].choose = true;
						balls[0].start();
						balls[1].start();
						levelChose = false;
						levelChangeButton.visible = false;
						sliderGroup.visible = false;
						manipulateButton.visible = true;					
						isOver = false;
						steve.camera.children[0].fov = 40 + fovX * 2
						steve.direct.children[3].children[0].fov = 40 + fovX * 2;
						steve.camera.children[0].updateProjectionMatrix();
						steve.direct.children[3].children[0].updateProjectionMatrix();
						balls[0].runInHole = false
						inHoleBreak();
						chooseHoles[level-1].visible = true
						
						gearButton.visible = false;
						gearButton.scale.set(1,0.5,1)
						replayGroup.visible = false;
						
					}
					if(between(touch.x,-0.1,-0.5) && between(touch.y,0.94,0.81)){//球移動
						ballMoveMode = true;
						balls[0].useG = false;
						balls[0].vel.set(0,0,0);
						sliderGroup.visible = false;
						ballMoveControl.visible =  true;
						
					}
					if(between(touch.x,-0.5,-0.9) && between(touch.y,0.81,0.62)){//瞄準模式
						aimModeChange();
					}
					if(between(touch.x,-0.1,-0.5) && between(touch.y,0.81,0.62)){
						hintPagePress = true;
					}
				}
			}
			if(false){
				for(var k = 1; k < cameraButtons.children.length; k++)
					cameraButtons.children[k].scale.set(1,1,1);
				if(isOpen){
					if (touch.y >= 0.86 && between(touch.x,0.55,0.24)){
						switchCamera = 1
						cameraButtons.children[switchCamera].scale.set(0.6,0.6,0.6);
						return 1;	
					}
					else if (between(touch.y,0.86,0.70) && between(touch.x,0.76,0.27)){
						switchCamera = 2
						cameraButtons.children[switchCamera].scale.set(0.6,0.6,0.6);
						return 1;
					}
					else if (between(touch.y,0.84,0.68) && touch.x > 0.76){
						
						switchCamera = 3
						cameraButtons.children[switchCamera].scale.set(0.6,0.6,0.6);
						
						return 1;		
					}
				}
				cameraButtons.children[switchCamera].scale.set(0.6,0.6,0.6);
				if(switchCamera === 3){
					return -1;
				}
			}
			///滑條
			if(true){
				if(touch.y <= -0.75 && sliderGroup.onTop === true){
					
					return 1;		
				}
				else if(between(touch.x,0.25,-0.36) && between(touch.y,-0.57,-0.67) && sliderGroup.onTop === true){
					sliderGroup.onTop = false;
					
					return 1;
				}
				else if( between(touch.x,0.25,-0.36) && touch.y <= -0.86 && sliderGroup.onTop === false){
				sliderGroup.onTop = true;
				
				return 1;
			}
			}
			/// 操作
			if(true){
				if(sliderGroup.onTop === false && touch.x <= -0.38 && between(touch.y,-0.67,-0.86)){
					return 2;
				}
				else if (sliderGroup.onTop === false && touch.x >= 0.38 && between(touch.y,-0.67,-0.86)){
					return 3;
				}
				else if (sliderGroup.onTop === false && between(touch.x,0.38,-0.38) && between(touch.y,-0.67,-0.86)){
					return 4;
				}
				else if (sliderGroup.onTop === true && touch.x <= -0.38 && between(touch.y,-0.38,-0.57)){
					return 2;
				}
				else if (sliderGroup.onTop === true && touch.x >= 0.38 && between(touch.y,-0.38,-0.57)){
					return 3;
				}
				else if (sliderGroup.onTop === true && between(touch.x,0.38,-0.38) && between(touch.y,-0.38,-0.57)){
					return 4;
				}
			}			
			return 0;
		} 
		else{
			if(mode === 0){
				if(between(touch.x,-0.17,-0.97) && between(touch.y,0.2,-0.145)){
					balls[0].choose = true;
					levelChangeButton.visible = false;
					replayAll()
				}
				else if(between(touch.x , 0.82, 0.05) && between(touch.y,0.2,-0.145)){
					playLoading();
				}
			}
			else if (mode === 1){
				if(between(touch.x,-0.17,-0.97) && between(touch.y,0.2,-0.145)){//回放
					balls[0].choose = true;
					levelChangeButton.visible = false;
					replayAll()
				}
				else if(between(touch.x , 0.82, 0.05) && between(touch.y,0.2,-0.145)){//下一關
					balls[0].choose = true;
					balls[0].start();
					balls[1].start();
					levelChose = false;
					levelChangeButton.visible = false;
					sliderGroup.visible = false;
					manipulateButton.visible = true;					
					isOver = false;
					steve.camera.children[0].fov = 40 + fovX * 2
					steve.direct.children[3].children[0].fov = 40 + fovX * 2;
					steve.camera.children[0].updateProjectionMatrix();
					steve.direct.children[3].children[0].updateProjectionMatrix();
					balls[0].runInHole = false
					inHoleBreak();
					chooseHoles[level-1].visible = true
				}
			}
		}
	}
	if(levelChose === false && mode === 1){//選關
		if(touch.x >= 0.38 && between(touch.y,-0.67,-0.86)){//右切
			level++;
			if(level === 4){
				level = 1;
			}
			setClassVisible(level)
		}
		else if(touch.x <= -0.38 && between(touch.y,-0.67,-0.86)){//左切
			level--;
			if(level === 0){
				level = 3;
			}
			setClassVisible(level)
		}
		else if(between(touch.x,0.38,-0.38) && between(touch.y,-0.67,-0.86)){//確定
			levelChose = true;
			if(level === 1)
				balls[0].pos.copy(new THREE.Vector3(0,2,100));
			else if (level === 2)
				balls[0].pos.copy(new THREE.Vector3(25,2,-135));
			else if (level === 3)
				balls[0].pos.copy(new THREE.Vector3(300,21,-290));
			balls[1].pos.copy(balls[0].pos)
			balls[0].vel.set(0,0,0);
			balls[1].vel.set(0,0,0);
			steve.start();
			//cameraButtons.visible = true;
			sliderGroup.visible = true;
			gearButton.visible = true;
			manipulateButton.visible = false;
			resetCameraAngle();
			resetPlayData(level);
			for (let k = 0; k < chooseHoles.length; k++){
				chooseHoles[k].visible = false;
			}
			return
		}
		for (let k = 0; k < chooseHoles.length; k++){
			chooseHoles[k].visible = false;
			if(k === level - 1){
				chooseHoles[k].visible = true
			}
		}
	}
	if(hintPagePress){
		if(between(touch.x,0.93,0.72) && between(touch.y,0.5,0.38)){
			hintPagePress = false;
			for(let i = 0; i < 4; i++)
				hintPage[i].visible = false;
			hintPages = 0;
			return;
		}
		else if (hintPages !== 0 && between(touch.y,0.04,-0.13) && between(touch.x,-0.89,-1)){
			hintPages--;
			
		}
		else if (hintPages !== 3 && between(touch.y,0.04,-0.13) && between(touch.x, 1,0.81)){
			hintPages++;
		}
		for(let i = 0; i < 4; i++){
			if(hintPages === i)
				hintPage[i].visible = true;
			else
				hintPage[i].visible = false;
		}
	}
	
}
function textureAnimate() {
	if(levelChose){
		if(start && modeChose && mode === 0){
			for (var i = 0; i < 3; i++){
				if(i + 1 === level)
				{
					scores[i].visible = true;
					continue;
				}
				scores[i].visible = false;
			}
			if(level === 1){
				if (textureHUD1 !== undefined){
					textureHUD1.offset.y = (12-countSwing)/12;
				}
			}
			else if (level === 2){
				if (textureHUD2 !== undefined){
					textureHUD2.offset.y = (12-countSwing)/12;
				}	
			}
			else if (level === 3){
				if (textureHUD3 !== undefined){
					textureHUD3.offset.y = (12-countSwing)/12;
				}	
			}
		}
	}
	else{
		for (var i = 0; i < 3; i++){
			scores[i].visible = false;
		}		
	}
}
function HUDForInHole(){
	levelChangeButton.visible = true;
	isOver = true;
}
function between(val,big,small){
	var t = true, f = false;
	if(val <= big && val > small)
		return t;
	return f;
	
}
function nextLevelAction(){
	
}
function playLoading(){
	console.log("剛開")
	inLoading = true;
}
function loadingOpen(WW,WWPlus){
	if( i * WWPlus <= WW){
		i += sign;
	}
	else{
		console.log("開完了")
		loadingOpened = true;
		setState()
		setOther()
		setTimeout(function(){loadingClosing = true; console.log("剛關")},1000)
		sign *= -1;
		
	}
}
function loadingClose(WWPlus){
	if(i * WWPlus >= 0)
		i += sign;
	else{
		console.log("關完了")
		inLoading = false;
		loadingClosing = false;
		loadingOpened = false;
		sign *= -1;
	}
}
function setState(){
	balls[0].choose = true;	
	level++;
	if(level > 3)
		level = 1;
	if(level === 1)
		balls[0].pos.copy(new THREE.Vector3(0,2,10));
	else if (level === 2)
		balls[0].pos.copy(new THREE.Vector3(25,2,-135));
	else if (level === 3)
		balls[0].pos.copy(new THREE.Vector3(400,61,-70));
	resetPlayData(level);
	levelChangeButton.visible = false;
	resetCameraAngle();
	isOver = false;
	steve.camera.children[0].fov = 40 + fovX * 2
	steve.direct.children[3].children[0].fov = 40 + fovX * 2;
	steve.camera.children[0].updateProjectionMatrix();
	steve.direct.children[3].children[0].updateProjectionMatrix();
	balls[0].runInHole = false;
	inHoleBreak();	
}
function parAndHole(){
	chooseHoles = [];
	whichHoles = [];
    let h1loader= new THREE.TextureLoader();
        var h1texture = h1loader.load("https://i.imgur.com/AseSAh2.png")
        var h1Material = new THREE.MeshBasicMaterial({
            opacity: 1,
            alphaTest:0.5,
            depthTest: false,
            depthWrite: false,
            map: h1texture});
        let h1Button = new THREE.Mesh(new THREE.PlaneGeometry(10,5),h1Material);
        h1Button.position.set(0,7.5,0);
        h1Button.visible=false;
        chooseHoles.push(h1Button);
        whichHoles.push(h1Button);
        
        
    let h2loader= new THREE.TextureLoader();
        var h2texture = h2loader.load("https://i.imgur.com/vMJ7SBU.png")
        var h2Material = new THREE.MeshBasicMaterial({
            opacity: 1,
            alphaTest:0.5,
            depthTest: false,
            depthWrite: false,
            map: h2texture});
        let h2Button = new THREE.Mesh(new THREE.PlaneGeometry(10,5),h2Material);
        h2Button.position.set(0,7.5,0);
        h2Button.visible=false;
        chooseHoles.push(h2Button);
        whichHoles.push(h2Button);
        
    
    let h3loader= new THREE.TextureLoader();
        var h3texture = h3loader.load("https://i.imgur.com/N87lxtA.png")
        var h3Material = new THREE.MeshBasicMaterial({
            opacity: 1,
            alphaTest:0.5,
            depthTest: false,
            depthWrite: false,
            map: h3texture});
        let h3Button = new THREE.Mesh(new THREE.PlaneGeometry(10,5),h3Material);
        h3Button.position.set(0,7.5,0);
        h3Button.visible=false;
        chooseHoles.push(h3Button);
        whichHoles.push(h3Button);
    for (let k = 0; k < chooseHoles.length; k++)
		sceneHUD.add(chooseHoles[k]);
    for (let k = 0; k < whichHoles.length; k++){
		whichHoles[k].scale.set(0.5,0.5,0.5)
		whichHoles[k].position.set(7.4,8.7)
		sceneHUD.add(whichHoles[k]);
	}
}
function buildHint(){
        let newbieHUD1 = new THREE.TextureLoader().load('https://i.imgur.com/5ysBkZT.png');
        var ntexMat1 = new THREE.MeshBasicMaterial({
             opacity: 1,
             transparent: true,
             depthTest: false,
             depthWrite: false,
             map: newbieHUD1
        });
        var newbie1 = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), ntexMat1);	
        sceneHUD.add(newbie1);
		newbie1.visible=false;
		
        let newbieHUD2 = new THREE.TextureLoader().load('https://i.imgur.com/NPY8ZRt.png');
        var ntexMat2 = new THREE.MeshBasicMaterial({
             opacity: 1,
             transparent: true,
             depthTest: false,
             depthWrite: false,
             map: newbieHUD2
        });
        var newbie2 = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), ntexMat2);	
        sceneHUD.add(newbie2);
		newbie2.visible=false;
		
        let newbieHUD3 = new THREE.TextureLoader().load('https://i.imgur.com/HHgPSXk.png');
        var ntexMat3 = new THREE.MeshBasicMaterial({
             opacity: 1,
             transparent: true,
             depthTest: false,
             depthWrite: false,
             map: newbieHUD3
        });
        var newbie3 = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), ntexMat3);	
        sceneHUD.add(newbie3);
		newbie3.visible=false;
		
        let newbieHUD4 = new THREE.TextureLoader().load('https://i.imgur.com/lKvI7MU.png');
        var ntexMat4 = new THREE.MeshBasicMaterial({
             opacity: 1,
             transparent: true,
             depthTest: false,
             depthWrite: false,
             map: newbieHUD4
        });
        var newbie4 = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), ntexMat4);	
        sceneHUD.add(newbie4);
		newbie4.visible=false;
	
		hintPage.push(newbie1,newbie2,newbie3,newbie4)
		
}
export {buildCamAndSen,textureAnimate,HUDPress,start,cameraButtons,cameraSlider,sliderGroup}
export {cameraOrbit,cameraOnPlayer,cameraOnBall}
export {scene,sceneMap,render,renderer}
export {HUDForInHole,level,isOver}
export {vec,levelChose,context}