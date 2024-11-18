import { Balance } from "../components/Balance";
import { Navbar } from "../components/Navbar";
import { Welcome } from "../components/Welcome";
import { SendButton } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  

  useEffect(() => {
    const getUserName = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, redirecting to login");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/userdetail",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const firstname = response.data.firstname;
        setUser(firstname);
        // Set the user name from response
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    getUserName(); // Call the function
  }, []);

  return (
    <div className="font-[Manrope] min-h-[100vh] relative ">
      <Navbar  label={"New"} to={"/transaction"} label3={"Users"} to3={"/user"}/>
      <div className="mt-[20vh]">
        <Welcome label={user} />
      </div>
      <div className="mt-[5vh]">
        <Balance label={"Balance"} />
      </div>
      <div className="flex justify-center w-full h-[5vh] mt-[5vh]">
        <SendButton label={"Send Money"} to={"/transaction"} />
      </div>
      <div className="absolute bottom-0 right-0 bg-red mr-[2.5vw] mb-[1vh]">
        <button
          type="button"
          class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
