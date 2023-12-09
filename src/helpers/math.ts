import * as BABYLON from "@babylonjs/core/Legacy/legacy";

const { sin, cos, PI, random } = Math
const PI2 = PI * 2

/** inner segments */
export const getAngleOfLineByTwoPoints = (p1: BABYLON.Vector3, p2: BABYLON.Vector3): number => {
    const p = new BABYLON.Vector3().copyFrom(p2).subtract(p1)
    let rad = Math.atan(p.z / p.x)
    p.x < 0 && p.z > 0 && (rad = PI - Math.abs(rad))
    p.x < 0 && p.z <= 0 && (rad = PI + Math.abs(rad))
    //rad += Math.PI * 6
    //rad = rad % PI2
    return PI2 - rad
    //return -rad
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

