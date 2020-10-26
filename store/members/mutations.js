export const SET_MEMBER = (state, data) => {
  state.member = data;
};

export const SET_SEARCHABLE_MEMBERS = (state, data) => {
  state.searchableMembers = data;
};

export const SET_SEARCHABLE_PLACES = (state, data) => {
  state.searchablePlaces = data;
};

export const SET_SELECTED_PLACE = (state, data) => {
  state.selectedPlaces = data;
};

export const SET_CLINIC_FILLED = (state) => {
  state.clinicFilled = true;
};

export const SET_EXAMS_FILLED = (state) => {
  state.examsFilled = true;
};

export const INCREASE_PROFILE_COMPLETE = (state) => {
  state.profileCompletePercent = state.profileCompletePercent + 13;
};
