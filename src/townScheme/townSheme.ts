import * as BABYLON from "@babylonjs/core/Legacy/legacy";
const { sin, cos, PI, random } = Math
const PI2 = PI * 2

const ranMinus = (v: number): number => (random() -.5) * v

export class TownScheme {
    private _linesMesh: BABYLON.LinesMesh
    readonly _scene: BABYLON.Scene
    scheme: any = {}

    constructor(scene: BABYLON.Scene) {
        this._scene = scene
    }

    async init (params: any) {
        const R:number = 15
        const N:number = 10
        const MAX_RAN = R

        type Path = BABYLON.Vector3[]
        const path:Path = []

        for (let i = 0; i < N; ++i) {
            path.push(new BABYLON.Vector3(
                sin(i / N * PI2) * R + random() * ranMinus(MAX_RAN),
                0,
                cos(i / N * PI2) * R + random() * ranMinus(MAX_RAN)
            ))
        }

        this._linesMesh = BABYLON.MeshBuilder.CreateLines('lines', { points: path }, this._scene)
    }
    async destroy () {}
    update () {}
}



