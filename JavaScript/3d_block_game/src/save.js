export class Save {
  static save(world) {
    localStorage.setItem("world", JSON.stringify(world));
  }

  static load() {
    return JSON.parse(localStorage.getItem("world") || "{}");
  }
}
