import { useState } from "react";
import { loginUser } from "../src/services/api";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      router.push("/notes");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {/* Updated Link without wrapping <a> */}
      <p>
        Don't have an account?{" "}
        <Link href="/register">Register here</Link>
      </p>
    </div>
  );
}
