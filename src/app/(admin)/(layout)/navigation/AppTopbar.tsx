import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

import {
  NavbarEnd,
  NavbarStart,
  Button,
  Avatar,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  Spinner,
  AvatarImage,
  Navbar,
  NavbarCenter,
  SidebarTrigger,
} from '@/components';
import avatar from '@/assets/images/avatar/avatar.png';

const UserDropdown = ({
  image,
  email,
  status,
  onLogout,
}: {
  email: string;
  image?: string | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  onLogout: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {status === 'loading' ? (
          <Spinner />
        ) : (
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage src={image || avatar.src} alt="avatar" />
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
        <Button variant="ghost" size="sm" onClick={onLogout} startIcon="logout" fullWidth>
          Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const AppTopbar = () => {
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
        <div className="flex items-center gap-6">
          <UserDropdown
            image={user?.image}
            email={user?.email || ''}
            status={status}
            onLogout={onLogout}
          />
        </div>
      </NavbarEnd>
    </Navbar>
  );
};
