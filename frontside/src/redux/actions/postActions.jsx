/* eslint-disable no-unused-vars */
import { imageupload } from "../../utils/imageupload";
import {
  getDataApi,
  postDataApi,
  patchDataApi,
  deleteDataApi,
} from "../../utils/fetchDataApi";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
};

export const createpost = ({ content, images, auth }) => async (dispatch) => {
    let media = [];

    try {

      dispatch({ type: "ALERT", payload: { loading: true } });

      if (images.length > 0) 

      media = await imageupload(images);
      const res = await postDataApi('posts', {content, images:media}, auth.token);
      console.log(res);

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
