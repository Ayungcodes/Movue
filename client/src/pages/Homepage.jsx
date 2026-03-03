import Navbar from "../components/Navbar";

const Homepage = ({ openNav, toggleNav }) => {
  return (
    <>
      {/* navbar */}
      <Navbar openNav={openNav} toggleNav={toggleNav} />

      {/* hero section */}
      <section
        className="hero-section h-screen flex items-center justify-center text-center px-4 text-white"
        onClick={toggleNav}
      >
        {/* Discover Movies Like Never Before */}
      </section>
    </>
  );
};

export default Homepage;
