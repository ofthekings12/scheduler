export function getAppointmentsForDay(state, day) {
  const dayName = state.days.find((x) => x.name === day);
  
  if (!dayName) {
    return [];
  }
  const appointments = dayName.appointments.map((id) => state.appointments[id]);
  return appointments;
}
