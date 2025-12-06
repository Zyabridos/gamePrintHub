import _ from "lodash";
import { Strategy } from "@fastify/passport";

type AppWithObjection = {
  objection: {
    models: {
      user: {
        query: () => {
          findOne: (where: { email: string }) => Promise<any>;
        };
      };
    };
  };
};

export default class FormStrategy extends Strategy {
  private app: AppWithObjection;

  constructor(name: string, app: AppWithObjection) {
    super(name);
    this.app = app;
    this.name = name;
  }

  async authenticate(request: any) {
    if (request.isAuthenticated?.()) {
      return this.pass();
    }

    const email = _.get(request, "body.data.email", null);
    const password = _.get(request, "body.data.password", null);

    const { models } = this.app.objection;
    const user = await models.user.query().findOne({ email });

    if (user && user.verifyPassword?.(password)) {
      return this.success(user);
    }

    return this.fail();
  }
}
