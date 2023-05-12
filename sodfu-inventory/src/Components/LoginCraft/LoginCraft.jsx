import React, { useState } from 'react'
import { Navigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const LoginCraft = (props) => {
  const { login, isAuth } = props;
  const [localLogin, setLocalLogin] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    login(localLogin, password);
  };

  if (isAuth) return <Navigate to={"/it"} />

  return (
    <div className="h-screen flex align-items-center justify-content-center">
      <div className="flex flex-column gap-4">
        <div>
          <span className="p-float-label">
            <InputText
              id="localLogin"
              value={localLogin || ""}
              onChange={(e) => setLocalLogin(e.target.value)}
            />
            <label htmlFor="localLogin">Login</label>
          </span>
        </div>
        <div>
          <span className="p-float-label">
            <Password
              inputId="Password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="Password">Password</label>
          </span>
        </div>
        <div className='justify-content-center'>
          <Button className='w-full justify-content-center' onClick={submit}>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginCraft;