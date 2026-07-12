import crypto from "crypto";
import { RefreshToken } from "../models/associations.js";

const generateRefreshToken = async (userId) => {
  const rawToken = crypto.randomBytes(40).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await RefreshToken.create({
    user_id: userId,
    token_hash: tokenHash,
    expires_at: expiresAt,
  });

  return rawToken;
};

export default generateRefreshToken;