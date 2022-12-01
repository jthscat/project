import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {Line2} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/Line2.js';
import {LineMaterial} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineMaterial.js';
import {LineGeometry} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineGeometry.js';
import {scene,cameraOnPlayer,renderer,cameraOnBall} from './render.js';
import {balls} from './main.js'
import {theta,beforeHit} from './touchEvent.js'

const WW = 4,HH = 12;
var swing = false,isSwing = false,change = false,isChange = false;
var stop=true;
var T = 1,count = 1;
var matLine;
var clock = new THREE.Clock();
var ts = clock.getElapsedTime();
var ts2 = clock.getElapsedTime();
var sign=1;

var texture;

class Steve{
   constructor(WW,HH){
     this.WW=WW;
	 this.HH=HH;
     this.pos=new THREE.Vector3(0,12,0);
     this.vel=new THREE.Vector3(0,0,0);
     this.force=new THREE.Vector3(0,0,0);
     this.goal = new THREE.Vector3(0,0,0);
     this.begin = new THREE.Vector3(0,0,0);
     this.uv = new THREE.Vector3(0,0,0);
     this.temp = new THREE.Vector3(0,0,0);
     this.temp2 = new THREE.Vector3(0,0,0);
	 this.temp3 = new THREE.Vector3(0,0,0);
	 this.direct = new THREE.Group();
	 this.camera = new THREE.Group();
	 this.lastPos = new THREE.Vector3(0,0,0);
     this.body = new THREE.Group();
     this.hands = new THREE.Group();
	 this.footPath = new THREE.Group();
	 this.footPath2 = new THREE.Group();
	 this.footPath3 = new THREE.Group();
	 this.footPath4 = new THREE.Group();
     this.power=0.1;
     this.angle=0;	 
	 this.target=null;
	 this.puttPos=new THREE.Vector3(0,0,0);
	 this.moveFin = false;
	 
	this.pose1 = {
	  theta: -theta
	}
	this.pose2 = {
	  theta: Math.PI / 15 + theta / 5
	} 
	this.pose3 = {
	  theta: Math.PI / 2
	}
	this.pose4 = {
	  theta: Math.PI / 1.5
	}
	this.torsoKeys = [
	  [0, this.pose1],
	  [0.5, this.pose2],
	  [1, this.pose2]
	];
	this.headKeys = [
	  [0, this.pose3],
	  [0.5, this.pose4],
	  [1, this.pose4]
	];
   }

  buildsteve(){
  var loader = new THREE.TextureLoader();
  loader.setCrossOrigin('');
  if(sign==1){
  texture = loader.load('https://i.imgur.com/dSQ0A9W.png');
  }
  else if(sign==2){
  texture = loader.load('https://i.imgur.com/Mpb9QlQ.png'); 
  }
  this.head = this.buildHead(8, 8, 8);
  this.head.rotation.y = Math.PI / 2;
  this.torso = this.buildTorso(8, 12, 4);
  this.body.add(this.torso);
  this.body.add(this.head);
  this.torso.add(this.head);
  this.head.position.set(0, HH, 0);

  scene.add(this.body);
  this.torso.position.set(0, HH, 0);
  this.lArm = this.buildLArm(4, 12, 4);
  this.hands.add(this.lArm);
  if(sign==1){
  this.lArm.position.set(0, HH / 2 - 6, -(WW + WW / 2 + 3));
  }
  else{
	 this.lArm.position.set(0.6, HH / 2 - 3.5, -(WW + WW / 2 + 5)); 
  }
  this.lLeg = this.buildLLeg(4, 12, 4);
  this.body.add(this.lLeg);
  this.lLeg.position.set(0, 12, -WW / 2);

  this.rLeg = this.buildRLeg(4, 12, 4);
  this.body.add(this.rLeg);
  this.rLeg.position.set(0, 12, WW / 2);

  this.rArm = this.buildRArm(4, 12, 4);
  this.hands.add(this.rArm);
  if(sign==1){
  this.rArm.position.set(0, HH / 2 - 6, WW + WW / 2 - 3);
  }
  else
  {
   this.rArm.position.set(-0.6, HH / 2 - 5.5, WW + WW / 2 - 1);  
  }
  this.hands.position.y = 9.5;
  this.hands.position.x = -0.5;
	

		
  
  var axis = new THREE.AxesHelper(50);
  //hands.add(axis);
  this.torso.add(this.hands);

  if(sign==1){
  this.Puffer = this.buildPuffer()
  scene.add(this.Puffer);

  this.rArm.add(this.Puffer);

  this.Puffer.position.y = -11.2;
  this.Puffer.rotation.x = -Math.PI / 15
  this.Puffer.rotation.z = Math.PI / 8
  this.Puffer.position.z = -0.5
  this.Puffer.position.x = 1.8
  this.Puffer.visible = true;
  //torso.rotation.x=-Math.PI/6;

  this.line =this.buildLine();
  this.arrow = this.buildArrow();
  this.arrow.position.y = 1;
  
  this.body.position.set(-10, -1, 2);
  var cameraGroup = new THREE.Group();
  cameraGroup.add(cameraOnBall)
  this.direct.add(this.body,this.line,this.arrow,cameraGroup);
  //this.direct.position.set(-2, 1, 10);

  let hitPoint = new THREE.Mesh(new THREE.BoxGeometry(1, 1), new THREE.MeshNormalMaterial())
  hitPoint.position.set(0, 0, 1)
  hitPoint.visible = false;
  this.direct.add(hitPoint)
  this.body.visible = false;
  scene.add(this.direct);
  
  this.camera.add(cameraOnPlayer)
  scene.add(this.camera);
  //this.camera.position.set(-2,1,10)
  this.direct.visible = false;
  this.resetPose()
  sign=2;
  }
  else{
	  this.direct.add(this.body);
	  scene.add(this.direct);
      console.log('123');	  
  }
  //////////////////////////////////////////////////////////
}
  buildFootPrint(){
	  
	  var loader = new THREE.TextureLoader();
    var map = loader.load("https://i.imgur.com/ifTuBvu.png");
   this.left=new THREE.Mesh(new THREE.PlaneGeometry(4, 6), new THREE.MeshBasicMaterial({
    map: map,
    transparent: true,
	depthWrite : false,
	depthTest : false
  }));
  this.left2=new THREE.Mesh(new THREE.PlaneGeometry(4, 6), new THREE.MeshBasicMaterial({
    map: map,
    transparent: true,
	depthWrite : false,
	depthTest : false
  }));
  this.left3=new THREE.Mesh(new THREE.PlaneGeometry(4, 6), new THREE.MeshBasicMaterial({
    map: map,
    transparent: true,
	depthWrite : false,
	depthTest : false
  }));
  this.left4=new THREE.Mesh(new THREE.PlaneGeometry(4, 6), new THREE.MeshBasicMaterial({
    map: map,
    transparent: true,
	depthWrite : false,
	depthTest : false
  }));
  var  map2 = loader.load("https://i.imgur.com/DZ2BjPS.png");
   this.right=new THREE.Mesh(new THREE.PlaneGeometry(4, 6), new THREE.MeshBasicMaterial({
    map: map2,
    transparent: true,
	depthWrite : false,
	depthTest : false
  }));
  this.right2=new THREE.Mesh(new THREE.PlaneGeometry(4, 6), new THREE.MeshBasicMaterial({
    map: map2,
    transparent: true,
	depthWrite : false,
	depthTest : false
  }));
  this.right3=new THREE.Mesh(new THREE.PlaneGeometry(4, 6), new THREE.MeshBasicMaterial({
    map: map2,
    transparent: true,
	depthWrite : false,
	depthTest : false
  }));
  this.right4=new THREE.Mesh(new THREE.PlaneGeometry(4, 6), new THREE.MeshBasicMaterial({
    map: map2,
    transparent: true,
	depthWrite : false,
	depthTest : false
  }));
  
  this.right.position.set(2,1,0);
  this.left.position.set(-2,1,0);
  this.right.rotation.x=-Math.PI/2;
  this.left.rotation.x=-Math.PI/2;
  this.left.material.opacity=0;
  this.right.material.opacity=0;
  /*
  this.left.visible = false;
  this.right.visible = false;
  */
  this.footPath.add(this.right);
  this.footPath.add(this.left);
  scene.add(this.footPath);  
  
  this.right2.position.set(2,1,0);
  this.left2.position.set(-2,1,0);
  this.right2.rotation.x=-Math.PI/2;
  this.left2.rotation.x=-Math.PI/2;
  this.left2.material.opacity=0;
  this.right2.material.opacity=0;
  /*
  this.left2.visible = false;
  this.right2.visible = false;
  */
  this.footPath2.add(this.right2);
  this.footPath2.add(this.left2);
  scene.add(this.footPath2);
  
  this.right3.position.set(2,1,0);
  this.left3.position.set(-2,1,0);
  this.right3.rotation.x=-Math.PI/2;
  this.left3.rotation.x=-Math.PI/2;
  this.left3.material.opacity=0;
  this.right3.material.opacity=0;
  /*
  this.left3.visible = false;
  this.right3.visible = false;
  */
  this.footPath3.add(this.right3);
  this.footPath3.add(this.left3);
  scene.add(this.footPath3);
  
  this.right4.position.set(2,1,0);
  this.left4.position.set(-2,1,0);
  this.right4.rotation.x=-Math.PI/2;
  this.left4.rotation.x=-Math.PI/2;
  this.left4.material.opacity=0;
  this.right4.material.opacity=0;
  /*
  this.left4.visible = false;
  this.right4.visible = false;
  */
  this.footPath4.add(this.right4);
  this.footPath4.add(this.left4);
  scene.add(this.footPath4);  
	  
	  
  }
  footUpdate(){
	  this.uv.x=this.goal.x-this.begin.x;
      this.uv.z=this.goal.z-this.begin.z;
      this.uv.normalize();
	  
	  
	  this.footPath.position.set(this.footPath.position.x+this.uv.x*6,0.1,this.footPath.position.z+this.uv.z*6)
	  this.footPath.lookAt(this.begin.x,0,this.begin.z);
	  if(count===1)
	  {
		this.left.material.opacity=0;
		this.temp.copy(this.direct.position)		
		this.right.material.opacity=1;
        this.footPath2.position.set(this.temp.x,0.1,this.temp.z);
	    this.footPath2.lookAt(this.begin.x,0,this.begin.z);
        this.left2.material.opacity=0.8;
	    this.right2.material.opacity=0;		
	  }
	  else if(count===2)
	  {
         this.left.material.opacity=1;
		 this.right.material.opacity=0;
		 this.footPath2.position.set(this.temp.x,0.1,this.temp.z);
	     this.footPath2.lookAt(this.begin.x,0,this.begin.z);
		 this.left2.material.opacity=0;
	     this.right2.material.opacity=0.8;
		 this.footPath3.position.set(this.temp2.x,0.1,this.temp2.z);
		 this.footPath3.lookAt(this.begin.x,0,this.begin.z);
		 this.left3.material.opacity=0.5;
	     this.right3.material.opacity=0;
	  }
     else
     {
        if(this.left.material.opacity===1)
		{
		   this.left.material.opacity=0;
		   this.right.material.opacity=1;
		   this.footPath2.position.set(this.temp.x,0.1,this.temp.z);
	       this.footPath2.lookAt(this.begin.x,0,this.begin.z);
		   this.left2.material.opacity=0.8;
	       this.right2.material.opacity=0;
           this.footPath3.position.set(this.temp2.x,0.1,this.temp2.z);
		   this.footPath3.lookAt(this.begin.x,0,this.begin.z);
		   this.left3.material.opacity=0;
	       this.right3.material.opacity=0.5;
           this.footPath4.position.set(this.temp3.x,0.1,this.temp3.z);
		   this.footPath4.lookAt(this.begin.x,0,this.begin.z);
		   this.left4.material.opacity=0.2;
	       this.right4.material.opacity=0;		   
		}
        else
        {
		   this.left.material.opacity=1;
		   this.right.material.opacity=0;
		   this.footPath2.position.set(this.temp.x,0.1,this.temp.z);
	       this.footPath2.lookAt(this.begin.x,0,this.begin.z);
		   this.left2.material.opacity=0;
	       this.right2.material.opacity=0.8;
           this.footPath3.position.set(this.temp2.x,0.1,this.temp2.z);
		   this.footPath3.lookAt(this.begin.x,0,this.begin.z);
		   this.left3.material.opacity=0.5;
	       this.right3.material.opacity=0;
           this.footPath4.position.set(this.temp3.x,0.1,this.temp3.z);
		   this.footPath4.lookAt(this.begin.x,0,this.begin.z);
		   this.left4.material.opacity=0;
	       this.right4.material.opacity=0.2;
		}			
     }
	 
   this.temp3.copy(this.temp2);
   this.temp2.copy(this.temp);
   this.temp.copy(this.footPath.position);
   count++;
   
   let distance = new THREE.Vector3(0,0,0);
   
   distance.copy(this.goal.clone().sub(this.begin));
   distance.normalize().multiplyScalar((count)*6);
   //console.log(distance.length(),this.goal.clone().sub(this.begin).length())
   if(distance.length()>=this.goal.clone().sub(this.begin).length()){
		stop=true;
		this.left.material.opacity=0;
        this.right.material.opacity=0;
		this.left2.material.opacity=0;
        this.right2.material.opacity=0;
		this.left3.material.opacity=0;
        this.right3.material.opacity=0;
		this.left4.material.opacity=0;
        this.right4.material.opacity=0;
		this.direct.position.copy(balls[0].pos)
		this.direct.rotation.copy(this.camera.rotation)
		count=1;
		this.moveFin = true;
	}
	else
	{
		stop=false;
	}
	  
  }
  update(dt){
	matLine.resolution.set(window.innerWidth, window.innerHeight);
	this.camera.position.copy(balls[0].pos)
	if(stop === false){	  
     setTimeout(this.footUpdate.bind(this),100);
     stopTrue();
	}
	if(!swing && !change){
		this.torso.rotation.x = -theta;
		this.head.rotation.y = Math.PI / 2;
	}
	if(!swing && !change && !isChange && beforeHit){
		this.body.visible = false;
	}
	if(!beforeHit && !swing){
		this.body.visible = true
		swing = true;
		this.head.rotation.y = Math.PI / 2;
		
		//this.pos.copy(balls[0].mesh.localToWorld(new THREE.Vector3(0, 0, 0)))
		
		//this.direct.position.copy(this.pos)
		
		this.Puffer.visible = true;
	}
	this.changePose()
	this.pose1.theta = -theta;
	this.pose2.theta = Math.PI / 15 + theta / 5;
   }

  headKeyframe2(t, T) {
  var keys2=this.headKeys;
  if (t - ts2 > T) { // end of stand
    ts2 = t; // reset ts to start of walk
    change = false;
    isChange = false;
    // end of S2W: return last frame
    return this.pose4.theta;
  }

  var s = (t - ts2) / T;
  for (var i = 1; i < keys2.length; i++) {
    if (keys2[i][0] > s) break;
  }
  // take i-1
  var ii = i - 1;
  var a = (s - keys2[ii][0]) / (keys2[ii + 1][0] - keys2[ii][0]);
  let intKey2 = keys2[ii][1].theta * (1 - a) + keys2[ii + 1][1].theta * a;
  return intKey2;
}
  torsoKeyframe(t, T) {
  var keys = this.torsoKeys;
  if (t - ts > T) { // end of stand
    swing = false
    isSwing = false;
    change = true;
    // end of S2W: return last frame
    return this.pose2.theta;
  }

  var s = (t - ts) / T;
  for (var i = 1; i < keys.length; i++) {
    if (keys[i][0] > s) break;
  }
  // take i-1
  var ii = i - 1;
  var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);
  let intKey = keys[ii][1].theta * (1 - a) + keys[ii + 1][1].theta * a;
  return intKey;
}  
 buildHead(WW, HH, DD) {
 let head = new THREE.Group();
  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
	var uvs = [];

	////////////
  const ww = 1;
  const hh = 3;
  const UU = 14*ww;
  const VV = hh + 5*ww;
  
	var a = {u: 2*ww, v: hh+5*ww};
  var b = {u: 4*ww, v: hh+5*ww};
  var c = {u: 6*ww, v: hh+5*ww};
  var d = {u: 0, v: hh+3*ww};
  var e = {u: 2*ww, v: hh+3*ww};
  var f = {u: 4*ww, v: hh+3*ww};
  var g = {u: 6*ww, v: hh+3*ww};
  var h = {u: 8*ww, v: hh+3*ww};
  var i = {u: 0, v: hh+ww};
  var j = {u: 2*ww, v: hh+ww};
  var k = {u: 4*ww, v: hh+ww};
  var l = {u: 6*ww, v: hh+ww};
  var m = {u: 8*ww, v: hh+ww};

  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); //  d,i,j,e
	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); //  e,j,k,f
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); //  g,l,m,h
	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 ); // 4,0,1,5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	
	vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 ); // 7,3,2,6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c
	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  head.add (mesh);
  mesh.position.y = WW/2;
  mesh.rotation.y = -Math.PI / 2;
  return head;
}
 buildLArm(WW,HH,DD) {
	let lArm = new THREE.Group();
  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
	var uvs = [];

  const ww = 1;
  const hh = 3;
	const UU = 14*ww;
  const VV = hh + 5*ww;
  
  var a = {u: 11*ww, v:hh+ww};
  var b = {u: 12*ww, v:hh+ww};
  var c = {u: 13*ww, v:hh+ww};
  var d = {u: 10*ww, v:hh};
  var e = {u: 11*ww, v:hh};
  var f = {u: 12*ww, v:hh};
  var g = {u: 13*ww, v:hh};
  var h = {u: 14*ww, v:hh};
  var i = {u: 10*ww, v:0};
  var j = {u: 11*ww, v:0};
  var k = {u: 12*ww, v:0};
  var l = {u: 13*ww, v:0};
  var m = {u: 14*ww, v:0};

	 // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); //  d,i,j,e
	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); //  e,j,k,f
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); //  g,l,m,h
	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 ); // 4,0,1,5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	
	vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 ); // 7,3,2,6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  lArm.add(mesh);
  mesh.position.y = -HH / 2;
  mesh.position.z = 5;
  return lArm;
}
  buildRArm(WW,HH,DD) {
	let rArm = new THREE.Group();
  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
	var uvs = [];

  const ww = 1;
  const hh = 3;
  const UU = 14*ww;
  const VV = hh + 5*ww;
  
  var a = {u: 11*ww, v:hh+ww};
  var b = {u: 12*ww, v:hh+ww};
  var c = {u: 13*ww, v:hh+ww};
  var d = {u: 10*ww, v:hh};
  var e = {u: 11*ww, v:hh};
  var f = {u: 12*ww, v:hh};
  var g = {u: 13*ww, v:hh};
  var h = {u: 14*ww, v:hh};
  var i = {u: 10*ww, v:0};
  var j = {u: 11*ww, v:0};
  var k = {u: 12*ww, v:0};
  var l = {u: 13*ww, v:0};
  var m = {u: 14*ww, v:0};

	 // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); //  d,i,j,e
	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); //  e,j,k,f
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); //  g,l,m,h
	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 ); // 4,0,1,5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	
	vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 ); // 7,3,2,6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  rArm.add(mesh);
  mesh.position.y = -HH / 2 + 2;
  mesh.position.x = 1;
  mesh.position.z = 1;
  return rArm;
}
 buildLLeg(WW, HH, DD) {
	let lLeg = new THREE.Group();
	var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
	var uvs = [];

  const ww = 1;
  const hh = 3;
	const UU = 14*ww;
  const VV = hh + 5*ww;
  
  var a = {u: ww, v:hh+ww};
  var b = {u: 2*ww, v:hh+ww};
  var c = {u: 3*ww, v:hh+ww};
  var d = {u: 0, v:hh};
  var e = {u: ww, v:hh};
  var f = {u: 2*ww, v:hh};
  var g = {u: 3*ww, v:hh};
  var h = {u: 4*ww, v:hh};
  var i = {u: 0, v:0};
  var j = {u: ww, v:0};
  var k = {u: 2*ww, v:0};
  var l = {u: 3*ww, v:0};
  var m = {u: 4*ww, v:0};

	 // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); //  d,i,j,e
	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); //  e,j,k,f
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); //  g,l,m,h
	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 ); // 4,0,1,5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	
	vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 ); // 7,3,2,6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  lLeg.add (mesh);
  mesh.position.y = -HH/2;
  return lLeg;
}
  buildRLeg(WW,HH,DD) {
	let rLeg = new THREE.Group();
  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
	var uvs = [];

  const ww = 1;
  const hh = 3;
	const UU = 14*ww;
  const VV = hh + 5*ww;
  
  var a = {u: ww, v:hh+ww};
  var b = {u: 2*ww, v:hh+ww};
  var c = {u: 3*ww, v:hh+ww};
  var d = {u: 0, v:hh};
  var e = {u: ww, v:hh};
  var f = {u: 2*ww, v:hh};
  var g = {u: 3*ww, v:hh};
  var h = {u: 4*ww, v:hh};
  var i = {u: 0, v:0};
  var j = {u: ww, v:0};
  var k = {u: 2*ww, v:0};
  var l = {u: 3*ww, v:0};
  var m = {u: 4*ww, v:0};

	 // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); //  d,i,j,e
	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); //  e,j,k,f
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); //  g,l,m,h
	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 ); // 4,0,1,5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	
	vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 ); // 7,3,2,6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  rLeg.add (mesh);
  mesh.position.y = -HH/2;
  return rLeg;
}
  buildTorso(WW, HH, DD) {
	let torso = new THREE.Group();
  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
	var uvs = [];

  const ww = 1;
  const hh = 3;
  const UU = 14*ww;
  const VV = hh + 5*ww;
  
  var a = {u: 5*ww, v:hh+ww};
  var b = {u: 7*ww, v:hh+ww};
  var c = {u: 9*ww, v:hh+ww};
  var d = {u: 4*ww, v:hh};
  var e = {u: 5*ww, v:hh};
  var f = {u: 7*ww, v:hh};
  var g = {u: 8*ww, v:hh};
  var h = {u: 10*ww, v:hh};
  var i = {u: 4*ww, v:0};
  var j = {u: 5*ww, v:0};
  var k = {u: 7*ww, v:0};
  var l = {u: 8*ww, v:0};
  var m = {u: 10*ww, v:0};
  var x = {u: 9*ww, v: hh};

	// PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

	// NY
  vertices.push(-WW/2,-HH/2,DD/2, -WW/2,-HH/2,-DD/2, WW/2,-HH/2,-DD/2, WW/2,-HH/2,DD/2 ); // 3,7,6,2
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, x.u/UU,x.v/VV, c.u/UU,c.v/VV); // b,f,x,c
	
	vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 ); // 4,0,1,5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	
	vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 4,7,6,5
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); //  g,l,m,h

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  torso.add (mesh);
  mesh.position.y = HH/2;
  mesh.rotation.y = Math.PI/2;

	return torso;
}
  buildPuffer() {
  var group = new THREE.Group();
  var stick = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 12), new THREE.MeshBasicMaterial({
    color: 'silver'
  }));
  this.putt = new THREE.Mesh(new THREE.BoxGeometry(3, 1.5, 1), new THREE.MeshBasicMaterial({
    color: 'black'
  }));
  stick.position.y = -2.5
  this.putt.position.y = -8.5
  this.putt.rotation.y = Math.PI / 12;
  this.putt.rotation.z = -Math.PI / 10;
  this.putt.position.x = 0.8;
  this.putt.position.z = -0.4;

  group.add(stick,this.putt)
  return group;

}
  buildLine() {
  var positions = [];
  var colors = [];
  for (let i = -25; i <= 25; i++) {
    positions.push(0, 0.1, -i)
    colors.push(0, 255, 0)
  }
  var geometry = new LineGeometry();
  geometry.setPositions(positions);
  geometry.setColors(colors);
  matLine = new LineMaterial({
    color: 0xffffff,
    linewidth: 5, // in pixels
    vertexColors: THREE.VertexColors,
    //resolution:1  ,// to be set by renderer, eventually
    dashed: true,
    dashScale: 1,
    gapSize: 3,
    dashSize: 3

  });

  let line = new Line2(geometry, matLine);
  line.computeLineDistances();
  line.position.z = -25;
  let lineGroup = new THREE.Group();
  lineGroup.add(line);
  let group = new THREE.Group();
  group.add(lineGroup);
  scene.add(group)
  group.visible = false;
  return group;
}
  setTarget(pos) {
    var temp=new THREE.Vector3(pos.x,0,pos.z);
  	if (this.target !== null)
    	this.target.copy(temp);
    else {
    	this.target = new THREE.Vector3(temp.x,temp.y,temp.z);
    }
  }
  buildArrow(){
	let circles = new THREE.Group();
	const r = 0.5; 
	for(var i = 18; i >= 0; i--){
		var circle = new THREE.Mesh(new THREE.CircleGeometry( r, 32 ),new THREE.MeshBasicMaterial({color:"yellow"}))
		circle.rotation.x = -Math.PI / 2;
		circles.add(circle);
		if(i < 10 ){
			var color = new THREE.Color();
			color.setHSL((i - 0) / 56, 1.0, 0.5);
			circle.material.color.copy(color);
		}
	}
	circles.children[0].position.set(0 , 0.03 , 1 + r)
	circles.children[1].position.set(-2 * r,0.03,1 + 3 * r)
	circles.children[2].position.set(0,0.03,1 + 3 * r)
	circles.children[3].position.set(2 * r,0.03,1 + 3 * r)
	circles.children[4].position.set(-4 * r,0.03,1 + 5 * r)
	circles.children[5].position.set(-2 * r,0.03,1 + 5 * r)
	circles.children[6].position.set(0,0.03,1 + 5 * r)
	circles.children[7].position.set(2 * r,0.03,1 + 5 * r)
	circles.children[8].position.set(4 * r,0.03,1 + 5 * r)
	circles.children[9].position.set(0,0.03,1 + 7 * r)
	circles.children[10].position.set(0,0.03,1 + 9 * r)
	circles.children[11].position.set(0,0.03,1 + 11 * r)
	circles.children[12].position.set(0,0.03,1 + 13 * r)
	circles.children[13].position.set(0,0.03,1 + 15 * r)
	circles.children[14].position.set(0,0.03,1 + 17 * r)
	circles.children[15].position.set(0,0.03,1 + 19 * r)
	circles.children[16].position.set(0,0.03,1 + 21 * r)
	circles.children[17].position.set(0,0.03,1 + 23 * r)
	circles.children[18].position.set(0,0.03,1 + 25 * r)
	scene.add(circles);
	return circles;
  }
  start(){
	this.direct.visible = true;
	this.arrow.visible = false;
	this.direct.position.copy(balls[0].pos);
	this.camera.position.copy(balls[0].pos);
  }
  changePose(){
	if(swing){
		if (isSwing === false) {
			ts = clock.getElapsedTime();
			isSwing = true;
		}
		let intKey = this.torsoKeyframe(clock.getElapsedTime(), T);
		this.torso.rotation.x = intKey;
	}
	if (change === true) {
		if (isChange === false) {
			ts2 = clock.getElapsedTime();
			isChange = true;
		}
		let intKey = this.headKeyframe2(clock.getElapsedTime(), T);
		this.head.rotation.y = intKey;
	}
  }
  resetPose(){	
	this.lLeg.rotation.x = Math.PI / 12;
	this.rLeg.rotation.x = -Math.PI / 12;
	this.rArm.rotation.x = Math.PI / 10;
	this.lArm.rotation.x = -Math.PI / 10;
	this.rArm.rotation.z = Math.PI / 5;
	this.lArm.rotation.z = Math.PI / 5;
	this.torso.rotation.z = -Math.PI / 4.5;
  }
}
function stopTrue(){
	stop= !stop;
}
export {Steve,stop,stopTrue}