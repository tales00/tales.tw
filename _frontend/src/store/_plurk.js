// import { getPlurkResponse } from '@/api/_api.tales.tw'
import { getPlurkProfile, getPlurkPost } from '@/api/_api.tales.tw'

export default {
  namespaced: true,
  state: {
    profile: {
      update: false,
      name: undefined,
      description: undefined,
      avatar: undefined,
    },
    post: {
      update: false,
      data: [],
    }
   },
  getters: {
    isProfileLoaded( state ) {
      return !!state.profile.update;
    },
    profile( state ) {
      const { name, description, avatar } = state.profile;
      return { name, description, avatar };
    },
    isPostLoaded( state ) {
      return !!state.post.update;
    },
    post( state ) {
      return state.post.data;
    }
  },
  mutations: {
    setProfile( state, { update, name, description, avatar }) {
      state.profile.update = update;
      state.profile.name = name;
      state.profile.description = description;
      state.profile.avatar = avatar;
    },
    setPost( state, { post, update }) {
      state.post.data = post;
      state.post.update = update;
    },
  },
  actions: {
    fetchProfile( { commit }, $userName ) {
      getPlurkProfile( $userName )
        .then( ({ update, name, description, avatar }) => {
          commit( 'setProfile', { update, name, description, avatar });
        })
    },
    fetchPost( { commit }, $userName ) {
      getPlurkPost( $userName )
        .then( ({ post ,update }) => {
          commit( 'setPost', { post ,update });
        })
    }
  }
};