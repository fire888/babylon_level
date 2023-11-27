import * as BABYLON from "@babylonjs/core/Legacy/legacy"

export class Studio {
    scene: BABYLON.Scene
    canvas: HTMLCanvasElement
    engine: BABYLON.Engine
    camera: BABYLON.ArcRotateCamera

    constructor() {}

    async init () {
        this.canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true })
        this.scene = new BABYLON.Scene(this.engine)
        this.camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), this.scene)
        this.camera.setPosition(new BABYLON.Vector3(0, 5, -30))
        this.camera.attachControl(this.canvas, true)

        const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene)

        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
        window.addEventListener('resize', () => {
            this.engine.resize()
        })
    }
    async destroy () {}
    update () {}
}

