import * as THREE from "three"
import { gsap } from "gsap"

export function initScene() {
    const scene = new THREE.Scene()
    // 获取元素
    const scene_dom = document.querySelector("#scene")
    const sceneW = scene_dom.clientWidth
    const sceneH = scene_dom.clientHeight
    //相机
    const camera = new THREE.PerspectiveCamera(
        75,//角度
        sceneW / sceneH,
        0.1,//最小距离
        2000//最大距离
    )
    //渲染
    const renderer = new THREE.WebGLRenderer({
        //设置抗锯齿
        antialias: true,
        //对数缓冲，解决闪烁问题
        logarithmicDepthBuffer: true
    })
    //使用函数部分
    init()
    render()
    const cube = addCube()
    addAxes()

    //动画
    let tl = gsap.timeline({ repeat: 2, repeatDelay: 1 });
    tl.to(cube.position, { x: 100, duration: 1, ease: "elastic.inOut(1, 0.3)" });
    tl.to(cube.position, { y: 50, duration: 1 });

    //初始化
    function init() {
        // 设置相机位置
        camera.position.set(-50, 50, 130)
        // 更新摄像头宽高比例,这里设置的和视角比例一样
        camera.aspect = sceneW / sceneH
        //更新摄像头投影矩阵(和上一句绑定)
        camera.updateProjectionMatrix();
        //添加摄像机
        scene.add(camera)
        //设置输出环境的编码
        renderer.outputEncoding = THREE.sRGBEncoding;
        //设置渲染器宽高
        renderer.setSize(sceneW, sceneH)
        //监听屏幕大小，修改宽高
        window.addEventListener("resize", () => {
            let sceneW = scene_dom.clientWidth
            let sceneH = scene_dom.clientHeight
            camera.aspect = sceneW / sceneH
            camera.updateProjectionMatrix()
            renderer.setSize(sceneW, sceneH)
        })
        //
        scene_dom.appendChild(renderer.domElement)
    }
    //添加立方体
    function addCube() {
        const cubeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff
        })
        const materialMesh = new THREE.Mesh(
            new THREE.BoxGeometry(10, 10, 10),
            cubeMaterial
        )
        // console.log(materialMesh)
        scene.add(materialMesh)
        return materialMesh
    }
    //渲染
    function render() {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    //添加坐标系
    function addAxes() {
        const axes = new THREE.AxesHelper(30)
        scene.add(axes)
    }

}
