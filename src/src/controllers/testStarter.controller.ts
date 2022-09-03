import { Router, Request, Response } from "express";
import service from "../services/test.service";

import Controller from "./interfaces/controller.interface";

export default class TestStarterController extends Controller {
  public path = "/api/start-test";
  public router: Router = Router();

  constructor() {
    super();
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(`${this.path}/:number`, this.testStarter);
  }

  testStarter = async (req: Request, res: Response) => {
    const numberOfRequests: number = Number(req.params.number);
    const testPeriod: number = Number(req.body.testPeriod);
    const testMethod: "GET" | "POST" = req.body.method;
    const rowId: number = req.body.id;

    console.log(req.body);

    const data = service.exec(numberOfRequests, testPeriod, testMethod);

    this.sendSuccess(res, data);
  };
}
