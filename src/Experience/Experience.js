import * as THREE from 'three';

import Camera from './Camera';
import Renderer from './Renderer';
import sources from './sources';

import Sizes from "./Utils/Sizes";
import Time from './Utils/Time';
import Resources from './Utils/Resources';
import Debug from './Utils/Debug'

import World from './World/World';

let instance = null;

export default class Experience {
  constructor(canvas) {

    // シングルトン
    if(instance) {
      return instance
    }
    instance = this;

    // グローバル変数 window.experience に代入し、他の部分からアクセス可能
    window.experience = this;

    // オプション
    this.canvas = canvas;

    // セットアップ
    this.debug = new Debug();
    this.sizes = new Sizes(); // サイズ
    this.time  = new Time(); // 時間
    this.scene = new THREE.Scene(); // シーン
    this.resources = new Resources(sources);
    this.camera = new Camera(this); // カメラ
    this.renderer = new Renderer(); // レンダラー
    this.world = new World(); // ワールド
    // this.resources = new Resources(sources);


    // リサイズ イベント
    this.sizes.on('resize', () => {
      this.resize();
    });

    // Time tick event
    this.time.on('tick', () => {
      this.update();
    })

  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  destroy() {
    this.sizes.off('resize');
    this.time.off('tick');

    // 全景をなぞる
    this.scene.traverse((child) => {
      if(child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // マテリアルプロパティでループする
        for(const key in child.material) {
          const value = child.material[key]

          // dispose関数があるかどうかをテストする
          if(value && typeof value.dispose === 'function') {
            value.dispose();
          }

        }

      }

    })

    this.camera.controls.dispose();

    if(this.debug.active)
    this.debug.ui.destroy()
  }

}