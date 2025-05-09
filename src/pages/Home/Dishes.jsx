import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Sidenavbar from "../../components/Sidenavbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import FoodItemCard from "../../components/FoodItemCard";
import { useGetFoodItemsQuery } from "../../app/Apis/FoodApi";
import { useSelector } from "react-redux";

const Dishes = () => {
  const hotelId = useSelector((state) => state.auth.restaurant_id);
  const { data } = useGetFoodItemsQuery({ hotelId });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  // const [addons, setAddons] = useState([]);

  const categories = [
    "All",
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
    "AddOns",
    "Others",
  ];

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
    setSearchTerm("");
  };

  const getAddons = (addonIds) => {
    return data?.data.filter((item) => addonIds.includes(item.id));
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


  const filteredFoodItems = data?.data.filter((item) => {
    console.log("item", item);
    // Apply category filter first
    let isCategoryMatch = false;
    if (selectedCategory === 0) {
      // For "All" category, return all food items (exclude add-ons by default unless AddOns is selected)
      isCategoryMatch = true;
    } else if (categories[selectedCategory] === "AddOns") {
      // For "AddOns" category, return only items that are add-ons
      isCategoryMatch = item.is_addon === true;
    } else {
      // For all other categories, return items in the selected category and exclude add-ons
      isCategoryMatch =
        item.category.includes(categories[selectedCategory]) &&
        item.is_addon === false;
    }

    const isSearchMatch =
      searchTerm === "" ||
      (item.item_name &&
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())); // Check if item.name is not undefined or null

    // Return items if they match both category and search filter (or just category if search term is empty)
    return isCategoryMatch && isSearchMatch;
  });

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
            <div className="flex flex-col md:flex-row items-center justify-between w-full">
              <div className="text-xl font-semibold mb-4 md:mb-0">
                Food Items in {categories[selectedCategory]}
              </div>

              <div className="flex items-center space-x-2 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search food item by name"
                  className="p-2 border rounded-lg w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
                />
                <button
                  onClick={() => setSearchTerm("")} // Clear the search term
                  className="p-2 bg-gray-800 text-white rounded-lg w-full md:w-auto"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFoodItems?.map((item) => (
              <FoodItemCard
                key={item.id}
                item={item}
                addons={getAddons(item.addons)}
              />
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
