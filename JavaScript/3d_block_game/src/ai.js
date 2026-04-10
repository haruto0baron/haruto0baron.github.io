export class Animal {
  constructor(pos) {
    this.pos = pos;
    this.dir = Math.random() * Math.PI * 2;
  }

  update() {
    this.dir += (Math.random() - 0.5) * 0.2;
    this.pos.x += Math.cos(this.dir) * 0.05;
    this.pos.z += Math.sin(this.dir) * 0.05;
  }
}

export class Monster extends Animal {
  update(playerPos) {
    const dx = playerPos.x - this.pos.x;
    const dz = playerPos.z - this.pos.z;
    const dist = Math.sqrt(dx*dx + dz*dz);

    if (dist < 10) {
      this.pos.x -= dx * 0.01;
      this.pos.z -= dz * 0.01;
    } else {
      super.update();
    }
  }
}
