import * as BABYLON from "@babylonjs/core/Legacy/legacy";
const { sin, cos, PI, random } = Math
const PI2 = PI * 2

const ranMinus = (v: number): number => (random() -.5) * v

type Path = BABYLON.Vector3[]
const createPath = (n: number, r: number, maxRandom: number): Path => {
    const path: BABYLON.Vector3[] = []
    for (let i: number = 0; i < n; ++i) {
        path.push(new BABYLON.Vector3(
            sin(i / n * PI2) * r + random() * ranMinus(maxRandom),
            0,
            cos(i / n * PI2) * r + random() * ranMinus(maxRandom)
        ))
    }
    path.push(path[0])
    return path
}


export class TownScheme {
    private _linesMesh: BABYLON.LinesMesh
    readonly _scene: BABYLON.Scene
    scheme: any = {}

    constructor(scene: BABYLON.Scene) {
        this._scene = scene
    }

    async init (params: any) {
        const N: number = 10
        const R: number = 15
        const RAN: number = R * 0.7
        const path:Path = createPath(N, R, RAN)
        BABYLON.MeshBuilder.CreateLines('lines1', { points: path }, this._scene)

        const R1: number = R - R * .3
        const RAN1: number = RAN * .5
        const path1:Path = createPath(N, R1, RAN1)
        BABYLON.MeshBuilder.CreateLines('lines2', { points: path1 }, this._scene)

        const R2: number = R1 - R1 * .3
        const RAN2: number = RAN1 * .5
        const path2:Path = createPath(N, R2, RAN2)
        BABYLON.MeshBuilder.CreateLines('lines3', { points: path2 }, this._scene)

        const R3: number = R * .1
        const RAN3: number = RAN2 * .5
        const path3: Path = createPath(N, R3, RAN3)
        BABYLON.MeshBuilder.CreateLines('lines3', { points: path3 }, this._scene)
    }
    async destroy () {}
    update () {}
}



