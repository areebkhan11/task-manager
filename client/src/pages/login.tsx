import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { login } from "../redux/slices/authSlice";

const LoginComponent: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleLogin = () => {
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        console.log("Login succeeded");
      })
      .catch((error: any) => {
        console.error("Failed to login:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={authStatus === "loading"}>
        {authStatus === "loading" ? "Logging in..." : "Login"}
      </button>
      {authError && <div>{authError}</div>}
    </div>
  );
};

export default LoginComponent;
