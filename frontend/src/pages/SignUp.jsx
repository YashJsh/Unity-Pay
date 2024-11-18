import React, { useState } from "react";
import { Header } from "../components/Header";
import { EntryField } from "../components/EntryField";
import { Button } from "../components/Button";
import { Password } from "../components/Password";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");

  return (
    <div className="font-[Manrope] min-h-screen w-full bg-slate-100 px-[20vw] py-[4vw]">
      <div className="h-auto min-w-[60vw] max-w-[600px] border-[1px] rounded-2xl bg-white shadow-xl pb-[4vh]">
        <Header label={"Unity Pay"} label2={"Sign in"} to={"/signin"}/>
        <div className="mx-[10vw] py-[5vh] flex flex-col gap-4">
            <h1 className="font-medium text-4xl ">Create a Unity Pay account</h1>
            <EntryField onChange={e=>{
              setUsername(e.target.value)
            }} label={"Email"} placeholder={"username@gmail.com"}/>
            <EntryField onChange={e=>{
              setFirstName(e.target.value)
            }}label={"FirstName"} placeholder={"eg. John"}/>
            <EntryField onChange={e=>{
              setLastName(e.target.value)
            }}label={"LastName"} placeholder={"eg. Carter"}/>
            <Password onChange={e=>{
              setPassword(e.target.value)
            }}label={"Password"} placeholder={"New Password"}/>
            <Button onClick = {async ()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                  username,
                  firstName,
                  lastName,
                  password
                });
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            }}label={"SignUp"}/>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
