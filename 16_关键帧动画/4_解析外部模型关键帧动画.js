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
// scene.add(mesh)
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
const gltfs = [ '../gltf/Parrot.glb', '../gltf/Flamingo.glb' ];
// const gltfs = ['../../../three.js-dev/three.js-dev/examples/models/gltf/Parrot.glb', '../../../three.js-dev/three.js-dev/examples/models/gltf/Flamingo.glb'];
const selectModel = Math.floor(1);
new GLTFLoader().load(gltfs[selectModel], function (gltf) { 
    console.log('控制台查看gltf对象结构', gltf);
    // console.log('动画数据', gltf.animations);
    scene.add(gltf.scene); 

    //包含关键帧动画的模型作为参数创建一个播放器
    const mixer = new THREE.AnimationMixer(gltf.scene);
    //  获取gltf.animations[0]的第一个clip动画对象
    const clipAction = mixer.clipAction(gltf.animations[0]); //创建动画clipAction对象
    clipAction.play(); //播放动画

    // 如果想播放动画,需要周期性执行`mixer.update()`更新AnimationMixer时间数据
    const clock = new THREE.Clock();
    function loop() {
        renderer.render(scene,camera)
        requestAnimationFrame(loop);
        //clock.getDelta()方法获得loop()两次执行时间间隔
        const frameT = clock.getDelta();
        // 更新播放器相关的时间
        mixer.update(frameT);
    }
    loop();
})



