// https://playground.babylonjs.com/#VKBJN#3835 --custom geometry


import * as BABYLON from "@babylonjs/core/Legacy/legacy"
import "@babylonjs/loaders/glTF"
// @ts-ignore
import jelly from './assets/jelly_single.glb'
// @ts-ignore
import manSrc from './assets/Mts_Animation_Set_07_09_clean.glb'
// @ts-ignore
import exrSrc from './assets/evening_road_01_puresky_HD.exr'

//
const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })
const scene = new BABYLON.Scene(engine)

const createScene = async function () {
    const camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 5, -30));
    camera.attachControl(canvas, true);

    /** *****************/
    const customMesh = new BABYLON.Mesh("custom", scene);
    const geometry = new BABYLON.Geometry(BABYLON.Geometry.RandomId(), scene, undefined, false, customMesh)
    geometry._boundingInfo = new BABYLON.BoundingInfo(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(10, 10, 10)); // set your own bounding info
    geometry.useBoundingInfoFromGeometry = true;

    customMesh.doNotSyncBoundingInfo = true;
    console.log("before",customMesh.getBoundingInfo(),customMesh.hasBoundingInfo);
    //Set arrays for positions and indices
    const positions = new Float32Array([0,0,0, 0,1,0, 1,0,0,  1,0,0 , 1,1,0, 0,1,0   ]);
    const indices = new Uint16Array([2,1,0 , 3, 4, 5]);
    const colors = new Float32Array([1,0,0,1,   0,0,0,1,   1,0,0,1,   1,0,0,1,   1,0,0,1,  0,0,0,1 ]);

    const normals:any = [];

    const vertexData = new BABYLON.VertexData();
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);

    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.normals = normals;
    vertexData.colors = colors;
    vertexData.applyToMesh(customMesh);

    /** ************************/
    var path = [];
    path.push(new BABYLON.Vector3(3, 0, 0));
    path.push(new BABYLON.Vector3(3, 0, 3));
    path.push(new BABYLON.Vector3(0, 0, 3));
    path.push(new BABYLON.Vector3(0, 0, 0));
    path.push(new BABYLON.Vector3(3, 0, 0));

    const linesMesh = BABYLON.MeshBuilder.CreateLines('lines', { points: path }, scene);


    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)
}
 createScene().then(() => {
     engine.runRenderLoop(function(){
         scene.render()
     })
})
//
 window.addEventListener('resize', function(){
     engine.resize()
})
