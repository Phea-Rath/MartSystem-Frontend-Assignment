import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine, RiMenuFoldFill } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router";
import logo from '../assets/Artboard2.png';
const SideBar = ({ isShow, onChange }) => {
    const [resizeProduct, setResizeProduct] = useState(false);
    const sidebarRef = useRef();
    const handleNavigate = () => {
        if (document.body.clientWidth <= 768) {
            onChange();
        }
    }





    const handleDropDown = () => {
        setResizeProduct(!resizeProduct);
        if (document.body.clientWidth <= 768) {
            onChange();
        }
    }
    return (
        <section ref={sidebarRef} className={`${isShow ? 'w-[250px]' : 'w-[0px]'} bg-gray-50 fixed md:block  z-[9999] h-[100vh] md:h-full dark:bg-gray-700 dark:text-gray-200 transition-all drop-shadow-2xl duration-200 overflow-hidden`}>
            <article className=" px-3 flex items-center">
                <div><img className="w-20 h-20" src={logo} alt="" /></div>
                <h1>MOTORN</h1>
                <RiMenuFoldFill onClick={onChange} className="text-xl cursor-pointer ml-auto md:hidden" />
            </article>
            <div className=" bg-gray-300 dark:bg-gray-100 w-[200px] h-1 rounded-lg mx-auto my-5" />
            <article className="h-[calc(100vh-130px)] flex flex-col overflow-auto">
                <ul className="pl-5 flex-1">
                    <NavLink to="/">
                        <li onClick={handleNavigate} className="hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-2 rounded-tl-lg rounded-bl-lg font-bold">Deshboard</li>
                    </NavLink>
                    <NavLink to="/sales">
                        <li onClick={handleNavigate} className="hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-2 rounded-tl-lg rounded-bl-lg font-bold">Order</li>
                    </NavLink>
                    <NavLink to='/products'>
                        <li
                            onClick={handleDropDown}
                            className="hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-2 rounded-tl-lg rounded-bl-lg font-bold flex items-center">Products </li>
                    </NavLink>
                    {/* <ul className={`overflow-hidden ${resizeProduct ? 'h-[80px]' : 'h-0'} transition-all duration-300`}> */}
                    <NavLink to="/categories">
                        <li onClick={handleNavigate} className="hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-2 rounded-tl-lg rounded-bl-lg font-bold">Category</li>
                    </NavLink>
                    <NavLink to="/brands">
                        <li onClick={handleNavigate} className="hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-2 rounded-tl-lg rounded-bl-lg font-bold">Brand</li>
                    </NavLink>
                    {/* </ul> */}
                    <NavLink to="/inventories">
                        <li onClick={handleNavigate} className="hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-2 rounded-tl-lg rounded-bl-lg font-bold">Inventory</li>
                    </NavLink>
                    <NavLink to="/purchases">
                        <li onClick={handleNavigate} className="hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-2 rounded-tl-lg rounded-bl-lg font-bold">Purchases</li>
                    </NavLink>
                    <NavLink to="/roles">
                        <li onClick={handleNavigate} className="hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-2 rounded-tl-lg rounded-bl-lg font-bold">Roles</li>
                    </NavLink>
                    <NavLink to="/users">
                        <li className="hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-2 rounded-tl-lg rounded-bl-lg font-bold">Users</li>
                    </NavLink>
                    <NavLink to="/suppliers">
                        <li onClick={handleNavigate} className="hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-2 rounded-tl-lg rounded-bl-lg font-bold">Suppliers</li>
                    </NavLink>
                    <NavLink to="/customers">
                        <li className="hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-2 rounded-tl-lg rounded-bl-lg font-bold">Customers</li>
                    </NavLink>
                    <NavLink to="/warehouses">
                        <li onClick={handleNavigate} className="hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-2 rounded-tl-lg rounded-bl-lg font-bold">Warehouses</li>
                    </NavLink>

                    <NavLink to="/stock-types">
                        <li onClick={handleNavigate} className="hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-2 rounded-tl-lg rounded-bl-lg font-bold">StockTypes</li>
                    </NavLink>
                </ul>
                <ul >
                    <NavLink to="/setting">
                        <li onClick={handleNavigate} className="hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-3 font-bold">Setting</li>
                    </NavLink>
                    <NavLink to="/logout">
                        <li onClick={handleNavigate} className="hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white p-3 font-bold">Logout</li>
                    </NavLink>
                </ul>
            </article>
        </section>
    )
}

export default SideBar;