import { cookies } from "next/headers";

async function getCoin() {
  const cookieStore = cookies();
  console.log("--發另一個 request ---> 有沒有拿到 cookie --5-->", {
    cookieStore,
  });
  return null;
}

export default async function Coin() {
  const cookieStore = cookies();
  const data = await getCoin();

  if (cookieStore.getAll().length === 0) return <div>沒有 cookie</div>;
  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
    </div>
  ));
}
