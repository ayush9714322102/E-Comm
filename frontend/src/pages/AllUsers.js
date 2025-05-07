import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from "moment";
import { MdModeEditOutline } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([])
  const [openUpdateRole, setUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: ""
  })

  const fetchAllUsers = async () => {
    const response = await fetch(SummaryApi.All_user.url, {
      method: SummaryApi.All_user.method,
      credentials: "include",
    })

    const dataResponse = await response.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }

    console.log(dataResponse);
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <div>
      <table className='w-full usertable'>
        <thead className=''>
          <tr className='bg-pink-800 text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((el, index) => {
              return (
                <tr key={index} className='text-center'>
                  <td>{index + 1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('LLL')}</td>
                  <td>
                    <button className='text-lg bg-pink-200 p-2 rounded-full cursor-pointer hover:bg-pink-800 hover:text-white' 
                      onClick={() => {
                        setUpdateUserDetails(el)
                        setUpdateRole(true)
                      }}>
                        <MdModeEditOutline />
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {
        openUpdateRole && (
          <ChangeUserRole 
              onClose={() =>setUpdateRole(false)} 
              name={updateUserDetails.name}
              email={updateUserDetails.email}
              role={updateUserDetails.role}
              userId={updateUserDetails._id}
              callFunction={fetchAllUsers}
          />
        )
      }

    </div>
  )
}
export default AllUsers