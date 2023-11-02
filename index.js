import * as THREE from 'three'
import {OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'

const scene = new THREE.Scene()

const box = new THREE.BoxGeometry(10, 10, 10)

// const box = new THREE.SphereGeometry(20,20,20)
// const box = new THREE.BufferGeometry()

box.translate(25,0,0)

const material = new THREE.MeshBasicMaterial({
    color: 'red',
    side:THREE.DoubleSide
})

// const material = new THREE.MeshPhongMaterial({
//     color: 'red',
//     shininess:100,   //高光亮度
//     specular: 0x444444, //高光部分的颜色
//     // side:THREE.DoubleSide
// })
// const material = new THREE.MeshLambertMaterial({
//     color:0xfffff
// })

const mesh = new THREE.Mesh(box, material)

const mesh2 = mesh.clone()



mesh.position.set(0, 0, 0)

mesh2.position.copy(mesh.position)
mesh2.position.y+=20

const group = new THREE.Group()

group.add(mesh)
group.add(mesh2)

// group.position.set(50,50,50)
group.translateY(100)
// console.log(group.children,'childs')
// const nums = 10
// for (let i = 0; i < nums; i++) {
//     const mesh = new THREE.Mesh(box, material)
//     mesh.position.set(i*20, 0, 0)
//     scene.add(mesh)
// }



const width = window.innerWidth
const height = window.innerHeight


const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
camera.position.set(300, 300, 300)
camera.lookAt(0, 0, 0)
// camera.lookAt(1000,1000,1000)

const axes = new THREE.AxesHelper(300)

const pointLight = new THREE.PointLight(0xfffff, 100, 0, 0);
pointLight.position.set(50, 50, 50)
pointLight.intensity = 100

const pointLightHelper = new THREE.PointLightHelper(pointLight, 10)

const envLight = new THREE.AmbientLight({
    color: 0xfffff
})

// const directLight = new THREE.DirectionalLight({
//     color: 0xfffff
// })
// directLight.position.set(-70, -70, -70)
// directLight.intensity = 100

// 批量创建多个长方体表示高层楼
const group1 = new THREE.Group(); //所有高层楼的父对象
group1.name = "高层";
for (let i = 0; i < 5; i++) {
    const geometry = new THREE.BoxGeometry(20, 60, 10);
    const material = new THREE.MeshLambertMaterial({
        color: 0x00ffff
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = i * 30; // 网格模型mesh沿着x轴方向阵列
    group1.add(mesh); //添加到组对象group1
    mesh.name = i + 1 + '号楼';
    // console.log('mesh.name',mesh.name);
}
group1.position.y = 30;


const group2 = new THREE.Group();
group2.name = "洋房";
// 批量创建多个长方体表示洋房
for (let i = 0; i < 5; i++) {
    const geometry = new THREE.BoxGeometry(20, 30, 10);
    const material = new THREE.MeshLambertMaterial({
        color: 0x00ffff
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = i * 30;
    group2.add(mesh); //添加到组对象group2
    mesh.name = i + 6 + '号楼';
}
group2.position.z = 50;
group2.position.y = 15;

const model = new THREE.Group();
model.name='小区房子';
model.add(group1, group2);
model.position.set(-50,0,-25);

// 递归遍历model包含所有的模型节点
model.traverse(function(obj) {
    console.log('所有模型节点的名称',obj.name);
    // obj.isMesh：if判断模型对象obj是不是网格模型'Mesh'
    if (obj.isMesh) {//判断条件也可以是obj.type === 'Mesh'
        obj?.material?.color.set(0xffff00);
        // obj.rotation.y+=90
        // 平移几何体的顶点坐标,改变几何体自身相对局部坐标原点的位置
        obj.translateX(25);;
        const axes2 = new THREE.AxesHelper(30)
        obj.add(axes2)
        obj.rotateY(90)
    }
});





scene.add(axes)
scene.add(camera)
// scene.add(model)
scene.add(group)
// scene.add(mesh)
// scene.add(mesh2)
scene.add(pointLight)
scene.add(pointLightHelper)
// scene.add(envLight)
// scene.add(directLight)

// console.log(pointLight)

// 返回名.name为"4号楼"对应的对象
const nameNode = scene.getObjectByName('4号楼');
console.log(nameNode,'nameNode')
nameNode?.material?.color.set(0xff0000);
const renderer = new THREE.WebGLRenderer({
    antialias:true
})
renderer.setPixelRatio(2)
renderer.setSize(width, height)
renderer.setClearColor(0xff0000, 0.5)
renderer.render(scene, camera)

const orbit = new OrbitControls(camera,renderer.domElement)
orbit.addEventListener('change',()=>{
    renderer.render(scene,camera)
})


// orbit.target.set(1000,1000,1000);
// orbit.update();

document.body.appendChild(renderer.domElement)


const stats = new Stats()
document.body.appendChild(stats.domElement)

function render() {
    stats.update()
    renderer.render(scene, camera)
    mesh.rotateY(0.01)
    mesh2.rotation.copy(mesh.rotation)
    requestAnimationFrame(render)
}
render()

window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    // renderer.render(scene,camera)
    camera.updateProjectionMatrix()
}

const gui = new GUI()
gui.domElement.style.right = '0px'
gui.domElement.style.width = '300px';

gui.add(mesh.position,'x',0,500).name('材质x位置').step(10).onChange(function(value){
    mesh.position.y = value
})

gui.addColor(material,'color').name("材质颜色").onChange(function(value){
})

console.log(gui)

console.log(renderer)
const obj = {
    color:''
}
gui.addColor(obj,'color').name('背景颜色').onChange(function(value){
    renderer.setClearColor(value,0.5)
})

gui.add(mesh.position,'z',[10,20,30])
