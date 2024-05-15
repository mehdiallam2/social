import { Navigate, Outlet } from "react-router-dom";

function AuthRoutes() {
  function doesHttpOnlyCookieExist(cookiename: string) {
    const d = new Date();
    d.setTime(d.getTime() + 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = cookiename + "=new_value;path=/;" + expires;
    return document.cookie.indexOf(cookiename + "=") == -1;
  }

  return doesHttpOnlyCookieExist("access_token") ? <Navigate to="/" /> : <Outlet />;
}

export default AuthRoutes;
