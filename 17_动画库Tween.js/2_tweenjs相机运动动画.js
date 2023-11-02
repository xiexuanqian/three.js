import * as THREE from 'three'
import {OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'

import TWEEN from '@tweenjs/tween.js';
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30,width/height,1,3000)

const geometry = new THREE.BoxGeometry(50,100,50)
const material = new THREE.MeshLambertMaterial({
    color:'blue'
})
const mesh = new THREE.Mesh(geometry,material)
const directLight = new THREE.DirectionalLight(0xfffff,100)
directLight.position.set(0,100,100)
const dirLightHelper = new THREE.DirectionalLightHelper(directLight, 5,0xff0000);
scene.add(dirLightHelper);

camera.position.set(0,100,500)
camera.lookAt(0,0,0)

const axes = new THREE.AxesHelper(300)
scene.add(mesh)
scene.add(camera)
scene.add(axes)
scene.add(directLight)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(width,height)
renderer.shadowMap.enabled = true; 

renderer.render(scene,camera)

const orbit = new OrbitControls(camera,renderer.domElement)
orbit.addEventListener('change',()=>{
    renderer.render(scene,camera)
})

document.body.appendChild(renderer.domElement)

const R = 500; //相机圆周运动的半径
new TWEEN.Tween({angle:0})
.to({angle: Math.PI*2}, 16000)
.onUpdate(function(obj){
    camera.position.x = R * Math.cos(obj.angle);
    camera.position.z = R * Math.sin(obj.angle);
    camera.lookAt(0, 0, 0);
})
.start()
function render() {
    TWEEN.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();


