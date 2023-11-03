import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'

import TWEEN from '@tweenjs/tween.js';
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
const renderer = new THREE.WebGLRenderer()

renderer.setSize(width, height)
renderer.shadowMap.enabled = true;

renderer.render(scene, camera)

const orbit = new OrbitControls(camera, renderer.domElement)
orbit.addEventListener('change', () => {
    renderer.render(scene, camera)
})

document.body.appendChild(renderer.domElement)

const raycaster = new THREE.Raycaster();
// 设置射线起点
raycaster.ray.origin = new THREE.Vector3(-100, 0, 0);
// 设置射线方向射线方向沿着x轴
raycaster.ray.direction = new THREE.Vector3(1, 0, 0);
// 射线发射拾取模型对象
const intersects = raycaster.intersectObjects([mesh, mesh2]);
// intersects.length大于0说明，说明选中了模型
if (intersects.length > 0) {
    console.log(intersects[0])
    intersects[0].object.material.color.set('red');
    renderer.render(scene, camera)
    console.log("交叉点坐标", intersects[0].point);
    console.log("交叉对象",intersects[0].object);
    console.log("射线原点和交叉点距离",intersects[0].distance);
}


