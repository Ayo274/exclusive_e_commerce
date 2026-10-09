import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-[#FFAD33]" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt key={i} className="text-[#FFAD33]" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-300" />);
    }
  }
  return <div className="flex gap-1">{stars}</div>;
};

export default RatingStars;
