import { Chart, ChartActions } from './types';

const initialstate = {
    charts: []
};

type Action = {
    type: ChartActions,
    payload?: Chart
}

export default (state: any = initialstate, action: Action) => {
    switch (action.type) {
        case ChartActions.ADD:
            return { ...state, charts: [...state.charts, action.payload] };

        case ChartActions.GET:
            return state;

        case ChartActions.CLEAR:
            return { ...state, user: null };

        default:
            return state;
    }
};