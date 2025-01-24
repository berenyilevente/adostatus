"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // Add this import

import {
  Navbar,
  NavbarCenter,
  NavbarEnd,
  NavbarStart,
  Icon,
  Button,
  DropdownToggle,
  Avatar,
  Dropdown,
} from "@/components";
import logoLight from "@/assets/images/logo/logo.png";

import { routes } from "@/lib/routes";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Loading } from "@/components/Loading/Loading";

export const Topbar = () => {
  const navigate = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  const onLogout = async () => {
    await signOut();
    navigate.push(routes.auth.login);
  };

  return (
    <Navbar className="topbar-wrapper z-10 border-b border-base-200 px-3">
      <NavbarStart className="gap-3">
        <Button variant="ghost" size="sm" aria-label="Leftmenu toggle">
          <Icon icon="menu" className="inline-block" fontSize={20} />
        </Button>
      </NavbarStart>
      <NavbarCenter />
      <NavbarEnd className="gap-1.5">
        <details className="dropdown">
          <summary className="btn btn-ghost m-1">
            {status === "loading" ? (
              <Loading />
            ) : (
              <div className="flex items-center gap-2">
                <Avatar src={user?.image || logoLight.src} alt="avatar" />
                <div className="flex flex-col items-start">
                  <p className="text-sm/none">{`${user?.email}`}</p>
                </div>
              </div>
            )}
          </summary>
          <div className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <Button variant="ghost" startIcon="user">
              My Profile
            </Button>
            <hr className="-mx-2 my-1 border-base-content/10" />
            <Button variant="ghost" onClick={onLogout} startIcon="logout">
              Logout
            </Button>
          </div>
        </details>
      </NavbarEnd>
    </Navbar>
  );
};
