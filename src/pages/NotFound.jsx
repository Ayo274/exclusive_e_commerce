import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center justify-center min-h-[50vh]">
      <h1 className="text-7xl md:text-8xl font-bold mb-8">404 Not Found</h1>
      <p className="text-gray-500 mb-10">
        Your visited page not found. You may go home page.
      </p>
      <Link
        to="/"
        className="bg-primaryRed text-white px-10 py-4 rounded hover:bg-red-600 transition-colors"
      >
        Back to home page
      </Link>
    </div>
  );
};

export default NotFound;
