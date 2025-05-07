import React, { useState } from 'react'
import ROLE from "../common/role.js";
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common/index.js';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../store/userSlice.js'; // ✅ import reducer

const ChangeUserRole = ({
  name,
  email,
  role,
  onClose,
  userId,
  callFunction,
}) => {
  const [userRole, setUserRole] = useState(role)
  const dispatch = useDispatch();

  // ✅ current logged-in user from redux
  const currentUser = useSelector(state => state.user.user);

  const handleChangeSelect = (e) => {
    setUserRole(e.target.value)
    console.log(e.target.value);
  }

  const updateUserRole = async () => {
    try {
      const response = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          role: userRole,
          userId: userId,
        })
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        onClose();
        callFunction();

        // ✅ If the current user is the one being updated, update redux state too
        if (currentUser?._id === userId) {
          dispatch(setUserDetails(dataResponse.data));
        }
      } else {
        toast.error("Something went wrong while updating role");
      }

      console.log("Role Updated", dataResponse);

    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    }
  }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full flex z-10 justify-between items-center bg-slate-200 bg-opacity-60'>
      <div className='mx-auto bg-pink-800 text-white shadow-md p-4 w-full max-w-sm'>

        <button className='block ml-auto' onClick={onClose}>
          <IoMdClose className='text-lg' />
        </button>

        <h2 className='pb-4 text-lg font-medium'>Change User Role</h2>

        <p>Name : {name}</p>
        <p>Email : {email}</p>

        <div className='flex items-center justify-between my-3'>
          <p>Role :</p>
          <select className='text-black border px-3 py-1 mt-2' value={userRole} onChange={handleChangeSelect}>
            {
              Object.values(ROLE).map(el => (
                <option key={el} value={el}>{el}</option>
              ))
            }
          </select>
        </div>

        <button
          className='w-fit mx-auto block border px-3 py-1 rounded-full tra hover:bg-white hover:text-pink-900'
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  )
}

export default ChangeUserRole
