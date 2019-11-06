import Vue from "vue";
import Vuex from "vuex";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    model: null
  },
  getters: {
    getModel (state) {
      return state.model
    }
  },
  mutations: {
    setModel (state, newModel) {
      state.model = newModel
    }
  },
  actions: {
    loadModel: function(context, path) {
      console.log('loading model into store', path)

      var loader;

      switch(path.split('.').pop()) {
        case 'gltf':
          loader = new GLTFLoader();
          break;
        case 'glb':
          loader = new GLTFLoader();
          break;
        default:
          loader = null;
          console.log('not a recognized file type');
      }

      // Instantiate a glTF loader
      //const loader = new GLTFLoader();

      // Load a glTF resource
      loader.load(path, function( model ) {
          context.commit('setModel', model.scene)
          console.log( model.scene )
        }, function( xhr ) {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },function( error ) {
          console.log( 'An error happened', error );
        }
      );
    }
  },
});
