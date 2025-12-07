import axiosInstance from "./axiosInstance";
import createCrudApi from "./crudFactory";
import routes from "../routes";

const baseUsersPath = routes.app.users.list();
const createUserPath = routes.app.users.create();

const baseCrud = createCrudApi(baseUsersPath); // (list, show, update, delete)

const usersApi = {
  ...baseCrud,

  create: async (data: any) => {
    const response = await axiosInstance.post(createUserPath, data);
    return response.data;
  },
};

export default usersApi;
