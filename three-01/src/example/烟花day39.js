import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import * as dat from 'dat.gui';
// import { gsap } from "gsap";
// const gui = new dat.GUI();
import vertexShader from "@/shader/basic point/basicVertexShader.glsl?raw"
import fragmentShader from "@/shader/basic point/basicFragmentShader.glsl?raw"
import pointVertexShader from "@/shader/basic point/basicPointVertexShader.glsl?raw"
import pointFragmentShader from "@/shader/basic point/basicPointFragmentShader.glsl?raw"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"
// 着色器设置银河渐变颜色
// 移除烟花
// 移除数组第一项

// 使用着色器，一定要传入position



const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    50000
);
camera.position.set(15, 15, 15)
// camera.lookAt(1, 1, 1)
// 场景
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    // logarithmicDepthBuffer: true,
    antialias: true,
    alpha: true
})
renderer.shadowMap.enabled = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.LinearToneMapping
renderer.toneMappingExposure = 0.1

let loader = new GLTFLoader();


const clock = new THREE.Clock()
let time = clock.getElapsedTime()
// 加载模型
loader.load("src/model/白色泳池别墅.glb", (gltf) => {
    const mesh = gltf.scene
    mesh.scale.set(0.001, 0.001, 0.001)
    scene.add(mesh)
})

// 加载天空盒
const rgbLoader = new RGBELoader()
rgbLoader.loadAsync("src/blender_model/003.hdr").then((texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = texture
    scene.background = texture
})
//初始化函数
export function init() {
    document.querySelector("#scene").appendChild(
        renderer.domElement
    )
    const controller = new OrbitControls(camera, renderer.domElement)

    const axes = new THREE.AxesHelper(10)
    scene.add(axes)
    function anime() {
        time = clock.getElapsedTime()
        fireWorks.forEach(i => {
            i.update(time)
        })
        requestAnimationFrame(anime)
        controller.update()
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }
    anime()
}


class Firework {
    constructor(color, to, scene, from = { x: 0.0, y: 2.0, z: 0.0 }) {
        this.fireWorkPoints = null
        this.sceneObj = scene;
        this.color = new THREE.Color(color);
        this.to = to;
        this.removeMark = false
        this.bufferGeometry = new THREE.BufferGeometry()
        this.startTime = time
        const startPosition = new Float32Array(3)
        startPosition[0] = from.x
        startPosition[1] = from.y
        startPosition[2] = from.z

        const direction = new Float32Array(3)
        direction[0] = to.x - from.x
        direction[1] = to.y - from.y
        direction[2] = to.z - from.z

        this.bufferGeometry.setAttribute('position', new THREE.BufferAttribute(startPosition, 3))
        this.bufferGeometry.setAttribute('direction', new THREE.BufferAttribute(direction, 3))

        this.fireWorkMaterial = new THREE.ShaderMaterial({
            uniforms: {
                utime: {
                    value: 0
                },
                uColor: {
                    value: this.color
                }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        })
        this.fireWork = new THREE.Points(
            this.bufferGeometry,
            this.fireWorkMaterial
        )

    }
    getItem() {
        return this.fireWork
    }
    addScene() {
        this.sceneObj.add(this.fireWork)
    }
    remove() {
        this.sceneObj.remove(this.fireWorkPoints)
        // 从队列中移除对象
        fireWorks.splice(0, 1)
    }
    update(time) {
        // 计算烟花创建之后的时间
        let spentTime = time - this.startTime
        // 小于一秒，烟花在飞行
        if (spentTime < 1) {
            this.fireWorkMaterial.uniforms.utime.value = spentTime
            return
        }
        // 大于1秒，删除烟花，创建四散的火花
        if (!this.removeMark) {
            const hintVoice = new Audio("src/audio/explode.mp3")
            hintVoice.currentTime = 0.5
            hintVoice.play()
            this.sceneObj.remove(this.fireWork)
            this.createPoints()
            this.removeMark = true
        }
        // 小于5秒，花火四射
        if (spentTime < 2.5) {
            this.fireWorkPoints.material.uniforms.utime.value = spentTime / 5
        }

        if (spentTime > 2.5) {
            this.remove()
        }
    }
    createPoints() {
        const firePointCount = 40 + Math.floor(Math.random() * 50)

        const bufferGeometry = new THREE.BufferGeometry()
        // 两个参数，用于计算每一个点的最终位置
        const thedaArr = new Float32Array(firePointCount)
        const fiArr = new Float32Array(firePointCount)
        const fromPosition = new Float32Array(firePointCount * 3)
        // 给参数赋值
        for (let i = 0; i < firePointCount; i++) {
            thedaArr[i] = 2 * Math.PI * Math.random()
            fiArr[i] = Math.PI * Math.random()
            let current = i * 3
            fromPosition[current] = this.to.x
            fromPosition[current + 1] = this.to.y
            fromPosition[current + 2] = this.to.z
        }

        // 传入参数
        bufferGeometry.setAttribute('position', new THREE.BufferAttribute(fromPosition, 3))
        bufferGeometry.setAttribute('pointTheda', new THREE.BufferAttribute(thedaArr, 1))
        bufferGeometry.setAttribute('pointFi', new THREE.BufferAttribute(fiArr, 1))


        // 材质
        const firePointsMaterial = new THREE.ShaderMaterial({
            uniforms: {
                utime: {
                    value: 0
                },
                pointR: {
                    value: Math.random() + 3
                },
                uColor: {
                    value: this.color
                }
            },
            vertexShader: pointVertexShader,
            fragmentShader: pointFragmentShader,
            // color: 0xffff00,
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        })
        this.fireWorkPoints = new THREE.Points(
            bufferGeometry,
            firePointsMaterial
        )
        this.sceneObj.add(this.fireWorkPoints)
    }
}

let fireWorks = []
// 添加点击事件
window.addEventListener("click", () => {
    const firework = new Firework(
        `hsl(${Math.floor(Math.random() * 360)},100%,80%)`,
        { x: Math.random() * 5 - 2.5, y: 7 + Math.random() * 5, z: Math.random() * 5 - 2.5 },
        scene
    )
    firework.addScene()
    fireWorks.push(firework)
})

// const light = new THREE.AmbientLight(0xffffff)
// scene.add(light)

// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshStandardMaterial({
//         color: 0xffffff
//     })
// )
// scene.add(cube)

