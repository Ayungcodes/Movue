import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage"



const App = () => {
  const [openNav, setOpenNav] = useState(false);

  const toggleNav = () => {
    setOpenNav((prev) => !prev);
  };

  return (
    <Routes>
      <Route path="/" element={<Homepage openNav={openNav} toggleNav={toggleNav} />} />
    </Routes>
  )
}

export default App
