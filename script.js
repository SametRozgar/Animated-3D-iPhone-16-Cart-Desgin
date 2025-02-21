let scene, camera, renderer, controls;

function init() {
   
    scene = new THREE.Scene();
    
  
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 2);
    
  
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; 
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('container').appendChild(renderer.domElement);
    
   
    controls = new THREE.OrbitControls(camera, renderer.domElement);

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
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8); // Ek ışık
    directionalLight2.position.set(-10, 10, -10);
    scene.add(directionalLight2);
    
    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100); // Ek ışık
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);
    
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2); // Ek ışık
    scene.add(hemisphereLight);
    
  
    loadModel();
}

function loadModel() {
    const loader = new THREE.GLTFLoader();
    loader.load('assets/iphone16_model.glb', function(gltf) {
        const model = gltf.scene;
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true; 
            }
        });
        scene.add(model);
        
        a
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
    }, undefined, function(error) {
        console.error('Model yüklenirken hata oluştu:', error);
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
animate();