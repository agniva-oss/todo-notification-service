import { Request, Response } from "express";
import { PreferenceService } from "../services/preference.service";

type PreferenceParams = {
  id: string;
};

export const getPreference = async (
  req: Request<PreferenceParams>,
  res: Response
) => {
  const { id } = req.params;

  const data = await PreferenceService.get(id);
  res.json(data);
};

export const updatePreference = async (
  req: Request<PreferenceParams>,
  res: Response
) => {
  const { id } = req.params;
  const updates = req.body;

  const data = await PreferenceService.update(id, updates);
  res.json(data);
};
