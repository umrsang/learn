var ww = 1920;
var hh = 942;
var container,Controls;
var camera, scene, renderer,muma;
var windowHalfX = ww / 2;
var windowHalfY = hh / 2;
var table;
var modeObject;
var tableArray=[]
var spriteArray=[]
var rotationTable
var turnPage=0;
var allowClick=true

init();
function init() {
				container = document.getElementById( 'WebGL' );
				//document.body.appendChild( container );
				camera = new THREE.PerspectiveCamera( 40, ww / hh, 30, 10000 );

				camera.position.z = 780
				//camera.rotation.x=-90*Math.PI/180;
				camera.position.y=82
				// scene
				scene = new THREE.Scene();	
				var ambientLight = new THREE.AmbientLight( 0xb8edfd, 2.3);
				scene.add( ambientLight );
				renderer = new THREE.WebGLRenderer({antialias: true,alpha:true, preserveDrawingBuffer: false});
				renderer.setPixelRatio(window.devicePixelRatio);
				renderer.setSize(ww, hh);
				container.appendChild(renderer.domElement);

				//Controls = new THREE.OrbitControls(camera, container);
				//Controls.minDistrance = 20;
				//Controls.maxDistrance = 50;
				//Controls.autoRotateSpeed = 0.5;

				// model
				modeObject=new THREE.Object3D();
				scene.add( modeObject );	
				table=new THREE.Object3D();
			
				table.name='table';
				scene.add(table);
				table.rotation.x=14*Math.PI/180;
        table.position.y = 0
        
				var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						//mumaProgress(Math.round(percentComplete, 2))
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				};

				var onError = function ( xhr ) { };
        THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
        
				var mtlLoader = new THREE.MTLLoader();
				mtlLoader.setPath( 'mode/' );
				mtlLoader.load( 'table.mtl', function( materials ) {
				materials.preload();

				var objLoader = new THREE.OBJLoader();
					objLoader.setMaterials( materials );
					objLoader.setPath( 'mode/' );
					objLoader.load( 'table.obj', function ( object ) {
						  for(k in object.children){  
									//	object.children[k].material
									createShine(object)
							}
							var sphere = new THREE.SphereGeometry(  5, 16, 8 );
							var light3 = new THREE.SpotLight(0x254466,6,2000);
								//light3.decay =2
							    light3.penumbra=1
								  light3.position.set( 0,1300, 0 );
								  object.add( light3 )

							var light4 = new THREE.SpotLight( 0x254466, 2, 2200 );
								  light4.decay =2
							      light4.penumbra=1
									light4.position.set( 0,1000, -1000 );
									object.add( light4 );

						   var light5 = new THREE.PointLight( 0xfe4545, 80, 35 );
							//light5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xFF0000 } ) ) );
							console.log(light5)
							light5.position.set(-65,50,-65);
							light5.decay =2
							light5.penumbra=1
							object.add( light5 );

							  var light6 = new THREE.PointLight( 0xfe4545, 70, 30 );
							//light6.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xFF0000 } ) ) );
							light6.position.set(80,70,30);
							light6.decay =2
							light6.penumbra=1
							object.add( light6 );

							object.rotation.y=-135*Math.PI/180
							object.name=1
							tableArray.push(object)
							for(var i=1;i<=3;i++){
								var tempMesh=tableArray[0].clone();
									tempMesh.name=i+1
								   if(i==1){
										tempMesh.position.x=-260
									}
									if(i==2){
										tempMesh.position.z=-260
									}
									if(i==3){
										tempMesh.position.x=260
									}
								tableArray.push(tempMesh)
								table.add(tempMesh)
							}
							rotationTable=tableArray[0]
							object.position.z=250
							table.add(object)
							createPlane();
						document.getElementById( 'loading' ).style.display='none';
					}, onProgress, onError );
				});
				window.addEventListener( 'resize', onWindowResize, false );
				animate();
}







function createPlane(){
	for(var i=1;i<=tableArray.length;i++){
		 var texture = new THREE.ImageUtils.loadTexture('images/a'+i+'.png')
				texture.minFilter = THREE.LinearFilter; 
				texture.generateMipmaps = true; 
		 var material2 = new THREE.MeshBasicMaterial({map:texture,transparent:true});
		 material2.side=THREE.DoubleSide
		var  width
		var height
		if(i==1){
			width=240/2.6
			height=400/2.6
		}else if(i==2){
			width=237/2.6
			height=400/2.6
		}else if(i==3){
			width=303/2.6
			height=400/2.6
		}else if(i==4){

			width=226/2.6
			height=400/2.6
		}
		 var geometry = new THREE.PlaneGeometry(width, height);                 
		 var sprite = new THREE.Mesh( geometry, material2);  
		 sprite.position.x=tableArray[i-1].position.x
		 sprite.position.y=tableArray[i-1].position.y
		 sprite.position.z=tableArray[i-1].position.z
		 spriteArray.push(sprite)
		 table.add(sprite)
	}
}







function createShine(object){
		 var texture = new THREE.ImageUtils.loadTexture('images/shine.png')
			  texture.minFilter = THREE.LinearFilter; 
		var material = new THREE.MeshBasicMaterial({map:texture,transparent:true});
		 material.blending=THREE.AdditiveBlending
		 material.side=THREE.DoubleSide
		  var  width=98
		 var height=40
		 var geometry = new THREE.PlaneGeometry(width, height);                 

			var sprite = new THREE.Mesh( geometry, material);  
			sprite.position.y=65
			sprite.position.x=0
			sprite.position.z=49

			var sprite2=sprite.clone();
			sprite2.rotation.y=90*Math.PI/180
			sprite2.position.x=49
			sprite2.position.z=0

			var sprite3=sprite.clone();
			sprite3.rotation.y=90*Math.PI/180
			sprite3.position.x=-49
			sprite3.position.z=0

			var sprite4=sprite.clone();
			sprite4.position.x=0
			sprite4.position.z=-49

			object.add(sprite)
			object.add(sprite2)
			object.add(sprite3)
			object.add(sprite4)
			console.log(sprite)
}



function leftRotation(){
	if(allowClick){
			allowClick=false
			turnPage--
			var tempPosition=tableArray[0].position
			var tempTable=tableArray[0]
			var tempSprite=spriteArray[0]
			TweenMax.to(tableArray[0].position,2, {x:tableArray[1].position.x,y:tableArray[1].position.y,z:tableArray[1].position.z,ease:Strong.easeOut});
			TweenMax.to(rotationTable.rotation,2, {y:rotationTable.rotation.y+360*Math.PI/180,ease:Strong.easeOut,onComplete:finishClick});
			if(Math.abs(turnPage%2)==0){
				rotationTable=tableArray[1]
			}else{
				rotationTable=tableArray[3]
			}
		TweenMax.to(tableArray[1].position,2, {x:tableArray[2].position.x,y:tableArray[2].position.y,	z:tableArray[2].position.z,ease:Strong.easeOut});
		TweenMax.to(tableArray[2].position,2, {x:tableArray[3].position.x,y:tableArray[3].position.y,	z:tableArray[3].position.z,ease:Strong.easeOut});
		TweenMax.to(tableArray[3].position,2, {x:tempPosition.x,y:tempPosition.y,z:tempPosition.z,ease:Strong.easeOut});
		spriteArray.shift()
		spriteArray.push(tempSprite)
		tableArray.shift();
		tableArray.push(tempTable)
	}
}

function finishClick(){
	allowClick=true
}


function rightRotation(){
	if(allowClick){
				allowClick=false
				turnPage++

			var tempPosition=tableArray[3].position

			var tempTable=tableArray[3]

			var tempSprite=spriteArray[3]

			TweenMax.to(tableArray[0].position,2, {x:tableArray[3].position.x,y:tableArray[3].position.y,z:tableArray[3].position.z,ease:Strong.easeOut});
			TweenMax.to(rotationTable.rotation,2, {y:rotationTable.rotation.y-360*Math.PI/180,ease:Strong.easeOut,onComplete:finishClick});
			if(Math.abs(turnPage%2)==0){
				rotationTable=tableArray[3]
			}else{
				rotationTable=tableArray[1]
			}

			TweenMax.to(tableArray[1].position,2, {x:tableArray[0].position.x,y:tableArray[0].position.y,z:tableArray[0].position.z,ease:Strong.easeOut});
			TweenMax.to(tableArray[2].position,2, {x:tableArray[1].position.x,y:tableArray[1].position.y,z:tableArray[1].position.z,ease:Strong.easeOut});
			TweenMax.to(tableArray[3].position,2, {x:tableArray[2].position.x,y:tableArray[2].position.y,z:tableArray[2].position.z,ease:Strong.easeOut});
			tableArray.pop();
			tableArray.unshift(tempTable)
			spriteArray.pop()
			spriteArray.unshift(tempSprite)
	}

}


		function onWindowResize() {
				windowHalfX = ww / 2;
				windowHalfY = hh / 2;
				camera.aspect = ww / hh;
				camera.updateProjectionMatrix();
				renderer.setSize( ww, hh );
			}



			function animate() {
				if(tableArray.length>0 && spriteArray.length>0){
					for(var i=1;i<=spriteArray.length;i++){
						spriteArray[i-1].position.x=	tableArray[i-1].position.x
						spriteArray[i-1].position.y=	tableArray[i-1].position.y+120
						spriteArray[i-1].position.z=	tableArray[i-1].position.z
					}
				}
				//Controls.update();
				requestAnimationFrame( animate );
				render();
			}



			function render() {
				//	renderer.setClearColor( 0xf0f0f0 );
					renderer.setPixelRatio( window.devicePixelRatio );
					renderer.render( scene, camera );
			}