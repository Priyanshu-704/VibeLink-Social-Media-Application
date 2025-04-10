import axios from "./axios";

export const getDataApi = async (url, token) => {
  const res = await axios.get(`/api/${url}`, {
    headers: { Authorization: `Bearer ${token}`  },
  });
  
  return res;
};

export const postDataApi = async (url, data, token) => {
  const headers = {
    Authorization: token,
  };
  
  if (!(data instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  return await axios.post(`/api/${url}`, data, { headers });
};

export const putDataApi = async (url, post, token) => {
  const res = await axios.put(`/api/${url}`, post, {
    headers: { Authorization: `Bearer ${token}`  },
  });
  return res;
};

export const patchDataApi = async (url, post, token) => {
  const res = await axios.patch(`/api/${url}`, post, {
    headers: { Authorization: `Bearer ${token}`  },
  });
  return res;
};

export const deleteDataApi = async (url, token) => {
  const res = await axios.delete(`/api/${url}`, {
    headers: { Authorization: `Bearer ${token}`  },
  });
  return res;
};
