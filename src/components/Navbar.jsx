import Not from "./not.svg";
import Logo from "./getclogo.png";

function Navbar() {
  return (
    <nav className="
      fixed top-0 left-0 h-16 w-full
      bg-white dark:bg-gray-900
      border-b border-gray-200 dark:border-gray-700
      z-50 transition-colors
    ">
      <div className="mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="GETC"
            className="w-20 h-14"
          />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="
            hidden md:block
            bg-gray-100 dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400
            px-3 py-1 rounded-md text-sm w-64
            outline-none transition-colors
          "
        />
        <div className="flex items-center gap-4">
          <button className="opacity-70 hover:opacity-100 transition">
            <img
              src={Not}
              alt="notifications"
              className="w-5 h-5 dark:invert"
            />
          </button>

          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
