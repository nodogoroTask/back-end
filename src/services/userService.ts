import Container, { Inject, Service } from "typedi";
import { Logger } from "winston";
import config from "../config";
import Unauthorized from "./errors/UnauthorizedError";
import { getToken } from "./utils/token";

const axios = require("axios");

@Service("user.service")
export default class userService {
  constructor(@Inject("logger") private logger: Logger) {
    this.logger = Container.get("logger");
  }

  public async getOne(userId: string) {
    try {
      const token = await getToken();
      let {data} = await axios.get(config.auth0endPoint + "/users/" + userId, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      return data;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(body: object, userId: string) {
    try {
      const token = await getToken();

      let { data } = await axios(config.auth0endPoint + "/users/" + userId, {
        method: "patch",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify(body),
      });

      return data;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
