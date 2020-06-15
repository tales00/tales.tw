import { getPixivUserData } from '@/api/_api.tales.tw'

export default {
  namespaced: true,
  state: {
    illusts: [],
    mangas: [],
    profile: {},
    update: undefined,
   },
  getters: {
    isLoaded( state ) {
      return !!state.update;
    },
    allWorks( {illusts, mangas} ) {
      return [ ...illusts, ...mangas].sort( (a,b) => b.id-a.id )
    }
  },
  mutations: {
    loadIllusts( state, illusts) {
      state.illusts = illusts;
    },
    loadMangas( state, mangas) {
      state.mangas = mangas;
    },
    loadProfile( state, profile) {
      state.profile = profile;
    },
    loadUpdate( state, update) {
      state.update = update;
    },
  },
  actions: {
    fetchUser( { commit }, $userID ) {
      getPixivUserData( $userID )
        .then( ({ illusts ,mangas ,profile ,update }) => {
          commit( 'loadIllusts', illusts);
          commit( 'loadMangas', mangas);
          commit( 'loadProfile', profile);
          commit( 'loadUpdate', update);
        })
    }
  }
};