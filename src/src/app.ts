import morgan from "morgan";
import Controller from "./controllers/interfaces/controller.interface";
import feathers from "@feathersjs/feathers";
import express from "@feathersjs/express";
import socketio from "@feathersjs/socketio";
import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { join } from "path";
import { Request, Response } from "express";

import "@feathersjs/transport-commons";
import { TableService } from "./services/table.service";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express(feathers());
    this.port = port;
    this.initializeErrorLog();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.set("view engine", "ejs");
    this.app.set("views", join(__dirname, "../views"));
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(join(__dirname, "../public")));
    this.app.configure(express.rest());
    this.app.configure(socketio());
    this.app.use("/tables", new TableService());
    this.app.use(express.errorHandler());
    this.app.on("connection", (connection) =>
      this.app.channel("everybody").join(connection)
    );
    this.app.publish(() => this.app.channel("everybody"));
    this.app.get("/update-row", (req: Request, res: Response) => {
      this.app.service("tables").updateRow();
      res.send("ok");
    });
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  /**
   * logs error configured
   */
  private initializeErrorLog() {
    const transport: DailyRotateFile = new DailyRotateFile({
      filename: "Node-%DATE%.log",
      dirname: "./logs",
      datePattern: "YYYY-MM-DD-HH",
    });
    winston.add(transport);
  }

  public listen() {
    this.app
      .listen(this.port)
      .on("listening", () =>
        console.log(`⚡️[server]: Server is running on port ${this.port}`)
      );
  }
}

export default App;
