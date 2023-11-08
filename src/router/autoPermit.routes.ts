import { autoPermitAddHandler, autoPermitUpdateHandler } from "../controller/autoPermit.controller";

const autoPermitRoute = require("express").Router();

autoPermitRoute.post("/" , autoPermitAddHandler)

autoPermitRoute.patch("/" , autoPermitUpdateHandler)

export default autoPermitRoute
