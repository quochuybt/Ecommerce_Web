import jwt from "jsonwebtoken";

const accessSecret = process.env.JWT_SECRET || "dev-access-secret-minimum-32-characters";
const refreshSecret = process.env.REFRESH_TOKEN_SECRET || "dev-refresh-secret-minimum-32-chars";

export function signAccessToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, accessSecret, { expiresIn: "15m" });
}

export function signRefreshToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, refreshSecret, { expiresIn: "7d" });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, accessSecret);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, refreshSecret);
}
