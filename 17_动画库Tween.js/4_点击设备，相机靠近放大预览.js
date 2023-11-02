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

function render() {
    TWEEN.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// 切换到设备A预览状态
document.getElementById('A').addEventListener('click', function () {
    console.log('点击了A')
    const A = scene.getObjectByName('长方体');
    const pos = new THREE.Vector3();
    A.getWorldPosition(pos); //获取三维场景中某个对象世界坐标
    // 相机飞行到的位置和观察目标拉开一定的距离
    const pos2 = pos.clone().addScalar(30);//向量的x、y、z坐标分别在pos基础上增加30
    // 相机从当前位置camera.position飞行三维场景中某个世界坐标附近
    new TWEEN.Tween({
        // 相机开始坐标
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
        // 相机开始指向的目标观察点
        tx: 0,
        ty: 0,
        tz: 0,
    })
        .to({
            // 相机结束坐标
            x: pos2.x,
            y: pos2.y,
            z: pos2.z,
            // 相机结束指向的目标观察点
            tx: pos.x,
            ty: pos.y,
            tz: pos.z,
        }, 2000)
        .onUpdate(function (obj) {
            // 动态改变相机位置
            camera.position.set(obj.x, obj.y, obj.z);
            // 动态计算相机视线
            camera.lookAt(obj.tx, obj.ty, obj.tz);
            orbit.target.set(obj.tx, obj.ty, obj.tz);
            orbit.update();
        })
        .start();

    render();

})

document.getElementById('B').addEventListener('click', function () {
    console.log('点击了B')
    const A = scene.getObjectByName('正方体');
    const pos = new THREE.Vector3();
    A.getWorldPosition(pos); //获取三维场景中某个对象世界坐标
    // 相机飞行到的位置和观察目标拉开一定的距离
    const pos2 = pos.clone().addScalar(30);//向量的x、y、z坐标分别在pos基础上增加30
    // 相机从当前位置camera.position飞行三维场景中某个世界坐标附近
    new TWEEN.Tween({
        // 相机开始坐标
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
        // 相机开始指向的目标观察点
        tx: 0,
        ty: 0,
        tz: 0,
    })
        .to({
            // 相机结束坐标
            x: pos2.x,
            y: pos2.y,
            z: pos2.z,
            // 相机结束指向的目标观察点
            tx: pos.x,
            ty: pos.y,
            tz: pos.z,
        }, 2000)
        .onUpdate(function (obj) {
            // 动态改变相机位置
            camera.position.set(obj.x, obj.y, obj.z);
            // 动态计算相机视线
            camera.lookAt(obj.tx, obj.ty, obj.tz);
            orbit.target.set(obj.tx, obj.ty, obj.tz);
            orbit.update();
        })
        .start();

    render();
})


