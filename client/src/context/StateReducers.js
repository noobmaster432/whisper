import { reducerCases } from "./constants";

export const initialState = {
  userInfo: undefined,
  newUser: false,
  contactsPage: false,
  currentChat: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };

    case reducerCases.SET_NEW_USER:
      return {
        ...state,
        newUser: action.newUser,
      };

    case reducerCases.SET_CONTACTS_PAGE:
      return {
        ...state,
        contactsPage: !state.contactsPage,
      };

    case reducerCases.CHANGE_CURRENT_CHAT:
      return {
        ...state,
        currentChat: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
