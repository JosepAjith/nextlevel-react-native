export type TripState = {
  openFilter: boolean;
  filterValue: String;
  chip: number;
};

const initialState: TripState = {
  openFilter: false,
  filterValue: '',
  chip: 1
};

const IS_FILTER = 'IS_FILTER';
const SET_FILTER_VALUE = 'SET_FILTER_VALUE';
const SET_CHIP = 'SET_CHIP';

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

      case SET_CHIP:
        return {
          ...state,
          chip: action.payload
        }

    default:
      return state;
  }
};

export default TripReducer;
