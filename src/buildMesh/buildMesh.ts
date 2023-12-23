import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import { fillV4 } from '../helpers/math'
import mapTown from '../assets/mmm.jpg'

export class BuildMesh extends BABYLON.Mesh {
    readonly _scene: BABYLON.Scene

    constructor(name: string, scene: BABYLON.Scene) {
        super(name, scene)
        this._scene = scene
    }

    async init (params: any) {
        const v = []
        const ind = []
        let indCount = 0
        const c = []
        const color1 = [.3, 1, 1, 1]
        const color6 = [...color1, ...color1, ...color1, ...color1, ...color1, ...color1]
        const colorR = [1, 0, 1, 1]
        const uvs = []
        const uv6 = [0, 0, .25, 0, .25, .25, 0, 0, .25, .25, 0, .25]

        for (let i = 0; i < params.length; ++i) {
            if (params[i].type === 'house') {
                const { segPath } = params[i]

                let centerX = 0
                let centerZ = 0

                for (let i = 1; i < segPath.length; ++i) {
                    centerX += segPath[i].x
                    centerZ += segPath[i].z
                }

                centerX /= (segPath.length - 1)
                centerZ /= (segPath.length - 1)

                for (let i = 1; i < segPath.length; ++i) {
                    const prev = segPath[i - 1]
                    const current = segPath[i]
                    v.push(...fillV4(
                        [current.x, 0, current.z],
                        [prev.x, 0, prev.z],
                        [prev.x, 5, prev.z],
                        [current.x, 5, current.z],
                    ))

                    ind.push(indCount)
                    ++indCount
                    ind.push(indCount)
                    ++indCount
                    ind.push(indCount)
                    ++indCount
                    ind.push(indCount)
                    ++indCount
                    ind.push(indCount)
                    ++indCount
                    ind.push(indCount)
                    ++indCount

                    c.push(...color6)
                    uvs.push(...uv6)


                    v.push(
                        current.x, 5, current.z,
                        prev.x, 5, prev.z,
                        centerX, 5, centerZ,
                    )
                    ind.push(indCount)
                    ++indCount
                    ind.push(indCount)
                    ++indCount
                    ind.push(indCount)
                    ++indCount
                    c.push(...colorR, ...colorR, ...colorR)
                    uvs.push(0, 0, 0, 0, 0, 0)

                    if (i === segPath.length - 1) {
                        const prev = segPath[i]
                        const current = segPath[0]
                        v.push(...fillV4(
                            [current.x, 0, current.z],
                            [prev.x, 0, prev.z],
                            [prev.x, 5, prev.z],
                            [current.x, 5, current.z],
                        ))

                        ind.push(indCount)
                        ++indCount
                        ind.push(indCount)
                        ++indCount
                        ind.push(indCount)
                        ++indCount
                        ind.push(indCount)
                        ++indCount
                        ind.push(indCount)
                        ++indCount
                        ind.push(indCount)
                        ++indCount

                        c.push(...color6)
                        uvs.push(...uv6)


                        v.push(
                            current.x, 5, current.z,
                            prev.x, 5, prev.z,
                            centerX, 5, centerZ,
                        )
                        ind.push(indCount)
                        ++indCount
                        ind.push(indCount)
                        ++indCount
                        ind.push(indCount)
                        ++indCount
                        c.push(...colorR, ...colorR, ...colorR)
                        uvs.push(0, 0, 0, 0, 0, 0)
                    }
                }
            }
        }

        console.log(v)
        console.log(c)

        const geometry = new BABYLON.Geometry(BABYLON.Geometry.RandomId(), this._scene, undefined, false, this)
        geometry._boundingInfo = new BABYLON.BoundingInfo(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(10, 10, 10))
        geometry.useBoundingInfoFromGeometry = true

        this.doNotSyncBoundingInfo = true
        const positions = new Float32Array(v)
        const indices = new Uint16Array(ind)
        const colors = new Float32Array(c)

        const normals:any = []

        const vertexData = new BABYLON.VertexData()
        BABYLON.VertexData.ComputeNormals(positions, indices, normals)

        vertexData.positions = positions
        vertexData.indices = indices
        vertexData.normals = normals
        vertexData.colors = colors
        vertexData.uvs = uvs
        vertexData.applyToMesh(this)

        let mat = new BABYLON.StandardMaterial("")
        mat.diffuseTexture = new BABYLON.Texture(mapTown, this._scene)
        mat.alpha = .3
        this.material = mat
    }
    async destroy () {}
    update () {}
}





// import * as BABYLON from "@babylonjs/core/Legacy/legacy";
//
// export class BuildMesh {
//     private _mesh: BABYLON.Mesh
//     readonly _scene: BABYLON.Scene
//
//     constructor(scene: BABYLON.Scene) {
//         this._scene = scene
//     }
//
//     async create (params: any) {
//         this._mesh = new BABYLON.Mesh("custom", this._scene)
//         const geometry = new BABYLON.Geometry(BABYLON.Geometry.RandomId(), this._scene, undefined, false, this._mesh)
//         geometry._boundingInfo = new BABYLON.BoundingInfo(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(10, 10, 10))
//         geometry.useBoundingInfoFromGeometry = true
//
//         this._mesh.doNotSyncBoundingInfo = true
//         const positions = new Float32Array([0,0,0, 0,1,0, 1,0,0,  1,0,0 , 1,1,0, 0,1,0   ])
//         const indices = new Uint16Array([2,1,0 , 3, 4, 5])
//         const colors = new Float32Array([1,0,0,1,   0,0,0,1,   1,0,0,1,   1,0,0,1,   1,0,0,1,  0,0,0,1 ])
//
//         const normals:any = []
//
//         const vertexData = new BABYLON.VertexData()
//         BABYLON.VertexData.ComputeNormals(positions, indices, normals)
//
//         vertexData.positions = positions
//         vertexData.indices = indices
//         vertexData.normals = normals
//         vertexData.colors = colors
//         vertexData.applyToMesh(this._mesh)
//     }
//     async destroy () {}
//     update () {}
// }
//
//
//
