import React from "react";
import TickItem from "./TickIcon";
import ProgressBar from "./ProgressBar";

const ListItem = (props) => {
  return (
    <li className="list_item">
      <div className="info_container">
        <TickItem />
        <p className="task_title">{props.task.title}</p>
        <ProgressBar />
      </div>
      <div className="task_action_buttons">
        <button className="edit">Edit</button>
        <button className="delete">Del</button>
      </div>
    </li>
  );
};

export default ListItem;
