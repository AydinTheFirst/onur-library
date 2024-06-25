import { LicenseModel } from "@/database/models/License";
import { ForbiddenError, UnauthorizedError } from "@/lib/express";
import { Handler } from "express";

export const isLicensed: Handler = async (req, res, next) => {
  if (!req.user) {
    return UnauthorizedError(res, "You are not logged in!");
  }

  if (req.user.isAdmin) return next();

  if (!req.user.licenseId) {
    return ForbiddenError(
      res,
      "Siteye erişmek için admin tarafından lisanslandırılmalısınız!"
    );
  }

  const license = await LicenseModel.findById(req.user.licenseId);

  if (!license) {
    return ForbiddenError(res, "Lisansınız bulunamadı!");
  }

  if (license.createdAt > Date.now() || license.expiresAt < Date.now()) {
    return ForbiddenError(res, "Lisansınız geçerli değil!");
  }

  next();
};
