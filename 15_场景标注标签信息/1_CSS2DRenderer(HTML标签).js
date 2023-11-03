import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// 引入CSS2渲染器CSS2DRenderer和CSS2模型对象CSS2DObject
import { CSS2DRenderer,CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';


const div = document.getElementById('tag');
// HTML元素转化为threejs的CSS2模型对象
const tag = new CSS2DObject(div);
tag.position.set(50,0,50);

const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)

const geometry = new THREE.BoxGeometry(50, 100, 50)
const material = new THREE.MeshLambertMaterial({
    color: 'blue'
})
const mesh = new THREE.Mesh(geometry, material)
mesh.name = '长方体'
const geometry2 = new THREE.BoxGeometry(50, 50, 50)
const material2 = new THREE.MeshLambertMaterial({
    color: 'green'
})
mesh.position.set(-50, 0, 0)
const mesh2 = new THREE.Mesh(geometry2, material2)
mesh2.name = '正方体'
mesh2.position.set(60, 0, 0)

const envLight = new THREE.AmbientLight(0xfffff, 100)

camera.position.set(0, 100, 500)
camera.lookAt(0, 0, 0)

const axes = new THREE.AxesHelper(300)
scene.add(mesh)
scene.add(mesh2)
scene.add(camera)
scene.add(axes)
scene.add(envLight)
scene.add(tag);

const renderer = new THREE.WebGLRenderer()
// 创建一个CSS2渲染器CSS2DRenderer
const css2Renderer = new CSS2DRenderer();
// width, height：canvas画布宽高度
css2Renderer.setSize(width, height);

// 用法和webgl渲染器渲染方法类似
css2Renderer.render(scene, camera);
// renderer.render(scene, camera);


renderer.setSize(width, height)
renderer.shadowMap.enabled = true;

renderer.render(scene, camera)

const orbit = new OrbitControls(camera, renderer.domElement)
orbit.addEventListener('change', () => {
    renderer.render(scene, camera)
})

// document.body.appendChild(renderer.domElement)
document.body.appendChild(css2Renderer.domElement);





