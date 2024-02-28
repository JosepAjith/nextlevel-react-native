export type VariableState = {
    IsNetConnected: Boolean;
  };
  
  const initialState: VariableState = {
    IsNetConnected: false,
  };
  
  const SET_NET_CONNECTION = 'SET_NET_CONNECTION';
  
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
  
      default:
        return state;
    }
  };
  
  export default GlobalVariables;
  