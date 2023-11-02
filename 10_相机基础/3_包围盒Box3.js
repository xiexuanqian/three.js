import * as THREE from 'three'
import {MapControls } from 'three/addons/controls/MapControls.js'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'
// 正投影相机
const width = window.innerWidth; //canvas画布宽度
const height = window.innerHeight; //canvas画布高度
const k = width / height; //canvas画布宽高比
const s = 100;//控制left, right, top, bottom范围大小

const scene = new THREE.Scene()

const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 8000);


camera.position.set(0,0,2000)
camera.lookAt(0,0,0)
camera.up.set(0,-1,0)

// 画一个圆弧
const geometry = new THREE.BufferGeometry()
const R = 50
const N = 50
const sp = 2*Math.PI/N

const arr = []
for(let i=0;i<N;i++){
    const angle = sp*i
    const x = R*Math.cos(angle)
    const y = R*Math.sin(angle)
    arr.push(x,y,0)
}

var vertices = new Float32Array(arr)

const attributes = new THREE.BufferAttribute(vertices,3)

geometry.attributes.position = attributes

const points = new THREE.PointsMaterial({
    color:'red',
    size:1
})

const material = new THREE.LineBasicMaterial({
    color:0xfffff
})

const point = new THREE.Points(geometry,points)
const line = new THREE.LineLoop(geometry,material)

const axes = new THREE.AxesHelper(300)

scene.add(point)
scene.add(line)
scene.add(camera)
scene.add(axes)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(width,height)

renderer.render(scene,camera)
const controls = new MapControls(camera, renderer.domElement);
renderer.render(scene,camera)
// controls.target.set(0,0,0)
// controls.update()
controls.addEventListener('change', function () {
    renderer.render(scene,camera)
});
// controls.enablePan = false
// controls.enableZoom = false
controls.enableRotate = false

// Canvas画布跟随窗口变化



document.body.appendChild(renderer.domElement)
window.onresize = function () {
    const width = window.innerWidth; //canvas画布宽度
    const height = window.innerHeight; //canvas画布高度
    // 1. WebGL渲染器渲染的Cnavas画布尺寸更新
    renderer.setSize(width, height);
    // 2.1.更新相机参数
    const k = width / height; //canvas画布宽高比
    camera.left = -s*k;
    camera.right = s*k;
    // 2.2.相机的left, right, top, bottom属性变化了，通知threejs系统
    camera.updateProjectionMatrix();
    renderer.render(scene,camera)
};

