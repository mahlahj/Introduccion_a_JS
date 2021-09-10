// Necesitamos 3 cosas cada vez que usamos Three.js
// escena + camara + renderer
const scene = new THREE.Scene()
// La cámara requiere 4 argumentos: Campo de visión, relación de aspecto, plano de recorte cercano y lejano
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 )
// El renderer toma un objeto de opciones, solo se usará antialias para suavizar los bordes
const renderer = new THREE.WebGLRenderer({ antialias: true})

// Enviamos el lugar al que debe estar y qué tan grande debe ser
// seteamos el tamaño del renderer al tamaño de la ventana y le decimos que se pegue al cuerpo del HTML
renderer.setSize( window.innerWidth, window.innerHeight )
// Setea el color de fondo del renderer
renderer.setClearColor("#fffff")
document.body.appendChild( renderer.domElement )
camera.position.z = 5

// Resize al canvas al resize de la ventana con el listener
window.addEventListener( 'resize', () => {
    let width = window.innerWidth
    let height = window.innerHeight
    renderer.setSize( width, height )
    camera.aspect = width / height
    camera.updateProjectionMatrix()
})

// Cubo básico, requiere 3 elementos al igual que la cámara
// Geometry es la forma del objeto, hecho de varios vértices y caras 
var geometry = new THREE.BoxGeometry( .5, .5, .5)
// Material indica de qué está hecho el objeto: color, interacción con luz, "metalidad" y tersura
var material = new THREE.MeshStandardMaterial( { color: "#2C1894", flatShading: true, metalness: 0, roughness: 1 })
// Malla es la combinación de los anteriores
var cube = new THREE.Mesh ( geometry, material )
scene.add( cube )

// Cubo de wireframe distinto material y con la propiedad "wireframe"
var geometry = new THREE.BoxGeometry( 3, 3, 3)
var material = new THREE.MeshBasicMaterial( {
    color: "#1c39bb", wireframe: true, transparent: true
})
var wireframeCube = new THREE.Mesh ( geometry, material )
scene.add( wireframeCube )

// Luz ambiental omnipresente y aplicada a todo equitativamente, no causa sombras por carecer dirección
// Solo cambiará cómo aparecerán los colores
var ambientLight = new THREE.AmbientLight ( "#fffff", 1)
scene.add( ambientLight )

// Luz focal tiene una posición, arriba a la derecha y por detrás del cubo
var pointLight = new THREE.PointLight( "#ff0051", 1 );
pointLight.position.set( 25, 50, 25 );
scene.add( pointLight );

// Cada cuadro del cubo rota en los ejes X/Y a un .04 de radian 
// Cada cuadro del wireframe rota en los ejes X/Y a un .01 de radian, haciéndolo más lento
function animate() {
    requestAnimationFrame( animate )
    cube.rotation.x += 0.04;
    cube.rotation.y += 0.04;
    wireframeCube.rotation.x -= 0.01;
    wireframeCube.rotation.y -= 0.01;
    renderer.render( scene, camera )
}
animate()