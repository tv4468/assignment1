import * as THREE from "three";
import * as TWEEN from '@tweenjs/tween.js';
import { Group } from '@tweenjs/tween.js';
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { TeapotGeometry } from "three/examples/jsm/Addons.js";

// Automatically resizes the window.
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// SCENE
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.005);


// HTML INTEGRATION
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.color = "#ffffff";
labelRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(labelRenderer.domElement);
const p = document.createElement("p");
p.style.whiteSpace = "pre";
p.style.right = "120%";
p.style.bottom = "100%";
p.textContent = "Green: Linear\r\n" + "Pink: De Casteljau\r\n" + "Orange: Quadratic_Out\r\n" + "Blue: Catmull-Rom\r\n" + "Yellow: Quadratic_Out (built-in)\r\n" + "Cyan: Catmull-Rom (built-in)\r\n";
const pPointLabel = new CSS2DObject(p);
pPointLabel.center.x = 0;
pPointLabel.center.y = 0;
scene.add(pPointLabel);
// const input = document.createElement("input");
// input.type = "file";
// input.name = "filename";
// const cPointLabel = new CSS2DObject(input);
// cPointLabel.position.set(0, 0, 0);
// scene.add(cPointLabel);

// RENDERER SETUP
const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
renderer.setClearColor("#000000");

// CAMERA
const camera = new THREE.PerspectiveCamera(
    75, // FoV
    window.innerWidth / window.innerHeight, // Aspect Ratio
    0.1, // Near
    1000 // Far
);
camera.position.set(0, -50, 0);
camera.rotation.x = rad(90);
camera.rotation.y = rad(0);
camera.rotation.z = rad(0);

//
// Here be the Object(s)
//

// Linear
const object2 = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        flatShading: false
    })
);
object2.castShadow = true;
object2.receiveShadow = true;
scene.add(object2);

// De Casteljau
const object3 = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshPhongMaterial({
        color: 0xff00ff,
        flatShading: false
    })
);
object3.castShadow = true;
object3.receiveShadow = true;
scene.add(object3);

// Catmull-Rom
const object4 = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshPhongMaterial({
        color: 0x0040ff,
        flatShading: false
    })
);
object4.castShadow = true;
object4.receiveShadow = true;
scene.add(object4);

// Custom Easing
const object5 = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshPhongMaterial({
        color: 0xff4000,
        flatShading: false
    })
);
object5.castShadow = true;
object5.receiveShadow = true;
scene.add(object5);

// Built-in Easing
const object6 = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshPhongMaterial({
        color: 0xffc000,
        flatShading: false
    })
);
object6.castShadow = true;
object6.receiveShadow = true;
scene.add(object6);

// Built-in Catmull-Rom
const object7 = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshPhongMaterial({
        color: 0x00c0ff,
        flatShading: false
    })
);
object7.castShadow = true;
object7.receiveShadow = true;
scene.add(object7);


// // FLOOR
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10000, 10000, 1, 1),
    new THREE.MeshPhongMaterial({
        color: 0xff8000,
        flatShading: false
    })
);
plane.receiveShadow = true;
scene.add(plane);
plane.position.z = -10;

// LIGHT(S)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.25)
scene.add(ambientLight)
const spotLight = new THREE.SpotLight(0xffffff, 5, 0, rad(-30), 1, 0);
spotLight.position.set(0, -50, 0);
spotLight.castShadow = true;
spotLight.shadow.mapSize.set(1024, 1024);
spotLight.shadow.camera.near = 0.1;
spotLight.shadow.camera.far = 1000;
scene.add(spotLight);

const spotLight2 = new THREE.SpotLight(0xffffff, 5, 0, rad(5), 1, 0);
spotLight2.position.set(0, 0, 100);
spotLight2.castShadow = true;
spotLight2.shadow.mapSize.set(1024, 1024);
spotLight2.shadow.camera.near = 0.1;
spotLight2.shadow.camera.far = 1000;
scene.add(spotLight2);
spotLight2.target = object2;
scene.add(spotLight2.target);

const spotLight3 = new THREE.SpotLight(0xffffff, 5, 0, rad(5), 1, 0);
spotLight3.position.set(0, 0, 100);
spotLight3.castShadow = true;
spotLight3.shadow.mapSize.set(1024, 1024);
spotLight3.shadow.camera.near = 0.1;
spotLight3.shadow.camera.far = 1000;
scene.add(spotLight3);
spotLight3.target = object3;
scene.add(spotLight3.target);

const spotLight4 = new THREE.SpotLight(0xffffff, 5, 0, rad(5), 1, 0);
spotLight4.position.set(0, 0, 100);
spotLight4.castShadow = true;
spotLight4.shadow.mapSize.set(1024, 1024);
spotLight4.shadow.camera.near = 0.1;
spotLight4.shadow.camera.far = 1000;
scene.add(spotLight4);
spotLight4.target = object4;
scene.add(spotLight4.target);

const spotLight5 = new THREE.SpotLight(0xffffff, 5, 0, rad(5), 1, 0);
spotLight5.position.set(0, 0, 100);
spotLight5.castShadow = true;
spotLight5.shadow.mapSize.set(1024, 1024);
spotLight5.shadow.camera.near = 0.1;
spotLight5.shadow.camera.far = 1000;
scene.add(spotLight5);
spotLight5.target = object5;
scene.add(spotLight5.target);

const spotLight6 = new THREE.SpotLight(0xffffff, 5, 0, rad(5), 1, 0);
spotLight6.position.set(0, 0, 100);
spotLight6.castShadow = true;
spotLight6.shadow.mapSize.set(1024, 1024);
spotLight6.shadow.camera.near = 0.1;
spotLight6.shadow.camera.far = 1000;
scene.add(spotLight6);
spotLight6.target = object6;
scene.add(spotLight6.target);

const spotLight7 = new THREE.SpotLight(0xffffff, 5, 0, rad(5), 1, 0);
spotLight7.position.set(0, 0, 100);
spotLight7.castShadow = true;
spotLight7.shadow.mapSize.set(1024, 1024);
spotLight7.shadow.camera.near = 0.1;
spotLight7.shadow.camera.far = 1000;
scene.add(spotLight7);
spotLight7.target = object7;
scene.add(spotLight7.target);

// AUDIO
const listener = new THREE.AudioListener();
camera.add(listener);
const audioLoader = new THREE.AudioLoader();
const sound = new THREE.Audio(listener);
audioLoader.load("../sounds/ding.wav", function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(false);
    sound.setVolume(0.5);
    window.addEventListener("click", function () {
        sound.play();
    });
});

// ANIMATION(S)
object2.position.set(0.0 - 12.5 + 15.0, 0.0, 0.0);
object2.quaternion.copy(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1.0, 1.0, -1.0).normalize(), rad(0)));
var groupObject2 = new Group();
const keyframesObj2 = [
    [1, 4.0 - 12.5 + 15.0, 0.0, 0.0, 1.0, 1.0, -1.0, 30.0], // time, x, y, z, xa, ya, za, angle
    [1, 8.0 - 12.5 + 15.0, 0.0, 0.0, 1.0, 1.0, -1.0, 90.0],
    [1, 12.0 - 12.5 + 15.0, 12.0, 12.0, 1.0, 1.0, -1.0, 180.0],
    [1, 12.0 - 12.5 + 15.0, 18.0, 18.0, 1.0, 1.0, -1.0, 270.0],
    [1, 18.0 - 12.5 + 15.0, 18.0, 18.0, 0.0, 1.0, 0.0, 90.0],
    [1, 18.0 - 12.5 + 15.0, 18.0, 18.0, 0.0, 0.0, 1.0, 90.0],
    [1, 25.0 - 12.5 + 15.0, 12.0, 12.0, 1.0, 0.0, 0.0, 0.0],
    [1, 25.0 - 12.5 + 15.0, 0.0, 18.0, 1.0, 0.0, 0.0, 0.0],
    [1, 25.0 - 12.5 + 15.0, 1.0, 18.0, 1.0, 0.0, 0.0, 0.0]
];
var LinearEase = function (k) {
    return k;
};
keyframePosition(groupObject2, object2, keyframesObj2, LinearEase).start();
keyframeQuaternion(groupObject2, object2, keyframesObj2, LinearEase).start();


object3.position.set(0.0 - 12.5 + 5.0, 0.0, 0.0);
object3.quaternion.copy(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1.0, 1.0, -1.0).normalize(), rad(0)));
var groupObject3 = new Group();
const keyframesObj3 = [
    [1, 4.0 - 12.5 + 5.0, 0.0, 0.0, 1.0, 1.0, -1.0, 30.0], // time, x, y, z, xa, ya, za, angle
    [1, 8.0 - 12.5 + 5.0, 0.0, 0.0, 1.0, 1.0, -1.0, 90.0],
    [1, 12.0 - 12.5 + 5.0, 12.0, 12.0, 1.0, 1.0, -1.0, 180.0],
    [1, 12.0 - 12.5 + 5.0, 18.0, 18.0, 1.0, 1.0, -1.0, 270.0],
    [1, 18.0 - 12.5 + 5.0, 18.0, 18.0, 0.0, 1.0, 0.0, 90.0],
    [1, 18.0 - 12.5 + 5.0, 18.0, 18.0, 0.0, 0.0, 1.0, 90.0],
    [1, 25.0 - 12.5 + 5.0, 12.0, 12.0, 1.0, 0.0, 0.0, 0.0],
    [1, 25.0 - 12.5 + 5.0, 0.0, 18.0, 1.0, 0.0, 0.0, 0.0],
    [1, 25.0 - 12.5 + 5.0, 1.0, 18.0, 1.0, 0.0, 0.0, 0.0]
];
keyframePositionDe(groupObject3, object3, keyframesObj3, LinearEase).start();
keyframeQuaternionDe(groupObject3, object3, keyframesObj3, LinearEase).start();

object4.position.set(0.0 - 12.5 - 15.0, 0.0, 0.0);
object4.quaternion.copy(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1.0, 1.0, -1.0).normalize(), rad(0)));
var groupObject4 = new Group();
const keyframesObj4 = [
    [1, 4.0 - 12.5 - 15.0, 0.0 + 0.0, 0.0, 1.0, 1.0, -1.0, 30.0], // time, x, y, z, xa, ya, za, angle
    [1, 8.0 - 12.5 - 15.0, 0.0 + 0.0, 0.0, 1.0, 1.0, -1.0, 90.0],
    [1, 12.0 - 12.5 - 15.0, 12.0 + 0.0, 12.0, 1.0, 1.0, -1.0, 180.0],
    [1, 12.0 - 12.5 - 15.0, 18.0 + 0.0, 18.0, 1.0, 1.0, -1.0, 270.0],
    [1, 18.0 - 12.5 - 15.0, 18.0 + 0.0, 18.0, 0.0, 1.0, 0.0, 90.0],
    [1, 18.0 - 12.5 - 15.0, 18.0 + 0.0, 18.0, 0.0, 0.0, 1.0, 90.0],
    [1, 25.0 - 12.5 - 15.0, 12.0 + 0.0, 12.0, 1.0, 0.0, 0.0, 0.0],
    [1, 25.0 - 12.5 - 15.0, 0.0 + 0.0, 18.0, 1.0, 0.0, 0.0, 0.0],
    [1, 25.0 - 12.5 - 15.0, 1.0 + 0.0, 18.0, 1.0, 0.0, 0.0, 0.0]
];
keyframePositionCR(groupObject4, object4, keyframesObj4, LinearEase, 0).start();
keyframeQuaternion(groupObject4, object4, keyframesObj4, LinearEase).start();

object5.position.set(0.0 - 12.5 - 5.0, 0.0, 0.0 + 0.0);
object5.quaternion.copy(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1.0, 1.0, -1.0).normalize(), rad(0)));
var groupObject5 = new Group();
const keyframesObj5 = [
    [1, 4.0 - 12.5 - 5.0, 0.0, 0.0, 1.0, 1.0, -1.0, 30.0], // time, x, y, z, xa, ya, za, angle
    [1, 8.0 - 12.5 - 5.0, 0.0, 0.0, 1.0, 1.0, -1.0, 90.0],
    [1, 12.0 - 12.5 - 5.0, 12.0, 12.0, 1.0, 1.0, -1.0, 180.0],
    [1, 12.0 - 12.5 - 5.0, 18.0, 18.0, 1.0, 1.0, -1.0, 270.0],
    [1, 18.0 - 12.5 - 5.0, 18.0, 18.0, 0.0, 1.0, 0.0, 90.0],
    [1, 18.0 - 12.5 - 5.0, 18.0, 18.0, 0.0, 0.0, 1.0, 90.0],
    [1, 25.0 - 12.5 - 5.0, 12.0, 12.0, 1.0, 0.0, 0.0, 0.0],
    [1, 25.0 - 12.5 - 5.0, 0.0, 18.0, 1.0, 0.0, 0.0, 0.0],
    [1, 25.0 - 12.5 - 5.0, 1.0, 18.0, 1.0, 0.0, 0.0, 0.0]
];
keyframePosition(groupObject5, object5, keyframesObj5, TWEEN.Easing.Quadratic.Out).start();
keyframeQuaternion(groupObject5, object5, keyframesObj5, TWEEN.Easing.Quadratic.Out).start();

object6.position.set(0.0 - 12.5 - 5.0, 0.0, 0.0 + 10);
object6.quaternion.copy(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1.0, 1.0, -1.0).normalize(), rad(0)));
var groupObject6 = new Group();
const keyframesObj6 = [
    [1, 4.0 - 12.5 - 5.0, 0.0 + 10, 0.0, 1.0, 1.0, -1.0, 30.0], // time, x, y, z, xa, ya, za, angle
    [1, 8.0 - 12.5 - 5.0, 0.0 + 10, 0.0, 1.0, 1.0, -1.0, 90.0],
    [1, 12.0 - 12.5 - 5.0, 12.0 + 10, 12.0, 1.0, 1.0, -1.0, 180.0],
    [1, 12.0 - 12.5 - 5.0, 18.0 + 10, 18.0, 1.0, 1.0, -1.0, 270.0],
    [1, 18.0 - 12.5 - 5.0, 18.0 + 10, 18.0, 0.0, 1.0, 0.0, 90.0],
    [1, 18.0 - 12.5 - 5.0, 18.0 + 10, 18.0, 0.0, 0.0, 1.0, 90.0],
    [1, 25.0 - 12.5 - 5.0, 12.0 + 10, 12.0, 1.0, 0.0, 0.0, 0.0],
    [1, 25.0 - 12.5 - 5.0, 0.0 + 10, 18.0, 1.0, 0.0, 0.0, 0.0],
    [1, 25.0 - 12.5 - 5.0, 1.0 + 10, 18.0, 1.0, 0.0, 0.0, 0.0]
];
var myEasing = function (k) {
    return 1 - ((1 - k) ** 2);
    // return Math.sin(rad(90) * k);
};
keyframePosition(groupObject6, object6, keyframesObj6, myEasing).start();
keyframeQuaternion(groupObject6, object6, keyframesObj6, myEasing).start();

object7.position.set(0.0 - 12.5 - 15.0, 0.0, 0.0 + 10);
object7.quaternion.copy(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1.0, 1.0, -1.0).normalize(), rad(0)));
var groupObject7 = new Group();
const keyframesObj7 = [
    [1, 4.0 - 12.5 - 15.0, 0.0 + 10, 0.0, 1.0, 1.0, -1.0, 30.0], // time, x, y, z, xa, ya, za, angle
    [1, 8.0 - 12.5 - 15.0, 0.0 + 10, 0.0, 1.0, 1.0, -1.0, 90.0],
    [1, 12.0 - 12.5 - 15.0, 12.0 + 10, 12.0, 1.0, 1.0, -1.0, 180.0],
    [1, 12.0 - 12.5 - 15.0, 18.0 + 10, 18.0, 1.0, 1.0, -1.0, 270.0],
    [1, 18.0 - 12.5 - 15.0, 18.0 + 10, 18.0, 0.0, 1.0, 0.0, 90.0],
    [1, 18.0 - 12.5 - 15.0, 18.0 + 10, 18.0, 0.0, 0.0, 1.0, 90.0],
    [1, 25.0 - 12.5 - 15.0, 12.0 + 10, 12.0, 1.0, 0.0, 0.0, 0.0],
    [1, 25.0 - 12.5 - 15.0, 0.0 + 10, 18.0, 1.0, 0.0, 0.0, 0.0],
    [1, 25.0 - 12.5 - 15.0, 1.0 + 10, 18.0, 1.0, 0.0, 0.0, 0.0]
];
//Create a closed wavey loop
const keyframesObj7Curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3().copy(object4.position),
    new THREE.Vector3(keyframesObj7[0][1], keyframesObj7[0][3], keyframesObj7[0][2]),
    new THREE.Vector3(keyframesObj7[1][1], keyframesObj7[1][3], keyframesObj7[1][2]),
    new THREE.Vector3(keyframesObj7[2][1], keyframesObj7[2][3], keyframesObj7[2][2]),
    new THREE.Vector3(keyframesObj7[3][1], keyframesObj7[3][3], keyframesObj7[3][2]),
    new THREE.Vector3(keyframesObj7[4][1], keyframesObj7[4][3], keyframesObj7[4][2]),
    new THREE.Vector3(keyframesObj7[5][1], keyframesObj7[5][3], keyframesObj7[5][2]),
    new THREE.Vector3(keyframesObj7[6][1], keyframesObj7[6][3], keyframesObj7[6][2]),
    new THREE.Vector3(keyframesObj7[7][1], keyframesObj7[7][3], keyframesObj7[7][2]),
    new THREE.Vector3(keyframesObj7[8][1], keyframesObj7[8][3], keyframesObj7[8][2])
]);
keyframePositionCRBuiltIn(groupObject7, object7, keyframesObj7, keyframesObj7Curve, LinearEase).start();
keyframeQuaternion(groupObject7, object7, keyframesObj7, LinearEase).start();




// ACTION!
function animate(time) {
    requestAnimationFrame(function loop(time) {
        groupObject2.update(time);
        groupObject3.update(time);
        groupObject4.update(time);
        groupObject5.update(time);
        groupObject6.update(time);
        groupObject7.update(time);
        requestAnimationFrame(loop);
    })
    labelRenderer.render(scene, camera);
    renderer.render(scene, camera);
    // console.log(object4.position);
}

// Using a formatted 2-D array of keyframe parameters, this iteratively sets up the position keyframes with the built-in Catmull–Rom curve.
function keyframePositionCRBuiltIn(groupObject, object, thisKeyframes, thisCurve, easeKey) {
    var keyframesParse = new Array();
    var timeKey = 0;
    for (let i = 0; i < thisKeyframes.length; i++) {
        timeKey += thisKeyframes[i][0];
    }
    timeKey *= 1000;

    var catalyst = { t: 0 };
    var masterTween = new TWEEN.Tween(catalyst)
        .to({
            t: 1
        }, timeKey)
        .onUpdate(function () {
            if (catalyst.t == 1) {
                object.position.copy(thisCurve.getPointAt(1));
                return;
            }
            // console.log(thisCurve.getPointAt(catalyst.t));
            object.position.copy(thisCurve.getPointAt(catalyst.t));
        })
        .easing(easeKey);

    groupObject.add(masterTween);
    return masterTween;
}

// Using a formatted 2-D array of keyframe parameters, this iteratively sets up the position keyframes with a custom-made Catmull–Rom curve.
function keyframePositionCR(groupObject, object, thisKeyframes, easeKey, alph) {
    var keyframesParse = new Array();
    var timeKey = 0;
    keyframesParse.push(new THREE.Vector3().copy(object.position));
    for (let i = 0; i < thisKeyframes.length; i++) {
        keyframesParse.push(new THREE.Vector3(thisKeyframes[i][1], thisKeyframes[i][3], thisKeyframes[i][2]));
        timeKey += thisKeyframes[i][0];
    }
    timeKey *= 1000;

    var catalyst = { t: 0 };
    var masterTween = new TWEEN.Tween(catalyst)
        .to({
            t: 1
        }, timeKey)
        .onUpdate(function () {
            var prog = 1 + catalyst.t * (keyframesParse.length - 2);
            var selectedKey = Math.floor(prog);
            var midKey = prog - selectedKey;
            if (catalyst.t == 1) {
                object.position.copy(keyframesParse.at(keyframesParse.length - 1));
                return;
            }

            var p0 = keyframesParse.at(selectedKey - 1);
            var p1 = keyframesParse.at(selectedKey + 0);
            var p2 = keyframesParse.at(Math.min(selectedKey + 1, keyframesParse.length - 1));
            var p3 = keyframesParse.at(Math.min(selectedKey + 2, keyframesParse.length - 1));

            // Just in case. Having zero distance causes a divide by 0 issue down the line.
            var t01 = Math.max(Math.pow(p0.distanceTo(p1), alph), 0.0000001);
            var t12 = Math.max(Math.pow(p1.distanceTo(p2), alph), 0.0000001);
            var t23 = Math.max(Math.pow(p2.distanceTo(p3), alph), 0.0000001);

            var m1x = p2.x - p1.x + t12 * ((p1.x - p0.x) / t01 - (p2.x - p0.x) / (t01 + t12));
            var m1y = p2.y - p1.y + t12 * ((p1.y - p0.y) / t01 - (p2.y - p0.y) / (t01 + t12));
            var m1z = p2.z - p1.z + t12 * ((p1.z - p0.z) / t01 - (p2.z - p0.z) / (t01 + t12));

            var m2x = p2.x - p1.x + t12 * ((p3.x - p2.x) / t23 - (p3.x - p1.x) / (t12 + t23));
            var m2y = p2.y - p1.y + t12 * ((p3.y - p2.y) / t23 - (p3.y - p1.y) / (t12 + t23));
            var m2z = p2.z - p1.z + t12 * ((p3.z - p2.z) / t23 - (p3.z - p1.z) / (t12 + t23));

            var ax = 2 * p1.x - 2 * p2.x + m1x + m2x;
            var ay = 2 * p1.y - 2 * p2.y + m1y + m2y;
            var az = 2 * p1.z - 2 * p2.z + m1z + m2z;

            var bx = -3 * p1.x + 3 * p2.x - 2 * m1x - m2x;
            var by = -3 * p1.y + 3 * p2.y - 2 * m1y - m2y;
            var bz = -3 * p1.z + 3 * p2.z - 2 * m1z - m2z;

            var cx = m1x;
            var cy = m1y;
            var cz = m1z;

            var dx = p1.x;
            var dy = p1.y;
            var dz = p1.z;

            const px = ax * midKey * midKey * midKey + bx * midKey * midKey + cx * midKey + dx;
            const py = ay * midKey * midKey * midKey + by * midKey * midKey + cy * midKey + dy;
            const pz = az * midKey * midKey * midKey + bz * midKey * midKey + cz * midKey + dz;

            object.position.copy(new THREE.Vector3(px, py, pz));
        })
        .easing(easeKey);

    groupObject.add(masterTween);
    return masterTween;
}

// Using a formatted 2-D array of keyframe parameters, this iteratively sets up the rotation keyframes with De Casteljau's Construction.
function keyframeQuaternionDe(groupObject, object, thisKeyframes, easeKey) {
    var keyframesParse = new Array();
    var timeKey = 0;
    keyframesParse.push(new THREE.Quaternion().copy(object.quaternion));
    for (var i = 0; i < thisKeyframes.length; i++) {
        // keyframesParse.push(new THREE.Quaternion().multiplyQuaternions(keyframesParse.at(i - 1), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(thisKeyframes[i][4], thisKeyframes[i][5], thisKeyframes[i][6]).normalize(), rad(thisKeyframes[i][7]))));
        keyframesParse.push(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(thisKeyframes[i][4], thisKeyframes[i][6], thisKeyframes[i][5]).normalize(), rad(thisKeyframes[i][7])));
        timeKey += thisKeyframes[i][0];
    }
    // console.log(keyframesParse);
    timeKey *= 1000;


    var catalyst = { t: 0 };

    var masterTween = new TWEEN.Tween(catalyst)
        .to({ t: 1 }, timeKey)
        .onUpdate(function () {
            var keyframesInterStart = keyframesParse.slice();
            var keyframesInter = new Array();
            for (var i = 0; i < keyframesParse.length - 1; i++) {
                for (var j = 0; j < keyframesInterStart.length - 1; j++) {
                    keyframesInter.push(new THREE.Quaternion().slerpQuaternions(keyframesInterStart.at(j), keyframesInterStart.at(j + 1), catalyst.t));
                }
                keyframesInterStart = keyframesInter.slice();
                keyframesInter = new Array();
            }

            object.quaternion.copy(keyframesInterStart.pop());
        })
        .onComplete(function () {
            object.quaternion.copy(keyframesParse.pop());
        })
        .easing(easeKey);

    groupObject.add(masterTween);

    return masterTween;
}

// Using a formatted 2-D array of keyframe parameters, this iteratively sets up the position keyframes with De Casteljau's Construction.
function keyframePositionDe(groupObject, object, thisKeyframes, easeKey) {
    var keyframesParse = new Array();
    var timeKey = 0;
    keyframesParse.push(new THREE.Vector3().copy(object.position));
    for (var i = 0; i < thisKeyframes.length; i++) {
        keyframesParse.push(new THREE.Vector3(thisKeyframes[i][1], thisKeyframes[i][3], thisKeyframes[i][2]));
        timeKey += thisKeyframes[i][0];
    }
    // console.log(timeKey);
    timeKey *= 1000;

    var catalyst = { t: 0 };
    var masterTween = new TWEEN.Tween(catalyst)
        .to({
            t: 1
        }, timeKey)
        .onUpdate(function () {
            var keyframesInterStart = keyframesParse.slice();
            var keyframesInter = new Array();
            for (var i = 0; i < keyframesParse.length - 1; i++) {
                for (var j = 0; j < keyframesInterStart.length - 1; j++) {
                    keyframesInter.push(new THREE.Vector3().lerpVectors(keyframesInterStart.at(j), keyframesInterStart.at(j + 1), catalyst.t));
                }
                keyframesInterStart = keyframesInter.slice();
                keyframesInter = new Array();
            }

            object.position.copy(keyframesInterStart.pop());
        })
        .easing(easeKey);

    groupObject.add(masterTween);
    return masterTween;
}

// Using a formatted 2-D array of keyframe parameters, this iteratively sets up the rotation keyframes.
function keyframeQuaternion(groupObject, object, thisKeyframes, easeKey) {
    var keyframesParse = new Array();
    var timeKey = 0;
    keyframesParse.push(new THREE.Quaternion().copy(object.quaternion));
    for (var i = 0; i < thisKeyframes.length; i++) {
        keyframesParse.push(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(thisKeyframes[i][4], thisKeyframes[i][6], thisKeyframes[i][5]).normalize(), rad(thisKeyframes[i][7])));
        timeKey += thisKeyframes[i][0];
    }
    timeKey *= 1000;


    var catalyst = { t: 0 };

    var masterTween = new TWEEN.Tween(catalyst)
        .to({ t: 1 }, timeKey)
        .onUpdate(function () {
            var prog = catalyst.t * (keyframesParse.length - 1);
            var selectedKey = Math.floor(prog);
            if (selectedKey == (keyframesParse.length - 1)) {
                object.quaternion.copy(keyframesParse.at(keyframesParse.length - 1));
                return;
            }
            object.quaternion.copy(new THREE.Quaternion().slerpQuaternions(keyframesParse.at(selectedKey), keyframesParse.at(selectedKey + 1), prog - selectedKey));
        })
        // .onComplete(function () {
        //     object.quaternion.copy(keyframesParse.pop());
        // })
        .easing(easeKey);

    groupObject.add(masterTween);

    return masterTween;
}

// Using a formatted 2-D array of keyframe parameters, this iteratively sets up the position keyframes.
function keyframePosition(groupObject, object, thisKeyframes, easeKey) {
    var keyframesParse = new Array();
    var timeKey = 0;
    keyframesParse.push(new THREE.Vector3().copy(object.position));
    for (var i = 0; i < thisKeyframes.length; i++) {
        keyframesParse.push(new THREE.Vector3(thisKeyframes[i][1], thisKeyframes[i][3], thisKeyframes[i][2]));
        timeKey += thisKeyframes[i][0];
    }
    // console.log(timeKey);
    timeKey *= 1000;

    var catalyst = { t: 0 };
    var masterTween = new TWEEN.Tween(catalyst)
        .to({
            t: 1
        }, timeKey)
        .onUpdate(function () {
            var prog = catalyst.t * (keyframesParse.length - 1);
            var selectedKey = Math.floor(prog);
            if (selectedKey == (keyframesParse.length - 1)) {
                object.position.copy(keyframesParse.at(keyframesParse.length - 1));
                return;
            }
            object.position.copy(new THREE.Vector3().lerpVectors(keyframesParse.at(selectedKey), keyframesParse.at(selectedKey + 1), prog - selectedKey));
        })
        .easing(easeKey);

    groupObject.add(masterTween);
    return masterTween;
}

// Depreciated, but has potential use.
// Using a formatted 2-D array of keyframe parameters, this recursively sets up the rotation keyframes.
function keyframeQuaternionRec(groupObject, object, thisKeyframes, i, qStart) {
    var timeKey = thisKeyframes[i][0] * 1000;
    var xaKey = thisKeyframes[i][4];
    var yaKey = thisKeyframes[i][5];
    var zaKey = thisKeyframes[i][6];
    var radKey = thisKeyframes[i][7];
    var easeKey = thisKeyframes[i][8];

    var timer = { t: 0 };
    var qFinsh = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(xaKey, yaKey, zaKey).normalize(), rad(radKey));
    // var qFinsh = new THREE.Quaternion().multiplyQuaternions(qStart, new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(xaKey, yaKey, zaKey).normalize(), rad(radKey)));

    var masterTween = new TWEEN.Tween(timer)
        .to({ t: 1 }, timeKey)
        .onUpdate(function () {
            // if (i == 0) console.log(timer);
            object.quaternion.copy(new THREE.Quaternion().slerpQuaternions(qStart, qFinsh, timer.t));
        })
        .onComplete(function () {
            object.quaternion.copy(qFinsh);
        })
        .easing(easeKey);

    if (i < thisKeyframes.length - 1) {
        var nextTween = keyframeQuaternionRec(groupObject2, object, thisKeyframes, i + 1, qFinsh);
        masterTween.chain(nextTween);
        groupObject.add(nextTween);
    }

    groupObject.add(masterTween);

    return masterTween;
}

// Depreciated, but has potential use.
// Using a formatted 2-D array of keyframe parameters, this recursively sets up the position keyframes.
function keyframePositionRec(groupObject, object, thisKeyframes, i) {
    var timeKey = thisKeyframes[i][0] * 1000;
    var xKey = thisKeyframes[i][1];
    var yKey = thisKeyframes[i][3];
    var zKey = thisKeyframes[i][2];
    var easeKey = thisKeyframes[i][8];

    var masterTween = new TWEEN.Tween(object.position).to({
        x: xKey,
        y: yKey,
        z: zKey
    }, timeKey)
        .easing(easeKey);

    if (i < thisKeyframes.length - 1) {
        var nextTween = keyframePositionRec(groupObject2, object, thisKeyframes, i + 1);
        masterTween.chain(nextTween);
        groupObject.add(nextTween);
    }

    groupObject.add(masterTween);
    return masterTween;
}

// Translates the X-position of the object.
function translateRelX(object, x, time, delay, ease) {
    return new TWEEN.Tween(object.position)
        .to({ x: object.position.x - x }, time)
        .easing(ease)
        .delay(delay)
        .start();
}

// Translates the Y-position of the object.
function translateRelY(object, y, time, delay, ease) {
    return new TWEEN.Tween(object.position)
        .to({ y: object.position.y - y }, time)
        .easing(ease)
        .delay(delay)
        .start();
}

// Unused. Used to rotate the object along the Y-Axis using the object's built-in Euler angels.
function rotateRelY(object, y, time, delay, ease) {
    return new TWEEN.Tween(object.rotation)
        .to({ y: object.rotation.y - y }, time)
        .easing(ease)
        .delay(delay)
        .start();
}

// Quaternion rotation! Used to rotate the object along the Y-Axis.
function rotateQuaternionAxis(object, axis, angle, time, delay, ease) {
    // var qFinsh = {t: 0};
    var timer = { t: 0 };

    var qStart = new THREE.Quaternion().copy(object.quaternion);
    var qFinsh = new THREE.Quaternion().multiplyQuaternions(qStart, new THREE.Quaternion().setFromAxisAngle(axis, angle));

    // o.rotateOnAxis(new THREE.Vector3(0, 1, 0), angle);
    // qFinsh = o.quaternion;

    return new TWEEN.Tween(timer)
        .to({ t: 1 }, time)
        .onUpdate(function () {
            object.quaternion.copy(new THREE.Quaternion().slerpQuaternions(qStart, qFinsh, timer.t));
        })
        .onComplete(function () {
            object.quaternion.copy(qFinsh); // Just to be sure!
        })
        .easing(ease)
        .delay(delay)
        .start();
}

// Helper function; Converts degrees to radians.
function rad(x) {
    return x / 180 * Math.PI;
}