import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import * as CameraUtils from 'https://cdn.skypack.dev/three@0.136/examples/jsm/utils/CameraUtils.js';
import {scene,sceneMap,renderer,cameraOrbit} from './render.js'

let cameraControls;

let smallSphereOne, smallSphereTwo;

let portalCamera, leftPortal, rightPortal, leftPortalTexture, reflectedPosition,
  rightPortalTexture, bottomLeftCorner, bottomRightCorner, topLeftCorner;

function setPortal() {
  const planeGeo = new THREE.PlaneGeometry(100.1, 100.1);
  portalCamera = new THREE.PerspectiveCamera(45, 1.0, 0.1, 500.0);
  scene.add(portalCamera);
  
  bottomLeftCorner = new THREE.Vector3();
  bottomRightCorner = new THREE.Vector3();
  topLeftCorner = new THREE.Vector3();
  reflectedPosition = new THREE.Vector3();

  leftPortalTexture = new THREE.WebGLRenderTarget(256, 256);
  leftPortal = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
    map: leftPortalTexture.texture
  }));
  
  let temp = 1;
  leftPortal.position.set(0,45.5,-120)
  leftPortal.scale.set(temp, temp, temp);
  scene.add(leftPortal);

  rightPortalTexture = new THREE.WebGLRenderTarget(256, 256);
  rightPortal = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
    map: rightPortalTexture.texture
  }));
  rightPortal.position.set(100,45.5,225.1)
  rightPortal.rotation.y = -Math.PI / 2
  //rightPortal.rotation.y = -Math.PI
  rightPortal.scale.set(temp, temp, temp);
  scene.add(rightPortal);
  
}

function renderPortal(thisPortalMesh, otherPortalMesh, thisPortalTexture,camera) {

  // set the portal camera position to be reflected about the portal plane
  let Vector = new THREE.Vector3(camera.position.x,camera.position.y + 0, camera.position.z)
  thisPortalMesh.worldToLocal(reflectedPosition.copy(Vector));
  reflectedPosition.x *= -1.0;
  reflectedPosition.z *= -1.0;
	
  otherPortalMesh.localToWorld(reflectedPosition);
  portalCamera.position.copy(reflectedPosition);

  // grab the corners of the other portal
  // - note: the portal is viewed backwards; flip the left/right coordinates
  otherPortalMesh.localToWorld(bottomLeftCorner.set(50.05, -50.05, 0.0));
  otherPortalMesh.localToWorld(bottomRightCorner.set(-50.05, -50.05, 0.0));
  otherPortalMesh.localToWorld(topLeftCorner.set(50.05, 50.05, 0.0));

  // set the projection matrix to encompass the portal's frame
  CameraUtils.frameCorners(portalCamera, bottomLeftCorner, bottomRightCorner, topLeftCorner, false);

  // render the portal
  thisPortalTexture.texture.encoding = renderer.outputEncoding;
  renderer.setRenderTarget(thisPortalTexture);
  renderer.state.buffers.depth.setMask(true); // make sure the depth buffer is writable so it can be properly cleared, see #18897
	
  if (renderer.autoClear === false) renderer.clear();
  thisPortalMesh.visible = false; // hide this portal from its own rendering
  
	renderer.render(scene, portalCamera);
  
  thisPortalMesh.visible = true; // re-enable this portal's visibility for general rendering
	

}

var sign = 1;
var temp = 0.005;

function portalsRenderer(camera,move) {
	/*
  if(!move){
	if(temp < 0 || temp > 1)
	  sign *= -1;
	temp += sign * 0.005;
  
	leftPortal.scale.set(temp, temp, temp);
	rightPortal.scale.set(temp, temp, temp);
  }
  */
  

  // save the original camera properties
  const currentRenderTarget = renderer.getRenderTarget();
  const currentXrEnabled = renderer.xr.enabled;
  const currentShadowAutoUpdate = renderer.shadowMap.autoUpdate;
  renderer.xr.enabled = false; // Avoid camera modification
  renderer.shadowMap.autoUpdate = false; // Avoid re-computing shadows

  // render the portal effect
  renderPortal(leftPortal, rightPortal, leftPortalTexture,camera);
  renderPortal(rightPortal, leftPortal, rightPortalTexture,camera);

  // restore the original rendering properties
	
  renderer.xr.enabled = currentXrEnabled;
  renderer.shadowMap.autoUpdate = currentShadowAutoUpdate;
  renderer.setRenderTarget(currentRenderTarget);

  // render the main scene
  renderer.render(scene, camera);

}
export {portalsRenderer,setPortal}
