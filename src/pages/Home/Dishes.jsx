
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Sidenavbar from "../../components/Sidenavbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import FoodItemCard from "../../components/FoodItemCard";
import { useGetFoodItemsQuery } from "../../app/Apis/FoodApi";

const Dishes = () => {
  const { data } = useGetFoodItemsQuery();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const categories = [
    "Biriyani",
    "Pizza",
    "Burgers",
    "Noodles",
    "Tiffins",
    "Pasta",
    "Desserts",
    "Snacks",
    "Salads",
    "Wraps",
    "BBQ",
    "Seafood",
    "Curries",
    "Soups",
    "Shakes",
  ];

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 3, dots: false },
      },
    ],
  };

  // Filter food items based on the selected category
  const filteredFoodItems = data?.data.filter((item) =>
    item.category.includes(categories[selectedCategory])
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <button
        onClick={handleToggleSidebar}
        className="md:hidden p-4 text-gray-600 focus:outline-none"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div
        className={` ${isSidebarOpen ? "block" : "hidden"} md:block fixed md:relative z-10 w-full md:w-auto`}
      >
        <Sidenavbar onClose={handleToggleSidebar} />
      </div>

      <div className="flex flex-col p-4 md:p-8 gap-4 overflow-y-auto flex-grow">
        <div className="bg-white shadow-lg rounded-lg p-4 pb-8 w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-semibold">Dishes Category</div>
          </div>

          <div>
            <Slider {...sliderSettings} className="flex">
              {categories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleCategoryClick(index)}
                  className={`p-2 px-4 inline-block cursor-pointer bg-gray-50 hover:bg-gray-400 rounded-lg transition-all whitespace-nowrap
                    ${selectedCategory === index ? "bg-gray-800 hover:bg-gray-800 font-semibold text-white" : ""}`}
                >
                  {category}
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="bg-gray-100 shadow-2xl rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-semibold">
              Food Items in {categories[selectedCategory]}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFoodItems?.map((item) => (
              <FoodItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dishes;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

SampleNextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

SamplePrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

