import { Request, Response } from "express";
import { NotificationService } from "../services/notification.service";
import { BaseController } from "../common/base.controller";

const base = new BaseController();

type MarkReadParams = {
  id: string;
};

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { todo_id, message } = req.body;

    if (!todo_id || !message) {
      return res.status(400).json({
        success: false,
        message: "todo_id and message are required",
      });
    }

    const notification = await NotificationService.createManual(
      todo_id,
      message
    );

    base.success(res, notification);
  } catch (e) {
    base.error(res, e);
  }
};


export const getNotifications = async (_: Request, res: Response) => {
  try {
    base.success(res, await NotificationService.getAll());
  } catch (e) {
    base.error(res, e);
  }
};

export const markRead = async (
  req: Request<MarkReadParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    base.success(res, await NotificationService.markRead(id));
  } catch (e) {
    base.error(res, e);
  }
};
