import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { EntryField } from "../components/EntryField";
import { SendButton } from "../components/Button";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SendMoney = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState();
  const [user, setUser] = useState("");
  return (
    <div className="font-[Manrope] min-h-screen w-full ">
      <Navbar label="Home" label2="Help" to="/" to2="/" />
      <div className="flex">
        <div className="send-money flex flex-col w-[35vw] mx-[10vw] my-10 py-[5vh] h-auto gap-3 px-[3vw] bg-inherit shadow-xl rounded-2xl">
          <h1 className="text-2xl font-semibold">
            Send Money to friends and Family
          </h1>
          <div className="text-sm font-medium px-2 ">To</div>
          
          <Users setUser={setUser} />
          <EntryField
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            label="Amount"
            placeholder="0.00"
          />
          <EntryField
            label="Add a Note"
            height="h-[15vh]"
            placeholder="Add a note (optional)"
          />

          <SendButton
            label="Send"
            onClick={async () => {
              const token = localStorage.getItem("token");
              if (!token) {
                console.error("No token found, redirecting to login");
                return;
              }

              if (!user || !user._id) {
                console.error("No recipient selected");
                return;
              }

              if (!amount || isNaN(amount)) {
                console.error("Invalid amount");
                return;
              }

              try {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/account/transfer",
                  {
                    amount: amount, // Request body
                    to: user._id, // Recipient ID
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`, // Authorization header
                    },
                  }
                );
                console.log("Transfer successful", response.data);
                navigate('/dashboard')
              } catch (err) {
                console.error("Error during transfer", err);
              }
            }}
          />
        </div>
        <div className="h-[25vh] min-w-[40vw] rounded-xl overflow-hidden min-h-[65vh] my-10 py-[5vh] mr-[1vw] px-[3vw] bg-[url('/src/assets/Images/Image2.png')] bg-cover bg-center shadow-2xl">
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
