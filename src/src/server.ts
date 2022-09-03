import App from "./app";
import TestStarterController from "./controllers/testStarter.controller";
import ReqReceiverController from "./controllers/reqReceiver.controller";
import UIRenderController from "./controllers/uiRender.controller";
("./controllers/uiRender.controller");

import { PORT } from "./config/config";

const app = new App(
  [
    new TestStarterController(),
    new ReqReceiverController(),
    new UIRenderController(),
  ],
  PORT
);

app.listen();
