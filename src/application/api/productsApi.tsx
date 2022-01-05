import { axiosClient } from '../api/axiosClient';

export const productApi = {
  getAll: (params: any) => {
    const url = 'products2/';
    return axiosClient.get(url, { params });
  },

  get(id: any) {
    const url = `/products2/${id}`;
    console.log('id', url);

    return axiosClient.get(url);
  },

  add(data: any) {
    const url = `/products2/`;
    return axiosClient.post(url, data);
  },

  update(data: { id: any }) {
    const url = `/products2/${data.id}/`;
    return axiosClient.patch(url, data);
  },

  remove(id: any) {
    const url = `/products2/${id}/`;
    return axiosClient.delete(url);
  },
};
