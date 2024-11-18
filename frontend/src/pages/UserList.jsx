import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/bulk"
        );
        const fetchedUsers = response.data.users; // Ensure 'users' exists in the response

        if (fetchedUsers && Array.isArray(fetchedUsers)) {
          setUsers(fetchedUsers);
        } else {
          console.log("No users found");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs only once on mount
  {
    console.log(users);
  }
  const sortedUsers = [...users].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );
  return (
    <div>
      <Navbar label={"Home"} to={"/dashboard"} />

      <div className="flex justify-center">
        <div className="Users flex flex-col w-[45vw] mx-[10vw] my-10 py-[5vh] h-auto gap-3 px-[3vw] bg-inherit shadow-xl rounded-2xl justify-center text-center">
          <h1 className="text-xl font-semibold">FRIENDS AND FAMILY MEMBERS</h1>
          {sortedUsers.length > 0 ? (
            <table className="min-w-full text-left table-auto rounded-xl shadow-2xl ">
              <thead>
                <tr>
                  <th className="px-6 py-2">Email</th>
                  <th className="px-6 py-2">FirstName</th>
                  <th className="px-6 py-2">LastName</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="px-6 py-2">{user.username}</td>
                    <td className="px-6 py-2">{user.firstName}</td>
                    <td className="px-6 py-2">{user.lastName}</td>{" "}
                    {/* Assuming each user has these fields */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
