import { Request, Response } from "express";
import { WebhookService } from "../services/webhook.service";
import { BaseController } from "../common/base.controller";

const base = new BaseController();
const webhookService = new WebhookService();

export const todoWebhook = async (req: Request, res: Response) => {
  try {
    const event = req.body?.event;

    if (!event || !event.op || !event.data?.new) {
      return res.status(400).json({
        success: false,
        message: "Invalid webhook payload",
      });
    }

    switch (event.op) {
      case "INSERT":
        await webhookService.handleTodoCreated(event.data.new);
        break;

      case "UPDATE":
        await webhookService.handleTodoUpdated(event.data.new);
        break;

      default:
        break;
    }

    base.success(res, { received: true });
  } catch (error) {
    base.error(res, error);
  }
};
