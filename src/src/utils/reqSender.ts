import winston from "winston";
import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method } from "axios";

export class ReqSender {
  private static instance: ReqSender;
  private constructor() {}

  public static getInstance(): ReqSender {
    if (!ReqSender.instance) {
      ReqSender.instance = new ReqSender();
    }
    return ReqSender.instance;
  }

  async send(
    url: string,
    method: Method,
    data?: object,
    headers?: AxiosRequestHeaders
  ) {
    try {
      const option = {} as AxiosRequestConfig;
      option.url = url;
      option.method = method;
      if (headers) option.headers = headers;
      if (data) option.data = data;

      const result = await axios(option);

      return result;
    } catch (error: any) {
      winston.error(
        `provider request error: ${error.response?.status} ${error.code}`
      );
      if (error.response) {
        const errData = error.response.data;
        const errStatus = error.response.status;
        const errHeaders = error.response.headers;

        return { errData, errStatus, errHeaders };
      } else if (error.request) {
        const errRequest = error.request;

        return { errRequest };
      } else {
        const errMsg = error.message;

        return { errMsg };
      }
    }
  }
}

export default ReqSender.getInstance();
