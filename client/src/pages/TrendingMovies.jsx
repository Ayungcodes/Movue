import Navbar from "../components/Navbar";

const TrendingMovies = ({ openNav, toggleNav }) => {
  return (
    <>
      {/* navbar */}
      <Navbar openNav={openNav} toggleNav={toggleNav} />
    </>
  );
};

export default TrendingMovies;
