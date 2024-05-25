// app/about/page.js
import { redirect } from "next/navigation";

export default function About() {
  // 立即重定向到指定的 URL
  redirect("http://localhost:5000");
}
