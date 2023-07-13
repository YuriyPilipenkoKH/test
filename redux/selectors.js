import { useSelector } from 'react-redux';

export const selectUserId = (state) => state.auth.userId;
export const selectLogin = (state) => state.auth.login;
export const selectEmail = (state) => state.auth.email;
export const selectStateChange = (state) => state.auth.stateChange;
export const selectIsLoading = (state) => state.auth.isLoading


export const useAuth = () => {

    return {

      userId: useSelector(selectUserId),
      login: useSelector(selectLogin),
      email: useSelector(selectEmail),
      stateChange: useSelector(selectStateChange),
      isLoading: useSelector(selectIsLoading),
    };
  };