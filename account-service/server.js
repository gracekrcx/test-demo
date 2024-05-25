const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// const { createClient } = require('redis');
const path = require("path");

const app = express();
const PORT = 5000;
const ACCESS_TOKEN_SECRET = "your_access_token_secret";
const REFRESH_TOKEN_SECRET = "your_refresh_token_secret";

// const redisClient = createClient();

// redisClient.connect().catch(console.error);

app.use(bodyParser.json());
app.use(cookieParser());

// 指定靜態文件目錄
app.use(express.static(path.join(__dirname, "public")));

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // 這裡應該添加驗證邏輯，例如查詢資料庫
  if (username && password) {
    const accessToken = jwt.sign({ username }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ username }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    try {
      // 將 refresh token 暫存到 Redis
      // await redisClient.setEx(username, 604800, refreshToken); // 7 天的秒數

      // 設定 cookie
      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.cookie("refreshToken", refreshToken, { httpOnly: true });

      res.json({ message: "Login successful" });
    } catch (err) {
      console.error("Redis setEx error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// 刷新 accessToken 的路由
app.post("/refresh", async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "Missing refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const { username } = decoded;

    // const storedRefreshToken = await redisClient.get(username);

    if (refreshToken !== storedRefreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign({ username }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    // 设置新的 accessToken cookie
    res.cookie("accessToken", newAccessToken, { httpOnly: true });

    res.json({ message: "Access token refreshed" });
  } catch (err) {
    console.error("Error refreshing access token:", err);
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

// 指向 index.html 的路由
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
