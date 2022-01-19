import React from "react";
import classNames from 'classnames';
import "components/InterviewerListItem.scss";

function InterviewerListItem(props) {

  const interviewer = classNames ("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  return (
    <li onClick={() => props.setInterviewer(props.id)} className={interviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    

    </li>
  );
}



export default InterviewerListItem;
