import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {createMultiMaterialObject} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/utils/SceneUtils.js';
import {ParametricGeometry} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/geometries/ParametricGeometry.js';
import {FinitePlane,Wall} from './terrain.js'
import {scene,sceneMap,renderer} from './render.js'
import {class2g} from './main.js'
var bigTable = new THREE.Group(),table1,table2,table3;

var walls = [],holes = [],cylinders = [],planes = [],floors = [],arcWalls = [];

var level1Walls = [] , level2Walls = [] ,level3Walls = []

var class1 = new THREE.Group(),class1Rotate = new THREE.Group();
var class2 = new THREE.Group(),class2Rotate = new THREE.Group();
var class3 = new THREE.Group(),class3Rotate = new THREE.Group();

var obstacle1=new THREE.Group();
var obstacle2=new THREE.Group();
var obstacle3=new THREE.Group();
var car,car2,redhorse2G;
var boxg = new THREE.Group()
var fang = new THREE.Group()
var steveg= new THREE.Group();
var wall49,wall50,wall51;
let smallEraser1 = new THREE.Group(),smallEraser2 = new THREE.Group();
let pressButton;
var quad_uvs =
[
0.4, 0.0,
1.0, 0.0,
1.0, 1.0,
0.0, 1.0
];

let arcWallGroup3;
var textureTest,ctexture;
function buildTerrain(){
	
	buildPlane();
	buildWalls();
	buildholes();
	buildPillar();
	buildfloors();
	buildStoneWall();
	buildArcWalls();
	
	buildGoal()
	bulidMiniWorld()
	
	walls.push(level1Walls,level2Walls,level3Walls)
	
	class1.position.z = 30;
	class1Rotate.add(class1.clone())
	class1.add(bigTable)
	scene.add(class1)
	class1.position.z = 90;
	cylinders.class1Pos = new THREE.Vector3(0,0,90)
	cylinders.y1 = 0;
	
	class2.position.z = 300;
	class2Rotate.add(class2.clone())
	class2.add(bigTable)
	scene.add(class2)
	class2Rotate.scale.set(0.9,0.9,0.9)
	class2.position.z = 0;
	cylinders.class2Pos = new THREE.Vector3(0,0,0)
	cylinders.y2 = 0;
	
	//class3.rotation.x = Math.PI/180 * 10;
	class3Rotate.add(class3.clone())

	class3.add(bigTable)
	scene.add(class3);
	class3.position.set(300,0,-300);
	
	cylinders.class3Pos = new THREE.Vector3(400,0,-200)
	cylinders.y31 = 0;
	cylinders.y32 = 200;
	
	sceneMap.add(class1Rotate,class2Rotate,class3Rotate)
	
	class2Rotate.visible = false;
	class3Rotate.visible = false;
}
function buildStoneWall(){
	var stoneGeometry = new THREE.BoxGeometry(50,5,2.5);
	var stoneGeometry2 = new THREE.BoxGeometry(100,5,2.5);
	var loader = new THREE.TextureLoader();
	var texture = loader.load('https://i.imgur.com/euhOAfo.jpg');

	var stoneMaterial = new THREE.MeshPhongMaterial({
      color: 0x8c8f8d,side:THREE.DoubleSide})
	var stoneWall1 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	stoneWall1.position.set(-25,-2.51,-30);
	stoneWall1.rotation.y = -Math.PI / 2;
	
	var stoneWall2 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	stoneWall2.position.set(75,-2.51,-30);
	stoneWall2.rotation.y = -Math.PI / 2;
	
	var stoneWall3 = new THREE.Mesh(stoneGeometry,stoneMaterial);
	stoneWall3.position.set(0,-2.51,20);
	
	var stoneWall4 = new THREE.Mesh(stoneGeometry,stoneMaterial);
	stoneWall4.position.set(50,-2.51,20);
	
	var arcStoneWall1 = new THREE.Mesh(new THREE.CylinderGeometry(51.25,51.25,5,32,32,true,Math.PI/2,Math.PI),stoneMaterial)
	arcStoneWall1.position.set(25,-2.5,-80)
	
	var arcStoneWall2 = new THREE.Mesh(new THREE.CylinderGeometry(48.75,48.75,5,32,32,true,Math.PI/2,Math.PI),stoneMaterial)
	arcStoneWall2.position.set(25,-2.5,-80)
	
	let mesh = new THREE.Mesh(new THREE.RingGeometry( 48.75, 51.25, 32,1,0,Math.PI),stoneMaterial);
	mesh.rotation.x = -Math.PI /2;
	mesh.position.set(25,0,-80)
	
	
	class1.add(stoneWall1,stoneWall2,stoneWall3,stoneWall4,arcStoneWall1,arcStoneWall2,mesh)
	
}
function buildPlane(){
  let plane;
  table1 = new THREE.Group();
  scene.add(table1);
  table1.updateMatrixWorld()
	/*
  
  
  var loader2 = new THREE.TextureLoader();
  loader2.setCrossOrigin('');
  //test light map
  
  //var textureTest1 = loader2.load('https://i.imgur.com/tuIeXbi.png');  
  //var textureTest1 = loader2.load('https://i.imgur.com/PnIgpqe.png'); 漸層 
  //var textureTest1 = loader2.load('https://i.imgur.com/D2mGAc6.png');  漸層黑底
  //var textureTest1 = loader2.load('https://i.imgur.com/L55ESsM.png');  //漸層透明黑底
  //var textureTest1 = loader2.load('https://i.imgur.com/FTs5YQj.png');  //漸層透明黑底縮寬度
   textureTest1 = loader2.load('https://i.imgur.com/FyMwBQ8.png');  //漸層透明黑底縮寬度
  
  
  let material1 = new THREE.MeshBasicMaterial({
        map: textureTest1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
  });
  let material2 = new THREE.MeshBasicMaterial({
        color: 0x006000,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1
  });
  let ground = new THREE.PlaneGeometry(50, 50)
  
  let floor = createMultiMaterialObject(ground, [material2, material1]);
   textureTest1.wrapS = THREE.RepeatWrapping;
   textureTest1.wrapT = THREE.RepeatWrapping;
   textureTest1.repeat.set (1,1/5);
   textureTest1.offset.x = 0;
   textureTest1.offset.y = 2/5;
   
  
  
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0.02;
  floor.position.z = -5;
  floor.receiveShadow = true;

  plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor, 50 * 1.5, table1);
  plane.update()
  planes.push(plane); 
  
  var rloader = new THREE.TextureLoader();
  rloader.setCrossOrigin('');
  //rtexture = rloader.load('https://i.imgur.com/JRZtHnr.png');
  rtexture = rloader.load('https://i.imgur.com/bHusA1w.png');
  
  let rmaterial = new THREE.MeshBasicMaterial({
        map: rtexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
  });
  
  
  let floor2 = createMultiMaterialObject(ground, [material2, rmaterial]);
  
  rtexture.wrapS = THREE.RepeatWrapping;
   rtexture.wrapT = THREE.RepeatWrapping;
   rtexture.repeat.set (1,1/5);
   rtexture.offset.x = 0;
   rtexture.offset.y = 2/5;
  
  floor2.rotation.x = -Math.PI / 2;
  floor2.position.set(0,0.02,-55)
  floor2.receiveShadow = true;

  plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor2, 50 * 1.5, table1);
  plane.update()
  planes.push(plane);
  
  var lloader = new THREE.TextureLoader();
  lloader.setCrossOrigin('');
  //var ltexture = lloader.load('https://i.imgur.com/jpMeea3.png');
  ltexture = lloader.load('https://i.imgur.com/vbZJFUP.png');
  
  let lmaterial = new THREE.MeshBasicMaterial({
        map: ltexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
  });

  
  let floor3 = createMultiMaterialObject(ground, [material2, lmaterial]);
  
  ltexture.wrapS = THREE.RepeatWrapping;
   ltexture.wrapT = THREE.RepeatWrapping;
   ltexture.repeat.set (1,1/5);
   ltexture.offset.x = 0;
   ltexture.offset.y = 2/5;
   
  floor3.rotation.x = -Math.PI / 2;
  floor3.position.set(50,0.02,-55)
  floor3.receiveShadow = true;

  plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor3, 50 * 1.5, table1);
  plane.update()
  planes.push(plane);
  
  
  var cloader = new THREE.TextureLoader();
  cloader.setCrossOrigin('');
   
  //var ctexture = cloader.load('https://i.imgur.com/zIWgsTi.png');
  ctexture = cloader.load('https://i.imgur.com/9Fh7VYy.png');
  
  let cmaterial = new THREE.MeshBasicMaterial({
        map: ctexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
  });
  
  let circle = new THREE.CircleGeometry(50,32,0,Math.PI);
  let circleFloor = createMultiMaterialObject(circle, [material2, cmaterial]);
  
  ctexture.wrapS = THREE.RepeatWrapping;
   ctexture.wrapT = THREE.RepeatWrapping;
   ctexture.repeat.set (1,1/5);
   ctexture.offset.x = 0;
   ctexture.offset.y = 2/5;
  
  circleFloor.rotation.x = -Math.PI / 2;
  circleFloor.position.set(25,0.01,-80);
  circleFloor.receiveShadow = true;

  plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), circleFloor, 100 , table1);
  plane.update()
  planes.push(plane);
  
  
  var color2 = new THREE.Color();
  color2.setHSL(1,0,0.8);
  
  var box1 = new THREE.Mesh(new THREE.BoxGeometry(5,0.01,5),new THREE.MeshPhongMaterial({transparent: true,opacity:0.1}));
  box1.position.set(0,0.2,10);
  box1.material.color.copy(color2)
  box1.receiveShadow = true;
  
	var texture2 = loader2.load('https://i.imgur.com/AwpdGoQ.jpg');
	texture2.wrapS = THREE.RepeatWrapping;
	texture2.wrapT = THREE.RepeatWrapping;
      
	let loader3 = new THREE.TextureLoader();
	loader3.crossOrigin = '';
	var alpha = loader2.load('https://i.imgur.com/d8LnKPK.png');
	var alphaFirst = loader2.load('https://i.imgur.com/4wunOkl.png');
	let materialForFirstHole = new THREE.MeshBasicMaterial({color: 0x006000,side:THREE.DoubleSide,alphaMap:alphaFirst,alphaTest: 0.5,})
	

	let materialForHole = new THREE.MeshBasicMaterial({color: 0x006000,side:THREE.DoubleSide,alphaMap:alpha,alphaTest: 0.5,})
    let hole = createMultiMaterialObject(ground, [materialForHole, material1]);
	//let hole = new THREE.Mesh(ground,materialForHole)
	hole.rotation.x=-Math.PI/2;  
	hole.rotation.z=-Math.PI;  
	hole.position.set(50,0,-5);
	hole.receiveShadow = true;

	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1),hole, 50 * 1.5, table1);
	plane.update()
	planes.push(plane);
	 
	class1.add(table1,box1)
	*/
	//class2
	
	//big floor
	var loader2 = new THREE.TextureLoader();
    loader2.setCrossOrigin('');
    var textureFloor = loader2.load('https://i.imgur.com/AwpdGoQ.jpg');
    textureFloor.wrapS = THREE.RepeatWrapping;
    textureFloor.wrapT = THREE.RepeatWrapping;
	
	var bigfloor = new THREE.Mesh(new THREE.PlaneGeometry(5000,5000), new THREE.MeshPhongMaterial({map: textureFloor,side:THREE.DoubleSide}));
	bigfloor.material.map.repeat.set( 500, 500 );
	bigfloor.rotation.x = -Math.PI / 2;
	bigfloor.position.y = -5.5;
	bigfloor.receiveShadow = true;
	  
	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), bigfloor, 150 * 1.5, bigTable);
	plane.update()
	planes.push(plane);
	
}
function buildWalls(){
  for (var i = 0; i < 4; i++) {
    if (i < 3) {
      let x = new Wall(100,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level1Walls.push(x);
    }
	else {
      let x = new Wall(50,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level1Walls.push(x);
    }
  }
  
  level1Walls[0].mesh.rotation.y = -Math.PI / 2;
  level1Walls[1].mesh.rotation.y = Math.PI / 2;
  level1Walls[2].mesh.rotation.y = -Math.PI / 2;
  level1Walls[3].mesh.rotation.y = Math.PI;

  level1Walls[0].mesh.position.set(-25, 2.5, -30)
  level1Walls[1].mesh.position.set(25, 2.5, -30)
  level1Walls[2].mesh.position.set(75, 2.5, -30)
  level1Walls[3].mesh.position.set(50, 2.5, 20)
  for(var i = 0; i < 4; i++)
	class1.add(level1Walls[i].mesh)

  //第二關
  
   for (var i = 0; i < 6; i++) {
    if (i < 4) {
      let x = new Wall(32,12.5, new THREE.Vector3(0, 0, -1));
      x.update();
      level2Walls.push(x);
    }
	else {
      let x = new Wall(300,12.5, new THREE.Vector3(0, 0, -1));
      x.update();
      level2Walls.push(x);
    }
  }
  level2Walls[4].mesh.rotation.y = -Math.PI / 2;
  level2Walls[5].mesh.rotation.y = Math.PI / 2;
  level2Walls[1].mesh.rotation.y = Math.PI ;
  level2Walls[2].mesh.rotation.y = Math.PI ;

  level2Walls[0].mesh.position.set(-10, 6.25, -125)
  level2Walls[1].mesh.position.set(-10, 6.25, -425)
  level2Walls[2].mesh.position.set(60, 6.25, -425)
  level2Walls[3].mesh.position.set(60, 6.25, -125)
  level2Walls[4].mesh.position.set(75, 6.25, -275)
  level2Walls[5].mesh.position.set(-25, 6.25, -275)
  
  let x = new Wall(100,12.5, new THREE.Vector3(0, 0, -1));
      x.update();
      level2Walls.push(x);
  
  level2Walls[6].mesh.position.set(25, 6.25, -125)
  level2Walls[6].mesh.visible=false;

  //class2.add(obstacle1.clone(),obstacle2.clone(),obstacle3.clone(),car.clone(),car2.clone())
  for (var i = 0; i <= 6; i++)
	class2.add(level2Walls[i].mesh);
	//第二關的steve
	let wall46 = new Wall(8,32,new THREE.Vector3(0,0,1))
	wall46.mesh.position.set(20,7,0);
	wall46.mesh.rotation.x=-Math.PI;
	level2Walls.push(wall46)
	class2.add(wall46.mesh)
	wall46.mesh.visible=false;
			
	let wall47 = new Wall(8,32,new THREE.Vector3(0,0,1))
	wall47.mesh.position.set(47,-7,0);
	level2Walls.push(wall47)
	class2.add(wall47.mesh)
	wall47.mesh.visible=false;
			
	let wall48 = new Wall(8,32,new THREE.Vector3(0,0,1))
	wall48.mesh.position.set(-7,-7,0);
	level2Walls.push(wall48)
	class2.add(wall48.mesh)
	wall48.mesh.visible=false;
	steveg.add(wall46.mesh,wall47.mesh,wall48.mesh)
	steveg.position.set(0,23,-294);
	scene.add(steveg);
			
			
	wall49 = new Wall(8,30,new THREE.Vector3(0,0,1),0,0xA23400,5)
	wall49.mesh.position.set(20,15,-375);
	level2Walls.push(wall49)
	class2.add(wall49.mesh)
	wall49.mesh.visible=false;
	
	wall50 = new Wall(8,30,new THREE.Vector3(0,0,1),0,0xA23400,5)
	wall50.mesh.position.set(47,15,-375);
	level2Walls.push(wall50)
	class2.add(wall50.mesh)
	wall50.mesh.visible=false;
	
	wall51 = new Wall(8,30,new THREE.Vector3(0,0,1),0,0xA23400,5)
	wall51.mesh.position.set(-7,15,-375);
	level2Walls.push(wall51)
	class2.add(wall51.mesh)
	wall51.mesh.visible=false;
	
	let wall52 = new Wall(8,32,new THREE.Vector3(0,0,1),0,0xA23400,5)
	wall52.mesh.position.set(20,15,-235);
	level2Walls.push(wall52)
	class2.add(wall52.mesh)
	wall52.mesh.visible=false;
			
	let wall53 = new Wall(8,32,new THREE.Vector3(0,0,1),0,0xA23400,5)
	wall53.mesh.position.set(47,15,-235);
	level2Walls.push(wall53)
	class2.add(wall53.mesh)
	wall53.mesh.visible=false;
			
	let wall54 = new Wall(8,32,new THREE.Vector3(0,0,1),0,0xA23400,5)
	wall54.mesh.position.set(-7,15,-235);
	level2Walls.push(wall54)
	class2.add(wall54.mesh)
	wall54.mesh.visible=false;
			
    class2.add(class2g)
}
function buildholes(){
	
	var meshFunc2 = function(u0,v0,pos){
	const radius = 2.52
	const tube = 1
	const degree = Math.PI * 2;
	const tune = 1;
	
	var x = (radius - tube * Math.cos(v0 * degree /tune)) * Math.cos(u0 * degree);
	var y = (radius - tube * Math.cos(v0 * degree /tune)) * Math.sin(u0 * degree);
	var z = tube * Math.sin(v0 * degree /tune)
	
	pos.set(x,y,z);
    }
  
	var geometry2 = new ParametricGeometry(meshFunc2, 64, 64);
    var material = new THREE.MeshNormalMaterial({
    wireframe: false,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
    });
	var inMeshFunc2 = function(pos){
	const R = 2.52;
	const r = 1;
	var x = pos.x;
	var y = pos.y;
	var z = pos.z;
	return (x * x + y * y + z * z + R * R - r * r) * (x * x + y * y + z * z + R * R - r * r) - 4 * R * R * (x * x + y * y)
    }
	var meshDifFunc2 = function(pos){
  	const R = 2.52;
	const r = 1;
	var x = pos.x;
	var y = pos.y;
	var z = pos.z;
	var dx = 4 * x * (x * x + y * y + z * z - R * R - r * r);
	var dy = 4 * y * (x * x + y * y + z * z - R * R - r * r);
	var dz = 4 * z * (x * x + y * y + z * z + R * R - r * r);
	return new THREE.Vector3(dx,dz,-dy);
  }
	
	let mesh = new THREE.Mesh(geometry2, material);
	scene.add(mesh);
	mesh.meshFunc = meshFunc2;
    mesh.inMeshFunc = inMeshFunc2;
    mesh.meshDifFunc = meshDifFunc2;
    mesh.rotation.x = -Math.PI/2
    mesh.position.set(0,-0.205,0);
    mesh.ID = "hole";
	mesh.level = 1
	mesh.visible = false
	var ballhole = new THREE.Group();
	ballhole.add(mesh);
	holes.push(mesh)

	const geometry4 = new THREE.CylinderGeometry( 2.576, 2.576, 4.4, 32,1,true);
	var material = new THREE.MeshPhongMaterial( {color: 0x888888,side:THREE.DoubleSide}); 
	var cylinder = new THREE.Mesh( geometry4, material );
	cylinder.castShadow = true;
	cylinder.receiveShadow = true;
	cylinder.position.y = -2.2;
	cylinder.ID = "wall";
	cylinder.r = 2.576;
	cylinder.height = 4.4;
	holes.push(cylinder);
	
	ballhole.add(cylinder);
	
	const geometry = new THREE.CylinderGeometry( 2.576, 2.576, 0.01, 32 );
	var material2 = new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide}); 
	const block = new THREE.Mesh( geometry, material2);
	
	block.position.y=-4.4;
	block.ID = "bottom";
	block.r = 2.576
	block.normal = new THREE.Vector3(0,1,0);
	holes.push(block)
	ballhole.add(block)
	//ballhole.position.set(39.5,0,5);
	ballhole.position.set(50,0,-4.5);
	
	class1.add(ballhole)
/*   
	let mesh3 = new THREE.Mesh(geometry2, material);
	scene.add(mesh3);
	mesh3.meshFunc = meshFunc2;
    mesh3.inMeshFunc = inMeshFunc2;
    mesh3.meshDifFunc = meshDifFunc2;
    mesh3.rotation.x = -Math.PI/2
    mesh3.position.set(165,-0.205,-215);
    mesh3.ID = "hole";
	mesh3.level = 2;
	mesh3.visible = false
	holes.push(mesh3)

	var ballhole2 = new THREE.Group();

	var cylinder2 = new THREE.Mesh( geometry4, material );
	cylinder2.castShadow = true;
	cylinder2.receiveShadow = true;
	cylinder2.position.y = -3;
	cylinder2.ID = "wall";
	cylinder2.r = 2.576;
	cylinder2.height = 6;
	holes.push(cylinder2);
	
	ballhole2.add(cylinder2);
	
	const block2 = new THREE.Mesh( geometry, material2);
	
	block2.position.y=-6;
	block2.ID = "bottom";
	block2.r = 2.576
	block2.normal = new THREE.Vector3(0,1,0);
	holes.push(block2)
	ballhole2.add(block2)
	scene.add(ballhole2);
	ballhole2.position.set(165,0,-215);   
*/
	//class 2
	let mesh2 = new THREE.Mesh(geometry2, material);
	scene.add(mesh2);
	mesh2.meshFunc = meshFunc2;
    mesh2.inMeshFunc = inMeshFunc2;
    mesh2.meshDifFunc = meshDifFunc2;
    mesh2.rotation.x = -Math.PI/2
    mesh2.position.set(0,-0.205,0);
    mesh2.ID = "hole";
	mesh2.level = 2;
	mesh2.visible = false
	holes.push(mesh2)

	var ballhole2 = new THREE.Group();

	var cylinder2 = new THREE.Mesh( geometry4, material );
	cylinder2.castShadow = true;
	cylinder2.receiveShadow = true;
	cylinder2.position.y = -2.2;
	cylinder2.ID = "wall";
	cylinder2.r = 2.576;
	cylinder2.height = 4.4;
	holes.push(cylinder2);
	
	ballhole2.add(mesh2,cylinder2);
	
	const block2 = new THREE.Mesh( geometry, material2);
	
	block2.position.y=-4.4;
	block2.ID = "bottom";
	block2.r = 2.576
	block2.normal = new THREE.Vector3(0,1,0);
	holes.push(block2)
	ballhole2.add(block2)
	ballhole2.position.set(149.6,0,-300);
	
	//class2.add(ballhole2)
	//class3

	
	
}
function buildPillar(){
	
	renderer.autoClear = false;
	const localPlane = new THREE.Plane(new THREE.Vector3(0, 1 ,0), 0.0);

	var pillarC11 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC11.R = 2;
	pillarC11.height = 6
	pillarC11.position.set(25,3,20);
	pillarC11.ID = "wall"
	pillarC11.castShadow = true;
	cylinders.push(pillarC11)

	var pillarC12 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC12.R = 2;
	pillarC12.height = 6
	pillarC12.position.set(-25,3,20);
	pillarC12.ID = "wall"
	pillarC12.castShadow = true;
	cylinders.push(pillarC12)
	
	var pillarC13 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC13.R = 2;
	pillarC13.height = 6
	pillarC13.position.set(-25,3,-80);
	pillarC13.ID = "wall"
	pillarC13.castShadow = true;
	cylinders.push(pillarC13)
	
	var pillarC14 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC14.R = 2;
	pillarC14.height = 6
	pillarC14.position.set(25,3,-80);
	pillarC14.ID = "wall"
	pillarC14.castShadow = true;
	cylinders.push(pillarC14)
	
	var pillarC15 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC15.R = 2;
	pillarC15.height = 6
	pillarC15.position.set(75,3,20);
	pillarC15.ID = "wall"
	pillarC15.castShadow = true;
	cylinders.push(pillarC15)
	
	var pillarC16 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC16.R = 2;
	pillarC16.height = 6
	pillarC16.position.set(75,3,-80);
	pillarC16.ID = "wall"
	pillarC16.castShadow = true;
	cylinders.push(pillarC16)
	
	class1.add(pillarC11,pillarC12,pillarC13,pillarC14,pillarC15,pillarC16)
	
}
function buildfloors(){
	var heightFunc = function(x,z) {
	  let K1 = 5,p1x = 50,p1z = 40,w1 = 15;
	  let K2 = 5, p2x = 0, p2z = 40, w2 = 15;
	  let K3 = 5, p3x = 25, p3z = 10, w3 = 15;
	  let K4 = 5, p4x = 25, p4z = -40, w4 = 15;
	  
	  return K1 * Math.exp(
		-(x - p1x) * (x - p1x) / w1 / w1 - (z - p1z) * (z - p1z) / w1 / w1) + K2 * Math.exp(
		-(x - p2x) * (x - p2x) / w2 / w2 - (z - p2z) * (z - p2z) / w2 / w2) + K3 * Math.exp(
		-(x - p3x) * (x - p3x) / w3 / w3 - (z - p3z) * (z - p3z) / w3 / w3) + K4 * Math.exp(
		-(x - p4x) * (x - p4x) / w4 / w4 - (z - p4z) * (z - p4z) / w4 / w4)
	}
	var inHeightFunc = function(x,z){
	  let K1 = 5,p1x = 50,p1z = 40,w1 = 15;
	  let K2 = 5, p2x = 0, p2z = 40, w2 = 15;
	  let K3 = 5, p3x = 25, p3z = 10, w3 = 15;
	  let K4 = 5, p4x = 25, p4z = -40, w4 = 15;

		return [- K1 * Math.exp(
		-(x - p1x) * (x - p1x) / w1 / w1 - (z - p1z) * (z - p1z) / w1 / w1) * (-2 * ((x - p1x) / w1) / w1 ) - K2 * Math.exp(
		-(x - p2x) * (x - p2x) / w2 / w2 - (z - p2z) * (z - p2z) / w2 / w2) * (-2 * ((x - p2x) / w2) / w2 ) - K3 * Math.exp(
		-(x - p3x) * (x - p3x) / w3 / w3 - (z - p3z) * (z - p3z) / w3 / w3) * (-2 * ((x - p3x) / w3) / w3 ) - K4 * Math.exp(
		-(x - p4x) * (x - p4x) / w4 / w4 - (z - p4z) * (z - p4z) / w4 / w4) * (-2 * ((x - p4x) / w4) / w4 ) ,-K1 * Math.exp(
		-(x - p1x) * (x - p1x) / w1 / w1 - (z - p1z) * (z - p1z) / w1 / w1) * (-2 * ((z - p1z) / w1) / w1 ) - K2 * Math.exp(
		-(x - p2x) * (x - p2x) / w2 / w2 - (z - p2z) * (z - p2z) / w2 / w2) * (-2 * ((z - p2z) / w2) / w2 ) - K3 * Math.exp(
		-(x - p3x) * (x - p3x) / w3 / w3 - (z - p3z) * (z - p3z) / w3 / w3) * (-2 * ((z - p3z) / w3) / w3 ) - K4 * Math.exp(
		-(x - p4x) * (x - p4x) / w4 / w4 - (z - p4z) * (z - p4z) / w4 / w4) * (-2 * ((z - p4z) / w4) / w4 )]
	}
  
	//class1
	
  let plane;
  table1 = new THREE.Group();
  scene.add(table1);
  table1.updateMatrixWorld()
  
  
  var loader = new THREE.TextureLoader();
  loader.setCrossOrigin('');
  //test light map
  
  //var textureTest1 = loader2.load('https://i.imgur.com/tuIeXbi.png');  
  //var textureTest1 = loader2.load('https://i.imgur.com/PnIgpqe.png'); 漸層 
  //var textureTest1 = loader2.load('https://i.imgur.com/D2mGAc6.png');  漸層黑底
  //var textureTest1 = loader2.load('https://i.imgur.com/L55ESsM.png');  //漸層透明黑底
  //var textureTest1 = loader2.load('https://i.imgur.com/FTs5YQj.png');  //漸層透明黑底縮寬度
  textureTest = loader.load('https://i.imgur.com/FyMwBQ8.png');  //漸層透明黑底縮寬度
  
  
  let material1 = new THREE.MeshBasicMaterial({
        map: textureTest,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
  });
  let material2 = new THREE.MeshBasicMaterial({
        color: 0x006000,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1
  });
  	
  var geometry1 = new ParametricGeometry(function(u0, v0, pos) {
		let x = -25 + 50 * u0;
		let z = 10 + 100 * v0;
		pos.set(x, heightFunc(x, z), z);
	}, 40, 40);
	
	var convertUV1 = function(x,z){
	return [(x + 25) / 50,(z - 10) / 100]
	}
  
  let floorL = createMultiMaterialObject(geometry1, [material2, material1]);
   textureTest.wrapS = THREE.RepeatWrapping;
   textureTest.wrapT = THREE.RepeatWrapping;
   textureTest.repeat.set (1,1/5);
   textureTest.offset.x = 0;
   textureTest.offset.y = 2/5;
   
  floorL.y = 0
  floorL.convertUV = convertUV1;
  floorL.heightFunc = heightFunc;
  floorL.inHeightFunc = inHeightFunc;
  floorL.receiveShadow = true;
  floors.push(floorL)

  
  var geometry2 = new ParametricGeometry(function(u0, v0, pos) {
		let x = 25 + 50 * u0;
		let z = 10 + 50 * v0;
		pos.set(x, heightFunc(x, z), z);
  }, 40, 40);
  var convertUV2 = function(x,z){
	return [(x - 25) / 50,(z - 10) / 50]
  }
  
  let floorR = createMultiMaterialObject(geometry2, [material2, material1]);

  floorR.receiveShadow = true;
  floorR.y = 0
  floorR.convertUV = convertUV2;
  floorR.heightFunc = heightFunc;
  floorR.inHeightFunc = inHeightFunc;
  floors.push(floorR)

  ctexture = loader.load('https://i.imgur.com/9Fh7VYy.png');
  ctexture.wrapS = THREE.RepeatWrapping;
  ctexture.wrapT = THREE.RepeatWrapping;
  
  ctexture.repeat.set (1,1/5);
  ctexture.offset.x = 0;
  ctexture.offset.y = 2/5;
  
  const localPlane = new THREE.Plane(new THREE.Vector3(0, 0 ,-1), 10.0);

  let cmaterial = new THREE.MeshBasicMaterial({
        map: ctexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
		clippingPlanes: [localPlane]
  });
  
  var geometry3 = new ParametricGeometry(function(u0, v0, pos) {	
		let theta = u0 * Math.PI *2;
		let r = v0 * 50;
		let x = 25 + r * Math.cos(theta);
		let z = 10 + r * Math.sin(theta);
		
		pos.set(x, heightFunc(x, z), z);
	},40, 40);
  var convertUV3 = function(x,z){
		x -= 25; 
		z -= 10; 
		let x2 = x * x;
		let z2 = z * z;
		let r = Math.sqrt(z2 + x2);
		let u = (Math.acos(x/r)) / 2 / Math.PI;
		let v = r / 50;
		return [u,v]
	}
  let floor3 = createMultiMaterialObject(geometry3, [material2, cmaterial]);
   
  floor3.receiveShadow = true;
  floor3.y = 0
  floor3.convertUV = convertUV3;
  floor3.heightFunc = heightFunc;
  floor3.inHeightFunc = inHeightFunc;
  floors.push(floor3) 

  var alpha = loader.load('https://i.imgur.com/d8LnKPK.png');
  let materialHole = new THREE.MeshBasicMaterial({color: 0x006000,side:THREE.DoubleSide,alphaMap:alpha,alphaTest: 0.5,})
  
  var geometry4 = new ParametricGeometry(function(u0, v0, pos) {
		let x = 25 + 50 * u0;
		let z = 60 + 50 * v0;
		pos.set(x, heightFunc(x, z), z);
  }, 40, 40);
  var convertUV4 = function(x,z){
	return [(x - 25) / 50,(z - 60) / 50]
  }
  
  let hole1 = createMultiMaterialObject(geometry4, [materialHole, material1]);

  hole1.receiveShadow = true;
  hole1.y = 0
  hole1.convertUV = convertUV4;
  hole1.heightFunc = heightFunc;
  hole1.inHeightFunc = inHeightFunc;
  floors.push(hole1)
  
  var color2 = new THREE.Color();
  color2.setHSL(1,0,0.8);
  var box1 = new THREE.Mesh(new THREE.BoxGeometry(5,0.01,5),new THREE.MeshPhongMaterial({transparent: true,opacity:0.1}));
  box1.position.set(0,0.2,10);
  box1.material.color.copy(color2)
  box1.receiveShadow = true;  
  /*
  circleFloor.rotation.x = -Math.PI / 2;
  circleFloor.position.set(25,0.01,-80);
  circleFloor.receiveShadow = true;

  plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), circleFloor, 100 , table1);
  plane.update()
  planes.push(plane);

	var texture2 = loader2.load('https://i.imgur.com/AwpdGoQ.jpg');
	texture2.wrapS = THREE.RepeatWrapping;
	texture2.wrapT = THREE.RepeatWrapping;
      
	let loader3 = new THREE.TextureLoader();
	loader3.crossOrigin = '';
	var alpha = loader2.load('https://i.imgur.com/d8LnKPK.png');

	

	let materialForHole = new THREE.MeshBasicMaterial({color: 0x006000,side:THREE.DoubleSide,alphaMap:alpha,alphaTest: 0.5,})
	
    let hole = createMultiMaterialObject(ground, [materialForHole, material1]);
	//let hole = new THREE.Mesh(ground,materialForHole)
	hole.rotation.x=-Math.PI/2;  
	hole.rotation.z=-Math.PI;  
	hole.position.set(50,0,-5);
	hole.receiveShadow = true;

	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1),hole, 50 * 1.5, table1);
	plane.update()
	planes.push(plane);
	 
	 */
	   var geometry3Fake = new ParametricGeometry(function(u0, v0, pos) {	
		let theta = u0 * Math.PI *2 + Math.PI/2;
		let r = v0 * 50;
		let x = 25 + r * Math.cos(theta);
		let z = 10 + r * Math.sin(theta);
		
		pos.set(x, heightFunc(x, z)-0.1, z);
	},64, 64);

    let floor3Fake = createMultiMaterialObject(geometry3Fake, [material2, cmaterial]);
	
	floor3Fake.renderOrder = 10
	
	let group = new THREE.Group();
	group.add(floorL.clone(),floorR.clone(),hole1.clone(),floor3Fake,box1)
	group.position.z = -90;
	class1.add(group)
	
	//class2
	
	var geometry = new ParametricGeometry(function(u0, v0, pos) {
		let x = -25 + 100 * u0;
		let z = -425 + 300 * v0;
		pos.set(x, heightFunc(x, z), z);
	}, 40, 40);
	
	var loader2 = new THREE.TextureLoader();

	var textureTest1 = loader2.load('https://i.imgur.com/H3nFqnl.png');
    textureTest1.wrapS = THREE.RepeatWrapping;
	textureTest1.wrapT = THREE.RepeatWrapping;
    textureTest1.repeat.set(1,1)	
	
	let materialLight1 = new THREE.MeshBasicMaterial({
        map: textureTest1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
	});
	
    let materialGround = new THREE.MeshBasicMaterial({
		map: textureTest1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1
    });	
	
	var convertUV = function(x,z){
		return [(x + 25) / 100,(z + 425) / 300]
	}
	
	let mesh = new THREE.Mesh(geometry, materialGround);
	mesh.y = 0
	mesh.heightFunc = heightFunc;
	mesh.inHeightFunc = inHeightFunc;
	mesh.convertUV = convertUV;
	mesh.receiveShadow = true;
	
	
	floors.push(mesh)
	class2.add(mesh)
	
	
}
function buildArcWalls(){
	
	let group = new THREE.Group();
	let material = new THREE.MeshPhongMaterial({color:0xA23400,side:THREE.DoubleSide,transparent: true,opacity: 1})
	var arcWallC11 = new THREE.Mesh(new THREE.CylinderGeometry(48.75,48.75,5,32,32,true,Math.PI/2,Math.PI),material);
	arcWallC11.R = 48.75;
	arcWallC11.height = 5
	arcWallC11.position.set(25,2.5,-80);
	arcWallC11.castShadow = true;
	arcWallC11.thetaStart = Math.PI/2;
	arcWallC11.thetaLength = Math.PI;
	
	var arcWallC12 = new THREE.Mesh(new THREE.CylinderGeometry(51.25,51.25,5,32,32,true,Math.PI/2,Math.PI),material);
	arcWallC12.position.set(25,2.5,-80);
	arcWallC12.castShadow = true;
	
	let mesh11 = new THREE.Mesh(new THREE.RingGeometry( 48.75, 51.25, 32,1,0,Math.PI), material );
	mesh11.rotation.x = -Math.PI /2;
	mesh11.position.set(25,5,-80)

	let mesh12 = new THREE.Mesh(new THREE.RingGeometry( 48.75, 51.25, 32,1,0,Math.PI), material );
	mesh12.rotation.x = -Math.PI /2;
	mesh12.position.set(25,0,-80)
	
	group.add(arcWallC11,arcWallC12,mesh11,mesh12)
	arcWalls.push(group);
	class1.add(group)
	
}
function setClassVisible(level){
	
		class1Rotate.visible = false;
		class2Rotate.visible = false;
		class3Rotate.visible = false;		
	if(level === 1) {
		class1Rotate.visible = true;
	}
	else if(level === 2)
		class2Rotate.visible = true;
	else if(level === 3)
		class3Rotate.visible = true;
}

function bulidMiniWorld(){
	if(true){//floor
		if(true){//地板
			//大地板
			let tempx = 300,tempz = -300;
			var heightFunc = function(x,z) {
				  let K1 = 5,p1x = 1000,p1z = 20,w1 = 15;
				  return K1 * Math.exp(
					-(x - p1x) * (x - p1x) / w1 / w1 - (z - p1z) * (z - p1z) / w1 / w1)
				}
			var inHeightFunc = function(x,z){
				  let K1 = 5,p1x = 1000,p1z = 20,w1 = 15;
					return [- K1 * Math.exp(
					-(x - p1x) * (x - p1x) / w1 / w1 - (z - p1z) * (z - p1z) / w1 / w1) * (-2 * ((x - p1x) / w1) / w1 ),-K1 * Math.exp(
					-(x - p1x) * (x - p1x) / w1 / w1 - (z - p1z) * (z - p1z) / w1 / w1) * (-2 * ((z - p1z) / w1) / w1 )]
				}
			
			let materialGround = new THREE.MeshBasicMaterial({
				//color: 0x006000,
				map: new THREE.TextureLoader().load("https://i.imgur.com/IML8tcP.png"),
				side: THREE.DoubleSide,
				transparent: true,
				opacity: 1
			});	
				
			var groundGeometry = new ParametricGeometry(function(u0, v0, pos) {
				let x = 150 + tempx - 65 * u0;
				let z = 0  + tempz + 80 * v0;
				pos.set(x, heightFunc(x, z) + 0, z);
			}, 40, 40);
				
			var convertUVGround = function(x,z){
				return [ -(x - 175 - tempx) / 165,(z + 5 - tempz) / 80]
			}
				
			let ground = new THREE.Mesh(groundGeometry, materialGround);
			ground.y = 0
			ground.heightFunc = heightFunc;
			ground.inHeightFunc = inHeightFunc;
			ground.convertUV = convertUVGround;
			ground.receiveShadow = true;
			
			floors.push(ground);

			var groundFakeGeometry = new ParametricGeometry(function(u0, v0, pos) {
				let x = 150 - 65 * u0;
				let z = 0 + 80 * v0;
				pos.set(x, heightFunc(x, z) + 0, z);
			}, 40, 40);
				
			let groundFake = new THREE.Mesh(groundFakeGeometry, materialGround);
			groundFake.receiveShadow = true;
			
			class3.add(groundFake)
			//地板1
			var geometry1 = new ParametricGeometry(function(u0, v0, pos) {
				let x = -15 + tempx + 30 * u0;
				let z = 0 + tempz+ 100 * v0;
				pos.set(x, heightFunc(x, z) + 20, z);
			}, 40, 40);
				
			var convertUV1 = function(x,z){
				return [ (x + 15 - tempx) / 30,(z + 0 - tempz) / 100]
			}
				
			let mesh1 = new THREE.Mesh(geometry1, materialGround);
			mesh1.y = 20
			mesh1.heightFunc = heightFunc;
			mesh1.inHeightFunc = inHeightFunc;
			mesh1.convertUV = convertUV1;
			mesh1.receiveShadow = true;
			
			floors.push(mesh1);
			//地板2
			var geometry2 = new ParametricGeometry(function(u0, v0, pos) {
				let x = 15 + tempx + 50 * u0;
				let z = 70 + tempz + 30 * v0;
				pos.set(x, heightFunc(x, z) + 20, z);
			}, 40, 40);
				
			var convertUV2 = function(x,z){
				return [ (x - 15 - tempx) / 50,(z - 70 - tempz) / 30]
			}
				
			let mesh2 = new THREE.Mesh(geometry2, materialGround);
			mesh2.y = 20
			mesh2.heightFunc = heightFunc;
			mesh2.inHeightFunc = inHeightFunc;
			mesh2.convertUV = convertUV2;
			mesh2.receiveShadow = true;
			
			floors.push(mesh2);
			//地板3
			var geometry3 = new ParametricGeometry(function(u0, v0, pos) {
				let x = 65 + tempx + 50 * u0;
				let z = 55 + tempz + 60 * v0;
				pos.set(x, heightFunc(x, z) + 10, z);
			}, 40, 40);
				
			var convertUV3 = function(x,z){
				return [ (x - 65 - tempx) / 50,(z - 55 - tempz) / 60]
			}
				
			let mesh3 = new THREE.Mesh(geometry3, materialGround);
			mesh3.y = 10
			mesh3.heightFunc = heightFunc;
			mesh3.inHeightFunc = inHeightFunc;
			mesh3.convertUV = convertUV3;
			mesh3.receiveShadow = true;
			
			floors.push(mesh3);
		}
		if(true){//book
			let book1 = buildBook();
			let book2 = buildBook();
			book1.position.set(0,5,0);
			book2.position.set(0,5,50);

			let book3 = buildBook();
			book3.rotation.y = Math.PI/2;
			book3.position.set(15,5,85);
			class3.add(book1.clone(),book2.clone(),book3.clone())
			book1.position.set(0,10,0);
			book2.position.set(0,10,50);
			book3.position.set(15,10,85);
			class3.add(book1.clone(),book2.clone(),book3.clone())
			book1.position.set(0,15,0);
			book2.position.set(0,15,50);
			book3.position.set(15,15,85);		
			class3.add(book1.clone(),book2.clone(),book3.clone())
			book1.position.set(0,20,0);
			book2.position.set(0,20,50);
			book3.position.set(15,20,85);		
			class3.add(book1,book2,book3)
			let book4 = buildBook();
			let book5 = buildBook();
			
			book4.rotation.y = Math.PI/2;
			book5.rotation.y = -Math.PI/2;
			
			book4.position.set(65,5,70);
			book5.position.set(115,5,100);

			class3.add(book4.clone(),book5.clone())		
			
			book4.position.set(65,10,70);
			book5.position.set(115,10,100);
			
			class3.add(book4,book5)
			
			let book6 = buildBook();
			book6.position.set(130,5,50);
			book6.rotation.x = -Math.PI / 180 * 5;
			class3.add(book6)
			
			let book7 = buildBook();
			book7.rotation.x = -Math.PI / 2;
			book7.rotation.y = -Math.PI / 2;
			book7.position.set(165,15,100.5)
			class3.add(book7);
			
			let book8 = buildBook();	
			book8.rotation.z = Math.PI / 2;
			book8.position.set(145,15,50)
			class3.add(book8)
			let book9 = buildBook();	
			book9.rotation.z = Math.PI / 2;
			book9.position.set(81,15,5)
			class3.add(book9)
			
			
		}
		if(true){//ruler
			
			let ruler1 = buildRuler();
			ruler1.position.set(89,15,70);
			
			ruler1.rotation.y = -Math.PI / 2
			ruler1.rotation.z = Math.PI / 180 * 9

			let ruler2 = buildRuler();
			ruler2.position.set(95,15,70);
			
			ruler2.rotation.y = -Math.PI / 2
			ruler2.rotation.z = Math.PI / 180 * 9
			
			class3.add(ruler1,ruler2);
			
		}
		if(true){//鼓
			let drum = new THREE.Group();
			let drumBody = new THREE.Mesh(new THREE.CylinderGeometry(15,15,15,32,32),new THREE.MeshPhongMaterial({color:0xe80505,side:THREE.DoubleSide}));
			drumBody.position.set(0,7.5,0);

			let drumHead1 = new THREE.Mesh(new THREE.CircleGeometry(15,32),new THREE.MeshPhongMaterial({color:0xf5f2dc,side:THREE.DoubleSide}));
			drumHead1.position.set(0,15.1,0);
			drumHead1.rotation.x = -Math.PI /2
			
			let drumHead2 = new THREE.Mesh(new THREE.CircleGeometry(15,32),new THREE.MeshPhongMaterial({color:0xf5f2dc,side:THREE.DoubleSide}));
			drumHead2.position.set(0,-0.1,0);
			drumHead2.rotation.x = -Math.PI /2
			
			let torus = new THREE.Mesh(new THREE.TorusGeometry( 15, 0.5, 32, 100 ),new THREE.MeshPhongMaterial({color:0xb0a9a9,side:THREE.DoubleSide}));
			torus.rotation.x = Math.PI/2
			torus.position.y = 15;
			let torus2 = new THREE.Mesh(new THREE.TorusGeometry( 15, 0.5, 32, 100 ),new THREE.MeshPhongMaterial({color:0xb0a9a9,side:THREE.DoubleSide}));
			torus2.rotation.x = Math.PI/2
			torus2.position.y = 0;
			
			let cylinder1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,15,32,32),new THREE.MeshPhongMaterial({color:0xfae26b,bside:THREE.DoubleSide}));
			let cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,15,32,32),new THREE.MeshPhongMaterial({color:0xfae26b,bside:THREE.DoubleSide}));
			let cylinder3 = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,15,32,32),new THREE.MeshPhongMaterial({color:0xfae26b,bside:THREE.DoubleSide}));
			let cylinder4 = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,15,32,32),new THREE.MeshPhongMaterial({color:0xfae26b,bside:THREE.DoubleSide}));
			let pos = 15 * Math.sqrt(2)/2;
			
			cylinder1.position.set(pos,7.5,pos)
			cylinder2.position.set(-pos,7.5,pos)
			cylinder3.position.set(-pos,7.5,-pos)
			cylinder4.position.set(pos,7.5,-pos)
			
			let wall = new Wall(30,30,new THREE.Vector3(0,0,1),1,0xA23400,1,3)
			wall.mesh.position.set(0,15.1,0);
			wall.mesh.rotation.x = -Math.PI / 2;
			level3Walls.push(wall)

			drum.add(drumBody,drumHead1,drumHead2,torus,torus2,cylinder1,cylinder2,cylinder3,cylinder4,wall.mesh)
			drum.position.set(70,10,85);
			drum.scale.set(1/3,1/3,1/3)
			drum.rotation.z = -Math.PI / 180 * 2
			class3.add(drum);
		}
		
	}
	if(true){//wall
		if(true){//鉛筆
			let pencil1 = buildPencil();
			let pencil2 = buildPencil();
			pencil1.position.set(-13.5,20,0)
			pencil2.position.set(13.5,20,0)
			
			let pencil3 = buildPencil();
			let pencil4 = buildPencil();
			pencil3.rotation.y = Math.PI / 2
			pencil4.rotation.y = Math.PI / 2
			pencil3.position.set(15,20,71.5)
			pencil4.position.set(15,20,98.5)
			
			class3.add(pencil1,pencil2,pencil3,pencil4)
			
			let pencil5 = pencil3.clone();
			let pencil6 = pencil4.clone();
			pencil5.position.set(65,10,56.5)
			pencil6.position.set(65,10,113.5)
			
			let pencil7 = buildPencil();
			let pencil8 = pencil4.clone();
			pencil7.position.set(148,0,0)
			pencil8.position.set(96.5,0,3.5)
			
			
			class3.add(pencil5,pencil6,pencil7,pencil8)
			
			let pencil9 = buildPencil();
			pencil9.rotation.x = -Math.PI / 180 * 9
			pencil9.position.set(96.5,12,50)
			
			class3.add(pencil9)
		}
		if(true){//橡皮
			let eraser1 = buildEraser();
			let eraser2 = buildEraser();
			eraser1.rotation.x = -Math.PI/2;
			eraser2.rotation.x = -Math.PI/2;
			
			eraser1.position.set(-6,23.25,3.25)
			eraser2.position.set(6,23.25,3.25)
			let eraser3 = eraser1.clone();
			let eraser4 = eraser2.clone();
			
			eraser3.rotation.z = -Math.PI / 2;
			eraser4.rotation.z = -Math.PI / 2;
			eraser3.position.set(15-3.25,23.25,56)
			eraser4.position.set(-15,23.25,56)
			
			let eraser5 = eraser3.clone();
			let eraser6 = eraser4.clone();
			
			eraser5.position.set(15-3.25,23.25,68)
			eraser6.position.set(-15,23.25,68)

			let eraser7 = buildEraser()
			let eraser8 = buildEraser();
			eraser7.rotation.x = -Math.PI/2;
			eraser8.rotation.x = -Math.PI/2;	
			
			eraser7.rotation.z = -Math.PI / 2;
			eraser8.rotation.z = -Math.PI / 2;
			
			eraser7.position.set(65,13.25,64)
			eraser8.position.set(115-3,13.25,64)	
			
			let eraser9 =  eraser7.clone();
			let eraser10 = eraser7.clone();
			
			eraser9.position.set(65,13.25,106)
			eraser10.position.set(115-3,13.25,106)	
			
			class3.add(eraser1,eraser2,eraser3,eraser4,eraser5,eraser6,eraser7,eraser8,eraser9,eraser10)
			
			let eraser11 = buildEraser();
			eraser11.rotation.x = -Math.PI/2;
			eraser11.position.set(8,23.25,100)
			
			let eraser12 = buildEraser();
			eraser12.rotation.x = -Math.PI/2;
			eraser12.position.set(90.5,3.25,5)	
			
			class3.add(eraser11,eraser12)
			
			let eraser13 = buildEraser();
			eraser13.position.set(92,0,51)
			class3.add(eraser13.clone())
			eraser13.position.set(92,3,51)
			class3.add(eraser13.clone())
			eraser13.position.set(92,6,51)
			class3.add(eraser13.clone())
			eraser13.position.set(92,9,51)
			class3.add(eraser13)
			
			let eraser14 = buildEraser();
			eraser14.position.set(92,10,80)			
			class3.add(eraser14.clone())
			eraser14.position.set(92,13,80)
			class3.add(eraser14.clone())
			
			smallEraser1.add(buildSmallEraser(-Math.PI/2))
			
			smallEraser1.position.set(63.5,20,96.5)
			
			smallEraser2.add(buildSmallEraser(Math.PI/2))
			
			smallEraser2.position.set(63.5,20,73.5)
			class3.add(smallEraser1,smallEraser2)
		}
		if(true){//彎的
		
			let group = new THREE.Group();
			
			let material = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("https://i.imgur.com/MN5mWBg.png"),side:THREE.DoubleSide,transparent: true,opacity: 1})
			var arcWallC11 = new THREE.Mesh(new THREE.CylinderGeometry(27,27,5,32,32,true,Math.PI/2 * 3,Math.PI/3),material);
			arcWallC11.R = 27;
			arcWallC11.height = 5
			arcWallC11.position.set(15,22.5,74);
			arcWallC11.castShadow = true;
			arcWallC11.thetaStart = Math.PI/2 * 3;
			arcWallC11.thetaLength = Math.PI/3;
			
			var arcWallC12 = new THREE.Mesh(new THREE.CylinderGeometry(30,30,5,32,32,true,Math.PI/2 * 3,Math.PI/3),material);
			arcWallC12.position.set(15,22.5,74);
			arcWallC12.castShadow = true;
			
			let mesh11 = new THREE.Mesh(new THREE.RingGeometry(27, 30, 32,1,-Math.PI,Math.PI/3), material );
			mesh11.rotation.x = -Math.PI /2;
			mesh11.position.set(15,25,74)
			
			let mesh12 = new THREE.Mesh( new THREE.RingGeometry(27, 30,32,1,-Math.PI,Math.PI/3), material );
			mesh12.rotation.x = -Math.PI /2;
			mesh12.position.set(15,20,74)
			
			group.add(arcWallC11,arcWallC12,mesh11,mesh12)
			arcWalls.push(group);
			class3.add(group)
			
		}
		if(true){//碰撞
			
			let wall1 = new Wall(30,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall1.mesh.position.set(0,23,3)
			level3Walls.push(wall1)
			class3.add(wall1.mesh)
			
			let wall2 = new Wall(74,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall2.mesh.rotation.y = Math.PI / 2;
			wall2.mesh.position.set(-12,23,37)
			level3Walls.push(wall2)
			class3.add(wall2.mesh)
			let wall3 = new Wall(74,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall3.mesh.rotation.y = -Math.PI / 2;
			wall3.mesh.position.set(12,23,37)
			level3Walls.push(wall3)
			class3.add(wall3.mesh)
			
			let wall4 = new Wall(65,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall4.mesh.rotation.y = -Math.PI;
			wall4.mesh.position.set(32.5,23,97)
			level3Walls.push(wall4)
			class3.add(wall4.mesh)
			
			let wall5 = new Wall(50,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall5.mesh.position.set(40,23,73)
			level3Walls.push(wall5)
			class3.add(wall5.mesh)
			
			let wall6 = new Wall(3,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall6.mesh.position.set(13.5,23,74)
			level3Walls.push(wall6)
			class3.add(wall6.mesh)
			
			let wall7 = new Wall(30,4,new THREE.Vector3(0,0,1),1,0xA23400)
			wall7.mesh.rotation.y = Math.PI / 2;
			wall7.mesh.position.set(65,12,85)
			level3Walls.push(wall7)
			class3.add(wall7.mesh)
			///時間性的 上方
			let wall8 = new Wall(3,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall8.mesh.rotation.y = Math.PI;
			wall8.mesh.position.set(66.5,13,100)
			level3Walls.push(wall8)
			class3.add(wall8.mesh)

			let wall9 = new Wall(50,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall9.mesh.rotation.y = Math.PI;
			wall9.mesh.position.set(90,12.5,112)
			level3Walls.push(wall9)
			class3.add(wall9.mesh)

			let wall10 = new Wall(3,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall10.mesh.rotation.y = Math.PI;
			wall10.mesh.position.set(113.5,13,100)
			level3Walls.push(wall10)
			class3.add(wall10.mesh)
			
			let wall11 = new Wall(12,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall11.mesh.rotation.y = Math.PI / 2;
			wall11.mesh.position.set(68,13,106)
			level3Walls.push(wall11)
			class3.add(wall11.mesh)
			
			let wall12 = new Wall(12,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall12.mesh.rotation.y = -Math.PI / 2;
			wall12.mesh.position.set(112,13,106)
			level3Walls.push(wall12)
			class3.add(wall12.mesh)	
			
			///時間性的 下方
			
			let wall13 = new Wall(3,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall13.mesh.position.set(66.5,13,70)
			level3Walls.push(wall13)
			class3.add(wall13.mesh)

			let wall14 = new Wall(50,2,new THREE.Vector3(0,0,1),1,0xA23400)
			wall14.mesh.position.set(90,11,58)
			level3Walls.push(wall14)
			class3.add(wall14.mesh)

			let wall15 = new Wall(3,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall15.mesh.position.set(113.5,13,70)
			level3Walls.push(wall15)
			class3.add(wall15.mesh)
			
			let wall16 = new Wall(12,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall16.mesh.rotation.y = Math.PI / 2;
			wall16.mesh.position.set(68,13,64)
			level3Walls.push(wall16)
			class3.add(wall16.mesh)
			
			let wall17 = new Wall(12,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall17.mesh.rotation.y = -Math.PI / 2;
			wall17.mesh.position.set(112,13,64)
			level3Walls.push(wall17)
			class3.add(wall17.mesh)
			
			//轉動橡皮
			
			let wall18 = new Wall(10,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall18.mesh.rotation.y = -Math.PI /2
			wall18.mesh.position.set(-1.5,2.5,-5.75);
			smallEraser1.add(wall18.mesh)
			level3Walls.push(wall18)
			
			let wall19 = new Wall(10,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall19.mesh.rotation.y = -Math.PI/2
			wall19.mesh.position.set(-1.5,2.5,5.75);
			smallEraser2.add(wall19.mesh)
			level3Walls.push(wall19)
			
			let wall20 = new Wall(3,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall20.mesh.rotation.y = Math.PI;
			wall20.mesh.position.set(0,2.5,-11);
			smallEraser1.add(wall20.mesh)
			level3Walls.push(wall20)
			
			let wall21 = new Wall(3,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall21.mesh.position.set(0,2.5,11);
			smallEraser2.add(wall21.mesh)
			level3Walls.push(wall21)

			let wall22 = new Wall(10,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall22.mesh.rotation.y = Math.PI /2
			wall22.mesh.position.set(1.5,2.5,-5.75);
			smallEraser1.add(wall22.mesh)
			level3Walls.push(wall22)
			
			let wall23 = new Wall(10,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall23.mesh.rotation.y = Math.PI/2
			wall23.mesh.position.set(1.5,2.5,5.75);
			smallEraser2.add(wall23.mesh)
			level3Walls.push(wall23)
			
			//尺相關判定

			let wall24 = new Wall(40,12,new THREE.Vector3(0,0,1),1,0xA23400,2.5,0.2)
			wall24.mesh.rotation.order = 'XZY'
			wall24.mesh.rotation.x = -Math.PI / 180 * 90
			wall24.mesh.rotation.z = Math.PI / 180 * 90
			wall24.mesh.rotation.y = Math.PI / 180 * 9
			wall24.mesh.position.set(92,15.1,70);
			class3.add(wall24.mesh);
			level3Walls.push(wall24)
			
			let wall25 = new Wall(50,2,new THREE.Vector3(0,0,1),1,0xA23400,2.5,0.1)
			wall25.mesh.rotation.y = -Math.PI / 180 * 90
			wall25.mesh.rotation.z = Math.PI / 180 * 9
			wall25.mesh.position.set(95,16.6,75);
			level3Walls.push(wall25)
			class3.add(wall25.mesh);
			
			let wall26 = new Wall(50,1.7,new THREE.Vector3(0,0,1),1,0xA23400,2.5,0.1)
			wall26.mesh.rotation.order = 'YZX'
			wall26.mesh.rotation.y = -Math.PI / 180 * 90
			wall26.mesh.rotation.z = Math.PI / 180 * 9
			wall26.mesh.rotation.x = -Math.PI / 180 * 30
			wall26.mesh.position.set(95.4,18.2,75);
			level3Walls.push(wall26)
			class3.add(wall26.mesh);

			let wall261 = new Wall(1.7,50,new THREE.Vector3(0,0,1),1,0xA23400,2.5,0.1)
			wall261.mesh.rotation.x = -Math.PI / 180 * 99
			wall261.mesh.position.set(96.5,18.8,75);
			level3Walls.push(wall261)
			class3.add(wall261.mesh);
			
			//橡皮擦柱子	
			
			let wall27 = new Wall(6.5,5.9,new THREE.Vector3(0,0,1),1,0xA23400)
			wall27.mesh.rotation.y = -Math.PI / 180 * 90
			wall27.mesh.position.set(86,13,80);
			level3Walls.push(wall27)
			class3.add(wall27.mesh);
			let wall28 = new Wall(6.5,5.9,new THREE.Vector3(0,0,1),1,0xA23400)
			wall28.mesh.rotation.y = Math.PI/2
			wall28.mesh.position.set(98,13,80);
			level3Walls.push(wall28)
			class3.add(wall28.mesh);

			let wall29 = new Wall(12,5.9,new THREE.Vector3(0,0,1),1,0xA23400)
			wall29.mesh.position.set(92,13,83.25);
			level3Walls.push(wall29)
			class3.add(wall29.mesh);
			let wall30 = new Wall(12,5.9,new THREE.Vector3(0,0,1),1,0xA23400)
			wall30.mesh.rotation.y = -Math.PI
			wall30.mesh.position.set(92,13,76.75);
			level3Walls.push(wall30)
			class3.add(wall30.mesh);
			
			let wall31 = new Wall(12,6.5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall31.mesh.rotation.x = -Math.PI / 180 * 90
			wall31.mesh.position.set(92,16,80);
			level3Walls.push(wall31)
			class3.add(wall31.mesh);

			let wall32 = new Wall(6.5,11.9,new THREE.Vector3(0,0,1),1,0xA23400)
			wall32.mesh.rotation.y = -Math.PI / 180 * 90
			wall32.mesh.position.set(86,6,51);
			level3Walls.push(wall32)
			class3.add(wall32.mesh);
			let wall33 = new Wall(6.5,12,new THREE.Vector3(0,0,1),1,0xA23400)
			wall33.mesh.rotation.y = Math.PI/2
			wall33.mesh.position.set(98,6,51);
			level3Walls.push(wall33)
			class3.add(wall33.mesh);

			let wall34 = new Wall(12,12,new THREE.Vector3(0,0,1),1,0xA23400)
			wall34.mesh.position.set(92,6,54.25);
			level3Walls.push(wall34)
			class3.add(wall34.mesh);
			let wall35 = new Wall(12,12,new THREE.Vector3(0,0,1),1,0xA23400)
			wall35.mesh.rotation.y = -Math.PI
			wall35.mesh.position.set(92,6,47.75);
			level3Walls.push(wall35)
			class3.add(wall35.mesh);
			
			let wall36 = new Wall(12,6.5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall36.mesh.rotation.x = -Math.PI / 180 * 90
			wall36.mesh.position.set(92,12,51);
			class3.add(wall36.mesh);
			level3Walls.push(wall36)
			
			///書斜坡
			let wall37 = new Wall(50,30,new THREE.Vector3(0,0,1),1,0xA23400)
			wall37.mesh.rotation.y = Math.PI;
			wall37.mesh.position.set(140,15,100.5);
			level3Walls.push(wall37)
			class3.add(wall37.mesh)
			
			let wall38 = new Wall(50,30,new THREE.Vector3(0,0,1),1,0xA23400)
			wall38.mesh.rotation.y = -Math.PI / 2;
			wall38.mesh.position.set(145,15,75);
			level3Walls.push(wall38)
			class3.add(wall38.mesh)	
			
			let wall39 = new Wall(30,50,new THREE.Vector3(0,0,1),1,0xA23400)
			wall39.mesh.rotation.x = -Math.PI / 180 * 95;	
			wall39.mesh.position.set(130,7.2,75);
			level3Walls.push(wall39)
			class3.add(wall39.mesh)	
			
			//塗鴉
			let wall40 = new Wall(50,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall40.mesh.rotation.y = -Math.PI;
			wall40.mesh.position.set(90,2.5,55);
			level3Walls.push(wall40)
			class3.add(wall40.mesh)
			
			let wall42 = new Wall(50,3,new THREE.Vector3(0,0,1),1,0xA23400)
			wall42.mesh.rotation.y = -Math.PI / 2;
			wall42.mesh.position.set(146.5,1.5,25);
			level3Walls.push(wall42)
			class3.add(wall42.mesh)	

			let wall43 = new Wall(50,30,new THREE.Vector3(0,0,1),1,0xA23400)
			wall43.mesh.rotation.y = Math.PI / 2;
			wall43.mesh.position.set(86,15,30);
			level3Walls.push(wall43)
			class3.add(wall43.mesh)
			
			let wall44 = new Wall(65,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall44.mesh.position.set(115,2.5,5);
			level3Walls.push(wall44)
			class3.add(wall44.mesh)
			
			
			let wall45 = new Wall(30,4,new THREE.Vector3(0,0,1),1,0xA23400)
			wall45.mesh.rotation.x = -Math.PI / 180 * 5;
			wall45.mesh.rotation.y = Math.PI;
			wall45.mesh.position.set(130,2,50.4);
			level3Walls.push(wall45)
			class3.add(wall45.mesh)	

			let wall46 = new Wall(6,4,new THREE.Vector3(0,0,1),1,0xA23400)
			wall46.mesh.rotation.y = -Math.PI / 2;
			wall46.mesh.position.set(115,2,53.4);
			
			level3Walls.push(wall46)
			class3.add(wall46.mesh)	
			
			for(let k = 0; k < level3Walls.length;k++){
				level3Walls[k].mesh.visible = false;
			}
		}
		if(true){//按鈕
			//let texture = new THREE.TextureLoader().load('https://i.imgur.com/cwu54BH.png')
			pressButton = new THREE.Mesh(new THREE.SphereGeometry(2.5,32,32,0,Math.PI * 2,0,Math.PI/ 4),new THREE.MeshBasicMaterial({color:"red"}))
			pressButton.rotation.x = -Math.PI / 2
			pressButton.rotation.z = -Math.PI / 180 * 48
			pressButton.position.set(-9,21.6,90)
			class3.add(pressButton)
		}
	}
}
function buildEraser(){
	let group = new THREE.Group();
	
	let body = new THREE.Mesh(new THREE.BoxGeometry(24,5,12), new THREE.MeshBasicMaterial({color:0xdedcdc}))
	//body.position.x = 2
	
	let mesh1 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,5), new THREE.MeshBasicMaterial({color:"blue"}))
	mesh1.position.set(-4.49,1.75,4)
	let mesh2 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,3), new THREE.MeshBasicMaterial({color:"white"}))
	mesh2.position.set(-4.49,1.75,0)
	let mesh3 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,5), new THREE.MeshBasicMaterial({color:"black"}))
	mesh3.position.set(-4.49,1.75,-4)
	
	let mesh4 = new THREE.Mesh(new THREE.BoxGeometry(15,1,5), new THREE.MeshBasicMaterial({color:"white"}))
	mesh4.position.set(-4.49,0,4)
	let mesh5 = new THREE.Mesh(new THREE.BoxGeometry(15,1,5), new THREE.MeshBasicMaterial({color:"white"}))
	mesh5.position.set(-4.49,0,-4)
	
	let mesh6 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,5), new THREE.MeshBasicMaterial({color:"blue"}))
	mesh6.position.set(-4.49,-1.75,-4)
	let mesh7 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,3), new THREE.MeshBasicMaterial({color:"white"}))
	mesh7.position.set(-4.49,-1.75,0)
	let mesh8 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,5), new THREE.MeshBasicMaterial({color:"black"}))
	mesh8.position.set(-4.49,-1.75,4)	
	
	let mesh9 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,5), new THREE.MeshBasicMaterial({color:"black"}))
	mesh9.position.set(-4.49,1.75,-4)

	group.add(body,mesh1,mesh2,mesh3,mesh4,mesh5,mesh6,mesh7,mesh8)
	group.position.set(0,1.5,0)
	group.scale.set(0.5,0.5,0.5)
	
	
	let groupAll = new THREE.Group();
	groupAll.add(group);
	return groupAll
}
function buildSmallEraser(zAngle){
	let group = new THREE.Group();
	
	let body = new THREE.Mesh(new THREE.BoxGeometry(24,5,12), new THREE.MeshBasicMaterial({color:0xdedcdc}))
	//body.position.x = 2
	
	let mesh1 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,5), new THREE.MeshBasicMaterial({color:"red"}))
	mesh1.position.set(-4.49,1.75,4)
	let mesh2 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,3), new THREE.MeshBasicMaterial({color:"white"}))
	mesh2.position.set(-4.49,1.75,0)
	let mesh3 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,5), new THREE.MeshBasicMaterial({color:"red"}))
	mesh3.position.set(-4.49,1.75,-4)
	
	let mesh4 = new THREE.Mesh(new THREE.BoxGeometry(15,1,5), new THREE.MeshBasicMaterial({color:"white"}))
	mesh4.position.set(-4.49,0,4)
	let mesh5 = new THREE.Mesh(new THREE.BoxGeometry(15,1,5), new THREE.MeshBasicMaterial({color:"white"}))
	mesh5.position.set(-4.49,0,-4)
	
	let mesh6 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,5), new THREE.MeshBasicMaterial({color:"red"}))
	mesh6.position.set(-4.49,-1.75,-4)
	let mesh7 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,3), new THREE.MeshBasicMaterial({color:"white"}))
	mesh7.position.set(-4.49,-1.75,0)
	let mesh8 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,5), new THREE.MeshBasicMaterial({color:"red"}))
	mesh8.position.set(-4.49,-1.75,4)	
	
	let mesh9 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,5), new THREE.MeshBasicMaterial({color:"red"}))
	mesh9.position.set(-4.49,1.75,-4)

	group.add(body,mesh1,mesh2,mesh3,mesh4,mesh5,mesh6,mesh7,mesh8)
	if(zAngle <= 0){
		group.position.set(0,3.25,-6)
		group.rotation.z = zAngle
	}
	else{
		group.position.set(0,3.25,6)
		group.rotation.z = zAngle
	}
	
	//group.position.set(0,3.25,-6)
	group.scale.set(0.4,0.5,0.5)
	group.rotation.x = Math.PI/2
	//group.rotation.z = -Math.PI/2
	
	let groupAll = new THREE.Group();
	groupAll.add(group);
	return groupAll
}
function buildPencil(){
	let group = new THREE.Group();
	
	let body = new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,45,6),new THREE.MeshBasicMaterial({color : 0xffc933}))
	let alu = new THREE.Mesh(new THREE.CylinderGeometry(1.6,1.6,2,32),new THREE.MeshBasicMaterial({color : 0x94938f}))
	let eraser = new THREE.Mesh(new THREE.CylinderGeometry(1.3,1.3,3,32),new THREE.MeshBasicMaterial({color : 0xd92b25}))
	
	let brown = new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.2,45.01,32),new THREE.MeshBasicMaterial({color : 0xb37f4f}))
	let black = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,45.02,32),new THREE.MeshBasicMaterial({color : 0x1c1c1b}))
	body.rotation.x = -Math.PI/2
	body.rotation.y = Math.PI / 180 * 90
	
	alu.rotation.x = -Math.PI / 2
	alu.position.z = 23.5;
	
	eraser.rotation.x = -Math.PI / 2
	eraser.position.z = 26;
	
	brown.rotation.x = -Math.PI/2
	black.rotation.x = -Math.PI/2
	group.add(body,alu,eraser,brown,black)
	group.position.set(0,1.5,22.5)
	let groupall = new THREE.Group();
	groupall.add(group)
	return groupall
	
}
function buildBook(){
	let group = new THREE.Group();
	
	let loader = new THREE.TextureLoader();
	let matArray = [];
	matArray.push(new THREE.MeshBasicMaterial({map : loader.load("https://i.imgur.com/VqZfkMV.jpg")}))
	matArray.push(new THREE.MeshBasicMaterial({map : loader.load("https://i.imgur.com/VqZfkMV.jpg")}))
	matArray.push(new THREE.MeshBasicMaterial({map : loader.load("https://i.imgur.com/5I081NU.png")}))
	matArray.push(new THREE.MeshBasicMaterial({map : loader.load("https://i.imgur.com/fgQf5yr.png")}))
	matArray.push(new THREE.MeshBasicMaterial({map : loader.load("https://i.imgur.com/VqZfkMV.jpg")}))
	matArray.push(new THREE.MeshBasicMaterial({map : loader.load("https://i.imgur.com/ZausXxX.png")}))
	let box = new THREE.Mesh(new THREE.BoxGeometry(50,5,30),matArray);
	box.rotation.y = -Math.PI/2
	box.position.set(0,-2.5,25);
	group.add(box)
	return group;
	
}
function buildRuler(){
	let group = new THREE.Group();
	let texture = new THREE.TextureLoader().load("https://i.imgur.com/m648HMn.png")
	let body = new THREE.Mesh(new THREE.BoxGeometry(40,0.1,6),new THREE.MeshBasicMaterial({map:texture,alphaTest:0.5,side:THREE.DoubleSide}))
	body.position.set(0,0.05,0)
	group.add(body)
	return group

}
function buildFan(){
	let group = new THREE.Group();
	
	var cylinder=new THREE.Mesh(new THREE.CylinderGeometry(5,5,20,32),new THREE.MeshPhongMaterial());
	cylinder.position.set(0,20,0)

	var cylinder2=new THREE.Mesh(new THREE.CylinderGeometry(7.5,7.5,10,32),new THREE.MeshPhongMaterial());
	cylinder2.position.set(0,35,0)
	cylinder2.rotation.x=Math.PI/2

	var sphere=new THREE.Mesh(new THREE.SphereGeometry(2,32,16),new THREE.MeshPhongMaterial({color:'blue'}));
	sphere.position.set(0,35,7);
	
	group.add(cylinder,cylinder2,sphere);
	
	var box = new THREE.Mesh(new THREE.BoxGeometry(5,30,0.5),new THREE.MeshPhongMaterial({color:'red'}));
	box.position.set(0,-15,7); 
	var box2 = new THREE.Mesh(new THREE.BoxGeometry(5,30,0.5),new THREE.MeshPhongMaterial({color:'red'}));
	box2.position.set(0,15,7); 
	var box3 = new THREE.Mesh(new THREE.BoxGeometry(5,30,0.5),new THREE.MeshPhongMaterial({color:'red'}));
	box3.rotation.z=Math.PI/2
	box3.position.set(15,0,7); 
	var box4 = new THREE.Mesh(new THREE.BoxGeometry(5,30,0.5),new THREE.MeshPhongMaterial({color:'red'}));
	box4.position.set(-15,0,7); 
	box4.rotation.z=-Math.PI/2
	
	boxg.add(box,box2,box3,box4);
	boxg.position.set(0,35,0);
	group.add(boxg)
	
	let stand1 = new THREE.Mesh(new THREE.BoxGeometry(20,2.5,10),new THREE.MeshPhongMaterial());
	stand1.position.set(0,8.75,0)
	
	let stand2 = new THREE.Mesh(new THREE.BoxGeometry(7,2.5,10),new THREE.MeshPhongMaterial());
	stand2.position.set(-6.5,6.25,0)
	
	let stand3 = new THREE.Mesh(new THREE.BoxGeometry(7,2.5,10),new THREE.MeshPhongMaterial());
	stand3.position.set(6.5,6.25,0)
	
	let stand4 = new THREE.Mesh(new THREE.BoxGeometry(37.5,5,7.5),new THREE.MeshPhongMaterial());
	stand4.position.set(0,2.5,8.75)
	
	let stand5 = new THREE.Mesh(new THREE.BoxGeometry(15.25,5,17.5),new THREE.MeshPhongMaterial());
	stand5.position.set(10.625,2.5,-3.75)
	
	let stand6 = new THREE.Mesh(new THREE.BoxGeometry(15.25,5,17.5),new THREE.MeshPhongMaterial());
	stand6.position.set(-10.625,2.5,-3.75)
	
	let plane = new THREE.Mesh(new THREE.PlaneGeometry(6,17.5),new THREE.MeshPhongMaterial())
	plane.position.set(0,2.5,-3.4)
	plane.rotation.x = Math.PI /180 * 73
	
	group.add(stand1,stand2,stand3,stand4,stand5,stand6,plane)
	group.rotation.y = -Math.PI / 2
	
	return group
}
function buildNewtonCradle(){
	let group = new THREE.Group();
	let box = new THREE.Mesh(new THREE.BoxGeometry(20,2,18),new THREE.MeshNormalMaterial())
	box.position.set(0,1,0)
	
	let group2 = new THREE.Group();
	let sphere = new THREE.Mesh(new THREE.SphereGeometry(1,32),new THREE.MeshNormalMaterial())
	sphere.position.set(0,-10.4,0)

	let cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.25,0.125,32,32),new THREE.MeshNormalMaterial())
	cylinder.position.set(0,-9.4,0)
	let line1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,10),new THREE.MeshNormalMaterial());
	line1.position.set(1.75,9,0)
	line1.position.y = -4.7
	line1.rotation.z = -Math.PI / 180 * 20

	let line2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,10),new THREE.MeshNormalMaterial());
	line2.position.set(-1.75,9,0)
	line2.position.y = -4.7
	line2.rotation.z = Math.PI / 180 * 20
	group2.add(sphere,cylinder,line1,line2)
	group2.position.y = 13.5;
	
	return group2;

}
function stand(){
	let group = new THREE.Group();
	let group1 = new THREE.Group();
	
	let cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,10,32,32),new THREE.MeshNormalMaterial())
	cylinder.rotation.x = Math.PI/2
	cylinder.rotation.y = Math.PI/2
	cylinder.position.set(0,0,0)
	
	let torus1 = new THREE.Mesh(new THREE.TorusGeometry( 0.302, 0.02, 16, 100 ),new THREE.MeshNormalMaterial())
	torus1.position.z = 1
	
	let torus2 = new THREE.Mesh(new THREE.TorusGeometry( 0.302, 0.02, 16, 100 ),new THREE.MeshNormalMaterial())
	torus2.position.z = -1
	
	group1.add(cylinder,torus1,torus2)
	group1.position.set(3.56,11.8,0)
	
	group.add(group1.clone())
	group1.position.set(-3.56,11.8,0)
	group.add(group1)
	
	let group2 = new THREE.Group();
	let torus11 = new THREE.Mesh(new THREE.TorusGeometry( 0.302, 0.02, 16, 100 ),new THREE.MeshNormalMaterial())
	torus11.position.z = 3
	
	let torus22 = new THREE.Mesh(new THREE.TorusGeometry( 0.302, 0.02, 16, 100 ),new THREE.MeshNormalMaterial())
	torus22.position.z = -3
	
	group2.add(torus11,torus22)
	group2.position.set(3.56,11.8,0)
	
	group.add(group2.clone())
	group2.position.set(-3.56,11.8,0)
	group.add(group2)
	
	
	let torus3 = new THREE.Mesh(new THREE.TorusGeometry( 0.3, 0.3, 32, 100,Math.PI / 2),new THREE.MeshNormalMaterial())
	torus3.position.set(-3.56,11.5,-5)
	torus3.rotation.y = -Math.PI / 2
	torus3.rotation.z = Math.PI / 2
	group.add(torus3.clone())
	torus3.position.set(3.56,11.5,-5)
	group.add(torus3.clone())
	torus3.rotation.y = 0
	torus3.rotation.y = Math.PI / 2
	torus3.position.set(3.56,11.5,5)
	group.add(torus3.clone())
	torus3.position.set(-3.56,11.5,5)
	group.add(torus3.clone())
	
	let cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,12,32,32),new THREE.MeshNormalMaterial());
	cylinder2.position.set(3.56,5.5,5.3)
	group.add(cylinder2.clone())
	
	cylinder2.position.set(-3.56,5.5,5.3)
	group.add(cylinder2.clone())
	
	cylinder2.position.set(3.56,5.5,-5.3)
	group.add(cylinder2.clone())
	
	cylinder2.position.set(-3.56,5.5,-5.3)
	group.add(cylinder2.clone())
	
	let box = new THREE.Mesh(new THREE.BoxGeometry(10,2,15),new THREE.MeshNormalMaterial());
	box.position.y = -1
	group.add(box)
	let groupAll = new THREE.Group();
	group.position.y = 2;
	groupAll.add(group);
	return groupAll;
	
}
function buildGoal(){
	let loader = new THREE.TextureLoader();
  loader.crossOrigin = '';
  let texture = loader.load('https://i.imgur.com/Ze2KEuN.png');
  let texture2 = loader.load('https://i.imgur.com/Ze2KEuN.png');
  texture2.repeat.set(1,4/8)

  var texMat = new THREE.MeshBasicMaterial({
    map: texture,
    //transparent: true,
    alphaTest: 0.5,
    side:THREE.DoubleSide
  });
  var texMat2 = new THREE.MeshBasicMaterial({
    map: texture2,
    //transparent: true,
    alphaTest: 0.5,
    side:THREE.DoubleSide
  });
  var net = new THREE.Mesh(new THREE.PlaneGeometry(30, 27.5), texMat);
  net.position.set(0,0,-15)
  net.rotation.x=Math.PI/8;
  var net2 = new THREE.Mesh(new THREE.PlaneGeometry(30, 20), texMat2);
  net2.position.set(0,12.5,-10)
  net2.rotation.x=Math.PI/2;
  var pole=new THREE.Mesh(new THREE.CylinderGeometry(2,2,25,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole.position.set(17,0,0);
  var pole2=new THREE.Mesh(new THREE.CylinderGeometry(2,2,25,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole2.position.set(-17,0,0);
  var pole3=new THREE.Mesh(new THREE.CylinderGeometry(2,2,34,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole3.rotation.z=Math.PI/2;
  pole3.position.set(0,12.5,0);
  var pole4=new THREE.Mesh(new THREE.CylinderGeometry(2,2,34,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole4.rotation.z=Math.PI/2;
  pole4.position.set(0,12.5,-10);
  var pole5=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole5.rotation.x=Math.PI/2;
  pole5.position.set(17,12.5,-5);
  var pole6=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole6.rotation.x=Math.PI/2;
  pole6.position.set(-17,12.5,-5);
  var pole7=new THREE.Mesh(new THREE.CylinderGeometry(2,2,27.5,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole7.position.set(17,0,-15);
  pole7.rotation.x=Math.PI/8
  var pole8=new THREE.Mesh(new THREE.CylinderGeometry(2,2,27.5,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole8.position.set(-17,0,-15);
  pole8.rotation.x=Math.PI/8
  
  var uvs = new Float32Array( quad_uvs);
  var geometry = new THREE.BufferGeometry();

  var indices = [];
  var vertices = [];
  
  vertices.push(0,0,0, 10,0,0, 20,-25,0, 0,-25,0);
  indices.push(3, 0, 1, 1, 2, 3);
  
	geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
  geometry.computeVertexNormals();
  let material = new THREE.MeshBasicMaterial({
    map: texture,
    alphaTest: 0.5,
    side:THREE.DoubleSide
  });
	let pointer = new THREE.Mesh(geometry,material);
  pointer.rotation.y=Math.PI/2;
  pointer.position.set(17,12.5,0)
  let pointer2 = new THREE.Mesh(geometry,material);
  pointer2.rotation.y=Math.PI/2;
  pointer2.position.set(-17,12.5,0)
  var goal=new THREE.Group();
  goal.add(pointer2,pointer,pole,pole2,pole3,pole4,pole5,pole6,pole7,pole8,net,net2);
  scene.add(goal);
  goal.position.set(25,11,-425)
  class2.add(goal)
  
  var net3 = new THREE.Mesh(new THREE.PlaneGeometry(30, 27.5), texMat);
  net3.position.set(0,0,-15)
  net3.rotation.x=Math.PI/8;
  var net4 = new THREE.Mesh(new THREE.PlaneGeometry(30, 20), texMat2);
  net4.position.set(0,12.5,-10)
  net4.rotation.x=Math.PI/2;
  var pole9=new THREE.Mesh(new THREE.CylinderGeometry(2,2,25,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole9.position.set(17,0,0);
  var pole10=new THREE.Mesh(new THREE.CylinderGeometry(2,2,25,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole10.position.set(-17,0,0);
  var pole11=new THREE.Mesh(new THREE.CylinderGeometry(2,2,34,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole11.rotation.z=Math.PI/2;
  pole11.position.set(0,12.5,0);
  var pole12=new THREE.Mesh(new THREE.CylinderGeometry(2,2,34,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole12.rotation.z=Math.PI/2;
  pole12.position.set(0,12.5,-10);
  var pole13=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole13.rotation.x=Math.PI/2;
  pole13.position.set(17,12.5,-5);
  var pole14=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole14.rotation.x=Math.PI/2;
  pole14.position.set(-17,12.5,-5);
  var pole15=new THREE.Mesh(new THREE.CylinderGeometry(2,2,27.5,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole15.position.set(17,0,-15);
  pole15.rotation.x=Math.PI/8
  var pole16=new THREE.Mesh(new THREE.CylinderGeometry(2,2,27.5,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole16.position.set(-17,0,-15);
  pole16.rotation.x=Math.PI/8
  
  let pointer3 = new THREE.Mesh(geometry,material);
  pointer3.rotation.y=Math.PI/2;
  pointer3.position.set(17,12.5,0)
  let pointer4 = new THREE.Mesh(geometry,material);
  pointer4.rotation.y=Math.PI/2;
  pointer4.position.set(-17,12.5,0)
  var goal2=new THREE.Group();
  goal2.add(pointer3,pointer4,pole9,pole10,pole11,pole12,pole13,pole14,pole15,pole16,net3,net4);
  scene.add(goal2);
  goal2.position.set(25,11,-125)
  goal2.rotation.y=Math.PI;
  class2.add(goal2)
  
}
export {buildTerrain,table1,planes,walls,cylinders,holes,floors,arcWalls}
export {class1Rotate,class2Rotate,class3Rotate,setClassVisible}
export {obstacle1,obstacle2,obstacle3,car,car2,redhorse2G,steveg,wall49,wall50,wall51,smallEraser1,smallEraser2,pressButton,textureTest,ctexture}