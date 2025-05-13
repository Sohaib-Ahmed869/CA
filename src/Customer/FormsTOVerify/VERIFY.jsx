import { Link } from "react-router-dom";
//ok
const FormNavigation = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Form Navigation</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Maryam Forms Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            Maryam Forms
          </h2>
          <div className="space-y-3">
            <Link
              to="/form-maryam-1"
              className="block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 text-center"
            >
              Maryam Form 1 (RPL Assessment CPC31020b)
            </Link>
            <Link
              to="/form-maryam-2"
              className="block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 text-center"
            >
              Maryam Form 2 (RPL Assessment Formaaa)
            </Link>
            <Link
              to="/form-maryam-3"
              className="block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 text-center"
            >
              Maryam Form 3 (RPL Assessment CPC30220cccc)
            </Link>
          </div>
        </div>

        {/* Bilal Forms Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-700">
            Bilal Forms
          </h2>
          <div className="space-y-3">
            <Link
              to="/form-bilal-1"
              className="block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 text-center"
            >
              Bilal Form 1 (RPL Self Assessment 2 CPC30620A)
            </Link>
            <Link
              to="/form-bilal-2"
              className="block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 text-center"
            >
              Bilal Form 2 (RPL Self Assessment CPC40920e)
            </Link>
            <Link
              to="/form-bilal-3"
              className="block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 text-center"
            >
              Bilal Form 3 (RPL Self Assessment Form 40120ff)
            </Link>
            <Link
              to="/form-bilal-4"
              className="block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 text-center"
            >
              Bilal Form 4 (RPL 2)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormNavigation;
