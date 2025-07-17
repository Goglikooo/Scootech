import Logo from "../assets/logo.png";

export default function AboutUs() {
  return (
    <div className="h-screen bg-white ">
      <section className="relative bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 py-20 px-8   ">
        <div className="absolute inset-0 w-full h-full -z-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 800"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="dots"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
                patternTransform="rotate(45)"
              >
                <circle cx="10" cy="10" r="2" fill="#3B82F6" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="1440" height="800" fill="url(#dots)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="p-8 bg-white bg-opacity-90 rounded-xl shadow-lg backdrop-blur-lg hover:scale-105 transform transition duration-300 ease-in-out">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
              About Us
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              At ScooTeq, we craft smart and sustainable mobility solutions that
              move people and cities forward. Our passionate team combines
              innovation, precision, and user-focused design to redefine how
              urban transport works — cleaner, faster, and smarter.
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-tr from-purple-200 via-blue-200 to-green-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transform transition duration-300">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 20v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2H17z" />
                    <circle cx="12" cy="8" r="4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    Dedicated Team
                  </h3>
                  <p className="text-gray-500 text-sm">
                    A driven group of mobility and tech experts committed to
                    delivering reliable, efficient, and forward-thinking
                    e-scooter systems.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gradient-to-tr from-purple-200 via-blue-200 to-green-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transform transition duration-300">
                  <svg
                    className="w-6 h-6 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 21h6v-1H9v1zm3-18a4 4 0 00-4 4c0 1.38.56 2.63 1.46 3.54A5.978 5.978 0 009 12h6a5.978 5.978 0 00-1.46-3.46A4 4 0 0015 7a4 4 0 00-4-4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    Innovative Approach
                  </h3>
                  <p className="text-gray-500 text-sm">
                    We blend cutting-edge technology with modern design to
                    create unique, scalable solutions tailored to evolving urban
                    needs.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gradient-to-tr from-purple-200 via-blue-200 to-green-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transform transition duration-300">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 14c-1.33 0-2.53.53-3.41 1.39A4.993 4.993 0 0012 20c1.33 0 2.53-.53 3.41-1.39A4.993 4.993 0 0016 14zM8 14c-1.33 0-2.53.53-3.41 1.39A4.993 4.993 0 004 20c1.33 0 2.53-.53 3.41-1.39A4.993 4.993 0 008 14zM12 4c-2.21 0-4 1.79-4 4 0 1.66 1.34 3 3 3h2c1.66 0 3-1.34 3-3 0-2.21-1.79-4-4-4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    Customer Centric
                  </h3>
                  <p className="text-gray-500 text-sm">
                    At ScooTeq, your ride experience comes first — we listen,
                    adapt, and continuously improve to exceed your expectations
                    on every journey.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"></div>
            <img
              src={Logo}
              alt="About Us"
              className="relative rounded-xl  object-cover w-full h-full hover:opacity-90 transition-opacity duration-300"
            />
          </div>
        </div>
      </section>

      <footer className="bg-white  mt-auto ">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Company</h3>
            <p className="text-gray-500 mt-3">
              Providing reliable and affordable e-scooter rides for everyday
              mobility.
            </p>
            <p className="text-gray-500 mt-2">
              © 2025 ScooTeq | All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="text-gray-500 hover:text-indigo-600 transition"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Stay Updated
            </h3>
            <p className="text-gray-500 mt-3">
              Subscribe to our newsletter for exclusive deals and updates.
            </p>
            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-r-lg transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
