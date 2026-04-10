import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

export const CHUNK_SIZE = 16;

export class Chunk {
  constructor(x, z, world) {
    this.x = x;
    this.z = z;
    this.world = world;

    this.data = new Uint8Array(CHUNK_SIZE ** 3);
    this.mesh = null;

    this.generate();
    this.buildMesh();
  }

  index(x, y, z) {
    return x + CHUNK_SIZE * (y + CHUNK_SIZE * z);
  }

  generate() {
    const noise = this.world.noise;

    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let z = 0; z < CHUNK_SIZE; z++) {

        const h = Math.floor(
          noise.smooth((x + this.x * CHUNK_SIZE) * 0.05,
                       (z + this.z * CHUNK_SIZE) * 0.05) * 10 + 10
        );

        for (let y = 0; y < CHUNK_SIZE; y++) {
          let id = 0;

          if (y <= h) id = h - y > 3 ? 2 : 1; // stone/grass
          if (y === 0) id = 3; // bedrock

          this.data[this.index(x, y, z)] = id;
        }
      }
    }
  }

  buildMesh() {
    const geo = new THREE.BoxGeometry(1,1,1);
    const mat = new THREE.MeshLambertMaterial({ vertexColors:true });

    const mesh = new THREE.InstancedMesh(geo, mat, 5000);

    const dummy = new THREE.Object3D();
    let count = 0;

    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let y = 0; y < CHUNK_SIZE; y++) {
        for (let z = 0; z < CHUNK_SIZE; z++) {

          const id = this.data[this.index(x,y,z)];
          if (id === 0) continue;

          dummy.position.set(
            x + this.x * CHUNK_SIZE,
            y,
            z + this.z * CHUNK_SIZE
          );

          dummy.updateMatrix();
          mesh.setMatrixAt(count++, dummy.matrix);
        }
      }
    }

    mesh.count = count;
    this.mesh = mesh;
  }
}
