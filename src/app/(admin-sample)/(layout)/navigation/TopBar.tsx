"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import {
  NavbarEnd,
  NavbarStart,
  Icon,
  Button,
  Avatar,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  Spinner,
  AvatarImage,
  AvatarFallback,
  Navbar,
  NavbarCenter,
  SidebarTrigger,
} from "@/components";
import avatar from "@/assets/images/avatar/avatar.png";
import { routes } from "@/lib/routes";

const UserDropdown = ({
  image,
  email,
  status,
  onLogout,
}: {
  image: string;
  email: string;
  status: "loading" | "authenticated" | "unauthenticated";
  onLogout: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {status === "loading" ? (
          <Spinner />
        ) : (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={image || avatar.src} alt="avatar" />
              <AvatarFallback>
                <Icon icon="user" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <p className="text-sm/none">{`${email}`}</p>
            </div>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Button variant="ghost" size="sm" startIcon="user" fullWidth>
          My Profile
        </Button>
        <hr className="-mx-2 my-1 border-base-content/10" />
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          startIcon="logout"
          fullWidth
        >
          Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Topbar = () => {
  const navigate = useRouter();
  const { data: session, status } = useSession();

  const user = session?.user;

  const onLogout = async () => {
    await signOut();
  };

  return (
    <Navbar className="topbar border-b border-base-200 pl-3 pr-6">
      <NavbarStart>
        <SidebarTrigger />
      </NavbarStart>
      <NavbarCenter />
      <NavbarEnd>
        <UserDropdown
          image={user?.image || avatar.src}
          email={user?.email || ""}
          status={status}
          onLogout={onLogout}
        />
      </NavbarEnd>
    </Navbar>
  );
};
