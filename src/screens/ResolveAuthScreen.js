//create so we dont get a millisecond glance at the login page if logged in


import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/authContext";
export default function ResolveAuthScreen() {
  const { tryLocalSignin } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignin();
  }, []);
  return null;
}
