import axios from "axios";
import { useState, useEffect } from "react";

export function Users({ setUser }) {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (filter) {
      axios
        .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
        .then((response) => {
          const fetchedUsers = response.data.users; // Make sure users exist in the response
          if (fetchedUsers && Array.isArray(fetchedUsers)) {
            setUsers(fetchedUsers);
            setShowDropdown(true);
          } else {
            setUsers([]); // If no users are returned, clear the list
            setShowDropdown(false);
          }
        })
        .catch((err) => {
          console.error("Error fetching users", err);
          setUsers([]); // Clear the list in case of error
          setShowDropdown(false);
        });
    } else {
      setUsers([]); // Clear users when filter is empty
      setShowDropdown(false);
    }
  }, [filter]);

  // Handle user selection
  const handleUserSelect = (user) => {
    if (user) {
      setFilter(user.username); // Set the selected user in the input field
      setShowDropdown(false);   // Hide the dropdown
      setUser(user);            // Pass the selected user back to the parent component
    } else {
      console.error("User is not defined");
    }
  };

  return (
    <div>
      <input
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        type="text"
        className="text-sm px-2 py-2 border-[1px] rounded-lg w-[20vw]"
        placeholder="Enter recipient's User ID"
        onFocus={() => setShowDropdown(true)}
      />

      {/* Dropdown for user suggestions */}
      {showDropdown && users && users.length > 0 && (
        <ul className="border bg-white max-h-[150px] overflow-y-auto w-[20vw] absolute z-10">
          {users.map((user) => (
            <li
              key={user._id}  // Ensure the key is unique with the _id
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleUserSelect(user)}  // Safely set user when clicked
            >
              {user.firstName} {user.lastName} ({user.username})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
