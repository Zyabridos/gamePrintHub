const apiBase = "/api";

// URL | from DB
type Id = string | number;

const apiRoutes = {
  session: {
    new: (): string => [apiBase, "session", "new"].join("/"),
    current: (): string => [apiBase, "session"].join("/"),
    delete: (): string => [apiBase, "session"].join("/"),
  },
  users: {
    list: (): string => [apiBase, "users"].join("/"),
    create: (): string => [apiBase, "users", "new"].join("/"),
    show: (id: Id): string => [apiBase, "users", id].join("/"),
    edit: (id: Id): string => [apiBase, "users", id, "edit"].join("/"),
  },
};

const frontendRoutes = {
  home: (): string => "/",
  session: {
    new: (): string => "/session/new",
    current: (): string => "/session",
  },
  users: {
    list: (): string => "/users",
    create: (): string => "/users/new",
    edit: (id: Id): string => `/users/${id}/edit`,
  },
};

const routes = {
  api: apiRoutes,
  app: frontendRoutes,
};

export default routes;
