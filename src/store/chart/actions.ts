import { Chart, ChartActions } from './types';

const chartsAdd = (payload: Chart) => ({
    type: ChartActions.ADD,
    payload
});

const chartsGet = () => ({
    type: ChartActions.GET
});

const chartsClear = () => ({
    type: ChartActions.CLEAR
});

export { chartsAdd, chartsGet, chartsClear }