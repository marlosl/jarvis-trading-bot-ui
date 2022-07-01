import React, { FC, useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from "lightweight-charts";
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

enum ChartType {
  Candlestick = 'CANDLESTICK',
  Line = 'LINE'
}

export interface Indicators {
  psi: string;
  bbandUpper: string;
  bbandLower: string;
};

export interface SeriesProps {
  type: ChartType;
  indicators: Map<number, Indicators>;
  seriesData: any[];
  volumeData: any[];
  markers: any[];
  extraSeries: any;
}

interface Props {
  key: number;
  series: SeriesProps;
  updateChartsTimeRange: (chartId: string, pos: ChartSeriesPos) => void;
  childUpdateChartsTimeRange: any;
}

export interface ChartSeriesPos {
  from: number;
  to: number;
  barSpacing: number;
  scrollPosition: number;
}

const SeriesComponent: FC<Props> = (props) => {
    const currentChartId: string = uuid();
    const chartContainerRef = useRef<any>(null);
    const chart = useRef<any>(null);
    const resizeObserver = useRef<any>(null);
    
    const [isInitialized, setInitialized] = React.useState<boolean>(false);
    const [chartLegend, setChartLegend] = React.useState<string>("");
    let isSeriesInitialized = false;

    const bootstrap = async () => {
      chart.current = createChart(chartContainerRef.current, {
        width: (chartContainerRef.current as HTMLElement).clientWidth,
        height: 0,
        layout: {
          backgroundColor: "#253248",
          textColor: "rgba(255, 255, 255, 0.9)"
        },
        grid: {
          vertLines: {
            color: "#334158"
          },
          horzLines: {
            color: "#334158"
          }
        },
        crosshair: {
          mode: CrosshairMode.Normal
        },
        timeScale: {
          borderColor: "#485c7b",
          tickMarkFormatter: (time: number) => {
            const date = new Date(time * 1000);
            return format(date, "HH:mm");
          },
        }
      });
  
      switch (props.series.type) {
        case ChartType.Candlestick:
          const candleSeries = chart.current.addCandlestickSeries({
            upColor: "#4bffb5",
            downColor: "#ff4976",
            borderDownColor: "#ff4976",
            borderUpColor: "#4bffb5",
            wickDownColor: "#838ca1",
            wickUpColor: "#838ca1"
          });
          
          candleSeries.setData(props.series.seriesData);
          if (props.series.markers) {
            candleSeries.setMarkers(props.series.markers);
          }

          if (props.series.extraSeries.bbandUpperData) {
            const bbandUpperSeries = chart.current.addLineSeries({
              color: '#ff0000'
            });
            bbandUpperSeries.setData(props.series.extraSeries.bbandUpperData);
          }

          if (props.series.extraSeries.bbandLowerData) {
            const bbandLowerSeries = chart.current.addLineSeries({
              color: '#ff0000'
            });
            bbandLowerSeries.setData(props.series.extraSeries.bbandLowerData);
          }          
          break;

        case ChartType.Line:
          const psiSeries = chart.current.addLineSeries({
            title: 'second',
            color: '#ff0000'
          });
          psiSeries.setData(props.series.seriesData);
          break;
      }

      chart.current.subscribeCrosshairMove((param: any) => {
        if (props.series.indicators && props.series.indicators.has(param.time)) {
          let indicators = props.series.indicators.get(param.time);
          if (indicators) {
            let psi = indicators.psi;
            setChartLegend("PSI: "+ psi);
          }
        }
      });
  
      if (props.series.volumeData) {
        const volumeSeries = chart.current.addHistogramSeries({
          color: "#182233",
          lineWidth: 2,
          priceFormat: {
            type: "volume"
          },
          overlay: true,
          scaleMargins: {
            top: 0.8,
            bottom: 0
          }
        });
    
        volumeSeries.setData(props.series.volumeData);        
      }
      setInitialized(true);
      isSeriesInitialized = true;
      chart.current.timeScale().subscribeVisibleTimeRangeChange(syncHandler);
      props.childUpdateChartsTimeRange.current = doUpdateChartsTimeRange;      
    }

    const syncHandler = (p: any) => {
      if (isSeriesInitialized) {
        let pos: ChartSeriesPos = {
          from: p.from,
          to: p.to,
          barSpacing: chart.current.timeScale().options().barSpacing,
          scrollPosition: chart.current.timeScale().scrollPosition()         
        }
        console.log("syncHandler", p, pos);
        props.updateChartsTimeRange(currentChartId, pos);
      }
    }

    const doUpdateChartsTimeRange = (chartId: string, pos: ChartSeriesPos) => {
      console.log("doUpdateChartsTimeRange", chartId, pos);
      if (chartId !== currentChartId) {
        chart.current.timeScale().setVisibleRange({ from: pos.from, to: pos.to });
        chart.current.timeScale().applyOptions({ rightOffset: pos.scrollPosition, barSpacing: pos.barSpacing });
      }
    }

    useEffect(() => {
        bootstrap();
    }, []);
  
    // Resize chart on container resizes.
    useEffect(() => {
      if (isInitialized) {
        resizeObserver.current = new ResizeObserver(entries => {
          const { width, height } = entries[0].contentRect;
          chart.current.applyOptions({ width, height });
          setTimeout(() => {
            chart.current.timeScale().fitContent();
          }, 0);
        });
    
        resizeObserver.current.observe(chartContainerRef.current);
    
        return () => resizeObserver.current.disconnect();
      }
    }, []);    

    return (
        <div>
            <div
                ref={chartContainerRef}
                className="chart-container"
                style={{ height: '45vh', width: "100%" }}
            />
            {chartLegend && <div className="legend">{chartLegend}</div>}
        </div>
    );
}

export { ChartType, SeriesComponent };