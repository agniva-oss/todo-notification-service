import { Request, Response } from "express";
import { PreferenceService } from "../services/preference.service";
import { BaseController } from "../common/base.controller";

const base = new BaseController();
const preferenceService = new PreferenceService();

type PreferenceParams = {
  id: string; // user_id
};

type UpdatePreferenceBody = {
  email?: string;
  push?: boolean;
  reminder_time?: number;
  enabled?: boolean;
};

export const getPreference = async (
  req: Request<PreferenceParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "user_id is required",
      });
    }

    const preference = await preferenceService.get(id);
    base.success(res, preference);
  } catch (error) {
    base.error(res, error);
  }
};

export const updatePreference = async (
  req: Request<PreferenceParams, {}, UpdatePreferenceBody>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "user_id is required",
      });
    }

    if (!updates || !Object.keys(updates).length) {
      return res.status(400).json({
        success: false,
        message: "No updates provided",
      });
    }

    const updatedPreference = await preferenceService.update(id, updates);
    base.success(res, updatedPreference);
  } catch (error) {
    base.error(res, error);
  }
};
