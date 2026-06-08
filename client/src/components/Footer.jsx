import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-yellow-500/30 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Logo & Description */}
          <div>
            <h2 className="text-3xl font-bold text-yellow-400">
              CityGlide
            </h2>

            <p className="text-gray-400 mt-4">
              A modern platform for buying, selling,
              and renting bikes with a seamless user experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-yellow-400">
                  Home
                </a>
              </li>

              <li>
                <a href="/bikes" className="hover:text-yellow-400">
                  Bikes
                </a>
              </li>

              <li>
                <a href="/login" className="hover:text-yellow-400">
                  Login
                </a>
              </li>

              <li>
                <a href="/register" className="hover:text-yellow-400">
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">
              Developer
            </h3>

            <p className="text-gray-400 mb-4">
              Built by Amarjit Singh
            </p>

            <div className="flex gap-4 text-2xl">

              <a
                href="https://github.com/amarjit0786"
                target="_blank"
                rel="noreferrer"
                className="hover:text-yellow-400 transition"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/amarjit-singh-a8ab03298/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-yellow-400 transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://online-bike-selling-renting.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="hover:text-yellow-400 transition"
              >
                <FaGlobe />
              </a>

            </div>
          </div>

        </div>

        <div className="border-t border-zinc-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          © 2026 CityGlide. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;