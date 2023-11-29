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


// enum s {
//     open,
//     oToC,
//     closed,
//     cToO
// }
// console.log(s.open)
//
// const aaa = (a: number, b: (n: number) => void): void => {
//     b(a)
//     //console.log(b(a))
// }
//
// aaa(5, (n) => {
//     console.log(n)
// })



export class TownScheme {
    private _linesMesh: BABYLON.LinesMesh
    readonly _scene: BABYLON.Scene
    scheme: any = {}

    constructor(scene: BABYLON.Scene) {
        this._scene = scene
    }

    async init (params: any) {
        const data = []

        const N: number = 10

        const ROUNDS: number = 4
        const RAD: number = 20

        /** draw round */
        for (let i: number = 0; i < ROUNDS; ++i) {
            const segments = []
            const r: number = RAD / ROUNDS * (ROUNDS - i)

            /** draw single segment of round */
            let saved: null | BABYLON.Vector3 = null
            for (let j: number = 0; j < N; ++j) {
                const phasePrev = j / N
                let phaseNext = (j + 1) / N
                const sinPrev = sin(phasePrev * PI2)
                const cosPrev = cos(phasePrev * PI2)
                const sinNext = sin(phaseNext * PI2)
                const cosNext = cos(phaseNext * PI2)

                let p0 = new BABYLON.Vector3(sinPrev * r + ranMinus(r * .4), 0, cosPrev * r + ranMinus(r * .4))
                if (saved) {
                    p0 = saved
                }
                let p1 = new BABYLON.Vector3(sinNext * r + ranMinus(r * .4), 0, cosNext * r + ranMinus(r * .4))
                saved = p1

                if (j === N - 1) {
                    p1 = segments[0][0]
                    phaseNext = 0
                }

                const linePoints: BABYLON.Vector3[] = [p0, p1]
                BABYLON.MeshBuilder.CreateLines('lines3', { points: linePoints }, this._scene)
                segments.push(linePoints)
            }
            data.push(segments)
        }
    }
    async destroy () {}
    update () {}
}



