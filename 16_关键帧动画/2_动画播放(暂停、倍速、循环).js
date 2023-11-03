import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)

const geometry = new THREE.BoxGeometry(50, 100, 50)
const material = new THREE.MeshLambertMaterial({
    color: 'blue'
})
const mesh = new THREE.Mesh(geometry, material)
const directLight = new THREE.DirectionalLight(0xfffff, 100)
directLight.position.set(0, 100, 100)
const dirLightHelper = new THREE.DirectionalLightHelper(directLight, 5, 0xff0000);
scene.add(dirLightHelper);

camera.position.set(0, 100, 500)
camera.lookAt(0, 0, 0)

const axes = new THREE.AxesHelper(300)
scene.add(mesh)
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

mesh.name = "Box";
const times = [0, 3, 6];
const values = [0, 0, 0, 100, 0, 0, 0, 0, 100];
const posKF = new THREE.KeyframeTrack('Box.position', times, values);
const colorKF = new THREE.KeyframeTrack('Box.material.color', [2, 5], [1, 0, 0, 0, 0, 1])
const clip = new THREE.AnimationClip("test", 6, [posKF, colorKF]);
const mixer = new THREE.AnimationMixer(mesh);

//AnimationMixer的`.clipAction()`返回一个AnimationAction对象
const clipAction = mixer.clipAction(clip);
//.play()控制动画播放，默认循环播放
// clipAction.play(); 
// // 只循环一次
// clipAction.loop = THREE.LoopOnce
// 物体状态停留在动画结束的时候
// clipAction.clampWhenFinished = true;
// 倍速播放
clipAction.timeScale = 1;//默认
clipAction.timeScale = 2;//2倍速


document.getElementById('stop').addEventListener('click', function () {
    clipAction.stop();//动画停止结束，回到开始状态
})
document.getElementById('play').addEventListener('click', function () {
    clipAction.play();//播放动画
})
const bu = document.getElementById('bu');
bu.addEventListener('click', function () {
    // AnimationAction.paused默认值false，设置为true，可以临时暂停动画
    if (clipAction.paused) {//暂停状态
        clipAction.paused = false;//切换为播放状态
        bu.innerHTML = '暂停';// 如果改变为播放状态，按钮文字设置为“暂停”
    } else {//播放状态
        clipAction.paused = true;//切换为暂停状态
        bu.innerHTML = '继续';// 如果改变为暂停状态，按钮文字设置为“继续”
    }
})



const clock = new THREE.Clock();
function loop() {
    renderer.render(scene, camera)
    requestAnimationFrame(loop);
    const frameT = clock.getDelta();
    mixer.update(frameT);
}
loop();


