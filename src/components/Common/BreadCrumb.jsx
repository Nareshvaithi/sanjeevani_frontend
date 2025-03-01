import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <ul className="breadcrumb flex space-x-2 text-gray-600 text-sm">
      {items.map((item, index) => (
        <li key={index} className={`breadcrumb-item ${index === items.length - 1 ? 'text-gray-900 font-semibold' : ''}`}>
          {item.link ? (
            <Link to={item.link} className="text-blue-600 hover:underline">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && <span className="mx-1">/</span>}
        </li>
      ))}
    </ul>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string,
    })
  ).isRequired,
};

export default Breadcrumb;