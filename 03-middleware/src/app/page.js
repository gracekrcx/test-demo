import Link from "next/link";
import GotoLogin from "./components/GotoLogin";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">03-middleware</h1>
      <GotoLogin />
      <br />
      <br />
      <Link href="/cart">go to page : cart</Link>
      <br />
      <br />
      <Link href="/about">go to page : about</Link>
    </main>
  );
}
