import * as BABYLON from "@babylonjs/core/Legacy/legacy";

export class BuildMesh extends BABYLON.Mesh {
    //private _mesh: BABYLON.Mesh
    readonly _scene: BABYLON.Scene

    constructor(name: string, scene: BABYLON.Scene) {
        super(name, scene)
        this._scene = scene
    }

    async init (params: any) {
        //this._mesh = new BABYLON.Mesh("custom", this._scene)
        const geometry = new BABYLON.Geometry(BABYLON.Geometry.RandomId(), this._scene, undefined, false, this)
        geometry._boundingInfo = new BABYLON.BoundingInfo(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(10, 10, 10))
        geometry.useBoundingInfoFromGeometry = true

        this.doNotSyncBoundingInfo = true
        const positions = new Float32Array([0,0,0, 0,1,0, 1,0,0,  1,0,0 , 1,1,0, 0,1,0   ])
        const indices = new Uint16Array([2,1,0 , 3, 4, 5])
        const colors = new Float32Array([1,0,0,1,   0,0,0,1,   1,0,0,1,   1,0,0,1,   1,0,0,1,  0,0,0,1 ])

        const normals:any = []

        const vertexData = new BABYLON.VertexData()
        BABYLON.VertexData.ComputeNormals(positions, indices, normals)

        vertexData.positions = positions
        vertexData.indices = indices
        vertexData.normals = normals
        vertexData.colors = colors
        vertexData.applyToMesh(this)
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
