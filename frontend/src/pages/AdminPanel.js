import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { FaUser } from 'react-icons/fa'
import { Link, Outlet,useNavigate } from "react-router-dom";
import ROLE from "../common/role.js";


const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className='min-h-[calc(100vh-120px)] mt-40 md:flex hidden'>
      <aside className='bg-slate-50 min-h-full w-full max-w-64 text-black pt-4 customshadow'>
        <div className='h-32 flex justify-center items-center flex-col mt-9'>
          <div className='text-8xl cursor-pointer relative flex justify-center'>
            <FaUser className="bg-white transition border-2 border-pink-800 p-3 rounded-full" />
          </div>
          <p className='text-lg capitalize font-semibold pt-3'><span className='text-pink-800'>Name :</span> {user?.name}</p>
          <p className='text-lg font-semibold'><span className='text-pink-800'>Email :</span> {user?.email}</p>
          <p className='pb-2  font-semibold'>{user?.role}</p>
        </div>

        <div>
          <nav className='grid p-4'>
            <Link to={"all-users"} className='px-2 py-1 mt-8 hover:bg-pink-100'>All Users</Link>
            <Link to={"all-product"} className='px-2 py-1 hover:bg-pink-100'>All Product</Link>
          </nav>
        </div>
      </aside>
      <main className='pt-5 w-full h-full p-5'>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminPanel