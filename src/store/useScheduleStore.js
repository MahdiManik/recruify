// store/interviewStore.js
import { create } from 'zustand';

const useInterviewStore = create((set, get) => ({
  interviews: JSON.parse(localStorage.getItem('interviews')) || [],

  addInterview: (interview) => {
    const newInterview = {
      ...interview,
      id: Date.now().toString(),
    };

    // Check for conflicts before adding
    const hasConflict = get().checkConflicts(newInterview);
    if (hasConflict) {
      throw new Error('Interview time slot conflicts with existing interview');
    }

    set((state) => {
      const updatedInterviews = [...state.interviews, newInterview];
      localStorage.setItem('interviews', JSON.stringify(updatedInterviews));
      return { interviews: updatedInterviews };
    });
  },

  updateInterview: (id, updatedInterview) => {
    // Check for conflicts excluding the current interview
    const hasConflict = get().checkConflicts(updatedInterview, id);
    if (hasConflict) {
      throw new Error('Interview time slot conflicts with existing interview');
    }

    set((state) => {
      const updatedInterviews = state.interviews.map((interview) =>
        interview.id === id ? { ...updatedInterview, id } : interview
      );
      localStorage.setItem('interviews', JSON.stringify(updatedInterviews));
      return { interviews: updatedInterviews };
    });
  },

  deleteInterview: (id) => {
    set((state) => {
      const updatedInterviews = state.interviews.filter(
        (interview) => interview.id !== id
      );
      localStorage.setItem('interviews', JSON.stringify(updatedInterviews));
      return { interviews: updatedInterviews };
    });
  },

  checkConflicts: (newInterview, excludeId = null) => {
    const state = get();
    const startTime = new Date(`${newInterview.date}T${newInterview.timeSlot}`);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // Add 1 hour

    return state.interviews.some((interview) => {
      if (interview.id === excludeId) return false;

      const existingStart = new Date(`${interview.date}T${interview.timeSlot}`);
      const existingEnd = new Date(existingStart.getTime() + 60 * 60 * 1000);

      const timeOverlap = (
        (startTime >= existingStart && startTime < existingEnd) ||
        (endTime > existingStart && endTime <= existingEnd) ||
        (startTime <= existingStart && endTime >= existingEnd)
      );

      const sameInterviewer = interview.interviewerName === newInterview.interviewerName;
      const sameCandidate = interview.candidateName === newInterview.candidateName;

      return timeOverlap && (sameInterviewer || sameCandidate);
    });
  },

  getFilteredInterviews: (filters) => {
    const state = get();
    return state.interviews.filter((interview) => {
      const dateMatch = !filters?.date || 
        new Date(interview.date).toDateString() === new Date(filters.date).toDateString();
      const interviewerMatch = !filters?.interviewer || 
        interview.interviewer?.toLowerCase().includes(filters?.interviewer?.toLowerCase());
      const candidateMatch = !filters?.candidate || 
        interview.candidate?.toLowerCase()?.includes(filters?.candidate?.toLowerCase());
    

      return dateMatch && interviewerMatch && candidateMatch;
    });
  },
}));

export default useInterviewStore;