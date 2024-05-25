import { cookies } from "next/headers";

async function getData() {
  const cookieStore = cookies();
  console.log("--CLIENT---> page::call api --5--->", { cookieStore });
  try {
    const res = await fetch("http://localhost:3000/api/aaa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Tom" }),
    });

    // 檢查伺服器回應狀態碼
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    return null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // 或者根據你的需要返回一個默認值
  }
}

export default async function Page() {
  const cookieStore = cookies();
  const data = await getData();

  if (cookieStore.getAll().length === 0) return <div>沒有 cookie</div>;
  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
    </div>
  ));
}
