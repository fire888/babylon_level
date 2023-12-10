import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import { drawLine } from '../buildMesh/drawLine'

const { sin, cos, PI, random } = Math
const PI2 = PI * 2

/** inner segments */
export const getAngleOfLineByTwoPoints = (p1: BABYLON.Vector3, p2: BABYLON.Vector3): number => {
    const p = new BABYLON.Vector3().copyFrom(p2).subtract(p1)
    let rad = Math.atan(p.z / p.x)
    p.x < 0 && p.z > 0 && (rad = PI - Math.abs(rad))
    p.x < 0 && p.z <= 0 && (rad = PI + Math.abs(rad))
    return PI2 - rad
}

export const interceptXZ = (v00: BABYLON.Vector3, v01: BABYLON.Vector3, v10: BABYLON.Vector3, v11: BABYLON.Vector3): BABYLON.Vector3 | null => {
    const x1 = v00.x
    const y1 = v00.z
    const x2 = v01.x
    const y2 = v01.z
    const x3 = v10.x
    const y3 = v10.z
    const x4 = v11.x
    const y4 = v11.z
    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return null
    }

    const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    // Lines are parallel
    if (denominator === 0) {
        return null
    }

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return null
    }

    // Return a object with the x and y coordinates of the intersection
    const x = x1 + ua * (x2 - x1)
    const y = y1 + ua * (y2 - y1)

    return new BABYLON.Vector3(x, 0, y)
}

export const makeParallelWithOffset = (p1: BABYLON.Vector3, p2: BABYLON.Vector3, offset: number): BABYLON.Vector3[] => {
    const copyP1 = new BABYLON.Vector3().copyFrom(p1)
    const copyP2 = new BABYLON.Vector3().copyFrom(p2)

    const angle = getAngleOfLineByTwoPoints(p1, p2)

    copyP1.x += sin(angle) * offset
    copyP1.z += cos(angle) * offset

    copyP2.x += sin(angle) * offset
    copyP2.z += cos(angle) * offset

    return [ copyP1, copyP2 ]
}

export const makeCopyPathWithOffset = (path: BABYLON.Vector3[], offset: number, scene: BABYLON.Scene): BABYLON.Vector3[] => {
    const parallelLines = []
    for (let i: number = 1; i < path.length; ++i) {
        const prevPoint = path[i - 1]
        const point = path[i]
        const l = makeParallelWithOffset(prevPoint, point, offset)
        parallelLines.push(l)
        if (i === path.length - 1) {
            const prevPoint = path[i]
            const point = path[0]
            const l = makeParallelWithOffset(prevPoint, point, offset)
            parallelLines.push(l)
        }
    }

    for (let i = 0; i < parallelLines.length; ++i) {
        //drawLine(scene, parallelLines[i], new BABYLON.Color4(0, 1, 1, 1))
    }

    const points = []
    for (let i = 1; i < parallelLines.length; ++i) {
        const prevLine = parallelLines[i - 1]
        const line = parallelLines[i]
        const intercept = interceptXZ(prevLine[0], prevLine[1], line[0], line[1])
        intercept && points.push(intercept)

        if (i === parallelLines.length - 1) {
            const prevLine = parallelLines[i]
            const line = parallelLines[0]
            const intercept = interceptXZ(prevLine[0], prevLine[1], line[0], line[1])
            intercept && points.push(intercept)
        }
    }

    const copy = [...points, points[0]]
    drawLine(scene, copy, new BABYLON.Color4(0, 1, 1, 1))

    return points
}


