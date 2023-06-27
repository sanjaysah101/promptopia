"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'
import { useEffect, useState } from "react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  // console.log(providers)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, [])

  return (
    <nav className="flex_between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex_center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-content"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop navigation */}

      <div className="sm:flex hidden"> {/* Here hidden means btn will be hidden in mobile devices but show in higher devices */}
        {session?.user ? (
          <div
            className="flex gap-3 md:gap-5">
            <Link
              href="/create-prompt"
              className="black_btn"
            >
              Create Post
            </Link>

            <button
              type="button"
              onClick={signOut}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt="Profile"
                style={{
                  objectFit: "contain",
                  borderRadius: "50%"
                }}
              />
            </Link>
          </div>
        ) : <>
          {
            providers &&
            Object
              .values(providers)
              .map(providers => (
                <button
                  type="button"
                  key={providers.name}
                  onClick={() => signIn(providers.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
          }
        </>}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              alt="Profile"
              onClick={
                () => setToggleDropdown(prev => !prev)
              }
              style={{
                objectFit: "contain",
                borderRadius: "50%"
              }}
            />

            {/* if toggleDropdown is true then */}
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : <>
          {
            providers &&
            Object
              .values(providers)
              .map(providers => (
                <button
                  type="button"
                  key={providers.name}
                  onClick={() => signIn(providers.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
          }
        </>}
      </div>
    </nav>
  )
}

export default Nav
