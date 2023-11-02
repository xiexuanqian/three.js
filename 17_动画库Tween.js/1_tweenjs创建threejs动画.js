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


// //创建一段mesh平移的动画
// const tween = new TWEEN.Tween(mesh.position);
// //经过2000毫秒，pos对象的x和y属性分别从零变化为100、50
// tween.to({x: 100,y: 50}, 2000);
// //tween动画开始执行
// tween.start(); 


// 创建mesh放大的动画
new TWEEN.Tween(mesh.scale).to({
    x: 2,   //x轴反向的倍数
    y: 2    //y轴方向的倍数
}, 2000).start();

// 渲染循环
function render() {
    TWEEN.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();


