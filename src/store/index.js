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
      console.log('set state model')
      state.model = newModel
    }
  },
  actions: {
    loadModel: function(context, path) {
      console.log('loading model into store')

      // Instantiate a glTF loader
      const loader = new GLTFLoader();

      // Load a glTF resource
      loader.load(path, function( gltf ) {
          context.commit('setModel', gltf.scene)
          console.log( gltf.scene )
        }, function( xhr ) {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },function( error ) {
          console.log( 'An error happened', error );
        }
      );
    }
  },
});
