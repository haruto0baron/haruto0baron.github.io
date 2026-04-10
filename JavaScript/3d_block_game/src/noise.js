export class Noise {
  constructor(seed = 1337) {
    this.seed = seed;
  }

  hash(x, y) {
    let n = x * 374761393 + y * 668265263 + this.seed * 1442695041;
    n = (n ^ (n >> 13)) * 1274126177;
    return (n ^ (n >> 16)) >>> 0;
  }

  value(x, y) {
    return this.hash(x, y) / 4294967295;
  }

  smooth(x, y) {
    const xf = Math.floor(x);
    const yf = Math.floor(y);

    const v1 = this.value(xf, yf);
    const v2 = this.value(xf + 1, yf);
    const v3 = this.value(xf, yf + 1);
    const v4 = this.value(xf + 1, yf + 1);

    const fx = x - xf;
    const fy = y - yf;

    const i1 = v1 + (v2 - v1) * fx;
    const i2 = v3 + (v4 - v3) * fx;

    return i1 + (i2 - i1) * fy;
  }
}
