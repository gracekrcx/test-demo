import GotoLogin from "../components/GotoLogin";

export default async function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">03-about</h1>
      <GotoLogin />
    </main>
  );
}
