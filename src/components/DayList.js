import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList(props) {
  const days = props.days.map((currentDay) => {
    return (
      <DayListItem
      key={currentDay.id} 
      name={currentDay.name} 
      spots={currentDay.spots} 
      selected={currentDay.name === props.value}
      setDay={props.onChange}
     />
    );
  });

  return (
  <ul>{days}</ul>
  );

}
