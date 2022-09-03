import { Router, Response } from "express";

export default abstract class Controller {
  public router: Router = Router();

  public abstract path: string;

  protected abstract intializeRoutes(): void;

  protected sendSuccess(
    res: Response,
    data: object,
    message?: string
  ): Response {
    return res.status(200).json({
      message: message || "success",
      data: data,
    });
  }

  protected sendError(res: Response, message?: string): Response {
    return res.status(500).json({
      message: message || "internal server error",
    });
  }
}
