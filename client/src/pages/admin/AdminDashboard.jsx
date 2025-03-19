// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { FaBoxes, FaList, FaUserCircle, FaEdit, FaTrash } from "react-icons/fa";
// import useProfileUpdate from "../../hooks/user/useProfileUpdate";
// import { SetUser } from "../../store/features/userSlice";
// import toast from "react-hot-toast";
// import useGetAllUsers from "../../hooks/admin/useGetAllUsers";

// const AdminDashboard = () => {
//   const { user } = useSelector((state) => state.users);
//   const { updateUser } = useProfileUpdate();
//   const { getAllUsers } = useGetAllUsers();
//   const dispatch = useDispatch();
//   const location = useLocation();

//   const [allUsers, setAllUsers] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedUser, setUpdatedUser] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     role: user?.role || "",
//   });

//   // Handle Input Change
//   const handleChange = (e) => {
//     setUpdatedUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // Handle all User
//   const handleAllUsers = async () => {
//     const users = await getAllUsers();
//     setAllUsers(users);
//   };

//   // Handle Update User
//   const handleUpdate = async () => {
//     if (!updatedUser.name || !updatedUser.email) {
//       return toast.error("Name and Email are required!");
//     }
//     try {
//       await updateUser({ updatedUser });
//       dispatch(SetUser(updatedUser));
//       setIsEditing(false);
//       toast.success("Profile updated successfully!");
//     } catch (error) {
//       toast.error("Failed to update profile!");
//     }
//   };

//   useEffect(() => {
//     handleAllUsers();
//   }, []);

//   // Handle Delete User
//   const handleDelete = (userId) => {
//     if (userId === user._id) {
//       return toast.error("You cannot delete your own account.");
//     }
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this user?"
//     );
//     if (confirmDelete) {
//       console.log(`Deleting user with ID: ${userId}`);
//       // Dispatch a delete action or API call
//       toast.success("User deleted successfully!");
//     }
//   };

//   // Sidebar Links Data
//   const sidebarLinks = [
//     {
//       to: "/admin/manage-products",
//       icon: <FaBoxes />,
//       label: "Manage Products",
//     },
//     {
//       to: "/admin/manage-category",
//       icon: <FaList />,
//       label: "Manage Category",
//     },
//     {
//       to: "/admin/all-orders",
//       icon: <FaUserCircle />,
//       label: "View All Orders",
//     },
//   ];

//   return (
//     <div className='md:flex min-h-screen bg-gray-100'>
//       {/* Sidebar */}
//       <aside className='md:w-64 bg-blue-800 text-white p-5 space-y-6'>
//         <h2 className='text-2xl font-bold text-center'>Admin Panel</h2>
//         <nav className='space-y-3'>
//           {sidebarLinks.map((link) => (
//             <Link
//               key={link.to}
//               to={link.to}
//               className={`flex items-center gap-3 p-3 rounded-lg transition ${
//                 location.pathname === link.to
//                   ? "bg-blue-600"
//                   : "hover:bg-blue-600"
//               }`}
//             >
//               {link.icon} {link.label}
//             </Link>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className='flex-1 p-6'>
//         <h2 className='text-2xl font-bold mb-4'>Users Management</h2>

//         {/* Users List */}
//         <div className='bg-white shadow-md rounded-lg p-4 overflow-x-auto'>
//           <table className='w-full border-collapse min-w-[600px]'>
//             <thead>
//               <tr className='bg-gray-200'>
//                 <th className='p-3 text-left'>User</th>
//                 <th className='p-3 text-left'>Email</th>
//                 <th className='p-3 text-left'>Role</th>
//                 <th className='p-3 text-left'>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {allUsers?.map((u, i) => (
//                 <tr key={i} className='border-t'>
//                   <td className='p-3'>{u?.name}</td>
//                   <td className='p-3'>{u?.email}</td>
//                   <td className='p-3 text-green-600'>{u?.role}</td>
//                   <td className='p-3'>
//                     <span className='flex gap-4'>
//                       <FaEdit
//                         onClick={() => setIsEditing(true)}
//                         className='text-green-500 cursor-pointer text-xl'
//                         aria-label='Edit User'
//                       />
//                       <FaTrash
//                         className='text-red-500 cursor-pointer text-xl'
//                         onClick={() => handleDelete(u?._id)}
//                         aria-label='Delete User'
//                       />
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Edit User Form (Visible Only When Editing) */}
//         {isEditing && (
//           <div className='mt-4 p-4 bg-gray-100 rounded-md'>
//             <h3 className='text-lg font-semibold mb-2'>Update Profile</h3>

//             {/* Name Input */}
//             <label className='block mb-2 text-sm font-medium'>
//               Name <span className='text-red-500'>*</span>
//             </label>
//             <input
//               type='text'
//               name='name'
//               value={updatedUser.name}
//               onChange={handleChange}
//               className='w-full p-2 border rounded-md mb-2'
//               placeholder='Enter Name'
//             />

//             {/* Email Input */}
//             <label className='block mb-2 text-sm font-medium'>
//               Email <span className='text-red-500'>*</span>
//             </label>
//             <input
//               type='email'
//               name='email'
//               value={updatedUser.email}
//               onChange={handleChange}
//               className='w-full p-2 border rounded-md mb-2'
//               placeholder='Enter Email'
//             />

//             {/* Role Input */}
//             <label className='block mb-2 text-sm font-medium'>Role</label>
//             <input
//               type='text'
//               name='role'
//               value={updatedUser.role}
//               className='w-full p-2 border rounded-md mb-2'
//               placeholder='Enter Role'
//               disabled
//             />

//             <div className='flex gap-2 mt-3'>
//               <button
//                 onClick={handleUpdate}
//                 className='w-full bg-blue-500 text-white px-4 py-2 rounded-md'
//               >
//                 Update
//               </button>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className='w-full bg-red-500 text-white px-4 py-2 rounded-md'
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaBoxes,
  FaList,
  FaUserCircle,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import useProfileUpdate from "../../hooks/user/useProfileUpdate";
import useGetAllUsers from "../../hooks/admin/useGetAllUsers";
import toast from "react-hot-toast";
import useDeleteUserById from "../../hooks/admin/useDeleteUserById";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.users);
  const { updateUser } = useProfileUpdate();
  const { getAllUsers } = useGetAllUsers();
  const { deleteUser } = useDeleteUserById();

  const location = useLocation();

  const [allUsers, setAllUsers] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [userUpdates, setUserUpdates] = useState({});

  // Fetch Users
  const fetchUsers = async () => {
    const users = await getAllUsers();
    setAllUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Input Change
  const handleInputChange = (e, userId) => {
    const { name, value } = e.target;
    setUserUpdates((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [name]: value,
      },
    }));
  };

  // Enable Edit Mode
  const handleEdit = (userId) => {
    setEditMode(userId);
    setUserUpdates((prev) => ({
      ...prev,
      [userId]: { ...allUsers.find((u) => u._id === userId) },
    }));
  };

  // Enable Edit Mode
  const handleDelete = async (userId) => {
    await deleteUser(userId);
    fetchUsers();
  };

  // Handle User Update
  const handleUpdate = async (userId) => {
    if (!userUpdates[userId]?.name || !userUpdates[userId]?.email) {
      return toast.error("Name and Email are required!");
    }

    try {
      await updateUser({ updatedUser: userUpdates[userId] });
      setEditMode(null);
      toast.success("User updated successfully!");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update user.");
    }
  };

  // Handle Cancel Edit
  const handleCancel = () => {
    setEditMode(null);
  };

  // Sidebar Links Data
  const sidebarLinks = [
    {
      to: "/admin/manage-products",
      icon: <FaBoxes />,
      label: "Manage Products",
    },
    {
      to: "/admin/manage-category",
      icon: <FaList />,
      label: "Manage Category",
    },
    {
      to: "/admin/all-orders",
      icon: <FaUserCircle />,
      label: "View All Orders",
    },
  ];

  return (
    <div className='md:flex min-h-screen bg-gray-100'>
      {/* Sidebar */}
      <aside className='md:w-64 bg-blue-800 text-white p-5 space-y-6'>
        <h2 className='text-2xl font-bold text-center'>Admin Panel</h2>
        <nav className='space-y-3'>
          {sidebarLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                location.pathname === link.to
                  ? "bg-blue-600"
                  : "hover:bg-blue-600"
              }`}
            >
              {link.icon} {link.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-6'>
        <h2 className='text-2xl font-bold mb-4'>Users Management</h2>

        {/* Users List */}
        <div className='bg-white shadow-md rounded-lg p-4 overflow-x-auto'>
          <table className='w-full border-collapse min-w-[600px]'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='p-3 text-left'>User</th>
                <th className='p-3 text-left'>Email</th>
                <th className='p-3 text-left'>Role</th>
                <th className='p-3 text-left'>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers?.map((u) => (
                <tr key={u._id} className='border-t'>
                  {/* Editable Row */}
                  {editMode === u._id ? (
                    <>
                      <td className='p-3'>
                        <input
                          type='text'
                          name='name'
                          value={userUpdates[u._id]?.name || ""}
                          onChange={(e) => handleInputChange(e, u._id)}
                          className='w-full p-2 border rounded-md'
                        />
                      </td>
                      <td className='p-3'>
                        <input
                          type='email'
                          name='email'
                          value={userUpdates[u._id]?.email || ""}
                          onChange={(e) => handleInputChange(e, u._id)}
                          className='w-full p-2 border rounded-md'
                        />
                      </td>
                      <td className='p-3'>{u?.role}</td>
                      <td className='p-3'>
                        <span className='flex gap-4'>
                          <FaSave
                            onClick={() => handleUpdate(u._id)}
                            className='text-green-500 cursor-pointer text-xl'
                            aria-label='Save'
                          />
                          <FaTimes
                            onClick={handleCancel}
                            className='text-red-500 cursor-pointer text-xl'
                            aria-label='Cancel'
                          />
                        </span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className='p-3'>{u?.name}</td>
                      <td className='p-3'>{u?.email}</td>
                      <td className='p-3 text-green-600'>{u?.role}</td>
                      <td className='p-3'>
                        <span className='flex gap-4'>
                          <FaEdit
                            onClick={() => handleEdit(u._id)}
                            className='text-green-500 cursor-pointer text-xl'
                            aria-label='Edit User'
                          />
                          {u.role === "user" && (
                            <FaTrash
                              className='text-red-500 cursor-pointer text-xl'
                              onClick={() => handleDelete(u._id)}
                              aria-label='Delete User'
                            />
                          )}
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
