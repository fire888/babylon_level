// https://playground.babylonjs.com/#VKBJN#3835 --custom geometry


import * as BABYLON from "@babylonjs/core/Legacy/legacy"
import "@babylonjs/loaders/glTF"
// @ts-ignore
import jelly from './assets/jelly_single.glb'
// @ts-ignore
import manSrc from './assets/Mts_Animation_Set_07_09_clean.glb'
// @ts-ignore
import exrSrc from './assets/evening_road_01_puresky_HD.exr'

const duplicate = function (container: any, offsetX: any, offsetZ: any) {
     let entries = container.instantiateModelsToScene(undefined, false, { doNotInstantiate: true });

     for (let node of entries.rootNodes) {
         node.position.x += offsetX;
         node.position.z += offsetZ;
     }

     return entries;
}
//
const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })
const scene = new BABYLON.Scene(engine)

const createScene = async function () {
    const camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 5, -30));
    camera.attachControl(canvas, true);

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

    //Apply vertexData to custom mesh
    vertexData.applyToMesh(customMesh);




     const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)

     // const jellyContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync("", manSrc, scene)
     // jellyContainer.addAllToScene()
     // jellyContainer.animationGroups.forEach(animationGroup => animationGroup.stop());

     // jellyContainer.animationGroups[1].loopAnimation = true
     // jellyContainer.animationGroups[1].play()
     // jellyContainer.animationGroups[1].onAnimationGroupEndObservable.add(function () {
     //     // setTimeout(() => {
     //     //     jellyContainer.animationGroups[1].play();
     //     // }, Math.random() * 3000)
     // })
     // for (let i = 0; i < jellyContainer.materials.length; ++i) {
     //     //jellyContainer.materials[i].diffuseTexture = texture
     // }

     // const clone = duplicate(jellyContainer, 2, 0)
     // clone.animationGroups[1].loopAnimation = true
     // setTimeout(() => {
     //     clone.animationGroups[1].play();
     // })
     // clone.animationGroups[1].onAnimationGroupEndObservable.add(function () {
     //     setTimeout(() => {
     //         clone.animationGroups[1].play();
     //     }, Math.random() * 3000)
     // })
     // const clone2 = duplicate(jellyContainer, -2, 0)
     // clone2.animationGroups[1].loopAnimation = true
     // setTimeout(() => {
     //     clone2.animationGroups[1].play();
     // }, Math.random() * 3000)
     // clone2.animationGroups[1].onAnimationGroupEndObservable.add(function () {
     //     setTimeout(() => {
     //         clone2.animationGroups[1].play();
     //     }, Math.random() * 3000)
     // })
     //
     // const clone3 = duplicate(jellyContainer, -2, 2)
     // clone3.animationGroups[1].loopAnimation = true
     // setTimeout(() => {
     //     clone3.animationGroups[1].play();
     // }, Math.random() * 3000)
     // clone3.animationGroups[1].onAnimationGroupEndObservable.add(function () {
     //     setTimeout(() => {
     //         clone3.animationGroups[1].play();
     //     }, Math.random() * 3000)
     // })
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
