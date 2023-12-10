import { getAngleOfLineByTwoPoints, makeParallelWithOffset, makeCopyPathWithOffset } from '../helpers/math'
import { drawLine } from '../buildMesh/drawLine'

import * as BABYLON from "@babylonjs/core/Legacy/legacy";
const { sin, cos, PI, random } = Math
const PI2 = PI * 2

const ranMinus = (v: number): number => (random() -.5) * v

type Path = BABYLON.Vector3[]

interface IScheme {
    init: (params: any) => Promise<void>;
    _scene: BABYLON.Scene;
    destroy: () => void;
    update: () => void;
}

const p1 = new BABYLON.Vector3(0, 0, 0)
const p2 = new BABYLON.Vector3(-1, 0, 0)
console.log('---', getAngleOfLineByTwoPoints(p1, p2))

export class TownScheme implements IScheme{
    private _linesMesh: BABYLON.LinesMesh
    readonly _scene: BABYLON.Scene
    scheme: any = {}

    constructor(scene: BABYLON.Scene) {
        this._scene = scene
    }

    async init (params: any): Promise<void> {
        const N: number = 10
        const ROUNDS: number = 4
        const RAD: number = 30

        /** draw round */
        const circles: BABYLON.Vector3[][][] = []

        for (let i: number = 0; i < ROUNDS; ++i) {
            const segments: BABYLON.Vector3[][] = []
            let r: number = RAD / ROUNDS * (ROUNDS - i)
            if (i === ROUNDS - 1) {
                r = RAD * 0.2
            }
            const maxRand: number = r * .3
            /** draw single segment of round */
            let saved: null | BABYLON.Vector3 = null
            for (let j: number = 0; j < N; ++j) {
                const phasePrev = j / N
                let phaseNext = (j + 1) / N
                const sinPrev = sin(phasePrev * PI2)
                const cosPrev = cos(phasePrev * PI2)
                const sinNext = sin(phaseNext * PI2)
                const cosNext = cos(phaseNext * PI2)

                let p0 = new BABYLON.Vector3(sinPrev * r + ranMinus(maxRand), 0, cosPrev * r + ranMinus(maxRand))
                if (saved) {
                    p0 = saved
                }
                let p1 = new BABYLON.Vector3(sinNext * r + ranMinus(maxRand), 0, cosNext * r + ranMinus(maxRand))
                saved = p1

                if (j === N - 1) {
                    p1 = segments[0][0]
                    phaseNext = 0
                }

                const linePoints: BABYLON.Vector3[] = [p0, p1]
                segments.push(linePoints)
            }
            circles.push(segments)
        }
        console.log(circles)

        /** create segments by rounds */
        const segments: any[] = []
        for (let i: number = 1; i < circles.length; ++i) {
            for (let j: number = 0; j < circles[i].length; ++j) {
                segments.push({
                    outerLine: circles[i - 1][j],
                    innerLine: circles[i][j],
                })
            }
        }

        /** draw segments */
        const color: BABYLON.Color4 = new BABYLON.Color4(1, 0, 0, .5)

        for (let i: number = 0; i < segments.length; ++i) {
            const { outerLine, innerLine } = segments[i]
            const path = [
                outerLine[0],
                outerLine[1],
                innerLine[1],
                innerLine[0],
                outerLine[0],
            ]
            drawLine(this._scene, path, color)
        }

        /** calculate inners ***/
        for (let i: number = 0; i < segments.length; ++i) {
            const { outerLine, innerLine } = segments[i]
            const copy = makeCopyPathWithOffset([
                outerLine[0],
                outerLine[1],
                innerLine[1],
                innerLine[0],
                //outerLine[0],
            ], -1, this._scene)
        }
    }
    async destroy () {}
    update () {}
    printData () {}
}



