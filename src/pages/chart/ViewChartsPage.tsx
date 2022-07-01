import React, { FC, useEffect, useRef } from 'react';
import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getCandlesticks } from '../../services/AnalyzerService';
import { ChartType, Indicators, SeriesProps } from '../../components/charts/SeriesComponent';
import "./style.css";
import ChartComponent from '../../components/charts/ChartComponent';

const ViewChartsPage: FC = () => {
   const [isInitialized, setInitialized] = React.useState<boolean>(false);
   const [chartSeries, setChartSeries] = React.useState<SeriesProps[]>([]);
   const { idBotParam, start, end } = useParams();
   const candlesIndicators = new Map<number, Indicators>();

   const timeToLocal = (originalTime: string) : number =>{
      const d = new Date(originalTime);
      return d.getTime();
   }

   const bootstrap = async () => {
      let priceData: any[] = [];
      let psiData: any[] = [];
      let volumeData: any[] = [];
      let markers: any[] = [];
      let series: SeriesProps[] = [];
      let extraSeries: any;
      let bbandUpperData: any[] = [];
      let bbandLowerData: any[] = [];

      if (!isInitialized && idBotParam && start && end) {
         let response = await getCandlesticks(idBotParam, start, end);
      
         if (response.success) {
            let candles = response.data;
            for (let i = 0; i < candles.length; i++) {
               let timeValue = timeToLocal(candles[i]["eventTime"]) / 1000;
               let candle = {
                  time: timeValue,
                  open: parseFloat(candles[i]["openPrice"]),
                  high: parseFloat(candles[i]["highPrice"]),
                  low: parseFloat(candles[i]["lowPrice"]),
                  close: parseFloat(candles[i]["closePrice"])
               };
    
               let volume = {
                  time: timeValue,
                  value: parseFloat(candles[i]["volume"])
               }

               let psi = {
                  time: timeValue,
                  value: parseFloat(candles[i]["psi"])
               }

               let bbandUpper = {
                  time: timeValue,
                  value: parseFloat(candles[i]["bbandUpper"])
               }
               
               let bbandLower = {
                  time: timeValue,
                  value: parseFloat(candles[i]["bbandLower"])
               }               

               priceData.push(candle);
               volumeData.push(volume);
               psiData.push(psi);
               bbandUpperData.push(bbandUpper);
               bbandLowerData.push(bbandLower);

               if (candles[i]["operation"] === "B") {
                  markers.push({ 
                     time: timeValue,
                     position: 'belowBar',
                     color: '#8495e5',
                     shape: 'arrowUp',
                     text: 'Buy - PSI: ' + parseFloat(candles[i]["psi"]).toFixed(2)
                  });
               }

               if (candles[i]["operation"] === "S") {
                  markers.push({ 
                     time: timeValue,
                     position: 'aboveBar',
                     color: '#e91e63',
                     shape: 'arrowDown',
                     text: 'Sell - PSI: ' + parseFloat(candles[i]["psi"]).toFixed(2)
                  });
               }

               candlesIndicators.set(timeValue, { 
                  psi: parseFloat(candles[i]["psi"]).toFixed(2),
                  bbandUpper: parseFloat(candles[i]["bbandUpper"]).toFixed(2),
                  bbandLower: parseFloat(candles[i]["bbandLower"]).toFixed(2)
               });
            }

            extraSeries = {
               bbandUpperData: bbandUpperData,
               bbandLowerData: bbandLowerData
            };
            candles.length = 0;
         }
         setInitialized(true);
  
         let candleSeries : SeriesProps = {
            type: ChartType.Candlestick,
            indicators: candlesIndicators,
            seriesData: priceData,
            volumeData: [],
            markers: markers,
            extraSeries: extraSeries
         }
         series.push(candleSeries);

         let lineSeries : SeriesProps = {
            type: ChartType.Line,
            indicators: new Map<number, Indicators>(),
            seriesData: psiData,
            volumeData: [],
            markers: [],
            extraSeries: []
         }
         series.push(lineSeries);
         setChartSeries(series);
      }
   }

   useEffect(() => {
      bootstrap();
   }, []);

   return (
      <Grid
         container
         rowSpacing={1}
         style={{ minHeight: '100vh', width: "100%", marginTop: '-8px' }}
      >
         <Grid item xs={12} style={{ width: "100%" }}>
            <Box style={{ width: "100%" }}>
               <ChartComponent series={chartSeries}/>
            </Box>
         </Grid>
      </Grid>
   );
}

export default ViewChartsPage;