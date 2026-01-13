import { Request, Response } from "express";
import { WebhookService } from "../services/webhook.service";

export const todoWebhook = async (req: Request, res: Response) => {
  await WebhookService.handleTodoCreated(req.body.event.data.new);
  res.json({ received: true });
};
