import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


import Stats from 'three/addons/libs/stats.module.js'
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(- 1, 2, 3);
scene.add(camera)
const renderer = new THREE.WebGLRenderer()
// 有时候加载外部gltf未显示，可能是因为没有设置灯光，也可能是相机距离太远
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);
renderer.setSize(width, height)

renderer.render(scene, camera)


const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();

document.body.appendChild(renderer.domElement)
const loader = new GLTFLoader(); 
loader.load("../gltf/Xbot.glb", function (gltf) {
    console.log('控制台查看gltf对象结构', gltf);
    scene.add(gltf.scene);
})

function render(){
    renderer.render(scene,camera)
    requestAnimationFrame(render)
}
render()



