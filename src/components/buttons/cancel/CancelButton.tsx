import React from "react";
import { ImCross } from "react-icons/im";

type Props = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  title?: string;
  className?: string;
};

const CancelButton: React.FC<Props> = ({
  onClick,
  type = "button",
  title = "Zrušit",
}) => (
  <button
    className="danger-icon-btn"
    onClick={onClick}
    type={type}
    title={title}
  >
    <ImCross />
  </button>
);

export default CancelButton;
