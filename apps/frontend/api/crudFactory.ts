import axiosInstance from "./axiosInstance";

const createCrudApi = (baseUrl: string) => ({
  getAll: async () => {
    const response = await axiosInstance.get(baseUrl);
    return response.data;
  },

  create: async (data: any) => {
    const response = await axiosInstance.post(baseUrl, data);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axiosInstance.get(`${baseUrl}/${id}`);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await axiosInstance.patch(`${baseUrl}/${id}`, data);
    return response.data;
  },

  remove: async (id: number) => {
    const response = await axiosInstance.delete(`${baseUrl}/${id}`);
    return response.data;
  },
});

export default createCrudApi;
