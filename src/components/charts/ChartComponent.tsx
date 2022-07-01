import React, { FC, useRef } from 'react';
import { ChartSeriesPos, SeriesComponent, SeriesProps } from './SeriesComponent';

interface Props {
    series: SeriesProps[];
}

const ChartComponent: FC<Props> = (props) => {
    const chartEvent = useRef<any>(null);

    const updateChartsTimeRange = (chartId: string, pos: ChartSeriesPos) => {
        console.log("updateChartsTimeRange", chartId, pos);
        chartEvent.current(chartId, pos);
    }

    return (
        <div>
            {props.series.map((series, i) => (
                <SeriesComponent key={i} series={series} updateChartsTimeRange={updateChartsTimeRange} childUpdateChartsTimeRange={chartEvent}/>
            ))}
        </div>
    );
}

export default ChartComponent;