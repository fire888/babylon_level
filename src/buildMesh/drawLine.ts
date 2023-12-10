import * as BABYLON from "@babylonjs/core/Legacy/legacy";

export const drawLine = (scene: BABYLON.Scene, path: BABYLON.Vector3[], color = new BABYLON.Color4(1, 0, 0, .7)): void => {
    const c: BABYLON.Color4[] = []
    for (let i = 0; i < path.length; ++i) {
        c.push(color)
    }
    BABYLON.MeshBuilder.CreateLines('line_' + Math.floor(Math.random() * 100000),  { points: path, colors: c }, scene)
}
