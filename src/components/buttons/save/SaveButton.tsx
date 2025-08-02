import React from "react";
import { FaCheck } from "react-icons/fa";

type Props = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  title?: string;
};

const SaveButton: React.FC<Props> = ({
  onClick,
  type = "button",
  title = "Uložit",
}) => (
  <button className="primary-icon-btn" onClick={onClick} type={type} title={title}>
    <FaCheck />
  </button>
);

export default SaveButton;
