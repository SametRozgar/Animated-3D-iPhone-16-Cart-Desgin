let scene, camera, renderer, controls;

function init() {
    
    scene = new THREE.Scene();

   
    camera = new THREE.PerspectiveCamera(75, 500 / 700, 0.1, 1000);
    camera.position.set(0, 0, 3); 

  
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(500, 700);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('container').appendChild(renderer.domElement);

  
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 2; 
    controls.maxDistance = 10; 

   
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

   
    loadModel();
}

function loadModel() {
    const loader = new THREE.GLTFLoader();
    loader.load('assets/iphone_16_pro_max.glb', function (gltf) {
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
    }, undefined, function (error) {
        console.error('Model yüklenirken hata oluştu:', error);
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

window.addEventListener('resize', () => {
    camera.aspect = 500 / 700;
    camera.updateProjectionMatrix();
    renderer.setSize(500, 700);
});

init();
animate();