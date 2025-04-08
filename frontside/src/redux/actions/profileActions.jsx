/* eslint-disable no-unused-vars */
// import {ALERT_TYPES} from "./alertActions"
import { getDataApi, patchDataApi } from "../../utils/fetchDataApi";
import { imageupload } from "../../utils/imageupload";
import axios from "axios";
import {DeleteData} from "./alertActions"

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
  FRIEND:'FRIEND',
  UNFRIEND: 'UNFRIEND'

};

export const getProfileUsers =
  ({ users = [], id, auth }) =>
  async (dispatch) => {
    if (users.every((item) => item._id !== id)) {
      try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: { loading: true } });
        const res = await getDataApi(`user/${id}`, auth.token);

        const user = res;

        console.log(user);

        dispatch({
          type: PROFILE_TYPES.GET_USER,
          payload: user.data.user,
        });

        dispatch({ type: PROFILE_TYPES.LOADING, payload: { loading: false } });
      } catch (err) {
        dispatch({
          type: "ALERT",
          payload: {
            error: err.response.data.msg,
          },
        });
      }
    }
  };

 export const updateProfile =
  ({ editData, avatar, auth }) =>
  async (dispatch) => {
    if (!editData.fullname)
      return dispatch({
        type: "ALERT",
        payload: { error: "Add your fullname" },
      });
    if (editData.fullname.length > 25)
      return dispatch({
        type: "ALERT",
        payload: { error: "Fullname is too long" },
      });
    if (editData.story.length > 200)
      return dispatch({
        type: "ALERT",
        payload: { error: "story is too long" },
      });

    try {
      let media;

      dispatch({ type: "ALERT", payload: { loading: true } });
      if (avatar) {
        media = await imageupload([avatar]);
        media[0].secure_url += `?${Date.now()}`;
      }

      const res = await axios.patch(
        "http://localhost:5000/api/user/update",
        {
          ...editData,
          avatar: avatar ? media[0].secure_url : auth.user.avatar,
        },
        {
          headers: { Authorization: auth.token },
        }
      );

      // console.log(res)

      dispatch({
        type: "AUTH",
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...editData,
            avatar: avatar ? media[0].secure_url : auth.user.avatar,
            updatedAt: new Date().toISOString()
          },
        },
      });

      dispatch({
        type: PROFILE_TYPES.GET_USER,
        payload: {
          ...res.data.user,
          avatar: avatar ? media[0].secure_url : res.data.user.avatar
        }
      });

      dispatch({ type: "ALERT", payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const addfriends =
  ({ users, user, auth}) =>
  async (dispatch) => {
    const newUser = { ...user, friends: [...user.friends, auth.user] };
    console.log(newUser);
    dispatch({
      type: PROFILE_TYPES.FRIEND,
      payload: newUser
    })

    dispatch({
      type: "AUTH",
      payload : {
        ...auth,
        user: {...auth.user , following : [...auth.user.following, newUser] }
      }
    })
    try {
      const res = await patchDataApi(`user/${user._id}/friend` , null, auth.token )
      // console.log(res)
    } catch (err) {
      dispatch({
        type:'ALERT',
        payload:{
            error: err.response.data.msg
        }
    })
    }
  };


  export const unfriends =
  ({ users, user, auth}) =>
  async (dispatch) => {
    const newUser = { ...user, friends:DeleteData(user.friends, auth.user._id)};

    dispatch({
      type: PROFILE_TYPES.UNFRIEND,
      payload: newUser
    })

    dispatch({
      type: "AUTH",
      payload : {
        ...auth,
        user: {...auth.user , following:DeleteData(auth.user.following, newUser._id)}
      }
    })

    try {
      const res = await patchDataApi(`user/${user._id}/unfriend`, null, auth.token)
      
    } catch (err) {
      dispatch({
        type:'ALERT',
        payload:{
            error: err.response.data.msg
        }
    })
    }
  };