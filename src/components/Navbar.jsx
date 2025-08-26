import { ModeToggle } from "./mode-toogle";

const Navbar = () => {
  return (
    <header className="dark:text-white body-font dark:border-white">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center border-b border-primary dark:border-white">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl text-primary dark:text-white">
            Tailblocks
          </span>
        </a>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
