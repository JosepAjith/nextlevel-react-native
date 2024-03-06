export type TripState = {
  openFilter: boolean;
  filterValue: String;
};

const initialState: TripState = {
  openFilter: false,
  filterValue: '',
};

const IS_FILTER = 'IS_FILTER';
const SET_FILTER_VALUE = 'SET_FILTER_VALUE';

const TripReducer = (
  state = initialState,
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    case IS_FILTER:
      return {
        ...state,
        openFilter: action.payload,
      };

    case SET_FILTER_VALUE:
      return {
        ...state,
        filterValue: action.payload,
      };

    default:
      return state;
  }
};

export default TripReducer;
