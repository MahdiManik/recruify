// store/interviewStore.js
import {create} from "zustand";

const useInterviewStore = create((set, get) => ({
  interviews: JSON.parse(localStorage.getItem("interviews")) || [],

  // Add new interview
  addInterview: (interview) => {
    const newInterview = {
      ...interview,
      id: Date.now().toString(),
    };

    set((state) => {
      const updatedInterviews = [...state.interviews, newInterview];
      localStorage.setItem("interviews", JSON.stringify(updatedInterviews));
      return { interviews: updatedInterviews };
    });
  },

  // Update existing interview
  updateInterview: (id, updatedInterview) => {
    set((state) => {
      const updatedInterviews = state.interviews.map((interview) =>
        interview.id === id ? { ...updatedInterview, id } : interview
      );
      localStorage.setItem("interviews", JSON.stringify(updatedInterviews));
      return { interviews: updatedInterviews };
    });
  },

  // Delete interview
  deleteInterview: (id) => {
    set((state) => {
      const updatedInterviews = state.interviews.filter(
        (interview) => interview.id !== id
      );
      localStorage.setItem("interviews", JSON.stringify(updatedInterviews));
      return { interviews: updatedInterviews };
    });
  },

  // Check for scheduling conflicts
  checkConflicts: (newInterview, excludeId = null) => {
    const state = get();
    return state.interviews.some((interview) => {
      if (interview.id === excludeId) return false;

      const sameDate =
        new Date(interview.date).toDateString() ===
        new Date(newInterview.date).toDateString();
      const sameTime = interview.timeSlot === newInterview.timeSlot;
      const sameInterviewer =
        interview.interviewerName === newInterview.interviewerName;
      const sameCandidate =
        interview.candidateName === newInterview.candidateName;

      return sameDate && sameTime && (sameInterviewer || sameCandidate);
    });
  },

  // Filter interviews
  getFilteredInterviews: (filters) => {
    const state = get();
    return state.interviews.filter((interview) => {
      const dateMatch =
        !filters.date ||
        new Date(interview.date).toDateString() ===
          new Date(filters.date).toDateString();
      const interviewerMatch =
        !filters.interviewer ||
        interview.interviewerName
          .toLowerCase()
          .includes(filters.interviewer.toLowerCase());
      const typeMatch = !filters.type || interview.type === filters.type;

      return dateMatch && interviewerMatch && typeMatch;
    });
  },
}));

export default useInterviewStore;
