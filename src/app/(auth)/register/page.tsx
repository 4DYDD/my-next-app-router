"use client";

import Head from "next/head";
import React, { CSSProperties, useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#f3f4f6",
    fontFamily: `${inter.style.fontFamily} !important`,
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    border: "1px solid #d1d5db", // Updated border to match border-gray-300 in Tailwind
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    textAlign: "center" as CSSProperties["textAlign"],
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#4b5563",
  },
  input: {
    marginTop: "0.25rem",
    display: "block",
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
    outline: "none",
    fontFamily: `${inter.style.fontFamily} !important`,
  },
  button: {
    width: "100%",
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    fontFamily: `${inter.style.fontFamily} !important`,
  },
  linkText: {
    marginTop: "1rem",
    textAlign: "center" as CSSProperties["textAlign"],
    fontSize: "0.875rem",
    color: "#6b7280",
  },
  link: {
    color: "#3b82f6",
    textDecoration: "underline",
  },
};

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push } = useRouter();

  const handleSubmit = async (event: any) => {
    if (isLoading) return;
    event.preventDefault();

    setIsLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        fullname: event.currentTarget.fullname.value,
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      }),
    }).then((response) => response.json());

    // JIKA ERROR
    if (!res.status) {
      setError(res.message);
    } else {
      event.target.reset();
      push("/login");
    }

    setIsLoading(false);
    console.log(res);
  };

  return (
    <>
      <Head>
        <title>Register Page</title>
      </Head>

      <div className={inter.className} style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Register</h1>

          {error && (
            <>
              <h2 className="text-red-500 font-bold text-center mb-3">
                {error}
              </h2>
            </>
          )}

          <form onSubmit={handleSubmit} className={inter.className}>
            <div style={styles.formGroup}>
              <label htmlFor="fullname" style={styles.label}>
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                className={inter.className}
                style={styles.input}
                placeholder="Enter your full name"
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={inter.className}
                style={styles.input}
                placeholder="Enter your email"
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={inter.className}
                style={styles.input}
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className={`${isLoading && "!cursor-wait"} ${inter.className}`}
              disabled={isLoading}
              style={styles.button}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563eb")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#3b82f6")
              }
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>

          <p style={styles.linkText}>
            Sudah punya akun?{" "}
            <Link href={"/login"} style={styles.link}>
              login disini
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
