"use client";

import Head from "next/head";
import React, { CSSProperties, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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

const LoginPage = ({ searchParams }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const { callbackUrl }: any = React.use(searchParams);

  const handleLogin = async (event: any) => {
    if (isLoading) return;

    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
        callbackUrl: callbackUrl || "/dashboard",
      });

      if (!res?.error) {
        push(callbackUrl || "/dashboard");
        event.target.reset();
      } else {
        setError("Email or Password is Incorrect");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setError(error);
      setIsLoading(false);
    }
  };

  const handleSignInWithGoogle = async (event: any) => {
    if (isLoading) return;

    event.preventDefault();

    setError("");
    setIsLoading(true);

    signIn("google", {
      redirect: false,
      callbackUrl,
    });
  };

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className={inter.className} style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Login</h1>

          {error && (
            <>
              <h2 className="text-red-500 font-bold text-center mb-3">
                {error}
              </h2>
            </>
          )}

          <form onSubmit={handleLogin} className={inter.className}>
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
              style={{
                ...styles.button,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                textAlign: "center",
                transition: "all 0.1s ease-out",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563eb")
              }
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#3b82f6";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = "none";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.border = "1px solid #d1d5db";
              }}
            >
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  <i
                    className="fa-solid fa-right-to-bracket"
                    style={{
                      fontSize: "15px",
                      color: "inherit",
                    }}
                  ></i>
                  <span>Login</span>
                </>
              )}
            </button>
          </form>
          <button
            type="button"
            className={`${isLoading && "!cursor-wait"} ${inter.className}`}
            style={{
              ...styles.button,
              backgroundColor: "white",
              color: "#3b82f6",
              marginTop: "1rem",
              border: "1px solid #d1d5db",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              textAlign: "center",
              transition: "all 0.1s ease-out",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb"; // Darker blue for hover
              e.currentTarget.style.color = "white"; // White text for contrast
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "#3b82f6";
              e.currentTarget.style.transform = "scale(1)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            onClick={handleSignInWithGoogle}
            onFocus={(e) => {
              e.currentTarget.style.outline = "none";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.border = "1px solid #d1d5db";
            }}
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                <i
                  className="fa-brands fa-google"
                  style={{
                    fontSize: "15px",
                    color: "inherit",
                  }}
                ></i>
                <span
                  style={{
                    display: "inline-block",
                  }}
                >
                  Sign in with Google
                </span>
              </>
            )}
          </button>

          <br />
          <hr className="border rounded-full border-[#3b82f6]" />

          <p style={styles.linkText}>
            Belum punya akun?{" "}
            <Link href={"/register"} style={styles.link}>
              register disini
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
