import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from "@mui/material/Button";
import React, { FC, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { getBotParametersDataList } from '../../services/BotParametersService';


const ChartOptionsForm: FC = () => {
  const [isInitialized, setInitialized] = React.useState<boolean>(false);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());
  const [idBotParam, setIdBotParam] = React.useState<string>("");
  const [botParamsList, setBotParamsList] = React.useState<any[]>([]);
  const navigate = useNavigate();

  const selectHandleChange = (event: SelectChangeEvent) => {
    let value = event.target.value as string;
    console.log("value:", value);
    setIdBotParam(value);
};  

  const viewChart = () => {
    console.log("idBotParam:", idBotParam, "startDate:", startDate, "endDate:", endDate);
    if (idBotParam && startDate && endDate) {
      let start = format(startDate, "yyyy-MM-dd'T'HH:mm:ss");
      let end = format(endDate, "yyyy-MM-dd'T'HH:mm:ss");

      navigate(`/chart/view/${idBotParam}/${start}/${end}`);
    }
  }

  const bootstrap = async () => {
    if (!isInitialized) {
      let response = await getBotParametersDataList();
      if (response.success) {
        let dataList = response.data;
        setBotParamsList(dataList);
        setInitialized(true);
      }
    }
  }

  const renderMenuItem = (value: any) => {
    return (
      <MenuItem key={value.id} value={value.id}>
        {value.id} - {value.symbol} - {value.buyingQty} - {value.rsiPeriod} - {value.rsiOverbought} - {value.rsiOversold}
      </MenuItem>
    );
  }

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid
        container
        component="form"
        rowSpacing={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh', width: "100%" }}
      >
          <Typography variant="h4" component="h1" gutterBottom>
          Chart Options
          </Typography>
          <Box sx={{ maxWidth: 700 }}>

            <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'left' }}>
              <FormControl sx={{ m: 1, width: '200px' }}>
                <InputLabel htmlFor="symbol">Symbol</InputLabel>
                <Select
                    required
                    id="symbol"
                    label="Symbol"
                    value={((idBotParam as unknown) as string)}
                    onChange={selectHandleChange}
                > 
                  {botParamsList.map(renderMenuItem)}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'left' }}>
              <FormControl sx={{ m: 1, width: '200px' }}>
                <DateTimePicker
                  ampm={false}
                  label="Start DateTime"
                  value={startDate}
                  inputFormat="dd/MM/yyyy HH:mm"
                  onChange={(newValue) => {setStartDate(newValue)}}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </Box>

            <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'center' }}>
              <FormControl sx={{ m: 1, width: '200px' }}>
              <DateTimePicker
                  ampm={false}
                  label="End DateTime"
                  value={endDate}
                  inputFormat="dd/MM/yyyy HH:mm"
                  onChange={(newValue) => {setEndDate(newValue)}}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </Box>

            <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'center' }}>
              <FormControl sx={{ m: 1, width: '150px', height: '100%' }}>
                <Button variant="contained" component="span" onClick={viewChart}>
                    View Chart
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Grid>
      </LocalizationProvider>
  );
}

export default ChartOptionsForm;
