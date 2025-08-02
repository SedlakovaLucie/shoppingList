import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import "../Buttons.css";

type Props = {
  onClick?: () => void;
  title?: string;
  className?: string;
};

const PlusButton: React.FC<Props> = ({ onClick }) => (
  <button className="plus-btn" onClick={onClick} type="button">
    <FaPlusCircle />
  </button>
);

export default PlusButton;
