import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


import Stats from 'three/addons/libs/stats.module.js'
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)

const geometry = new THREE.BoxGeometry(50, 50, 50)
const material = new THREE.MeshLambertMaterial({
    color: 'blue'
})
const mesh = new THREE.Mesh(geometry, material)
const directLight = new THREE.AmbientLight(0xfffff, 100)

camera.position.set(0, 100, 500)
camera.lookAt(0, 0, 0)


const Bone1 = new THREE.Bone(); //关节1，用来作为根关节
const Bone2 = new THREE.Bone(); //关节2
const Bone3 = new THREE.Bone(); //关节3

// 设置关节父子关系   多个骨头关节构成一个树结构
Bone1.add(Bone2);
Bone2.add(Bone3);

//根关节Bone1默认位置是(0,0,0)
Bone2.position.y = 60; //Bone2相对父对象Bone1位置
Bone3.position.y = 30; //Bone3相对父对象Bone2位置
//平移Bone1，Bone2、Bone3跟着平移
Bone1.position.set(50,0,50);

// 骨骼关节旋转
Bone1.rotateX(Math.PI / 6);
Bone2.rotateX(Math.PI / 6);

// 骨骼关节可以和普通网格模型一样作为其他模型子对象，添加到场景中
const group = new THREE.Group();
group.add(Bone1);

// SkeletonHelper会可视化参数模型对象所包含的所有骨骼关节
const skeletonHelper = new THREE.SkeletonHelper(group);
group.add(skeletonHelper);

const axes = new THREE.AxesHelper(300)
// scene.add(mesh)
scene.add(group)
scene.add(camera)
scene.add(axes)
scene.add(directLight)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(width, height)
renderer.shadowMap.enabled = true;

renderer.render(scene, camera)

const orbit = new OrbitControls(camera, renderer.domElement)
orbit.addEventListener('change', () => {
    renderer.render(scene, camera)
})

document.body.appendChild(renderer.domElement)

const gui = new GUI();
gui.add(Bone1.rotation, 'x', 0, Math.PI / 3).name('关节1');
gui.add(Bone2.rotation, 'x', 0, Math.PI / 3).name('关节2');

function render(){
    renderer.render(scene,camera)
    requestAnimationFrame(render)
}
render()