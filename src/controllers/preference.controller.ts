import { Request, Response } from "express";
import { PreferenceService } from "../services/preference.service";

type PreferenceParams = {
  userId: string;
};

export const getPreference = async (
  req: Request<PreferenceParams>,
  res: Response
) => {
  const { userId } = req.params;

  const data = await PreferenceService.get(userId);
  res.json(data);
};
