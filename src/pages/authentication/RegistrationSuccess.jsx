import { FaCheckCircle } from "react-icons/fa"; // For the blue tick mark

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 md:p-10 lg:p-12 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 max-w-md w-full">
        <div className="flex flex-col items-center">
          <FaCheckCircle className="text-blue-500 text-5xl md:text-6xl mb-4" />
          <h1 className="text-xl md:text-2xl font-bold text-black mb-2 text-center">
            Registration Successful!
          </h1>
          <p className="text-sm md:text-base text-black text-center">
            Please give us some time to verify your restaurant.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
