enum ChartActions {
    ADD = 'ADD',    
    GET = 'GET',
    CLEAR = 'CLEAR'
}
class Chart {
    public chart: any;

    constructor() {
        this.chart = undefined;
    }
}

export { Chart, ChartActions };