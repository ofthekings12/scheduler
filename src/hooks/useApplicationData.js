import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  function updateSpots(state, day) {
    const updatedState = {...state};
    const currentDay = day || state.day;
    const currentDayObj = updatedState.days.find((dayObj) => dayObj.name === currentDay);
    const appointmentId = currentDayObj.appointments;
    const nullAppointmentId = appointmentId.filter(
      (id) => !updatedState.appointments[id].interview
    )
    const spots = nullAppointmentId.length;
    const updatedDayObj = {...currentDayObj, spots };
    updatedState.days.map((day) => 
    updatedDayObj.id === day.id ? (day.spots = updatedDayObj.spots) : null

    );
    return updatedState
  }

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => console.log(err.message));
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => 
      setState((prev) => {
        const newState = { ...prev, appointments }
        const updatedNewState = updateSpots(newState, appointments.day);
        return updatedNewState;

      })
    )
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    }
    return axios.delete(`/api/appointments/${id}`)
    .then(() => 
    setState((prev) => {
      const newState = { ...prev, appointments };
      const updatedNewState = updateSpots(newState, appointments.day);
      return updatedNewState;
    })
      
    );
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
}
