import './tsTeach/tsteash'

import { TownScheme } from './townScheme/townSheme'
import { BuildMesh } from "./buildMesh/buildMesh"
import { Studio } from "./studio"

const createScene = async function () {
    const studio = new Studio()
    await studio.init()

    const linesScheme = new TownScheme(studio.scene)
    await linesScheme.init({})

    const customMesh = new BuildMesh('custom', studio.scene)
    await customMesh.init({})

}
createScene().then()

