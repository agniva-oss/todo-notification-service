import { Response } from "express";

export class BaseController {
  success(res: Response, data: any) {
    return res.json({ success: true, data });
  }

  error(res: Response, error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal error",
    });
  }
}
