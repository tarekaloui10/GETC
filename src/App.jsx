import { Profiler, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Feed from "./pages/Feed";
import Profile from"./pages/Profile";

function App() {
  const [activepage, setpage] = useState("home");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="
      min-h-screen
      bg-gray-100 text-gray-900
      dark:bg-gray-950 dark:text-gray-100
  
    ">
      <Navbar />
      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="ml-56 pt-16">
        {activepage === "home" && <Feed />}
        {activepage==="profile"&&<Profile/>}
      </main>
    </div>
  );
}

export default App;
