export type VariableState = {
    IsNetConnected: Boolean;
    type: string;
  };
  
  const initialState: VariableState = {
    IsNetConnected: false,
    type: 'user'
  };
  
  const SET_NET_CONNECTION = 'SET_NET_CONNECTION';
  const SET_TYPE = 'SET_TYPE';
  
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
  
      default:
        return state;
    }
  };
  
  export default GlobalVariables;
  