"use client";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  MobileNav,
  IconButton,
  Navbar,
} from "@material-tailwind/react";
import {
  Bars2Icon,
} from "@heroicons/react/24/outline";

import { FaCodeBranch } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { RiDashboardFill } from "react-icons/ri";
import { SiGoogleanalytics } from "react-icons/si";
import { GiPaperTray } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const menuItems = [
  {
    text: "Dashboard",
    icon: <RiDashboardFill className="h-5 w-5" />,
  },
  {
    text: "Analytics",
    icon: <SiGoogleanalytics className="h-5 w-5" />,
  },
  {
    text: "GitHub Commits",
    icon: <FaCodeBranch className="h-5 w-5" />,
  },
  {
    text: "Posts",
    icon: <GiPaperTray className="h-5 w-5" />,
    suffix: (
      <Chip
        value="14"
        size="sm"
        variant="ghost"
        color="blue-gray"
        className="rounded-full"
      />
    ),
  },
  {
    text: "Context",
    icon: <LuBrainCircuit className="h-5 w-5" />,
  },

  {
    text: "Settings",
    icon: <IoMdSettings className="h-5 w-5" />,
  },
];

function NavList() {
  return (
    <List>
      {menuItems.map((menuItem, index) => (
        <ListItem key={index}>
          <ListItemPrefix>{menuItem.icon}</ListItemPrefix>
          {menuItem.text}
          {menuItem.suffix && (
            <ListItemSuffix>{menuItem.suffix}</ListItemSuffix>
          )}
        </ListItem>
      ))}
    </List>
  );
}

export default function Sidebar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Card className="sticky w-full lg:w-auto top-28 left-4 p-4  shadow-xl shadow-blue-gray-900/5">
      {/* <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Project Menu
        </Typography>
      </div> */}
      <div className="hidden lg:block">
      <NavList />
      </div>
        
      <IconButton
        size="sm"
        color="blue-gray"
        variant="text"
        onClick={toggleIsNavOpen}
        className="ml-auto mr-2 lg:hidden"
      >
        <  Bars2Icon className="h-6 w-6" />
      </IconButton>
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-scroll"
          >
            <NavList />
          </motion.div>
        )}
      </AnimatePresence>
       
    </Card>
  );
}
