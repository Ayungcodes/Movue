import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";

const Homepage = ({ openNav, toggleNav }) => {
  return (
    <>
      {/* navbar */}
      <Navbar openNav={openNav} toggleNav={toggleNav} />

      {/* hero section */}
      <HeroSlider />
    </>
  );
};

export default Homepage;
