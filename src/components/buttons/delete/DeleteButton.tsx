// components/buttons/delete/DeleteButton.tsx
import React from "react";
import { MdDelete } from "react-icons/md";
import "../Buttons.css";

type Props = {
  onClick?: () => void;
  title?: string;
  className?: string;
};

const DeleteButton: React.FC<Props> = ({ onClick }) => (
  <button className="icon-btn delete-btn" onClick={onClick} type="button">
    <MdDelete />
  </button>
);

export default DeleteButton;
