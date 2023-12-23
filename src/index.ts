//import './tsTeach/tsteash'

import { TownScheme } from './townScheme/townSheme'
import { BuildMesh } from "./buildMesh/buildMesh"
import { Studio } from "./studio"

const createScene = async function () {
    const studio = new Studio()
    await studio.init()

    const linesScheme = new TownScheme(studio.scene)
    await linesScheme.init({})

    const dataTown = linesScheme.dataTown

    const customMesh = new BuildMesh('custom', studio.scene)
    await customMesh.init(dataTown)

}
createScene().then()

