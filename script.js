let scene1, scene2, scene3, camera1, camera2, camera3, renderer1, renderer2, renderer3, controls1, controls2, controls3;

function init() {
    
    scene1 = new THREE.Scene();
    camera1 = new THREE.PerspectiveCamera(75, 500 / 700, 0.1, 1000);
    camera1.position.set(0, 0, 3);
    renderer1 = new THREE.WebGLRenderer({ antialias: true });
    renderer1.setSize(500, 700);
    renderer1.shadowMap.enabled = true;
    renderer1.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('container1').appendChild(renderer1.domElement);
    controls1 = new THREE.OrbitControls(camera1, renderer1.domElement);
    setupControls(controls1);
    setupLights(scene1);
    loadModel(scene1, camera1, controls1, 'assets/iphone_16_pro_max.glb');

   
    scene2 = new THREE.Scene();
    camera2 = new THREE.PerspectiveCamera(75, 500 / 700, 0.1, 1000);
    camera2.position.set(0, 0, 3);
    renderer2 = new THREE.WebGLRenderer({ antialias: true });
    renderer2.setSize(500, 700);
    renderer2.shadowMap.enabled = true;
    renderer2.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('container2').appendChild(renderer2.domElement);
    controls2 = new THREE.OrbitControls(camera2, renderer2.domElement);
    setupControls(controls2);
    setupLights(scene2);
    loadModel(scene2, camera2, controls2, 'assets/iphone_16_pro_max.glb');

   
    scene3 = new THREE.Scene();
    camera3 = new THREE.PerspectiveCamera(75, 500 / 700, 0.1, 1000);
    camera3.position.set(0, 0, 3);
    renderer3 = new THREE.WebGLRenderer({ antialias: true });
    renderer3.setSize(500, 700);
    renderer3.shadowMap.enabled = true;
    renderer3.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('container3').appendChild(renderer3.domElement);
    controls3 = new THREE.OrbitControls(camera3, renderer3.domElement);
    setupControls(controls3);
    setupLights(scene3);
    loadModel(scene3, camera3, controls3, 'assets/iphone_16_pro_max.glb');
}

function setupControls(controls) {
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 10;
}

function setupLights(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(-10, 10, -10);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    scene.add(hemisphereLight);
}

function loadModel(scene, camera, controls, modelPath) {
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function (gltf) {
        const model = gltf.scene;
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        model.scale.set(1.8, 1.8, 1.8);
        scene.add(model);

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        camera.position.set(0, 0, 2.5);
        controls.target.copy(center);
        controls.update();

       
        animateModelRotation(model);
    }, undefined, function (error) {
        console.error('Model yüklenirken hata oluştu:', error);
    });
}

function animateModelRotation(model) {
    const duration = 2000; 
    const startTime = Date.now();

    const targetRotationX = THREE.MathUtils.degToRad(-20); 
    const targetRotationY = THREE.MathUtils.degToRad(30); 

    function update() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;

        if (elapsedTime < duration) {
            const progress = elapsedTime / duration;

            
            model.rotation.x = targetRotationX * progress;
            model.rotation.y = targetRotationY * progress;

            requestAnimationFrame(update);
        } else {
           
            model.rotation.x = targetRotationX;
            model.rotation.y = targetRotationY;
        }
    }

    update();
}

function animate() {
    requestAnimationFrame(animate);
    renderer1.render(scene1, camera1);
    renderer2.render(scene2, camera2);
    renderer3.render(scene3, camera3);
    controls1.update();
    controls2.update();
    controls3.update();
}

window.addEventListener('resize', () => {
    camera1.aspect = 500 / 700;
    camera1.updateProjectionMatrix();
    renderer1.setSize(500, 700);

    camera2.aspect = 500 / 700;
    camera2.updateProjectionMatrix();
    renderer2.setSize(500, 700);

    camera3.aspect = 500 / 700;
    camera3.updateProjectionMatrix();
    renderer3.setSize(500, 700);
});

init();
animate();