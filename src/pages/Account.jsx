import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Account = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user?.fullName?.split(" ")[0] || "",
    lastName: user?.fullName?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    address: "Kingston, 5236, United State",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Breadcrumb + Welcome */}
      <div className="flex justify-between items-center mb-10 text-sm">
        <div className="text-gray-500">
          Home / <span className="text-black">My Account</span>
        </div>
        <div>
          Welcome!{" "}
          <span className="text-primaryRed font-medium">
            {user?.fullName || "Guest"}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/4">
          <div className="mb-6">
            <h4 className="font-medium mb-4">Manage My Account</h4>
            <ul className="flex flex-col gap-2 pl-4 text-sm">
              <li className="text-primaryRed cursor-pointer">My Profile</li>
              <li className="text-gray-500 cursor-pointer hover:text-primaryRed">
                Address Book
              </li>
              <li className="text-gray-500 cursor-pointer hover:text-primaryRed">
                My Payment Options
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-4">My Orders</h4>
            <ul className="flex flex-col gap-2 pl-4 text-sm">
              <li className="text-gray-500 cursor-pointer hover:text-primaryRed">
                My Returns
              </li>
              <li className="text-gray-500 cursor-pointer hover:text-primaryRed">
                My Cancellations
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">My WishList</h4>
          </div>
        </div>

        {/* Edit Profile Form */}
        <div className="w-full lg:w-3/4 bg-white shadow-md rounded-md p-8">
          <h2 className="text-xl font-medium text-primaryRed mb-8">
            Edit Your Profile
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-gray-100 p-3 rounded focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-gray-100 p-3 rounded focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-100 p-3 rounded focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="bg-gray-100 p-3 rounded focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <label className="text-sm font-medium">Password Changes</label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={formData.currentPassword}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded focus:outline-none focus:ring-1 focus:ring-black"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded focus:outline-none focus:ring-1 focus:ring-black"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="px-8 py-3 rounded hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primaryRed text-white px-8 py-3 rounded hover:bg-red-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
