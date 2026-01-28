import { useState } from "react";
import Home from "../assets/home.svg?react";
import Profile from "../assets/profile.svg?react";
import Settings from "../assets/settings.svg?react";
import Theme from "../assets/bright.svg?react";
import Logout from "../assets/logout.svg?react";

function Sidebar({ darkMode, setDarkMode,activepage, setpage}) {
  const [activePage, setActivePage] = useState("home");
  const [open, setOpen] = useState(false);

  const itemstyle = (page) =>
    `group flex items-center gap-3 px-3 py-2 rounded-md transition
     ${
       activePage === page
         ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
         : "text-gray-700 hover:bg-orange-50 hover:text-orange-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-orange-400"
     }`;

  const icon = (page) =>
    `w-5 h-5 transition
     ${
       activePage === page
         ? "text-orange-600 dark:text-orange-400"
         : "text-gray-500 group-hover:text-orange-600 dark:text-gray-400 dark:group-hover:text-orange-400"
     }`;

  return (
    <aside
      className="
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-56
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-700
      "
    >
      <nav className="flex flex-col gap-1 px-2 pt-4">

        <button
          onClick={() => {
            setActivePage("home");
            setOpen(false);
          }}
          className={itemstyle("home")}
        >
          <Home className={icon("home")} />
          <span>Home</span>
        </button>
        <button
          onClick={() => {
            setActivePage("profile");
            setOpen(false);
          }}
          className={itemstyle("profile")}
        >
          <Profile className={icon("profile")} />
          <span>Profile</span>
        </button>
        <button
          onClick={() => setOpen(!open)}
          className="
            group flex items-center justify-between
            px-3 py-2 rounded-md transition
            text-gray-700 hover:bg-orange-50 hover:text-orange-600
            dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-orange-400
          "
        >
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-gray-500 group-hover:text-orange-600 dark:text-gray-400 dark:group-hover:text-orange-400 transition" />
            <span>Settings</span>
          </div>
        </button>
        <div
          className={`
            ml-8 mt-2 flex flex-col gap-1 overflow-hidden
            transition-all duration-300 ease-out
            ${open
              ? "opacity-100 translate-y-0 max-h-40"
              : "opacity-0 -translate-y-2 max-h-0 pointer-events-none"}
          `}
        >
          <button
            onClick={() => setDarkMode(prev => !prev)}

            className="
              group flex items-center gap-3 px-3 py-2 rounded-md transition
              text-gray-600 hover:bg-orange-50 hover:text-orange-600
              dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-orange-400
            "
          >
            <Theme className="w-4 h-4 text-gray-500 group-hover:text-orange-600 dark:text-gray-400 dark:group-hover:text-orange-400" />
            <span className=" overflow-hidden transition-all duration-300 ease-out">{darkMode ? "Light mode" : "Dark mode" }</span>
          </button>
          <button
            className="
              group flex items-center gap-3 px-3 py-2 rounded-md transition
              text-red-500 hover:bg-red-50
              dark:text-red-400 dark:hover:bg-red-900/20
            "
          >
            <Logout className="w-4 h-4 transition group-hover:text-red-600 dark:group-hover:text-red-400" />
            <span>Logout</span>
          </button>
        </div>

      </nav>
    </aside>
  );
}

export default Sidebar;
