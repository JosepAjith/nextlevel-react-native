export type VariableState = {
    IsNetConnected: Boolean;
    type: string;
    userId: number;
    loginUserId: number;
  };
  
  const initialState: VariableState = {
    IsNetConnected: false,
    type: '',
    userId: 0,
    loginUserId: 0
  };
  
  const SET_NET_CONNECTION = 'SET_NET_CONNECTION';
  const SET_TYPE = 'SET_TYPE';
  const SET_USER_ID = 'SET_USER_ID';
  const SET_LOGIN_USER_ID = 'SET_LOGIN_USER_ID';
  
  const GlobalVariables = (
    state = initialState,
    action: {type: any; payload: any},
  ) => {
    switch (action.type) {
      case SET_NET_CONNECTION:
        return {
          ...state,
          IsNetConnected: action.payload,
        };

        case SET_TYPE:
        return {
          ...state,
          type: action.payload,
        };

        case SET_USER_ID:
          return {
            ...state,
            userId: action.payload,
          };

          case SET_LOGIN_USER_ID:
            return {
              ...state,
              loginUserId: action.payload
            }
  
      default:
        return state;
    }
  };
  
  export default GlobalVariables;
  