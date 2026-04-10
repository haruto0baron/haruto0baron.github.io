import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import { World } from "./world.js";
import { Player } from "./player.js";
import { Input } from "./input.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10,20,10);
scene.add(light);

const world = new World(scene);
const input = new Input();
const player = new Player(camera);

function loop() {
  requestAnimationFrame(loop);

  player.update(input);
  world.update(player.pos);

  renderer.render(scene, camera);
}

loop();
