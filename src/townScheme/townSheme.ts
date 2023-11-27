import * as BABYLON from "@babylonjs/core/Legacy/legacy";

export class TownScheme {
    private _linesMesh: BABYLON.LinesMesh
    readonly _scene: BABYLON.Scene
    scheme: any = {}

    constructor(scene: BABYLON.Scene) {
        this._scene = scene
    }

    async init (params: any) {
        console.log('$%%$%')

        const path = []
        path.push(new BABYLON.Vector3(3, 0, 0))
        path.push(new BABYLON.Vector3(3, 0, 3))
        path.push(new BABYLON.Vector3(0, 0, 3))
        path.push(new BABYLON.Vector3(0, 0, 0))
        path.push(new BABYLON.Vector3(3, 0, 0))

        this._linesMesh = BABYLON.MeshBuilder.CreateLines('lines', { points: path }, this._scene)
    }
    async destroy () {}
    update () {}
}



