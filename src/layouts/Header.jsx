import { TbSearch } from "react-icons/tb";
import { BsFillBellFill } from "react-icons/bs";
import { MdAccountCircle, MdDarkMode, MdSunnySnowing } from "react-icons/md";
import { RiMenuFoldFill } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router";

const Header = ({ onChange }) => {
    const navigater = useNavigate();
    const [mode, setMode] = useState(localStorage.getItem('theme') === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.add(mode);
    const darkmode = () => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        document.documentElement.classList.toggle(
            "dark",
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
        );
        // Whenever the user explicitly chooses light mode
        if (document.documentElement.classList.contains("dark")) {
            localStorage.theme = "light";
            setMode('dark');
        } else {
            localStorage.theme = "dark";
            setMode('light');
        }
    }
    return (
        <section className="p-5 flex items-center justify-between !shadow-md drop-shadow-md dark:text-gray-200 bg-gray-100 dark:bg-gray-800 ">
            <div className="flex items-center gap-3">
                <RiMenuFoldFill onClick={onChange} className="text-xl cursor-pointer" />
                <nav className="font-black">Managerment System</nav>
            </div>
            <nav className="flex gap-3">
                <BsFillBellFill />
                <MdAccountCircle onClick={() => navigater('/profile')} />
                {mode === 'dark' ? <MdSunnySnowing onClick={darkmode} /> :
                    <MdDarkMode onClick={darkmode} />}
            </nav>
        </section>
    )
}

export default Header;