import { isAuthenticated } from "./lib/auth";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const ip = request.ip ?? "Unknown";
  const userAgent = request.headers.get("user-agent") ?? "Unknown";
  const referer = request.headers.get("referer") ?? "Direct";
  const method = request.method;
  const timestamp = new Date().toISOString();
  // log
  console.log(`LOG---------------------------------`);
  console.log("[Middleware]-url::", request.url);
  console.log(`[Middleware]:: ${timestamp} ${method} ${path}`);
  console.log(`[Middleware]-IP:: ${ip}`);
  console.log(`[Middleware]-User-Agent:: ${userAgent}`);
  console.log(`[Middleware]-Referer:: ${referer}`);
  console.log(`LOG---------------------------------`);

  const { authenticated } = await isAuthenticated(request);
  if (authenticated === false) {
    console.log("-------->accessToken 過期");
    // 打 api 的動作
    try {
      const res = await fetch("http://localhost:5000/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: request.headers.get("cookie"), // 轉發當前的 cookie
        },
      });
      // 檢查 res 的 response 裡有沒有 cookie accessToken
      const cookies = res.headers.get("set-cookie");
      console.log("-- MW res 拿到的 headers ------>", cookies);
      console.log("-- MW res.status--->", res.status);

      // 創建新的 response，並設置從 auth service 接收到的 cookie
      const updatedResponse = NextResponse.next();
      updatedResponse.headers.append("set-cookie", cookies);

      // 檢查伺服器回應狀態碼
      if (!res.ok) {
        throw new Error("API: /login response was not ok");
      }
      return updatedResponse;
    } catch (error) {
      console.error("Error in middleware:", error);
    }
  }
}

export const config = {
  matcher: ["/cart", "/api/:path*"],
};
