export function getMember (state) {
  return state.member;
};

export function getSearchableMembers (state) {
  return state.searchableMembers;
};

export function getSearchablePlaces (state) {
  return state.searchablePlaces;
};

export function getProfileCompletePercent (state) {
  return state.profileCompletePercent;
};

export function getClinicFilled (state) {
  return state.clinicFilled;
};

export function getExamsFilled (state) {
  return state.examsFilled;
};

export function getSelectedPlace (state) {
  const selected = state.searchablePlaces.find(place => place.id === state.selectedPlaces);

  return selected ? selected.label : null;
};
