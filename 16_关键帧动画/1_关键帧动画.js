import * as THREE from 'three'
import {OrbitControls } from 'three/addons/controls/OrbitControls.js'
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

mesh.name = "Box";

// 给名为Box的模型对象的设置关键帧数据KeyframeTrack
const times = [0, 3, 6]; //时间轴上，设置三个时刻0、3、6秒
// times中三个不同时间点，物体分别对应values中的三个xyz坐标
const values = [0, 0, 0, 100, 0, 0, 0, 0, 100];
// 创建关键帧，把模型位置和时间对应起来
// 0~3秒，物体从(0,0,0)逐渐移动到(100,0,0),3~6秒逐渐从(100,0,0)移动到(0,0,100)
const posKF = new THREE.KeyframeTrack('Box.position', times, values);
// 从2秒到5秒，物体从红色逐渐变化为蓝色
const colorKF = new THREE.KeyframeTrack('Box.material.color', [2, 5], [1, 0, 0, 0, 0, 1]);
// 1.3 AnimationClip表示一个关键帧动画，可以基于关键帧数据产生动画效果
// 创建一个clip关键帧动画对象，命名"test"，动画持续时间6s
// AnimationClip包含的所有关键帧数据都放到参数3数组中即可
const clip = new THREE.AnimationClip("test",6,[posKF, colorKF]);
//包含关键帧动画的模型对象作为AnimationMixer的参数创建一个播放器mixer
const mixer = new THREE.AnimationMixer(mesh);

//AnimationMixer的`.clipAction()`返回一个AnimationAction对象
const clipAction = mixer.clipAction(clip); 
//.play()控制动画播放，默认循环播放
clipAction.play(); 

const clock = new THREE.Clock();
function loop() {
    renderer.render(scene,camera)
    requestAnimationFrame(loop);
    const frameT = clock.getDelta();
    // 更新播放器相关的时间
    mixer.update(frameT);
}
loop();


