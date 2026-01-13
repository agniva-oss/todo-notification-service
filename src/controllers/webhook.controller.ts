import { Request, Response } from "express";
import { WebhookService } from "../services/webhook.service";

export const todoWebhook = async (req: Request, res: Response) => {
  const event = req.body.event;
  if (event.op === 'INSERT') {
    await WebhookService.handleTodoCreated(event.data.new);
  } else if (event.op === 'UPDATE') {
    await WebhookService.handleTodoUpdated(event.data.new);
  }
  res.json({ received: true });
};
