import { Chunk, CHUNK_SIZE } from "./chunk.js";
import { Noise } from "./noise.js";

export class World {
  constructor(scene) {
    this.scene = scene;
    this.noise = new Noise();

    this.chunks = new Map();
    this.renderDistance = 4;
  }

  key(x,z){ return `${x},${z}`; }

  update(playerPos) {
    const cx = Math.floor(playerPos.x / CHUNK_SIZE);
    const cz = Math.floor(playerPos.z / CHUNK_SIZE);

    for (let x = cx - this.renderDistance; x <= cx + this.renderDistance; x++) {
      for (let z = cz - this.renderDistance; z <= cz + this.renderDistance; z++) {

        const k = this.key(x,z);
        if (!this.chunks.has(k)) {
          const c = new Chunk(x,z,this);
          this.chunks.set(k,c);
          this.scene.add(c.mesh);
        }
      }
    }
  }
}
