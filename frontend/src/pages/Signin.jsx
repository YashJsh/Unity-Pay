import { Header } from "../components/Header";
import { TopHeading } from "../components/TopHeading";
import Image1 from "../assets/Images/Image1.png";
import { EntryField } from "../components/EntryField";
import { Button } from "../components/Button";
import { Button2 } from "../components/Button2";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="font-[Manrope] min-h-screen w-full bg-slate-100 px-[20vw] py-[4vw]" >
      <div className="h-auto min-w-[60vw] max-w-[600px] border-[1px] rounded-2xl bg-white shadow-xl pb-[4vh]">
        <Header label={"Unity Pay"} label2={"Sign up"} to={"/signup"} />
        <div className="flex flex-col justify-center pt-[4vh] text-center items-center gap-4 px-[2vw] ">
          <div className="h-[25vh] min-w-[40vw] bg-black rounded-xl overflow-hidden ">
            <img src={Image1} alt="" className="w-full h-full object-cover" />
          </div>
          <TopHeading
            label={"Welcome to Unity Pay"}
            subHeading={"Log in to your account"}
          />
        </div>
        <div className="mt-[1vh] flex flex-col gap-4 w-full px-[10vw] ">
          <EntryField
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder={"username@gmail.com"}
            label={"Email address"}
          />
          <EntryField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"Password"}
          />
            
          <div className="flex gap-4">
            <Button
              label={"Log in"}
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "http://localhost:3000/api/v1/user/signin",
                    {
                      username,
                      password,
                    }
                  );
                  console.log("Response from server:", response);
                  if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    navigate("/dashboard");
                  } else {
                    alert("Login failed: No token received.");
                  }
                } catch (err) {
                  // Check for specific error messages
                  if (err.response) {
                    alert(`Login failed: ${err.response.data.message}`);
                  } else {
                    alert("Login failed: Something went wrong.");
                  }
                }
              }}
            />
            <Button2 label={"Sign up"} to={"/signup"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

/*
   <div className = "font-[Manrope] min-h-screen w-full bg-slate-100  px-[20vw] py-[4vw]">
        <div className="h-[80vh] w-[60vw] border-[1px] rounded-2xl bg-white  shadow-xl ">
          <Header label={"Unity Pay"}/>
          <div className="flex flex-col justify-center pt-[4vh] text-center items-center gap-4">
            <div className="h-[30vh] w-[45vw] bg-black rounded-xl overflow-hidden">
              <img src={Image1} alt="" className="bg-cover"/>
            </div>
            <TopHeading label={"Welcome to Unity Pay"} subHeading = {"Log in into your account"}/>
          </div>
          <div className="mt-[1vh] mx-[7.5vw] flex flex-col gap-3">
          <EntryField label = {"Email address"} placeholder={"Email"}/>
          <EntryField label = {"Password"} placeholder={"Password"}/>
          <Button label = {"Log in"}/>
          </div>
        </div>
    </div>

*/
