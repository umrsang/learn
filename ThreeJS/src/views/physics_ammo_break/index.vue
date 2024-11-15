<template>
    <div class="container">
        <div id="info">
            Physics threejs demo with convex objects breaking in real time<br />Press mouse to throw balls
            and
            move the camera.</div>
        <div id="container"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import * as THREE from "three"; // 导入 Three.js

import AmmoLib from 'ammojs-typed'; // 导入 Three.js
import Stats from "three/addons/libs/stats.module.js"; // 导入统计模块

import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // 导入轨道控制器
import { ConvexObjectBreaker } from "three/addons/misc/ConvexObjectBreaker.js"; // 导入凸面物体破碎器
import { ConvexGeometry } from "three/addons/geometries/ConvexGeometry.js"; // 导入凸面几何体

import gridtexture from "../../examples/textures/grid.png"; // 导入凸面几何体
// - 全局变量 -

// 图形变量
let Ammo: typeof AmmoLib;
let stats; // 定义容器和统计信息
let camera: THREE.Camera, controls: OrbitControls, scene: THREE.Scene, renderer: THREE.WebGLRenderer; // 定义相机、控制器、场景和渲染器
let textureLoader: THREE.TextureLoader; // 定义纹理加载器
const clock = new THREE.Clock(); // 定义时钟

const mouseCoords = new THREE.Vector2(); // 定义鼠标坐标
const raycaster = new THREE.Raycaster(); // 定义射线投射器
const ballMaterial = new THREE.MeshPhongMaterial({ color: 0x202020 }); // 定义球体材质

// 物理变量
const gravityConstant = 7.8; // 定义重力常数
let collisionConfiguration; // 定义碰撞配置
let dispatcher; // 定义调度器
let broadphase; // 定义广义相位
let solver; // 定义求解器
let physicsWorld: AmmoLib.btDiscreteDynamicsWorld; // 定义物理世界
const margin = 0.05; // 定义边距

const convexBreaker = new ConvexObjectBreaker(); // 定义凸面物体破碎器

// 刚体包括所有可移动的物体
const rigidBodies = []; // 定义刚体数组

const pos = new THREE.Vector3(); // 定义位置向量
const quat = new THREE.Quaternion(); // 定义四元数
let transformAux1; // 定义辅助变换
let tempBtVec3_1; // 定义临时向量

const objectsToRemove = []; // 定义待移除对象数组

for (let i = 0; i < 500; i++) {
    // 初始化待移除对象数组

    objectsToRemove[i] = null; // 将每个元素设为 null
}

let numObjectsToRemove = 0; // 定义待移除对象数量

const impactPoint = new THREE.Vector3(); // 定义冲击点
const impactNormal = new THREE.Vector3(); // 定义冲击法线


function initGraphics() { // 初始化图形
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container')?.append(renderer.domElement);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333);
    // scene.fog = new THREE.Fog(0xffffe0, 1, 1000); // 添加鹅黄色的雾

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 2000)
    camera.position.set(- 14, 40, 30); // 设置相机位置
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera)

    textureLoader = new THREE.TextureLoader()

    // 添加控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 2, 0); // 指定相机围绕哪个点进行旋转和缩放。
    controls.update(); // 更新控制器

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff); // 创建环境光，颜色为白色，亮度更高
    scene.add(ambientLight); // 将环境光添加到场景中

    // 添加更多光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
}

function initPhysics() { // 初始化物理函数
    // 物理配置 
    collisionConfiguration = new Ammo.btDefaultCollisionConfiguration(); // 创建默认碰撞配置
    dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration); // 创建碰撞调度器
    broadphase = new Ammo.btDbvtBroadphase(); // 创建广义相位
    solver = new Ammo.btSequentialImpulseConstraintSolver(); // 创建顺序冲量约束求解器
    physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration); // 创建离散动力学世界
    physicsWorld.setGravity(new Ammo.btVector3(0, - gravityConstant, 0)); // 设置重力

    transformAux1 = new Ammo.btTransform(); // 创建变换辅助对象
    tempBtVec3_1 = new Ammo.btVector3(0, 0, 0); // 创建临时向量
}

function createObjects() {
    // 地面
    pos.set(0, 0, 0); // 设置地面位置
    quat.set(0, 0, 0, 1); // 设置地面四元数
    const ground = createParalellepipedWithPhysics<THREE.MeshPhongMaterial>(40, 1, 40, 0, pos, quat, new THREE.MeshPhongMaterial({ color: 0xffffff }))
    ground.receiveShadow = true

    textureLoader.load(gridtexture, (texture: THREE.Texture) => {
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(60, 60); // 设置纹理重复次数
        ground.material.map = texture
        ground.material.needsUpdate = true
    })

    // 塔1
    const towerMass = 1000; // 定义塔质量
    const towerHalfExtents = new THREE.Vector3(2, 5, 2); // 定义塔半尺寸
    pos.set(- 8, 5, 0); // 设置塔1位置
    quat.set(0, 0, 0, 1); // 设置塔1四元数
    createObject(towerMass, towerHalfExtents, pos, quat, createMaterial(0xB03014)); // 创建塔1

    // 塔2
    pos.set(8, 5, 0); // 设置塔2位置
    quat.set(0, 0, 0, 1); // 设置塔2四元数
    createObject(towerMass, towerHalfExtents, pos, quat, createMaterial(0xB03214)); // 创建塔2

    // 桥
    const bridgeMass = 100; // 定义桥质量
    const bridgeHalfExtents = new THREE.Vector3(7, 0.2, 1.5); // 定义桥半尺寸
    pos.set(0, 10.2, 0); // 设置桥位置
    quat.set(0, 0, 0, 1); // 设置桥四元数
    createObject(bridgeMass, bridgeHalfExtents, pos, quat, createMaterial(0xB3B865)); // 创建桥

    // 石头
    const stoneMass = 120; // 定义石头质量
    const stoneHalfExtents = new THREE.Vector3(1, 2, 0.15); // 定义石头半尺寸
    const numStones = 12; // 定义石头数量
    quat.set(0, 0, 0, 1); // 设置石头四元数
    for (let i = 0; i < numStones; i++) { // 循环创建石头

        pos.set(0, 2, 15 * (0.5 - i / (numStones + 1))); // 设置石头位置

        createObject(stoneMass, stoneHalfExtents, pos, quat, createMaterial(0xB0B0B0)); // 创建石头

    }

    // 山
    const mountainMass = 860; // 定义山质量
    const mountainHalfExtents = new THREE.Vector3(4, 5, 4); // 定义山半尺寸
    pos.set(5, mountainHalfExtents.y * 0.5, - 7); // 设置山位置
    quat.set(0, 0, 0, 1); // 设置山四元数
    const mountainPoints = []; // 定义山顶点数组
    mountainPoints.push(new THREE.Vector3(mountainHalfExtents.x, - mountainHalfExtents.y, mountainHalfExtents.z)); // 添加山顶点
    mountainPoints.push(new THREE.Vector3(- mountainHalfExtents.x, - mountainHalfExtents.y, mountainHalfExtents.z)); // 添加山顶点
    mountainPoints.push(new THREE.Vector3(mountainHalfExtents.x, - mountainHalfExtents.y, - mountainHalfExtents.z)); // 添加山顶点
    mountainPoints.push(new THREE.Vector3(- mountainHalfExtents.x, - mountainHalfExtents.y, - mountainHalfExtents.z)); // 添加山顶点
    mountainPoints.push(new THREE.Vector3(0, mountainHalfExtents.y, 0)); // 添加山顶点
    const mountain = new THREE.Mesh(new ConvexGeometry(mountainPoints), createMaterial(0xB03814)); // 创建山
    mountain.position.copy(pos); // 复制山位置
    mountain.quaternion.copy(quat); // 复制山四元数
    convexBreaker.prepareBreakableObject(mountain, mountainMass, new THREE.Vector3(), new THREE.Vector3(), true); // 准备可破碎山
    createDebrisFromBreakableObject(mountain); // 从可破碎山创建碎片
}


function initInput() { // 初始化输入函数

    window.addEventListener('pointerdown', function (event) { // 添加鼠标按下事件监听器

        mouseCoords.set(
            (event.clientX / window.innerWidth) * 2 - 1, // 设置鼠标X坐标
            - (event.clientY / window.innerHeight) * 2 + 1 // 设置鼠标Y坐标
        );

        raycaster.setFromCamera(mouseCoords, camera); // 从相机设置射线投射器

        // 创建一个球并投掷它
        const ballMass = 50; // 定义球质量
        const ballRadius = 0.4; // 定义球半径

        const ball = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 14, 10), ballMaterial); // 创建球体网格
        ball.castShadow = true; // 启用投射阴影
        ball.receiveShadow = true; // 启用接收阴影
        const ballShape = new Ammo.btSphereShape(ballRadius); // 创建球体形状
        ballShape.setMargin(margin); // 设置形状边距
        pos.copy(raycaster.ray.direction); // 复制射线方向
        pos.add(raycaster.ray.origin); // 添加射线原点
        quat.set(0, 0, 0, 1); // 设置四元数
        const ballBody = createRigidBody(ball, ballShape, ballMass, pos, quat); // 创建球体刚体

        pos.copy(raycaster.ray.direction); // 复制射线方向
        pos.multiplyScalar(24); // 缩放方向向量
        ballBody.setLinearVelocity(new Ammo.btVector3(pos.x, pos.y, pos.z)); // 设置线速度

    });

}

/**
 * 创建带物理属性的平行六面体函数
 * @param {number} sx - 平行六面体的宽度
 * @param {number} sy - 平行六面体的高度
 * @param {number} sz - 平行六面体的深度
 * @param {number} mass - 平行六面体的质量
 * @param {THREE.Vector3} pos - 平行六面体的位置
 * @param {THREE.Quaternion} quat - 平行六面体的旋转四元数
 * @param {T} material - 平行六面体的材质
 * @template T
 */
function createParalellepipedWithPhysics<T extends THREE.Material>(
    sx: number,
    sy: number,
    sz: number,
    mass: number,
    pos: THREE.Vector3,
    quat: THREE.Quaternion,
    material: T
): THREE.Mesh<THREE.BufferGeometry, T> {
    const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material); // 创建立方体网格
    const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5)); // 创建立方体形状
    shape.setMargin(margin); // 设置形状边距

    createRigidBody(object, shape, mass, pos, quat); // 创建刚体

    return object; // 返回对象
}

function createRigidBody(
    object: THREE.Mesh,
    physicsShape: AmmoLib.btBoxShape,
    mass: number,
    pos: THREE.Vector3,
    quat: THREE.Quaternion,
    vel?: THREE.Vector3,
    angVel?: THREE.Vector3
): AmmoLib.btRigidBody { // 创建刚体函数

    if (pos) { // 如果有位置
        object.position.copy(pos); // 复制位置
    } else { // 否则
        pos = object.position; // 使用对象位置
    }

    if (quat) { // 如果有四元数
        object.quaternion.copy(quat); // 复制四元数
    } else { // 否则
        quat = object.quaternion; // 使用对象四元数
    }

    const transform = new Ammo.btTransform(); // 创建变换
    transform.setIdentity(); // 设置变换为单位矩阵
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z)); // 设置变换原点
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w)); // 设置变换旋转
    const motionState = new Ammo.btDefaultMotionState(transform); // 创建默认运动状态

    const localInertia = new Ammo.btVector3(0, 0, 0); // 创建局部惯性
    physicsShape.calculateLocalInertia(mass, localInertia); // 计算局部惯性

    const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, physicsShape, localInertia); // 创建刚体构造信息
    const body = new Ammo.btRigidBody(rbInfo); // 创建刚体

    body.setFriction(0.5); // 设置摩擦力

    if (vel) { // 如果有速度
        body.setLinearVelocity(new Ammo.btVector3(vel.x, vel.y, vel.z)); // 设置线速度
    }

    if (angVel) { // 如果有角速度
        body.setAngularVelocity(new Ammo.btVector3(angVel.x, angVel.y, angVel.z)); // 设置角速度
    }

    object.userData.physicsBody = body; // 设置对象的物理刚体
    object.userData.collided = false; // 设置对象未碰撞

    scene.add(object); // 将对象添加到场景中
    if (mass > 0) { // 如果质量大于0
        rigidBodies.push(object); // 将对象添加到刚体数组中
        // 禁用去激活
        body.setActivationState(4); // 设置激活状态
    }

    physicsWorld.addRigidBody(body); // 将刚体添加到物理世界中

    return body; // 返回刚体
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() { // 渲染函数

    const deltaTime = clock.getDelta(); // 获取时间增量

    updatePhysics(deltaTime); // 更新物理世界

    renderer.render(scene, camera); // 渲染场景

}

function updatePhysics(deltaTime) { // 更新物理函数

    // 步进世界
    physicsWorld.stepSimulation(deltaTime, 20); // 步进物理世界

    // 更新刚体
    for (let i = 0, il = rigidBodies.length; i < il; i++) { // 循环更新刚体

        const objThree = rigidBodies[i]; // 获取 three 对象
        const objPhys = objThree.userData.physicsBody; // 获取物理刚体
        const ms = objPhys.getMotionState(); // 获取运动状态

        if (ms) { // 如果有运动状态

            ms.getWorldTransform(transformAux1); // 获取世界变换
            const p = transformAux1.getOrigin(); // 获取变换原点
            const q = transformAux1.getRotation(); // 获取变换旋转
            objThree.position.set(p.x(), p.y(), p.z()); // 设置对象位置
            objThree.quaternion.set(q.x(), q.y(), q.z(), q.w()); // 设置对象四元数

            objThree.userData.collided = false; // 设置对象未碰撞

        }

    }

    for (let i = 0, il = dispatcher.getNumManifolds(); i < il; i++) { // 循环处理碰撞

        const contactManifold = dispatcher.getManifoldByIndexInternal(i); // 获取接触流形
        const rb0 = Ammo.castObject(contactManifold.getBody0(), Ammo.btRigidBody); // 获取刚体0
        const rb1 = Ammo.castObject(contactManifold.getBody1(), Ammo.btRigidBody); // 获取刚体1

        const threeObject0 = Ammo.castObject(rb0.getUserPointer(), Ammo.btVector3).threeObject; // 获取 three 对象0
        const threeObject1 = Ammo.castObject(rb1.getUserPointer(), Ammo.btVector3).threeObject; // 获取 three 对象1

        if (!threeObject0 && !threeObject1) { // 如果没有 three 对象

            continue; // 跳过

        }

        const userData0 = threeObject0 ? threeObject0.userData : null; // 获取用户数据0
        const userData1 = threeObject1 ? threeObject1.userData : null; // 获取用户数据1

        const breakable0 = userData0 ? userData0.breakable : false; // 获取可破碎属性0
        const breakable1 = userData1 ? userData1.breakable : false; // 获取可破碎属性1

        const collided0 = userData0 ? userData0.collided : false; // 获取碰撞状态0
        const collided1 = userData1 ? userData1.collided : false; // 获取碰撞状态1

        if ((!breakable0 && !breakable1) || (collided0 && collided1)) { // 如果不可破碎或已碰撞

            continue; // 跳过

        }

        let contact = false; // 定义接触标志
        let maxImpulse = 0; // 定义最大冲量
        for (let j = 0, jl = contactManifold.getNumContacts(); j < jl; j++) { // 循环处理接触点

            const contactPoint = contactManifold.getContactPoint(j); // 获取接触点

            if (contactPoint.getDistance() < 0) { // 如果接触点距离小于0

                contact = true; // 设置接触标志
                const impulse = contactPoint.getAppliedImpulse(); // 获取应用冲量

                if (impulse > maxImpulse) { // 如果冲量大于最大冲量

                    maxImpulse = impulse; // 更新最大冲量
                    const pos = contactPoint.get_m_positionWorldOnB(); // 获取接触点位置
                    const normal = contactPoint.get_m_normalWorldOnB(); // 获取���触点法线
                    impactPoint.set(pos.x(), pos.y(), pos.z()); // 设置冲击点
                    impactNormal.set(normal.x(), normal.y(), normal.z()); // 设置冲击法线

                }

                break; // 退出循环

            }

        }

        // 如果没有接触点，终止
        if (!contact) continue; // 如果没有接触，跳过

        // 分裂

        const fractureImpulse = 250; // 定义破裂冲量

        if (breakable0 && !collided0 && maxImpulse > fractureImpulse) { // 如果可破碎且未碰撞且冲量大于破裂冲量

            const debris = convexBreaker.subdivideByImpact(threeObject0, impactPoint, impactNormal, 1, 2, 1.5); // 分裂物体0

            const numObjects = debris.length; // 获取碎片数量
            for (let j = 0; j < numObjects; j++) { // 循环处理碎片

                const vel = rb0.getLinearVelocity(); // 获取线速度
                const angVel = rb0.getAngularVelocity(); // 获取角速度
                const fragment = debris[j]; // 获取碎片
                fragment.userData.velocity.set(vel.x(), vel.y(), vel.z()); // 设置碎片速度
                fragment.userData.angularVelocity.set(angVel.x(), angVel.y(), angVel.z()); // 设置碎片角速度

                createDebrisFromBreakableObject(fragment); // 从碎片创建碎片

            }

            objectsToRemove[numObjectsToRemove++] = threeObject0; // 将物体0添加到待移除数组中
            userData0.collided = true; // 设置物体0已碰撞

        }

        if (breakable1 && !collided1 && maxImpulse > fractureImpulse) { // 如果可破碎且未碰撞且冲量大于破裂冲量

            const debris = convexBreaker.subdivideByImpact(threeObject1, impactPoint, impactNormal, 1, 2, 1.5); // 分裂物体1

            const numObjects = debris.length; // 获取碎片数量
            for (let j = 0; j < numObjects; j++) { // 循环处理碎片

                const vel = rb1.getLinearVelocity(); // 获取线速度
                const angVel = rb1.getAngularVelocity(); // 获取角速度
                const fragment = debris[j]; // 获取碎片
                fragment.userData.velocity.set(vel.x(), vel.y(), vel.z()); // 设置碎片速度
                fragment.userData.angularVelocity.set(angVel.x(), angVel.y(), angVel.z()); // 设置碎片角速度

                createDebrisFromBreakableObject(fragment); // 从碎片创建碎片

            }

            objectsToRemove[numObjectsToRemove++] = threeObject1; // 将物体1添加到待移除数组中
            userData1.collided = true; // 设置物体1已碰撞

        }

    }

    for (let i = 0; i < numObjectsToRemove; i++) { // 循环移除待移除对象

        removeDebris(objectsToRemove[i]); // 移除碎片

    }

    numObjectsToRemove = 0; // 重置待移除对象数量

}

function createObject(
    mass: number,
    halfExtents: THREE.Vector3,
    pos: THREE.Vector3,
    quat: THREE.Quaternion,
    material: THREE.Material
) {// 创建物体函数
    const object = new THREE.Mesh(new THREE.BoxGeometry(halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2), material); // 创建立方体网格
    object.position.copy(pos); // 复制位置
    object.quaternion.copy(quat); // 复制四元数
    convexBreaker.prepareBreakableObject(object, mass, new THREE.Vector3(), new THREE.Vector3(), true); // 准备可破碎物体
    createDebrisFromBreakableObject(object); // 从可破碎物体创建碎片

}

function createDebrisFromBreakableObject(object) { // 从可破碎物体创建碎片函数

    object.castShadow = true; // 启用投射阴影
    object.receiveShadow = true; // 启用接收阴影

    const shape = createConvexHullPhysicsShape(object.geometry.attributes.position.array); // 创建凸包物理形状
    shape.setMargin(margin); // 设置形状边距

    const body = createRigidBody(object, shape, object.userData.mass, null, null, object.userData.velocity, object.userData.angularVelocity); // 创建刚体

    // 将指针设置回 three 对象，仅在碎片对象中
    const btVecUserData = new Ammo.btVector3(0, 0, 0); // 创建用户数据向量
    btVecUserData.threeObject = object; // 设置 three 对象
    body.setUserPointer(btVecUserData); // 设置用户指针

}

function createMaterial(color: number): THREE.MeshPhongMaterial {
    return new THREE.MeshPhongMaterial({ color });
}

function createConvexHullPhysicsShape(coords: Float32Array): AmmoLib.btConvexHullShape {

    const shape = new Ammo.btConvexHullShape(); // 创建凸包形状

    for (let i = 0, il = coords.length; i < il; i += 3) { // 循环添加顶点
        tempBtVec3_1.setValue(coords[i], coords[i + 1], coords[i + 2]); // 设置临时向量值
        const lastOne = (i >= (il - 3)); // 判断是否为最后一个顶点
        shape.addPoint(tempBtVec3_1, lastOne); // 添加顶点到形状
    }

    return shape; // 返回形状
}

function removeDebris(object) { // 移除碎片函数

    scene.remove(object); // 从场景中移除对象

    physicsWorld.removeRigidBody(object.userData.physicsBody); // 从物理世界中移除刚体

}

onMounted(async () => {
    Ammo = await AmmoLib()
    initGraphics(); // 初始化图形
    initPhysics(); // 初始化图形
    createObjects(); // 创建物体
    initInput()
    animate();
});

</script>

<style scoped>
/* 你的样式内容 */
</style>
