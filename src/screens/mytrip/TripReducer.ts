export type TripState = {
    openFilter: boolean;

};

const initialState: TripState = {
    openFilter: false,
};

const IS_FILTER = 'IS_FILTER';

const TripReducer = (
    state = initialState,
    action: { type: any; payload: any },
) => {
    switch (action.type) {
        case IS_FILTER:
            return {
                ...state,
                openFilter: action.payload,
            };

        default:
            return state;
    }
};

export default TripReducer;
