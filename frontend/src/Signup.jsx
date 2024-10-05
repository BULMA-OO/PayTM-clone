import { useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Input } from "./Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signup() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-screen items-center bg-[#7F7F7F] justify-center">
      <div className="flex flex-col rounded-lg h-auto w-[350px] bg-[#FFFFFF] p-6 gap-4">
        <Header
          title="Sign Up"
          subHeading="Enter your information to create an account"
        />
        <Input
          onChange={(e) => {
            setFname(e.target.value);
          }}
          type="text"
          label="First Name"
          placeholder="John"
        />
        <Input
          onChange={(e) => {
            setLname(e.target.value);
          }}
          type="text"
          label="Last Name"
          placeholder="Doe"
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
              `http://localhost:3000/api/v1/user/signup`,
              {
                firstName: fname,
                lastName: lname,
                username: username,
                password: password,
              }
            );
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
          }}
          onClick2={()=>{navigate("/signin")}}
          label="Sign Up"
          footing="Already have an account? "
          subLabel="Login"
        />
      </div>
    </div>
  );
}
