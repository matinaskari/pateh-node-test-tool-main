import { Router, Request, Response } from "express";

import Controller from "./interfaces/controller.interface";

export default class UIRenderController extends Controller {
  public path = "";
  public router: Router = Router();

  constructor() {
    super();
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.uiController);
  }

  uiController = async (req: Request, res: Response) => {
    let data: never[] = [];
    res.render("index", {
      companies: data,
    });
  };
}
