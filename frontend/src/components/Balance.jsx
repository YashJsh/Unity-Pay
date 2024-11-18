import { useState , useEffect } from "react";
import axios from "axios";

export function Balance(){
    const [balance, setBalance] = useState(0);
   
    useEffect(()=>{
        const getBalance = async ()=>{
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found, redirecting to login");
                return;
            }
            const response = await axios.get("http://localhost:3000/api/v1/account/balance",
                {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                }
            );

            const balance = response.data.balance;
            setBalance(balance);
        }
        getBalance();
    },[])

    return (
        <div className="flex justify-center items-center ">
            <h2 className="text-xl font-medium ">Your Balance is : ₹ </h2>
            <h3 className= "text-xl font-medium">{" "}{balance}</h3>
        </div>
    )
}