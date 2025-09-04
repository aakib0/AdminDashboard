import React, { useState, useEffect } from "react";
import DriverModal from "../components/DriverModal";

const Dashboard = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    fetch("https://loadgo.in/loadgo/getDriver")
      .then((res) => res.json())
      .then((data) => {
        const driversArray = Array.isArray(data) ? data : data.data;
        const formatted = driversArray.map((user) => ({
          ID: user.id,
          Name: user.driverName,
          VehicleNo: user.vehicleNo,
          VehicleType: user.vehicletype,
          PhoneNo: user.phone,
          status: user.id % 2 === 0 ? "Active" : "Inactive",
          joined: "2024-08-21",
          aadharFront: user.aadharFront,
          dlFront: user.licenseFront,
          accountHolderName: user.accountHolderName || "N/A",
          bankName: user.bankName || "N/A",
          accountNumber: user.accountNumber || "N/A",
          IFSCCode: user.IFSCCode || "N/A",
        }));
        setDrivers(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching drivers:", err);
        setLoading(false);
      });
  }, []);

  const filteredDrivers = drivers.filter((d) =>
    [d.Name, d.VehicleNo, d.VehicleType].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  const sortedDrivers = [...filteredDrivers].sort((a, b) => {
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

  if (loading) return <p>Loading drivers...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-emerald-600">Dashboard</h1>

      <input
        type="text"
        placeholder="Search drivers..."
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
              onClick={() => requestSort("VehicleNo")}
            >
              Vehicle No
            </th>
            <th
              className="p-2 border cursor-pointer"
              onClick={() => requestSort("VehicleType")}
            >
              Type
            </th>
            <th className="p-2 border text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedDrivers.map((driver) => (
            <tr key={driver.ID} className="hover:bg-emerald-50">
              <td className="p-2 border">{driver.Name}</td>
              <td className="p-2 border">{driver.VehicleNo}</td>
              <td className="p-2 border">{driver.VehicleType}</td>
              <td className="p-2 border text-center">
                <DriverModal user={driver} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
