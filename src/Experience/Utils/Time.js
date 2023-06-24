import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  constructor() {

    super();

    // セットアップ
    // Experience 開始時のタイムスタンプが格納されます。値は変化せず、開始時のタイムスタンプが保持されます。
    this.start = Date.now();
    // 現在のタイムスタンプが格納されます。フレームごとに値が更新されます。
    this.current = this.start;
    // Experience 開始からの経過時間が格納されます。開始時からの経過時間を保持します。
    this.elapsed = 0;
    // 前のフレームからの経過時間が格納されます。デフォルトでは16が設定されており、これは60fpsの間におおよそ2フレーム間隔であるミリ秒数です。
    this.delta = 16;

    window.requestAnimationFrame(() => {
      this.tick();
    })

  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger('tick');

    window.requestAnimationFrame(() => {
      this.tick();
      // this.trigger('tick');
    })
  }

}