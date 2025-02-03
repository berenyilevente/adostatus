"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // Add this import
import { signOut } from "next-auth/react";

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
  Loading,
  Logo,
} from "@/components";
import avatar from "@/assets/images/avatar/avatar.png";
import { routes } from "@/lib/routes";
import { Link } from "@react-email/components";
import { config } from "@/config";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useNavigation } from "./use-navigation";

export const Topbar = () => {
  const { isNavbarOpen, setIsNavbarOpen } = useNavigation();

  const navigate = useRouter();
  const { data: session, status } = useSession();

  const user = session?.user;

  const onLogout = async () => {
    await signOut();
    navigate.push(routes.auth.login);
  };

  return (
    <Navbar className="topbar z-10 border-b border-base-200 px-3">
      <NavbarStart className="gap-3">
        <Button
          variant="ghost"
          size="sm"
          aria-label="Leftmenu toggle"
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        >
          <Icon icon="menu" className="inline-block" />
        </Button>
      </NavbarStart>
      <NavbarCenter />
      <NavbarEnd className="gap-1.5">
        <Dropdown>
          <DropdownToggle>
            {status === "loading" ? (
              <Loading />
            ) : (
              <div className="flex items-center gap-2">
                <Avatar src={user?.image || avatar.src} alt="avatar" />
                <div className="flex flex-col items-start">
                  <p className="text-sm/none">{`${user?.email}`}</p>
                </div>
              </div>
            )}
          </DropdownToggle>
          <div className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <Button variant="ghost" size="sm" startIcon="user">
              My Profile
            </Button>
            <hr className="-mx-2 my-1 border-base-content/10" />
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              startIcon="logout"
            >
              Logout
            </Button>
          </div>
        </Dropdown>
      </NavbarEnd>
    </Navbar>
  );
};
