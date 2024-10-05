/* eslint-disable react/no-unescaped-entities */
import { Header } from "./Header.jsx";
import { Input } from "./Input.jsx";
import { Footer } from "./Footer.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function Signin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-screen items-center bg-[#7F7F7F] justify-center">
      <div className="flex flex-col rounded-lg h-auto w-[400px] bg-[#FFFFFF] p-6 gap-4">
        <Header
          title="Sign In"
          subHeading="Enter your credentials to access your account"
        />
        <Input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="email"
          label="Email"
          placeholder="johndoe@gmail.com"
        />
        <Input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          label="Password"
          placeholder=""
        />
        <Footer
          onClick1={async () => {
            const { data } = await axios.post(
              `http://localhost:3000/api/v1/user/signin `,
              {
                username: username,
                password: password,
              }
            );
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
          }}
          onClick2={() => {
            navigate("/");
          }}
          label="Sign In"
          footing="Don't have an account? "
          subLabel="Sign Up"
        />
      </div>
    </div>
  );
}
