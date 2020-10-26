export default function () {
  return {
    searchableMembers: [],
    searchablePlaces: [],
    selectedPlaces: null,
    profileCompletePercent: 15,
    clinicFilled: false,
    examsFilled: false,
    member: {
      user: {
        cpf: "",
        email: ""
      },
      name: "",
      birthdate: "",
      gender: ""
    }
  };
}
