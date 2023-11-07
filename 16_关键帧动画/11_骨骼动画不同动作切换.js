import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


import Stats from 'three/addons/libs/stats.module.js'
const width = 700
const height = 400
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
    scene.add(gltf.scene);
    console.log(gltf.animations, 'animations')
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const IdleAction = mixer.clipAction(gltf.animations[0]);
    const RunAction = mixer.clipAction(gltf.animations[1]);
    const WalkAction = mixer.clipAction(gltf.animations[3]);
    IdleAction.play();
    let ActionState = IdleAction;//当前处于播放状态的动画动作对象
    // 通过UI按钮控制，切换动画运动状态
    document.getElementById('Idle').addEventListener('click', function () {
        if(ActionState!==IdleAction){
            ActionState.weight=0
        }
        IdleAction.play();
        ActionState = IdleAction;
    })
    document.getElementById('Run').addEventListener('click', function () {
        if(ActionState!==RunAction){
            ActionState.weight=0
        }else{
            ActionState.stop()
        }
        RunAction.play();
        ActionState = IdleAction;
    })
    document.getElementById('Walk').addEventListener('click', function () {
        // ActionState.stop();//播放状态动画终止
        ActionState.weight = 0
        WalkAction.play();
        ActionState = WalkAction;
    })
    const clock = new THREE.Clock();
    function loop() {
        renderer.render(scene, camera)
        requestAnimationFrame(loop);
        //clock.getDelta()方法获得loop()两次执行时间间隔
        const frameT = clock.getDelta();
        // 更新播放器相关的时间
        mixer.update(frameT);
    }
    loop();
})





