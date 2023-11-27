// https://playground.babylonjs.com/#VKBJN#3835 --custom geometry

import { TownScheme } from './townScheme/townSheme'
import { BuildMesh } from "./buildMesh/buildMesh"
import { Studio } from "./studio"

// import "@babylonjs/loaders/glTF"
// @ts-ignore
//import jelly from './assets/jelly_single.glb'
// @ts-ignore
//import manSrc from './assets/Mts_Animation_Set_07_09_clean.glb'
// @ts-ignore
//import exrSrc from './assets/evening_road_01_puresky_HD.exr'
//


const createScene = async function () {
    const studio = new Studio()
    await studio.init()

    const linesScheme = new TownScheme(studio.scene)
    await linesScheme.init({})

    const customMesh = new BuildMesh('custom', studio.scene)
    await customMesh.init({})

}
createScene().then()


