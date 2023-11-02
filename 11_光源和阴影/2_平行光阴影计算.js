import * as THREE from 'three'
import {OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30,width/height,1,3000)

const geometry = new THREE.BoxGeometry(50,100,50)
const material = new THREE.MeshLambertMaterial({
    color:'blue'
})

const planeGeomtry = new THREE.BoxGeometry(800,20,800)
const planeMaterial = new THREE.MeshLambertMaterial({
    color:'green'
})
const mesh = new THREE.Mesh(geometry,material)
const mesh2 = new THREE.Mesh(planeGeomtry,planeMaterial)
mesh2.position.set(0,-60,0)
mesh2.receiveShadow = true
mesh.castShadow = true
const directLight = new THREE.DirectionalLight(0xfffff,100)
directLight.position.set(0,100,100)
// DirectionalLightHelper：可视化平行光
const dirLightHelper = new THREE.DirectionalLightHelper(directLight, 5,0xff0000);
scene.add(dirLightHelper);

directLight.castShadow = true
camera.position.set(500,500,500)
camera.lookAt(0,0,0)
// 设置三维场景计算阴影的范围
directLight.shadow.camera.left = -50;
directLight.shadow.camera.right = 50;
directLight.shadow.camera.top = 200;
directLight.shadow.camera.bottom = -100;
directLight.shadow.camera.near = 0.5;
directLight.shadow.camera.far = 600;


// 可视化平行光阴影对应的正投影相机对象
const cameraHelper = new THREE.CameraHelper(directLight.shadow.camera);
// scene.add(cameraHelper);

const axes = new THREE.AxesHelper(300)
scene.add(mesh)
scene.add(mesh2)
scene.add(camera)
scene.add(axes)
scene.add(directLight)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(width,height)
// 设置渲染器，允许光源阴影渲染
renderer.shadowMap.enabled = true; 

renderer.render(scene,camera)

const orbit = new OrbitControls(camera,renderer.domElement)
orbit.addEventListener('change',()=>{
    renderer.render(scene,camera)
})


document.body.appendChild(renderer.domElement)