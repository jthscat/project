import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {createMultiMaterialObject} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/utils/SceneUtils.js';
import {ParametricGeometry} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/geometries/ParametricGeometry.js';
import {FinitePlane,Wall} from './terrain.js'
import {scene,sceneMap,renderer} from './render.js'
var table1,table2,table3;

var walls = [],holes = [],cylinders = [],planes = [],floors = [],arcWalls = [];

var level1Walls = [] , level2Walls = [] ,level3Walls = []

var class1 = new THREE.Group(),class1Rotate = new THREE.Group();
var class2 = new THREE.Group(),class2Rotate = new THREE.Group();
var class3 = new THREE.Group(),class3Rotate = new THREE.Group();

var obstacle1=new THREE.Group();
var obstacle2=new THREE.Group();
var obstacle3=new THREE.Group();
var car,car2;

function buildTerrain(){
	buildPlane();
	buildWalls();
	buildholes();
	buildPillar();
	buildfloors();
	buildStoneWall();
	buildArcWalls()
	walls.push(level1Walls,level2Walls,level3Walls)
	class1.position.z = 30;
	scene.add(class1)
	class1Rotate.add(class1.clone())
	
	class2.position.z = 300;
	class2Rotate.add(class2.clone())
	
	class3.position.x = -350
	class3.position.z = 300;
	class3Rotate.add(class3.clone())
	class3Rotate.position.y = -50;
	
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
      map: texture,side:THREE.DoubleSide})
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
	//class2
	
	var stoneWall5 = new THREE.Mesh(stoneGeometry,stoneMaterial);
	scene.add(stoneWall5);
	stoneWall5.position.set(0,-2.51,-125);
	
	var stoneWall6 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	scene.add(stoneWall6);
	stoneWall6.position.set(-25,-2.51,-175);
	stoneWall6.rotation.y = -Math.PI / 2;
	
	var stoneWall7 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	scene.add(stoneWall7);
	stoneWall7.position.set(-25,-2.51,-275);
	stoneWall7.rotation.y = -Math.PI / 2;
	
	var stoneWall8 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	scene.add(stoneWall8);
	stoneWall8.position.set(25,-2.51,-175);
	stoneWall8.rotation.y = -Math.PI / 2;
	
	var stoneWall9 = new THREE.Mesh(stoneGeometry,stoneMaterial);
	scene.add(stoneWall9);
	stoneWall9.position.set(25,-2.51,-250);
	stoneWall9.rotation.y = -Math.PI / 2;
	
	var stoneWall10 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	scene.add(stoneWall10);
	stoneWall10.position.set(25,-2.51,-325);
	
	var stoneWall11 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	scene.add(stoneWall11);
	stoneWall11.position.set(125,-2.51,-325);
	
	var stoneWall12 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	scene.add(stoneWall12);
	stoneWall12.position.set(75,-2.51,-275);
	
	var stoneWall13 = new THREE.Mesh(stoneGeometry,stoneMaterial);
	scene.add(stoneWall13);
	stoneWall13.position.set(150,-2.51,-275);
	
	var stoneWall14 = new THREE.Mesh(stoneGeometry,stoneMaterial);
	scene.add(stoneWall14);
	stoneWall14.position.set(175,-2.51,-300);
	stoneWall14.rotation.y = -Math.PI / 2;
	
	class2.add(stoneWall5.clone(),stoneWall6.clone(),stoneWall7.clone(),stoneWall8.clone(),stoneWall9.clone())
	class2.add(stoneWall10.clone(),stoneWall11.clone(),stoneWall12.clone(),stoneWall13.clone(),stoneWall14.clone())
	
}
function buildPlane(){
  let plane;
  table1 = new THREE.Group();
  scene.add(table1);
  table1.updateMatrixWorld()
  
  
  var loader2 = new THREE.TextureLoader();
  loader2.setCrossOrigin('');
  //test light map
  
  var textureTest1 = loader2.load('https://i.imgur.com/tuIeXbi.png');  
  let material1 = new THREE.MeshBasicMaterial({
        map: textureTest1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
  });
  let material2 = new THREE.MeshBasicMaterial({
        color: 0x006000,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1
  });
  let ground = new THREE.PlaneGeometry(50, 50)
  
  let floor = createMultiMaterialObject(ground, [material2, material1]);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0.02;
  floor.position.z = -5;
  floor.receiveShadow = true;

  plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor, 50 * 1.5, table1);
  plane.update()
  planes.push(plane);
  
  let floor2 = createMultiMaterialObject(ground, [material2, material1]);
  floor2.rotation.x = -Math.PI / 2;
  floor2.position.set(0,0.02,-55)
  floor2.receiveShadow = true;

  plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor2, 50 * 1.5, table1);
  plane.update()
  planes.push(plane);

  let floor3 = createMultiMaterialObject(ground, [material2, material1]);
  floor3.rotation.x = -Math.PI / 2;
  floor3.position.set(50,0.02,-55)
  floor3.receiveShadow = true;

  plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor3, 50 * 1.5, table1);
  plane.update()
  planes.push(plane);
  
  //let circleFloor = createMultiMaterialObject(ground, [material2, material1]);
  let circleFloor = new THREE.Mesh(new THREE.CircleGeometry(50,32,0,Math.PI), new THREE.MeshBasicMaterial({color: 0x006000,side: THREE.DoubleSide}));
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
	hole.rotation.x=-Math.PI/2;  
	hole.rotation.z=-Math.PI;  
	hole.position.set(50,0,-5);
	hole.receiveShadow = true;

	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1),hole, 50 * 1.5, table1);
	plane.update()
	planes.push(plane);
	 
	class1.add(table1,box1)
	
	//class2
	table2 = new THREE.Group();
	scene.add(table2);
	table2.updateMatrixWorld()
	
	var box2 = new THREE.Mesh(new THREE.BoxGeometry(5,0.01,5),new THREE.MeshBasicMaterial({transparent: true,opacity:0.1}));
	box2.position.set(0,0.2,-135);
	box2.material.color.copy(color2)
	box2.receiveShadow = true;
	scene.add(box2);

	let hole2 = createMultiMaterialObject(ground, [materialForHole, material1]);
    //var hole2= new THREE.Mesh(new THREE.PlaneGeometry(50,50),new THREE.MeshPhongMaterial({map: texture2,side:THREE.DoubleSide,alphaMap:alpha,alphaTest: 0.1,}));
	hole2.rotation.x=-Math.PI/2;  
	hole2.position.set(150,0,-300);
	hole2.rotation.z = Math.PI/2;
	hole2.receiveShadow = true;

	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1),hole2, 50 * 1.5, table2);
	plane.update()
	planes.push(plane);
	
	class2.add(table2.clone(),box2.clone())
	
	//class3
	
	table3 = new THREE.Group();
	scene.add(table3);
	table3.updateMatrixWorld()
	
	var floor6 = new THREE.Mesh(new THREE.PlaneGeometry(150,50), new THREE.MeshPhongMaterial({map: texture2,side:THREE.DoubleSide}));
	floor6.material.map.repeat.set( 3, 3 );
	floor6.rotation.x = -Math.PI / 2;
	floor6.rotation.y = Math.PI / 2/3;
	floor6.position.y = 42.5;
	floor6.position.z = -300;
	floor6.position.x = 339.8;
	floor6.receiveShadow = true;
	  
	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor6, 150 * 1.5, table3);
	plane.update()
	planes.push(plane);
	  
	var floor7 = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshPhongMaterial({map: texture2,side:THREE.DoubleSide}));
	floor7.material.map.repeat.set( 3, 3 );
	floor7.rotation.x = -Math.PI / 2;
	floor7.position.y = 5;
	floor7.position.z = -300;
	floor7.position.x = 429.8;
	floor7.receiveShadow = true;
	  
	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor7, 150 * 1.5, table3);
	plane.update()
	planes.push(plane);

	var hole3= new THREE.Mesh(new THREE.PlaneGeometry(50,50),new THREE.MeshPhongMaterial({map: texture2,side:THREE.DoubleSide,alphaMap:alpha,alphaTest: 0.5,}));
	hole3.rotation.x=-Math.PI/2;  
	hole3.position.set(479.8,5,-300);
	hole3.rotation.z = Math.PI/2 ;
	hole3.material.map.repeat.set(3, 3);
	hole3.receiveShadow = true;

	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1),hole3, 50 * 1.5, table3);
	plane.update()
	planes.push(plane);
	
	class3.add(table3.clone())
	
	//big floor
	var loader2 = new THREE.TextureLoader();
    loader2.setCrossOrigin('');
    var textureFloor = loader2.load('https://i.imgur.com/AwpdGoQ.jpg');
    textureFloor.wrapS = THREE.RepeatWrapping;
    textureFloor.wrapT = THREE.RepeatWrapping;
	
	var bigfloor = new THREE.Mesh(new THREE.PlaneGeometry(5000,5000), new THREE.MeshPhongMaterial({map: textureFloor,side:THREE.DoubleSide}));
	bigfloor.material.map.repeat.set( 500, 500 );
	bigfloor.rotation.x = -Math.PI / 2;
	bigfloor.position.y = -4.5;
	bigfloor.receiveShadow = true;
	  
	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), bigfloor, 150 * 1.5, table1);
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
  //時間性關卡:抬升牆壁 class 2
   var clippingPlanes = new THREE.Plane(new THREE.Vector3(0,1,0), 0.0);
  for(var i = 0; i < 3; i++){
	  if(i < 1){
		let x = new Wall(20,15,new THREE.Vector3(0,0,1));
		x.update();
		//console.log(x);
		x.mesh.material.clippingPlanes = [clippingPlanes]
		x.mesh.material.clipShadows =  true;
		level2Walls.push(x)
		
	  }
	  else{
		let x = new Wall(13,15,new THREE.Vector3(0,0,1))
		x.update();
		x.mesh.material.clippingPlanes = [clippingPlanes]
		x.mesh.material.clipShadows =  true;
		level2Walls.push(x);
		
	  }	  
  }
   
   level2Walls[0].mesh.position.set(0, 3, -30)
   level2Walls[1].mesh.position.set(16.5, -15, -30)
   level2Walls[2].mesh.position.set(-16.5, -15, -30)
   
     
   for(var i = 0; i < 3; i++){
	  if(i ==0){
		let x = new Wall(20,2.5,new THREE.Vector3(0,0,1),1,0x04220E);
		x.update();
		x.mesh.material.clippingPlanes = [clippingPlanes]
		x.mesh.material.clipShadows =  true;
		level2Walls.push(x)
	  }
      else{
        let x = new Wall(2.5,15,new THREE.Vector3(0,0,1),1);
		x.update();
		x.mesh.material.clippingPlanes = [clippingPlanes]
		x.mesh.material.clipShadows =  true;
		level2Walls.push(x)
      }	   
  }
  level2Walls[3].mesh.position.set(0, 10.6, -30)
  level2Walls[3].mesh.rotation.x = -Math.PI / 2; 
  level2Walls[4].mesh.position.set(10, 3, -30)
  level2Walls[4].mesh.rotation.y = Math.PI / 2;
  level2Walls[5].mesh.position.set(-10, 3, -30)
  level2Walls[5].mesh.rotation.y = -Math.PI / 2;
  obstacle1.add(level2Walls[0].mesh,level2Walls[3].mesh,level2Walls[4].mesh,level2Walls[5].mesh); 
  scene.add(obstacle1);
  
  for(var i = 0; i < 6; i++){
	  if(i <2){
		let x = new Wall(13,2.5,new THREE.Vector3(0,0,1),1,0x04220E);
		x.update();
		x.mesh.material.clippingPlanes = [clippingPlanes]
		x.mesh.material.clipShadows =  true;
		level2Walls.push(x)
	  }
      else{
        let x = new Wall(2.5,15,new THREE.Vector3(0,0,1),1);
		x.mesh.material.clippingPlanes = [clippingPlanes]
		x.mesh.material.clipShadows =  true;
		x.update();
		level2Walls.push(x)
      }	   
  }
  level2Walls[6].mesh.position.set(16.5, -7.4, -30)
  level2Walls[6].mesh.rotation.x = -Math.PI / 2;
  level2Walls[8].mesh.position.set(22.5, -15, -30)
  level2Walls[8].mesh.rotation.y = Math.PI / 2;
  level2Walls[9].mesh.position.set(10, -15, -30)
  level2Walls[9].mesh.rotation.y = -Math.PI / 2;
  obstacle2.add(level2Walls[1].mesh,level2Walls[6].mesh,level2Walls[8].mesh,level2Walls[9].mesh); 
  scene.add(obstacle2);
  level2Walls[7].mesh.position.set(-16.5, -7.4, -30)
  level2Walls[7].mesh.rotation.x = -Math.PI / 2;
  level2Walls[10].mesh.position.set(-10, -15, -30)
  level2Walls[10].mesh.rotation.y = Math.PI / 2;
  level2Walls[11].mesh.position.set(-22.5, -15, -30)
  level2Walls[11].mesh.rotation.y = -Math.PI / 2;  
  obstacle3.add(level2Walls[2].mesh,level2Walls[7].mesh,level2Walls[10].mesh,level2Walls[11].mesh); 
  scene.add(obstacle3);
  obstacle1.position.z =-200;
  obstacle2.position.z =-200;
  obstacle3.position.z =-200;
  
  //時間性關卡:車子
  car = new THREE.Group();
  for (var i = 0; i < 4; i++) {
    if (i < 2) {
      let x = new Wall(15,10, new THREE.Vector3(0, 0, -1),1);
	  x.mesh.material.clippingPlanes = [clippingPlanes]
	  x.mesh.material.clipShadows =  true;	  
	  x.update();
      level2Walls.push(x);
    }
	else {
      let x = new Wall(5,10, new THREE.Vector3(0, 0, -1),1);
      x.mesh.material.clippingPlanes = [clippingPlanes]
	  x.mesh.material.clipShadows =  true;
      x.update();
      level2Walls.push(x);
    }
  }
  
  var cargeometry = new THREE.BoxGeometry(5, 10, 15);
  var carmaterial = new THREE.MeshPhongMaterial({
      color: 0xA23400,
      shininess: 200,
      transparent: true,
      opacity: 1
    })
  var carmesh= new THREE.Mesh(cargeometry, carmaterial);
  carmesh.position.set(0,2.5,-3)
  
  car.add(carmesh);
  car.add(level2Walls[12].mesh);
  car.add(level2Walls[13].mesh);
  car.add(level2Walls[14].mesh);
  car.add(level2Walls[15].mesh);
  //car.rotation.y = -Math.PI / 2;
  car.position.set(75,2.5,-300)
  
  scene.add(car);
  
  
  level2Walls[12].mesh.rotation.y = -Math.PI / 2;
  level2Walls[13].mesh.rotation.y = Math.PI / 2;
  level2Walls[15].mesh.rotation.y = Math.PI;

  level2Walls[12].mesh.position.set(-2.5, 2.5, -3)
  level2Walls[13].mesh.position.set(2.5, 2.5, -3)
  level2Walls[14].mesh.position.set(0, 2.5, 4.5)
  level2Walls[15].mesh.position.set(0, 2.5, -10.5)
  
  car2 = new THREE.Group();
  for (var i = 0; i < 4; i++) {
    if (i < 2) {
      let x = new Wall(15,10, new THREE.Vector3(0, 0, -1),1);
      x.update();
	  x.mesh.material.clippingPlanes = [clippingPlanes]
	  x.mesh.material.clipShadows =  true;
      level2Walls.push(x);
    }
	else {
      let x = new Wall(5,10, new THREE.Vector3(0, 0, -1),1);
      x.update();
	  x.mesh.material.clippingPlanes = [clippingPlanes]
	  x.mesh.material.clipShadows =  true;
      level2Walls.push(x);
    }
  }
  
  var carmesh2= new THREE.Mesh(cargeometry, carmaterial);
  carmesh2.position.set(0,2.5,-3)
  
  car2.add(carmesh2);
  car2.add(level2Walls[16].mesh);
  car2.add(level2Walls[17].mesh);
  car2.add(level2Walls[19].mesh);
  car2.add(level2Walls[18].mesh);
  //car.rotation.y = -Math.PI / 2;
  car2.position.set(125,2.5,-300)
  
  scene.add(car2);
  
  
  level2Walls[16].mesh.rotation.y = -Math.PI / 2;
  level2Walls[17].mesh.rotation.y = Math.PI / 2;
  level2Walls[19].mesh.rotation.y = Math.PI;

  level2Walls[16].mesh.position.set(-2.5, 2.5, -3)
  level2Walls[17].mesh.position.set(2.5, 2.5, -3)
  level2Walls[18].mesh.position.set(0, 2.5, 4.5)
  level2Walls[19].mesh.position.set(0, 2.5, -10.5)
  
  //第二關
   for (var i = 0; i < 3; i++) {
    if (i < 2) {
      let x = new Wall(50,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level2Walls.push(x);
    }
	else {
      let x = new Wall(200,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level2Walls.push(x);
    }
  }
  level2Walls[21].mesh.rotation.y = -Math.PI / 2;
  level2Walls[22].mesh.rotation.y = -Math.PI / 2;

  level2Walls[20].mesh.position.set(0, 2.5, -125)
  level2Walls[21].mesh.position.set(175, 2.5, -300)
  level2Walls[22].mesh.position.set(-25, 2.5, -225)
  
  level2Walls[20].mesh.visible = false;
  
  
  let x = new Wall(95,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level2Walls.push(x);
  level2Walls[23].mesh.position.set(22.5, 2.5, -325)
  
  
  x = new Wall(150,5, new THREE.Vector3(0, 0, -1));
  x.update();
  level2Walls.push(x);
  level2Walls[24].mesh.rotation.y = -Math.PI / 2;
  level2Walls[24].mesh.position.set(25, 2.5, -200)
  
  for (var i = 0; i < 3; i++) {
      let x = new Wall(42.5,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level2Walls.push(x);
  }
  level2Walls[25].mesh.position.set(100, 2.5, -275)
  level2Walls[26].mesh.position.set(47.5, 2.5, -275)
  level2Walls[27].mesh.position.set(152.5, 2.5, -275)
  
  
  for (var i = 0; i < 2; i++) {
      let x = new Wall(42.5,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level2Walls.push(x);
  }
  level2Walls[28].mesh.position.set(100, 2.5, -325)
  level2Walls[29].mesh.position.set(152.5, 2.5, -325)
  class2.add(obstacle1.clone(),obstacle2.clone(),obstacle3.clone(),car.clone(),car2.clone())
  for (var i = 0; i <= 9; i++)
	class2.add(level2Walls[i].mesh.clone());

  //class 3
  
  for(var i=0;i<8;i++)
   {
	 if (i < 4) {
      let x = new Wall(50,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level3Walls.push(x);
    }
     else if(i>=4&&i<6)
     {
       let x = new Wall(100,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level3Walls.push(x);
     }
     else{
       let x = new Wall(150,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level3Walls.push(x);
	 }		 
   }
   level3Walls[0].mesh.rotation.y = -Math.PI / 2;
   level3Walls[1].mesh.rotation.y = -Math.PI / 2;
   level3Walls[6].mesh.rotation.z = -Math.PI / 2/3;
   level3Walls[7].mesh.rotation.z = -Math.PI / 2/3;
   
   level3Walls[0].mesh.position.set(225, 82.5, -300);
   level3Walls[1].mesh.position.set(504.8,7.5,-300);
   level3Walls[2].mesh.position.set(250,82.5,-325);
   level3Walls[3].mesh.position.set(250.8,82.5,-275);
   level3Walls[4].mesh.position.set(454.8,7.5,-325);
   level3Walls[5].mesh.position.set(454.8,7.5,-275);
   level3Walls[6].mesh.position.set(339.8,45,-325);
   level3Walls[7].mesh.position.set(339.8,45,-275);
   
   
   level3Walls[0].mesh.visible = false;
   
    for(var i=0;i<6;i++)
   {
	 if (i < 2) {
      let x = new Wall(30,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level3Walls.push(x);
    }
	else
	{
	  let x = new Wall(2.5,5,new THREE.Vector3(0,0,1),1);
	  x.update();
	  level3Walls.push(x)
	}
   }
   level3Walls[8].mesh.position.set(0, 3, 0)
   level3Walls[9].mesh.position.set(0, 3, 0)    
   level3Walls[10].mesh.position.set(-15, 3, 0)
   level3Walls[10].mesh.rotation.y = -Math.PI / 2;
   level3Walls[11].mesh.position.set(-15, 3, 0)
   level3Walls[11].mesh.rotation.y = -Math.PI / 2;
   level3Walls[12].mesh.position.set(15, 3, 0)
   level3Walls[12].mesh.rotation.y = Math.PI / 2;
   level3Walls[13].mesh.position.set(15, 3, 0)
   level3Walls[13].mesh.rotation.y = Math.PI / 2;
   
  var separator1=new THREE.Group();
  var separator2=new THREE.Group();
  
  separator1.add(level3Walls[8].mesh,level3Walls[10].mesh,level3Walls[12].mesh); 
  scene.add(separator1);
  separator2.add(level3Walls[9].mesh,level3Walls[11].mesh,level3Walls[13].mesh); 
  scene.add(separator2);
  
  
  separator1.position.set(390,12.5,-290)
  separator1.rotation.z=-Math.PI/2/3;
  separator2.position.set(390,12.5,-310)
  separator2.rotation.z=-Math.PI/2/3;
  
  for(var i=0;i<4;i++)
   {
	 if (i < 2) {
      let x = new Wall(15,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level3Walls.push(x);
    }
	else
	{
	  let x = new Wall(2.5,5,new THREE.Vector3(0,0,1),1);
	  x.update();
	  level3Walls.push(x)
	}
   }
   level3Walls[14].mesh.position.set(0, 3, 0)
   level3Walls[15].mesh.position.set(0, 3, 0)    
   level3Walls[16].mesh.position.set(-7.5, 3, 0)
   level3Walls[16].mesh.rotation.y = -Math.PI / 2;
   level3Walls[17].mesh.position.set(7.5, 3, 0)
   level3Walls[17].mesh.rotation.y = Math.PI / 2;
   
   var separator3=new THREE.Group();
    separator3.add(level3Walls[14].mesh,level3Walls[16].mesh); 
    scene.add(separator3);
	separator3.position.set(430,4,-283)
	separator3.rotation.y=-Math.PI/2;
	
    var separator4=new THREE.Group();
    separator4.add(level3Walls[15].mesh,level3Walls[17].mesh); 
    scene.add(separator4);
	separator4.position.set(430,4,-317)
	separator4.rotation.y=-Math.PI/2;
	for(var i = 0; i <= 7; i++)
	  class3.add(level3Walls[i].mesh.clone());
	class3.add(separator1.clone(),separator2.clone(),separator3.clone(),separator4.clone())
  
/*
  const shape = new THREE.Shape();
  shape.moveTo( 0, 0 );
  shape.lineTo( 0, 5 );
  shape.lineTo( 30, 10 );
  shape.lineTo( 30, 0 );
  shape.lineTo( 0, 0 );
  
  const extrudeSettings = {
	steps: 10,
	depth: 2.4,
	bevelEnabled: true,
	bevelThickness: 0.2,
	bevelSize: 0,
	bevelOffset: 0,
	bevelSegments: 3
  };

	const lineGeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	const lineMaterial = new THREE.MeshPhongMaterial({
		  color: 0xA23400,
		  shininess: 200,
		  transparent: true,
		  opacity: 1
		});
		
	const lineMesh = new THREE.Mesh( lineGeometry, lineMaterial ) ;
	lineMesh.position.set(110,0,-101.25)
	
	const lineGeometry2 = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	const lineMesh2 = new THREE.Mesh( lineGeometry2, lineMaterial ) ;
	lineMesh2.position.set(110,0,-151.25)

	const lineGeometry3 = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	const lineMesh3 = new THREE.Mesh( lineGeometry3, lineMaterial ) ;
	lineMesh3.rotation.y = -Math.PI / 2;
	lineMesh3.position.set(141.25,0,-180)
	
	const lineGeometry4 = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	const lineMesh4 = new THREE.Mesh( lineGeometry4, lineMaterial );
	lineMesh4.rotation.y = -Math.PI / 2;
	lineMesh4.position.set(191.25,0,-180)

	scene.add( lineMesh,lineMesh2,lineMesh3,lineMesh4); 
*/
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
	scene.add(ballhole2);
	ballhole2.position.set(149.6,0,-300);
	
	class2.add(ballhole2.clone())
	//class3

	let mesh3 = new THREE.Mesh(geometry2, material);
	scene.add(mesh3);
	mesh3.meshFunc = meshFunc2;
    mesh3.inMeshFunc = inMeshFunc2;
    mesh3.meshDifFunc = meshDifFunc2;
    mesh3.rotation.x = -Math.PI/2
    mesh3.position.set(491.05,-4.795,-288.45);
    mesh3.ID = "hole";
	mesh3.level = 3;
	mesh3.visible = false
	holes.push(mesh3)
	
 	var ballhole3 = new THREE.Group();

	var cylinder3 = new THREE.Mesh( geometry4, material );
	cylinder3.castShadow = true;
	cylinder3.receiveShadow = true;
	cylinder3.position.y = -2.2;
	cylinder3.ID = "wall";
	cylinder3.r = 2.576;
	cylinder3.height = 4.4;
	holes.push(cylinder3);
	
	ballhole3.add(cylinder3);
	
	const block3 = new THREE.Mesh( geometry, material2);
	
	block3.position.y=-4.4;
	block3.ID = "bottom";
	block3.r = 2.576
	block3.normal = new THREE.Vector3(0,1,0);
	holes.push(block3)
	ballhole3.add(block3)
	scene.add(ballhole3);
	ballhole3.position.set(491.05,5,-288.45);  	
	
	class3.add(ballhole3.clone())
	
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
	/*
	var class21 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class21.R = 2;
	class21.height = 6
	class21.position.set(60,3,-150);
	class21.ID = "wall"
	class21.castShadow = true;
	scene.add(class21)
	cylinders.push(class21)
	
	var class22 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class22.R = 2;
	class22.height = 6
	class22.position.set(60,3,-100);
	class22.ID = "wall"
	class22.castShadow = true;
	scene.add(class22)
	cylinders.push(class22)
	
	var class23 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class23.R = 2;
	class23.height = 6
	class23.position.set(140,3,-230);
	class23.ID = "wall"
	class23.castShadow = true;
	scene.add(class23)
	cylinders.push(class23)
	
	var class24 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class24.R = 2;
	class24.height = 6
	class24.position.set(190,3,-230);
	class24.ID = "wall"
	class24.castShadow = true;
	scene.add(class24)
	cylinders.push(class24)
	
	var class25 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,11,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class25.R = 2;
	class25.height = 11
	class25.position.set(140,5.5,-150);
	class25.ID = "wall"
	class25.castShadow = true;
	scene.add(class25)
	cylinders.push(class25)
	
	var class26 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,11,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class26.R = 2;
	class26.height = 11
	class26.position.set(190,5.5,-100);
	class26.ID = "wall"
	class26.castShadow = true;
	scene.add(class26)
	cylinders.push(class26)

	var class27 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,7,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class27.R = 2;
	class27.height = 7
	class27.position.set(110,3.5,-100)
	class27.ID = "wall"
	class27.castShadow = true;
	scene.add(class27)
	cylinders.push(class27)

	var class28 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,7,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class28.R = 2;
	class28.height = 7
	class28.position.set(110,3.5,-150)
	class28.ID = "wall"
	class28.castShadow = true;
	scene.add(class28)
	cylinders.push(class28)

	var class29 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,7,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class29.R = 2;
	class29.height = 7
	class29.position.set(140,3.5,-180)
	class29.ID = "wall"
	class29.castShadow = true;
	scene.add(class29)
	cylinders.push(class29)

	var class211 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,7,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class211.R = 2;
	class211.height = 7
	class211.position.set(190,3.5,-180)
	class211.ID = "wall"
	class211.castShadow = true;
	scene.add(class211)
	cylinders.push(class211)

	var class212 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,11,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class212.R = 2;
	class212.height = 11
	class212.position.set(140,5.5,-100);
	class212.ID = "wall"
	class212.castShadow = true;
	scene.add(class212)
	cylinders.push(class212)

	var class213 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,11,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class213.R = 2;
	class213.height = 8
	class213.position.set(190,5.5,-150);
	class213.ID = "wall"
	class213.castShadow = true;
	scene.add(class213)
	cylinders.push(class213)
	*/
	//第二關柱子
	var pillarC21 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC21.R = 2;
	pillarC21.height = 6
	pillarC21.position.set(25,3,-125);
	pillarC21.ID = "wall"
	pillarC21.castShadow = true;
	scene.add(pillarC21)
	cylinders.push(pillarC21)
	
	var pillarC22 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC22.R = 2;
	pillarC22.height = 6
	pillarC22.position.set(-25,3,-125);
	pillarC22.ID = "wall"
	pillarC22.castShadow = true;
	scene.add(pillarC22)
	cylinders.push(pillarC22)
	
	var pillarC23 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC23.R = 2;
	pillarC23.height = 6
	pillarC23.position.set(25,3,-275);
	pillarC23.ID = "wall"
	pillarC23.castShadow = true;
	scene.add(pillarC23)
	cylinders.push(pillarC23)
	
	var pillarC24 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC24.R = 2;
	pillarC24.height = 6
	pillarC24.position.set(-25,3,-325);
	pillarC24.ID = "wall"
	pillarC24.castShadow = true;
	scene.add(pillarC24)
	cylinders.push(pillarC24)
	
	var pillarC25 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC25.R = 2;
	pillarC25.height = 6
	pillarC25.position.set(175,3,-275);
	pillarC25.ID = "wall"
	pillarC25.castShadow = true;
	scene.add(pillarC25)
	cylinders.push(pillarC25)
	
	var pillarC26 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC26.R = 2;
	pillarC26.height = 6
	pillarC26.position.set(175,3,-325);
	pillarC26.ID = "wall"
	pillarC26.castShadow = true;
	scene.add(pillarC26)
	cylinders.push(pillarC26)
	
	
	var pillarC27 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC27.R = 2;
	pillarC27.height = 6
	pillarC27.position.set(130,3,-275);
	pillarC27.ID = "wall"
	pillarC27.castShadow = true;
	scene.add(pillarC27)
	cylinders.push(pillarC27)
	
	var pillarC28 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC28.R = 2;
	pillarC28.height = 6
	pillarC28.position.set(120,3,-275);
	pillarC28.ID = "wall"
	pillarC28.castShadow = true;
	scene.add(pillarC28)
	cylinders.push(pillarC28)
	
	var pillarC29 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC29.R = 2;
	pillarC29.height = 6
	pillarC29.position.set(70,3,-275);
	pillarC29.ID = "wall"
	pillarC29.castShadow = true;
	scene.add(pillarC29)
	cylinders.push(pillarC29)
	
	var pillarC210 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC210.R = 2;
	pillarC210.height = 6
	pillarC210.position.set(80,3,-275);
	pillarC210.ID = "wall"
	pillarC210.castShadow = true;
	scene.add(pillarC210)
	cylinders.push(pillarC210)
	
	var pillarC211 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC211.R = 2;
	pillarC211.height = 6
	pillarC211.position.set(130,3,-325);
	pillarC211.ID = "wall"
	pillarC211.castShadow = true;
	scene.add(pillarC211)
	cylinders.push(pillarC211)
	
	var pillarC212 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC212.R = 2;
	pillarC212.height = 6
	pillarC212.position.set(120,3,-325);
	pillarC212.ID = "wall"
	pillarC212.castShadow = true;
	scene.add(pillarC212)
	cylinders.push(pillarC212)
	
	var pillarC213 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC213.R = 2;
	pillarC213.height = 6
	pillarC213.position.set(70,3,-325);
	pillarC213.ID = "wall"
	pillarC213.castShadow = true;
	scene.add(pillarC213)
	cylinders.push(pillarC213)
	
	var pillarC214 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC214.R = 2;
	pillarC214.height = 6
	pillarC214.position.set(80,3,-325);
	pillarC214.ID = "wall"
	pillarC214.castShadow = true;
	scene.add(pillarC214)
	cylinders.push(pillarC214)
	
	class2.add(pillarC21.clone(),pillarC22.clone(),pillarC23.clone(),pillarC24.clone(),pillarC25.clone(),pillarC26.clone(),pillarC27.clone())
	class2.add(pillarC28.clone(),pillarC29.clone(),pillarC210.clone(),pillarC211.clone(),pillarC212.clone(),pillarC213.clone(),pillarC214.clone())
	///class 3
	
	var pillarC31 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC31.R = 2;
	pillarC31.height = 6
	pillarC31.position.set(225,83,-325);
	pillarC31.ID = "wall"
	pillarC31.castShadow = true;
	scene.add(pillarC31)
	cylinders.push(pillarC31)
	
	var pillarC32 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC32.R = 2;
	pillarC32.height = 6
	pillarC32.position.set(225,83,-275);
	pillarC32.ID = "wall"
	pillarC32.castShadow = true;
	scene.add(pillarC32)
	cylinders.push(pillarC32)
	
	var pillarC33 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC33.R = 2;
	pillarC33.height = 6
	pillarC33.position.set(275,83,-325);
	pillarC33.ID = "wall"
	pillarC33.castShadow = true;
	scene.add(pillarC33)
	cylinders.push(pillarC33)
	
	var pillarC34 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC34.R = 2;
	pillarC34.height = 6
	pillarC34.position.set(275,83,-275);
	pillarC34.ID = "wall"
	pillarC34.castShadow = true;
	scene.add(pillarC34)
	cylinders.push(pillarC34)
	
	var pillarC35 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC35.R = 2;
	pillarC35.height = 6
	pillarC35.position.set(404.8,8,-275);
	pillarC35.ID = "wall"
	pillarC35.castShadow = true;
	scene.add(pillarC35)
	cylinders.push(pillarC35)
	
	var pillarC36 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC36.R = 2;
	pillarC36.height = 6
	pillarC36.position.set(404.8,8,-325);
	pillarC36.ID = "wall"
	pillarC36.castShadow = true;
	scene.add(pillarC36)
	cylinders.push(pillarC36)
	
	var pillarC37 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC37.R = 2;
	pillarC37.height = 6
	pillarC37.position.set(504.8,8,-275);
	pillarC37.ID = "wall"
	pillarC37.castShadow = true;
	scene.add(pillarC37)
	cylinders.push(pillarC37)
	
	var pillarC38 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC38.R = 2;
	pillarC38.height = 6
	pillarC38.position.set(504.8,8,-275);
	pillarC38.ID = "wall"
	pillarC38.castShadow = true;
	scene.add(pillarC38)
	cylinders.push(pillarC38)
	
	var pillarC39 = new THREE.Mesh(new THREE.CylinderGeometry(3,3,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC39.R = 3;
	pillarC39.height = 6
	pillarC39.position.set(310,63,-310);
	pillarC39.rotation.z=-Math.PI/2/3;
	pillarC39.ID = "wall"
	pillarC39.castShadow = true;
	scene.add(pillarC39)
	cylinders.push(pillarC39)
	
	var pillarC310 = new THREE.Mesh(new THREE.CylinderGeometry(3,3,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC310.R = 3;
	pillarC310.height = 6
	pillarC310.position.set(310,63,-290);
	pillarC310.rotation.z=-Math.PI/2/3;
	pillarC310.ID = "wall"
	pillarC310.castShadow = true;
	scene.add(pillarC310)
	cylinders.push(pillarC310)
	
	var pillarC311 = new THREE.Mesh(new THREE.CylinderGeometry(3,3,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC311.R = 3;
	pillarC311.height = 6
	pillarC311.position.set(330,51.5,-300);
	pillarC311.rotation.z=-Math.PI/2/3;
	pillarC311.ID = "wall"
	pillarC311.castShadow = true;
	scene.add(pillarC311)
	cylinders.push(pillarC311)
	
	var pillarC312 = new THREE.Mesh(new THREE.CylinderGeometry(3,3,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC312.R = 3;
	pillarC312.height = 6
	pillarC312.position.set(330,51.5,-316);
	pillarC312.rotation.z=-Math.PI/2/3;
	pillarC312.ID = "wall"
	pillarC312.castShadow = true;
	scene.add(pillarC312)
	cylinders.push(pillarC312)
	
	var pillarC313 = new THREE.Mesh(new THREE.CylinderGeometry(3,3,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC313.R = 3;
	pillarC313.height = 6
	pillarC313.position.set(330,51.5,-284);
	pillarC313.rotation.z=-Math.PI/2/3;
	pillarC313.ID = "wall"
	pillarC313.castShadow = true;
	scene.add(pillarC313)
	cylinders.push(pillarC313)

	class3.add(pillarC31.clone(),pillarC32.clone(),pillarC33.clone(),pillarC34.clone(),pillarC35.clone(),pillarC36.clone(),pillarC37.clone())
	class3.add(pillarC38.clone(),pillarC39.clone(),pillarC310.clone(),pillarC311.clone(),pillarC312.clone(),pillarC313.clone())
}
function buildfloors(){
	
	//class2
	var heightFunc = function(x,z) {
	  let K1 = 5,p1x = -20,p1z = -260,w1 = 15;
	  let K2 = 5, p2x = 15, p2z = -260, w2 = 15;
	  let K3 = 5, p3x = 50, p3z = -280, w3 = 15;
	  let K4 = 5, p4x = 50, p4z = -320, w4 = 15;
	  let K5 = 2, p5x = 20, p5z = -290, w5 = 10;
	  let K6 = 2, p6x = 20, p6z = -310, w6 = 10;
	  let K7 = 2, p7x = -20, p7z = -290, w7 = 10;
	  let K8 = 2, p8x = -20, p8z = -310, w8 = 10;
	  
	  return K1 * Math.exp(
		-(x - p1x) * (x - p1x) / w1 / w1 - (z - p1z) * (z - p1z) / w1 / w1) + K2 * Math.exp(
		-(x - p2x) * (x - p2x) / w2 / w2 - (z - p2z) * (z - p2z) / w2 / w2) + K3 * Math.exp(
		-(x - p3x) * (x - p3x) / w3 / w3 - (z - p3z) * (z - p3z) / w3 / w3) + K4 * Math.exp(
		-(x - p4x) * (x - p4x) / w4 / w4 - (z - p4z) * (z - p4z) / w4 / w4) - K5 * Math.exp(
		-(x - p5x) * (x - p5x) / w5 / w5 - (z - p5z) * (z - p5z) / w5 / w5) - K6 * Math.exp(
		-(x - p6x) * (x - p6x) / w6 / w6 - (z - p6z) * (z - p6z) / w6 / w6) - K7 * Math.exp(
		-(x - p7x) * (x - p7x) / w7 / w7 - (z - p7z) * (z - p7z) / w7 / w7) - K8 * Math.exp(
		-(x - p8x) * (x - p8x) / w8 / w8 - (z - p8z) * (z - p8z) / w8 / w8)
	}
	var inHeightFunc = function(x,z){
	  let K1 = 5,p1x = -20,p1z = -260,w1 = 15;
	  let K2 = 5, p2x = 15, p2z = -260, w2 = 15;
	  let K3 = 5, p3x = 50, p3z = -280, w3 = 15;
	  let K4 = 5, p4x = 50, p4z = -320, w4 = 15;
	  let K5 = 2, p5x = 20, p5z = -290, w5 = 10;
	  let K6 = 2, p6x = 20, p6z = -310, w6 = 10;
	  let K7 = 2, p7x = -20, p7z = -290, w7 = 10;
	  let K8 = 2, p8x = -20, p8z = -310, w8 = 10;
		return [- K1 * Math.exp(
		-(x - p1x) * (x - p1x) / w1 / w1 - (z - p1z) * (z - p1z) / w1 / w1) * (-2 * ((x - p1x) / w1) / w1 ) - K2 * Math.exp(
		-(x - p2x) * (x - p2x) / w2 / w2 - (z - p2z) * (z - p2z) / w2 / w2) * (-2 * ((x - p2x) / w2) / w2 ) - K3 * Math.exp(
		-(x - p3x) * (x - p3x) / w3 / w3 - (z - p3z) * (z - p3z) / w3 / w3) * (-2 * ((x - p3x) / w3) / w3 ) - K4 * Math.exp(
		-(x - p4x) * (x - p4x) / w4 / w4 - (z - p4z) * (z - p4z) / w4 / w4) * (-2 * ((x - p4x) / w4) / w4 ) + K5 * Math.exp(
		-(x - p5x) * (x - p5x) / w5 / w5 - (z - p5z) * (z - p5z) / w5 / w5) * (-2 * ((x - p5x) / w5) / w5 ) + K6 * Math.exp(
		-(x - p6x) * (x - p6x) / w6 / w6 - (z - p6z) * (z - p6z) / w6 / w6) * (-2 * ((x - p6x) / w6) / w6 ) + K7 * Math.exp(
		-(x - p7x) * (x - p7x) / w7 / w7 - (z - p7z) * (z - p7z) / w7 / w7) * (-2 * ((x - p7x) / w7) / w7 ) + K8 * Math.exp(
		-(x - p8x) * (x - p8x) / w8 / w8 - (z - p8z) * (z - p8z) / w8 / w8) * (-2 * ((x - p8x) / w8) / w8 ) ,-K1 * Math.exp(
		-(x - p1x) * (x - p1x) / w1 / w1 - (z - p1z) * (z - p1z) / w1 / w1) * (-2 * ((z - p1z) / w1) / w1 ) - K2 * Math.exp(
		-(x - p2x) * (x - p2x) / w2 / w2 - (z - p2z) * (z - p2z) / w2 / w2) * (-2 * ((z - p2z) / w2) / w2 ) - K3 * Math.exp(
		-(x - p3x) * (x - p3x) / w3 / w3 - (z - p3z) * (z - p3z) / w3 / w3) * (-2 * ((z - p3z) / w3) / w3 ) - K4 * Math.exp(
		-(x - p4x) * (x - p4x) / w4 / w4 - (z - p4z) * (z - p4z) / w4 / w4) * (-2 * ((z - p4z) / w4) / w4 ) + K5 * Math.exp(
		-(x - p5x) * (x - p5x) / w5 / w5 - (z - p5z) * (z - p5z) / w5 / w5) * (-2 * ((z - p5z) / w5) / w5 ) + K6 * Math.exp(
		-(x - p6x) * (x - p6x) / w6 / w6 - (z - p6z) * (z - p6z) / w6 / w6) * (-2 * ((z - p6z) / w6) / w6 ) + K7 * Math.exp(
		-(x - p7x) * (x - p7x) / w7 / w7 - (z - p7z) * (z - p7z) / w7 / w7) * (-2 * ((z - p7z) / w7) / w7 ) + K8 * Math.exp(
		-(x - p8x) * (x - p8x) / w8 / w8 - (z - p8z) * (z - p8z) / w8 / w8) * (-2 * ((z - p8z) / w8) / w8 )]
	}
	
	var geometry = new ParametricGeometry(function(u0, v0, pos) {
		let x = -25 + 50 * u0;
		let z = -325 + 200 * v0;
		pos.set(x, heightFunc(x, z), z);
	}, 40, 40);
	
	var loader2 = new THREE.TextureLoader();
	loader2.setCrossOrigin('');

	var textureTest1 = loader2.load('https://i.imgur.com/ktNrXbh.png');  
	
	let materialLight1 = new THREE.MeshBasicMaterial({
        map: textureTest1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
	});
	
    let materialGround = new THREE.MeshBasicMaterial({
        color: 0x006000,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1
    });	
	
	var convertUV = function(x,z){
		return [(x + 25) / 50,(z + 325) / 200]
	}
	
	let mesh = createMultiMaterialObject(geometry, [materialGround, materialLight1]);
	mesh.y = 0
	mesh.heightFunc = heightFunc;
	mesh.inHeightFunc = inHeightFunc;
	mesh.convertUV = convertUV;
	mesh.receiveShadow = true;
	
	
	var geometry2 = new ParametricGeometry(function(u0, v0, pos) {
		let x = 25 + 100 * u0;
		let z = -325 + 50 * v0;
		pos.set(x, heightFunc(x, z), z);
	}, 40, 40);
	var convertUV2 = function(x,z){
		return [(x - 25) / 100,(z + 325) / 50]
	}
	var textureTest2 = loader2.load('https://i.imgur.com/5IvClX4.png');  
	
	let materialLight2 = new THREE.MeshBasicMaterial({
        map: textureTest2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
	});
	
	let floor5 = createMultiMaterialObject(geometry2, [materialGround, materialLight2]);
	
	//floor5 = new THREE.Mesh(geometry2, new THREE.MeshPhongMaterial({map: texture2,side:THREE.DoubleSide}));
	
	floor5.receiveShadow = true;
	floor5.y = 0;
	floor5.heightFunc = heightFunc;
	floor5.inHeightFunc = inHeightFunc;
	floor5.convertUV = convertUV2;
	
	floors.push(mesh,floor5)
	scene.add(mesh,floor5)
	class2.add(mesh.clone(),floor5.clone())
	
	//class 3
	

	var geometry3 = new ParametricGeometry(function(u0, v0, pos) {
		let x = 225 + 50 * u0;
		let z = -325 + 50 * v0;
		pos.set(x, heightFunc(x, z)+80, z);
	}, 40, 40);
	var convertUV3 = function(x,z){
		return [(x - 225) / 50,(z + 325) / 50]
	}
	
  var textureTest3 = loader2.load('https://i.imgur.com/Gpeoj0a.png');  
  let materialLight3 = new THREE.MeshBasicMaterial({
        map: textureTest3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
  });
	let floor4 = createMultiMaterialObject(geometry3, [materialGround, materialLight3]);
	//var floor4 = new THREE.Mesh(geometry3, new THREE.MeshPhongMaterial({map: texture,side:THREE.DoubleSide}));
    //floor4.material.map.repeat.set( 3, 3 );
    floor4.y = 80;
    floor4.receiveShadow = true;
	floor4.heightFunc = heightFunc;
	floor4.inHeightFunc = inHeightFunc;
	floor4.convertUV = convertUV3;

	floors.push(floor4)
	scene.add(floor4)
	class3.add(floor4.clone())
	
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
	
	let mesh = new THREE.Mesh(new THREE.RingGeometry( 48.75, 51.25, 32,1,0,Math.PI), material );
	mesh.rotation.x = -Math.PI /2;
	mesh.position.set(25,5,-80)

	let mesh2 = new THREE.Mesh(new THREE.RingGeometry( 48.75, 51.25, 32,1,0,Math.PI), material );
	mesh2.rotation.x = -Math.PI /2;
	mesh2.position.set(25,0,-80)
	
	group.add(arcWallC11,arcWallC12,mesh,mesh2)
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
export {buildTerrain,table1,table2,table3,planes,walls,cylinders,holes,floors,arcWalls}
export {class1Rotate,class2Rotate,class3Rotate,setClassVisible}
export {obstacle1,obstacle2,obstacle3,car,car2}