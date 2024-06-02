import { cookies } from "next/headers";
import { headers } from "next/headers";

async function fetchCart() {
  const cookieString = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  console.log("server component cookieString ------->", cookieString);

  const headersList = headers();
  const accessToken = headersList.get("accessToken") || "";

  try {
    const res = await fetch("http://localhost:5000/getCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`, // 轉發當前的 cookie
      },
    });

    console.log(res.status);

    // 檢查伺服器回應狀態碼
    if (!res.ok) {
      return Response.json(
        { message: "API: /getCart response was not ok" },
        {
          status: res.status,
        }
      );
    }

    const data = await res.json();
    console.log("/getCart-----res------>", data);
    return Response.json(data, {
      status: res.status,
    });
  } catch (error) {
    console.error("Error in /getCart:", error);
  }
}

export default async function CartPage() {
  const response = await fetchCart();
  const result = await response.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-3xl font-bold">03.Cart-v1</h1>
      {result.data?.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </main>
  );
}
