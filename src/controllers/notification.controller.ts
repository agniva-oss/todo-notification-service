import { Request, Response } from "express";
import { NotificationService } from "../services/notification.service";
import { BaseController } from "../common/base.controller";

const base = new BaseController();
const notificationService = new NotificationService();

type CreateNotificationBody = {
  todo_id: string;
  message: string;
  title?: string;
  type?: string;
  due_date?: string;
};

type MarkReadParams = {
  id: string;
};

export const createNotification = async (
  req: Request<{}, {}, CreateNotificationBody>,
  res: Response
) => {
  try {
    const { todo_id, message, title, type, due_date } = req.body;

    if (!todo_id || !message) {
      return res.status(400).json({
        success: false,
        message: "todo_id and message are required",
      });
    }

    const notification = await notificationService.createManual({
      todo_id,
      message,
      title,
      type,
      due_date,
    });

    base.success(res, notification);
  } catch (error) {
    base.error(res, error);
  }
};

export const getNotifications = async (
  _req: Request,
  res: Response
) => {
  try {
    const notifications = await notificationService.getAll();
    base.success(res, notifications);
  } catch (error) {
    base.error(res, error);
  }
};

export const markRead = async (
  req: Request<MarkReadParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Notification id is required",
      });
    }

    const result = await notificationService.markRead(id);
    base.success(res, result);
  } catch (error) {
    base.error(res, error);
  }
};
