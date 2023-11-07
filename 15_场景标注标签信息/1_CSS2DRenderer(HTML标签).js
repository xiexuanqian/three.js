import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

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
// width, height：canvas画布宽高度
renderer.setSize(width, height);
renderer.render(scene, camera);



document.body.appendChild(renderer.domElement)


const earthDiv = document.createElement('div');
earthDiv.className = 'label';
earthDiv.textContent = '长方体';
earthDiv.style.backgroundColor = 'transparent';
const EARTH_RADIUS = 1;
const earthLabel = new CSS2DObject(earthDiv);
earthLabel.position.set(1.5 * EARTH_RADIUS, 0, 0);
earthLabel.center.set(0, 1);
mesh.add(earthLabel);
earthLabel.layers.set(0);

const earthMassDiv = document.createElement('div');
earthMassDiv.className = 'label';
earthMassDiv.textContent = '正方体';
earthMassDiv.style.backgroundColor = 'transparent';

const earthMassLabel = new CSS2DObject(earthMassDiv);
// earthMassLabel.position.set(1.5 * 2, 0, 0);
mesh2.add(earthMassLabel);
earthMassLabel.layers.set(0);

const labelRenderer = new CSS2DRenderer();
// 必须和renderer的画布大小一样大
labelRenderer.setSize(window.innerWidth, window.innerHeight);

// 必须要写
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.render(scene, camera);
document.body.appendChild(labelRenderer.domElement);


const orbit = new OrbitControls(camera, labelRenderer.domElement)
orbit.addEventListener('change', () => {
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
})
function render(){
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
    requestAnimationFrame(render)
}
render()