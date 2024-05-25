async function getData() {
  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "uucc", password: "333" }),
      // body: JSON.stringify({ username: "", password: "" }),
    });
    // 檢查 res 的 response 裡有沒有 cookie accessToken
    const cookies = res.headers.get("Set-Cookie");
    console.log("--Server--Component res 拿到的 headers --->", cookies);
    console.log("-->>> res.status--->", res.status);

    // 檢查伺服器回應狀態碼
    if (!res.ok) {
      throw new Error("API: /login response was not ok");
    }

    return null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // 或者根據你的需要返回一個默認值
  }
}

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">01-API</h1>
    </main>
  );
}
