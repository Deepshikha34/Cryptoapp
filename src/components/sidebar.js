import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaGem, FaHome } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { MdOutlineHelp } from "react-icons/md";
import "react-pro-sidebar/dist/css/styles.css";
export const SideBar = ({}) => {
  return (
    <ProSidebar collapsed={true} breakPoint="md">
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        ></div>
      </SidebarHeader>
      <SidebarContent style={{ justifyContent: "center" }}>
        <Menu>
          <MenuItem icon={<FaHome />}>Home</MenuItem>
          <MenuItem icon={<FaGem />}>Profile</MenuItem>
          <MenuItem icon={<AiFillSetting />}>Settings</MenuItem>
          <MenuItem icon={<MdOutlineHelp />}>Help</MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
        ></div>
      </SidebarFooter>
    </ProSidebar>
  );
};
