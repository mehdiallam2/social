import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Navigate, Outlet } from "react-router-dom";

function PriviteRoutes() {
  function doesHttpOnlyCookieExist(cookiename: string) {
    const d = new Date();
    d.setTime(d.getTime() + 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = cookiename + "=new_value;path=/;" + expires;
    return document.cookie.indexOf(cookiename + "=") == -1;
  }

  const isMobile = useMediaQuery("(max-width: 650px)");
  return doesHttpOnlyCookieExist("access_token") ? (
    <div className="loyaut">
      {isMobile ? <MobileNavigation /> : <Sidebar />}
      <Outlet />
    </div>
  ) : (
    <Navigate to="/signin" />
  );
}

export default PriviteRoutes;
