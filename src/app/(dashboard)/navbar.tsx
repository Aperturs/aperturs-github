"use client"

import React from "react";
import Image from 'next/image'
import { Navbar,MobileNav,Typography, Button, Menu, MenuHandler,MenuList, MenuItem,Avatar,Card,IconButton,} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { IoFileTrayStacked, IoHelpBuoy, IoNotificationsCircleSharp,IoLogOut } from "react-icons/io5";
import {BsFillGearFill,BsFileCodeFill} from 'react-icons/bs'
import {IoMdContact} from 'react-icons/io'
import {HiQueueList} from 'react-icons/hi2'
import { useAccount } from "@/hooks/useAccount";
import { redirect,useRouter } from "next/navigation";
import toast from "react-hot-toast";
import router from "next/router";
import Link from "next/link";

// profile menu component


function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { logout, loading } = useAccount();
  const router = useRouter();
  
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: IoMdContact,
      link: "/profile"
    },
    {
      label: "Settings",
      icon: BsFillGearFill,
      link: "/settings"
    },
    {
      label: "Notifications",
      icon: IoNotificationsCircleSharp,
      link: "/notifications"
    },
    {
      label: "Help",
      icon: IoHelpBuoy,
      link: "/help"
    },
    {
      label: "Sign Out",
      icon: IoLogOut,
      onClick: () => {
        logout();
        toast.success("Logged Out Successfully");
        router.push("/login");
      },
    },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, onClick,link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                if (onClick) {
                  onClick();
                }
                closeMenu();
              }}
              className={`flex items-center gap-2 rounded ${isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""}`}
            >
              {React.createElement(icon, {
                className: `h-5 w-5 mr-1 ${isLastItem ? "text-red-500" : ""}`,
              })}
              <Link href={link || '/'}>
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
              </Link>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}






function NavList() {

  const router = useRouter();

  const navListItems = [
    {
      label: "Projects",
      icon: BsFileCodeFill,
      href: "/projects",
    },
    {
      label: "All Drafts",
      icon: IoFileTrayStacked,
      href: "/drafts",
    },
    // {
    //   label: "Queue",
    //   icon: HiQueueList,
    //   href: "/queue",
    // },
  ];
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon,href }, key) => (
        <Link href={href} 
        >
        <Typography
          key={label}
          as="p"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })} {label}
          </MenuItem>
        </Typography>
        </Link>
      ))}
    </ul>
  );
}


export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-xl lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Link href="/projects">
        <Image
          src={'/logo.svg'}
          width={40}
          height={40}
          alt='Aperturs Logo'
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        />
        </Link>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
        <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu /> 
      </div>

      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}
