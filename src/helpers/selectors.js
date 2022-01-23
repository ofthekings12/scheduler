function getAppointmentsForDay(state, day) {
  const dayName = state.days.find((x) => x.name === day);

  if (!dayName) {
    return [];
  }
  const appointments = dayName.appointments.map((id) => state.appointments[id]);
  return appointments;
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewData = state.interviewers[interview.interviewer];
  return { student: interview.student, interviewer: interviewData };
}

function getInterviewersForDay(state, day) {
  const dayName = state.days.find((x) => x.name === day);
  const interviewers = dayName ? dayName.interviewers.map((id) => state.interviewers[id]) : [];
  return interviewers;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };
