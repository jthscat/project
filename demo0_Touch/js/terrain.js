import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {scene} from './render.js'
class FinitePlane {
  constructor(localPointOnPlane, localNormal, mesh, length, group) {
    this.localPtOnPl = localPointOnPlane.clone();
    this.localNormal = localNormal.clone();
    this.mesh = mesh;
    if (group === undefined)
      scene.add(mesh)
    else
      group.add(mesh)
    this.length = length || 1e10;
  }
  update() {
    this.mesh.updateMatrixWorld();
    this.ptOnPl = this.mesh.localToWorld(this.localPtOnPl.clone());
    let normalMat = new THREE.Matrix3().getNormalMatrix(this.mesh.matrixWorld);
    this.normal = this.localNormal.clone().applyMatrix3(normalMat).normalize()
  }
}

class Wall {
  constructor(len,height, localN , type = 0, color = 0xA23400,width = 2.5,COR = 0.64) {
	if(type === 0)
		var geometry = new THREE.BoxGeometry(len, height, width);
	else if(type === 1){
		var geometry = new THREE.PlaneGeometry(len,height)
	}
	
    var material = new THREE.MeshPhongMaterial({
      color: color,
      shininess: 200,
      transparent: true,
      opacity: 1,
	  side:THREE.DoubleSide,
    })
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    this.mesh = mesh;
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	this.height = height / 2;
	this.width = width;
    this.len = len
    this.localN = localN.clone();
	this.type = type;
	this.COR = COR;
  }
  update() {
    this.mesh.updateMatrixWorld();
    let normalMat = new THREE.Matrix3().getNormalMatrix(this.mesh.matrixWorld);
    this.normal = this.localN.clone().applyMatrix3(normalMat).normalize()
  }

}
export {Wall,FinitePlane}
