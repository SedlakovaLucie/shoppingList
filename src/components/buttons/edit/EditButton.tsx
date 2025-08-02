import React from "react";
import { MdModeEdit } from "react-icons/md";
import "../Buttons.css";

type Props = {
  onClick?: () => void;
  title?: string;
  className?: string; 
};

const EditButton: React.FC<Props> = ({ onClick }) => (
  <button className="icon-btn edit-btn" onClick={onClick} type="button">
    <MdModeEdit />
  </button>
);

export default EditButton;
