import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { register } from "../redux/slices/authSlice";

const RegisterComponent: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleRegister = () => {
    dispatch(register({ username, password }))
      .unwrap()
      .then(() => {
        console.log("Registration succeeded");
      })
      .catch((error: any) => {
        console.error("Failed to register:", error);
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
      <button onClick={handleRegister} disabled={authStatus === "loading"}>
        {authStatus === "loading" ? "Registering..." : "Register"}
      </button>
      {authError && <div>{authError}</div>}
    </div>
  );
};

export default RegisterComponent;
