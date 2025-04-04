/* eslint-disable no-unused-vars */
// import {ALERT_TYPES} from "./alertActions"
import { getDataApi, patchDataApi } from "../../utils/fetchDataApi";
import { imageupload } from "../../utils/imageupload";
import axios from "axios";
export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
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
      if (avatar) media = await imageupload([avatar]);

      // const res = await patchDataApi("user" , {
      //   ...editData,
      //   avatar: avatar ? media[0].secure_url : auth.user.avatar,
      // }, auth.token )

      const res = await axios.patch(
        "http://localhost:5000/api/user",
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
          },
        },
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
