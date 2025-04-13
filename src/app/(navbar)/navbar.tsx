"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { MySession } from "@/interfaces/mySession";

const Navbar = () => {
  const { data, status } = useSession() as MySession;

  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <>
      <nav className="bg-gray-900 text-white w-full">
        <div className="container mx-auto px-4 py-3 flexc !justify-between">
          {/* Logo */}
          <div className="flexc gap-3 w-52">
            <Image
              width={2000}
              height={2000}
              src="https://img.freepik.com/premium-vector/modern-shoes-logo-template-design_316488-856.jpg?w=2000"
              alt="Logo"
              className="rounded-full w-16"
            />
            <h1 className="text-lg font-semibold w-20 flexc" id="app-title">
              My Mine
            </h1>
          </div>

          {/* Menu */}
          <ul className="flex space-x-8 mx-2">
            {[
              { href: "/", text: "Home" },
              { href: "/products", text: "Store" },
              { href: "/about", text: "About" },
              { href: "/about/profile", text: "Profile" },
            ].map((value, index) => (
              <li key={index}>
                <Link
                  href={value.href}
                  className={`hover:text-white transall clicked flexc ${
                    pathname === value.href
                      ? "text-gray-300 font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  {value.text}
                </Link>
              </li>
            ))}

            {data ? (
              <li>
                <div className="hover:text-gray-400 transall clicked flexc">
                  <div className="flexc gap-2 relative">
                    <span className="w-8 flexc relative">
                      <Image
                        width={576}
                        height={576}
                        className="w-8 h-8 rounded-full transcenter outline outline-white"
                        src={
                          data?.user?.image ||
                          "https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
                        }
                        alt={data?.user?.fullname || "unknown"}
                      />
                    </span>

                    <span>{data?.user?.fullname}</span>
                    <span>{`-->`}</span>
                    <span
                      className={`font-bold ${
                        data?.user?.role === "admin"
                          ? "text-yellow-500"
                          : "text-sky-500"
                      }`}
                    >
                      {data?.user?.role}
                    </span>
                  </div>
                </div>
              </li>
            ) : (
              ""
            )}

            <li>
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/* ======================================== JIKA LOADING ======================================== */}
              {status === "loading" && (
                <button className="text-gray-400 transall">Loading...</button>
              )}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}

              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/* ======================================== JIKA TERAUTENTIKASI ======================================== */}
              {status === "authenticated" && (
                <button
                  onClick={() => signOut()}
                  className="hover:text-gray-400 transall clicked"
                >
                  Sign Out
                </button>
              )}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}

              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/* ======================================== JIKA TIDAK TERAUTENTIKASI ======================================== */}
              {status === "unauthenticated" && (
                <button
                  onClick={() => signIn()}
                  className="hover:text-gray-400 transall clicked"
                >
                  Sign In
                </button>
              )}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
