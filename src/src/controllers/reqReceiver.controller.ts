import { Router, Request, Response } from "express";
import winston from "winston";
import Controller from "./interfaces/controller.interface";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class ReqReceiverController extends Controller {
  public path = "/api/receive-test";
  public router: Router = Router();

  constructor() {
    super();
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, this.testReceiver);
  }

  testReceiver = async (req: Request, res: Response) => {
    await sleep(5000);
    const data = req.body;
    winston.info(`data received`, data);
    this.sendSuccess(res, data);
  };
}
