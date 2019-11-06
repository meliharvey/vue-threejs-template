<template>
  <div class="home">
    <div id="container"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { mapState, mapGetters } from 'vuex'

export default {
  name: "home",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      container: null,
    }
  },
  computed: {
    ...mapGetters({
      model: 'getModel'
    })
  },
  methods: {
    init: function() {
      this.container = document.getElementById('container');

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
      this.container.appendChild( this.renderer.domElement );

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera( 75, this.container.clientWidth/this.container.clientHeight, 0.1, 1000 );
      this.controls = new OrbitControls( this.camera, this.renderer.domElement );
      this.controls.screenSpacePanning = true;

      var size = 10;
      var divisions = 10;

      var gridHelper = new THREE.GridHelper( size, divisions );
      this.scene.add( gridHelper );

      var directionalLight1 = new THREE.DirectionalLight( 0xffffff, 5 );
      directionalLight1.position.set( 10, 10, 10 );
      this.scene.add( directionalLight1 );

      var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 2 );
      directionalLight2.position.set( -10, 10, -10 );
      this.scene.add( directionalLight2 );

      this.$store.dispatch('loadModel', '/3d/DamagedHelmet.gltf')

      this.camera.position.z = 5;
    },
    animate: function() {
        requestAnimationFrame(this.animate);
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
    },
    onWindowResize: function() {
      console.log('resize')
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
    },
    addModel: function () {
      this.$store.subscribe((mutation, state) => {
        switch (mutation.type) {
          case 'setModel':
            console.log('try', this.model)
            this.scene.add(this.model)
            console.log(mapState, state)
            break
        }
      })
    },
  },
  mounted() {
    this.init();
    this.animate();
    this.addModel();

    window.addEventListener('resize', this.onWindowResize, false)
  }
};
</script>

<style lang="scss">

#container {
  position: fixed;
  width: 100%;
  height: 100%
}

</style>
