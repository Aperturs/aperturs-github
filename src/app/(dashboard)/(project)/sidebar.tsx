"use client";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  FiBarChart,
  FiShoppingBag,
  FiUser,
  FiSettings,
  FiInbox,
  FiPower,
} from "react-icons/fi";
import { FaCodeBranch } from "react-icons/fa";
import { MdDescription } from "react-icons/md";

const menuItems = [
  {
    text: "Dashboard",
    icon: <FiBarChart className="h-5 w-5" />,
  },
  {
    text: "Commits",
    icon: <FiShoppingBag className="h-5 w-5" />,
  },
  {
    text: "Posts",
    icon: <FiInbox className="h-5 w-5" />,
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
    icon: <FiUser className="h-5 w-5" />,
  },
  {
    text: "Settings",
    icon: <FiSettings className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  return (
    <Card className="fixed top-28 left-4 p-4 max-w-[20rem]  shadow-xl shadow-blue-gray-900/5">
      {/* <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Project Menu
        </Typography>
      </div> */}

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
    </Card>
  );
}
