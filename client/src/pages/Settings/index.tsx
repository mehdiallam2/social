import SettingsSidebar from "./components/SettingsSidebar";
import { Outlet } from "react-router-dom";
import styles from "./indes.module.css";
import Sidebar from "@/components/Sidebar";

function Settings() {
  return (
    <>
      <SettingsSidebar />
      <Outlet />
    </>
  );
}

export default Settings;
