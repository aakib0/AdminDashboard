import React, { useState, useEffect } from "react";
import UserModal from "../components/Usermodal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    fetch("https://loadgo.in/loadgo/getUser")
      .then((res) => res.json())
      .then((data) => {
        const usersArray = Array.isArray(data) ? data : data.data;
        const formatted = usersArray.map((user) => ({
          ID: user.id,
          Name: user.name,
          Email: user.email,
          LoginPin: user.loginPin,
          PhoneNo: user.phone,
          CreatedOn: user.createdOn,
          aadharFront: user.aadharFront,
          dlFront: user.licenseFront,
          accountHolderName: user.accountHolderName || "N/A",
          bankName: user.bankName || "N/A",
          accountNumber: user.accountNumber || "N/A",
          IFSCCode: user.IFSCCode || "N/A",
        }));
        setUsers(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    [user.Name, user.Email, user.PhoneNo].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-emerald-600">Users</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />

      <table className="min-w-full border rounded">
        <thead className="bg-emerald-900 text-white">
          <tr>
            <th
              className="p-2 border cursor-pointer"
              onClick={() => requestSort("Name")}
            >
              Name{" "}
              {sortConfig.key === "Name"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th
              className="p-2 border cursor-pointer"
              onClick={() => requestSort("Email")}
            >
              Email
            </th>
            <th
              className="p-2 border cursor-pointer"
              onClick={() => requestSort("PhoneNo")}
            >
              Phone
            </th>
            <th className="p-2 border text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.ID} className="hover:bg-emerald-50">
              <td className="p-2 border">{user.Name}</td>
              <td className="p-2 border">{user.Email}</td>
              <td className="p-2 border">{user.PhoneNo}</td>
              <td className="p-2 border text-center">
                <UserModal user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
