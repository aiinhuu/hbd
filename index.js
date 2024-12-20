// import * as THREE from "three";
// import { OBJLoader } from "jsm/loaders/OBJLoader.js";

// const w = window.innerWidth;
// const h = window.innerHeight;

// const renderer = new THREE.WebGLRenderer({antialias: true})
// renderer.setSize(w,h);
// document.body.appendChild(renderer.domElement);


// const fov = 75;
// const aspect = w / h;
// const near =0.1;
// const far = 10;
// const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// camera.position.z = 2;
// const scene = new THREE.Scene();

// const geo = new THREE.IcosahedronGeometry(1.0, 2);
// const mat = new THREE.MeshStandardMaterial({
//     color: 0xffffff,
//     flatShading: true
// }
// )

// const mesh = new THREE.Mesh(geo, mat);

// scene.add(mesh);

// const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
// scene.add(hemiLight)

// const loader = new OBJLoader();
// loader.load((obj) => init)



// function animate(t = 0) {
//  requestAnimationFrame(animate)
//  //mesh.scale.setScalar(Math.cos(t * 0.001) + 1.0);
//  renderer.render(scene, camera)
// }
// animate();
// import * as THREE from "three";
// import { OrbitControls } from 'jsm/controls/OrbitControls.js';
// import { OBJLoader } from "jsm/loaders/OBJLoader.js";
// import getLayer from './getLayer.js';

// const w = window.innerWidth;
// const h = window.innerHeight;
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
// camera.position.z = 5;
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(w, h);
// document.body.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();

// function init(geometry) {
//   const material = new THREE.MeshMatcapMaterial({
//     matcap: new THREE.TextureLoader().load('./assets/textures/matcaps/black-n-shiney2.jpg'),
//     // transparent: true,
//     // opacity: 0.5
//   });
//   const mesh = new THREE.Mesh(geometry, material);
//   scene.add(mesh);

//   const sunlight = new THREE.DirectionalLight(0xffffff);
//   sunlight.position.y = 2;
//   scene.add(sunlight);

//   const filllight = new THREE.DirectionalLight(0x88ccff);
//   filllight.position.x = 1;
//   filllight.position.y = -2;
//   scene.add(filllight);

//   // Sprites BG
//   const gradientBackground = getLayer({
//     hue: 0.6,
//     numSprites: 8,
//     opacity: 0.2,
//     radius: 10,
//     size: 24,
//     z: -10.5,
//   });
//   scene.add(gradientBackground);

//   function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//   }
//   animate();
// }

// const loader = new OBJLoader();
// loader.load("./assets/models/A_10.obj", (obj) => init(obj.children[0].geometry));

// function handleWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }
// window.addEventListener('resize', handleWindowResize, false);
import * as THREE from "three";
import getLayer from "./getLayer.js";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";

const slide3 = document.querySelector('.slides3');

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
// document.body.appendChild(renderer.domElement);
slide3.appendChild(renderer.domElement);

const ctrls = new OrbitControls(camera, renderer.domElement);
ctrls.enableZoom = false;
ctrls.enableDamping = true;

const gltfLoader = new GLTFLoader();

gltfLoader.load('./assets/models/untitled.glb', (gltf) => {
const untitled = gltf.scene;
untitled.traverse((child) => {
  if (child.isMesh) {
    child.geometry.center();
  }
});
scene.add(untitled)
})

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00,
});
const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

// Sprites BG
const gradientBackground = getLayer({
  hue: 0.5,
  numSprites: 8,
  opacity: 0.2,
  radius: 10,
  size: 24,
  z: -15.5,
});
scene.add(gradientBackground);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;
  renderer.render(scene, camera);
  ctrls.update();
}

animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);