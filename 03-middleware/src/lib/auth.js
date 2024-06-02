import { jwtVerify } from "jose";

const ACCESS_TOKEN_SECRET = "your_access_token_secret";
const JWT_ACCESS_TOKEN_SECRET = new TextEncoder().encode(ACCESS_TOKEN_SECRET);

export async function isAuthenticated(request) {
  try {
    const accessToken = request.cookies.get("accessToken")?.value ?? "";
    await jwtVerify(accessToken, JWT_ACCESS_TOKEN_SECRET);
    return { authenticated: true };
  } catch (error) {
    return { authenticated: false };
  }
}
