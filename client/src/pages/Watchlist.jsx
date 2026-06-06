import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

const Watchlist = ({ openNav, toggleNav }) => {
  const movies = [1, 2, 3, 4, 5, 6];

  return (
    <main className="min-h-screen bg-[#011a2d] text-[#e7e5e4]">
        <Navbar openNav={openNav} toggleNav={toggleNav} />
      <section className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              My Watchlist
            </h1>

            <p className="mt-2 text-gray-400">
              Movies you've saved for later.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search watchlist..."
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-gray-500 focus:border-white/30"
          />
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-gray-400">
              Total Movies
            </p>
            <h3 className="mt-2 text-2xl font-bold">
              24
            </h3>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-gray-400">
              Watched
            </p>
            <h3 className="mt-2 text-2xl font-bold">
              12
            </h3>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-gray-400">
              Unwatched
            </p>
            <h3 className="mt-2 text-2xl font-bold">
              12
            </h3>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-gray-400">
              Favorites
            </p>
            <h3 className="mt-2 text-2xl font-bold">
              7
            </h3>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-full bg-[#e7e5e4] px-5 py-2 text-[#011a2d] font-medium">
            All
          </button>

          <button className="rounded-full border border-white/10 px-5 py-2">
            Watched
          </button>

          <button className="rounded-full border border-white/10 px-5 py-2">
            Unwatched
          </button>

          <button className="rounded-full border border-white/10 px-5 py-2">
            Favorites
          </button>
        </div>

        {/* Movie Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <div
              key={movie}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-white/20"
            >
              <img
                src="https://placehold.co/400x600"
                alt=""
                className="h-[320px] w-full object-cover"
              />

              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold">
                      Interstellar
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      2014
                    </p>
                  </div>

                  <button>
                    ⭐
                  </button>
                </div>

                <div className="mt-4 flex gap-2">
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                    Watched
                  </span>

                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                    Sci-Fi
                  </span>
                </div>

                <div className="mt-5 flex gap-2">
                  <button className="flex-1 rounded-lg bg-[#e7e5e4] py-2 text-sm font-medium text-[#011a2d]">
                    Details
                  </button>

                  <button className="rounded-lg border border-red-500/20 px-4 py-2 text-red-400">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        <div className="mt-16 rounded-2xl border border-dashed border-white/10 p-12 text-center">
          <h3 className="text-xl font-semibold">
            No movies found
          </h3>

          <p className="mt-2 text-gray-400">
            Start building your watchlist by saving movies.
          </p>

          <Link to="/">
            <button className="mt-6 rounded-lg bg-[#e7e5e4] px-6 py-3 font-medium text-[#011a2d] cursor-pointer">
              Browse Movies
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Watchlist;