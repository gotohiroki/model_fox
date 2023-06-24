import * as THREE from 'three';
import Experience from "../Experience";

import Environment from './Environment';
import Floor from './Floor';
import Fox from './Fox';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    // // テスト
    // const testMesh = new THREE.Mesh(
    //   new THREE.BoxGeometry(1,1,1),
    //   new THREE.MeshStandardMaterial()
    // )
    // this.scene.add(testMesh);

    this.resources = this.experience.resources;

    // リソースを待つ
    this.resources.on('ready', () => {
      // セットアップ
      this.floor = new Floor();
      this.fox = new Fox();
      this.environment = new Environment();
    });

  }

  update(){
    if(this.fox)
      this.fox.update();
    }
}