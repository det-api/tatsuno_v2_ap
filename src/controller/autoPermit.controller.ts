import { Request, Response, NextFunction } from "express";
import { autoPermitAdd, autoPermitUpdate } from "../service/autoPermit.service";
import fMsg from "../utils/helper";

export const autoPermitUpdateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.mode) throw new Error("you need mode");
    let result = await autoPermitUpdate(req.body.mode);
    fMsg(res, "mode changed", result);
  } catch (e) {
    next(e);
  }
};

export const autoPermitAddHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.mode) throw new Error("you need mode");
    let result = await autoPermitAdd(req.body);
    fMsg(res, "auto permit added", result);
  } catch (e) {
    next(e);
  }
};


export const autoPermitApprov = async () => {

}