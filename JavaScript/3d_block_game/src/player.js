import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

export class Player {
  constructor(camera) {
    this.camera = camera;

    this.pos = new THREE.Vector3(0,20,0);
    this.vel = new THREE.Vector3();

    this.speed = 0.2;
    this.hp = 100;
    this.hunger = 100;
  }

  update(input) {

    const dir = new THREE.Vector3();

    if (input.keys["w"]) dir.z -= 1;
    if (input.keys["s"]) dir.z += 1;
    if (input.keys["a"]) dir.x -= 1;
    if (input.keys["d"]) dir.x += 1;

    dir.normalize();

    this.pos.addScaledVector(dir, this.speed);

    // gravity
    this.vel.y -= 0.01;
    this.pos.y += this.vel.y;

    if (this.pos.y < 10) {
      this.pos.y = 10;
      this.vel.y = 0;
    }

    this.camera.position.copy(this.pos);
  }
}
