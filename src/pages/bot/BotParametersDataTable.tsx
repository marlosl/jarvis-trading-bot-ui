import React, { FC, useEffect } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deleteBotParameters, getBotParametersDataList } from '../../services/BotParametersService';
import ResponsiveDialog from '../ResponsiveDialog';
import { State as BotParamsState } from './BotParametersForm';

import "../../css/BotParametersDataTable.css";

const columns: GridColDef[] = [
  { field: 'broker', headerName: 'Broker', width: 100 },
  { field: 'symbol', headerName: 'Symbol', width: 100 },
  { field: 'buyingQty', headerName: 'Buying Qty', type: 'number', width: 120 },
  { field: 'buyingAsset', headerName: 'Buying Asset', width: 120 },
  { field: 'sellingAsset', headerName: 'Selling Asset', width: 120 },
  { field: 'streamSymbol', headerName: 'Stream Symbol', width: 120 },
  { field: 'streamInterval', headerName: 'Stream Interval', type: 'number', width: 120 },
  { field: 'maxNumberNegotiations', headerName: 'Max Number Neg.', type: 'number', width: 130 },
  { field: 'rsiPeriod', headerName: 'RSI Period', type: 'number', width: 100 },
  { field: 'rsiOverbought', headerName: 'RSI Overbought', type: 'number', width: 120 },
  { field: 'rsiOversold', headerName: 'RSI Oversold', type: 'number', width: 120 },
  { field: 'percentageTax', headerName: '% Tax', type: 'number', width: 100 },
  { field: 'stopLossPercentage', headerName: 'Stop Loss %', type: 'number', width: 100 },
  { field: 'minimumLimitPercentage', headerName: 'Min. Limit %', type: 'number', width: 100 },
  { field: 'minPeriodNextNegotiation', headerName: 'Min Period Next Neg.', type: 'number', width: 150 },
  { field: 'created', headerName: 'Created', width: 120 },
];

const BotParametersDataTable: FC = () => {
  const [rows, setRows] = React.useState<BotParamsState[]>([]);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [isInitialized, setInitialized] = React.useState<boolean>(false);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const editBotParams = () => {
    if (selectionModel.length > 0) {
      let id = selectionModel[0];
      navigate('/bot-parameters/edit/' + id, { replace: true })
    }
  }

  const showConfirmDialog = () => {
    if (selectionModel.length > 0) {
      setOpenDialog(true);
    }
  }

  const deleteBotParams = async () => {
    setOpenDialog(false);
    if (selectionModel.length > 0) {
      let id = selectionModel[0];
      await deleteBotParameters(String(id));
      await updateRows();
    }
  }

  const updateRows = async() => {
    let response = await getBotParametersDataList();
    if (response.success) {
      let dataList = response.data;
      console.log("dataList:", dataList);
      setRows(dataList);
      setInitialized(true);
    }    
  }

  const bootstrap = async () => {
    if (!isInitialized) {
      await updateRows();
    }
  }

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ paddingTop: 4 }}
    >
      <ResponsiveDialog
        title={'Confirm delete'}
        contentText={'Confirm the deletion of selected row?'}
        confirmLabel={'Yes'}
        cancelLabel={'No'}
        opened={openDialog}
        onConfirm={deleteBotParams}
        onCancel={() => { setOpenDialog(false); }}
      />

      <Box sx={{ width: '80%', my: 1, p: 1, textAlign: 'center' }}>
        <Box sx={{ width: 1, mx: 'auto', textAlign: 'center', p: 1 }}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, paddingBottom: 2.5 }}>
            Bot Parameters
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: '80%', paddingBottom: 2 }}>
        <Grid container direction="row">
          <Grid item sx={{ textAlign: 'left' }} xs={3}>
            <Button variant="contained" component="span" onClick={() => { navigate('/bot-parameters/new', { replace: true }) }}>
              New
            </Button>
          </Grid>

          <Grid item sx={{ textAlign: 'right' }} xs={9}>
            <Button sx={{ marginRight: 2 }} variant="contained" component="span" onClick={editBotParams}>
              Edit
            </Button>

            <Button variant="contained" component="span" onClick={showConfirmDialog}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: '80%', height: 600 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection={true}
          onSelectionModelChange={(newSelectionModel) => {
            if (newSelectionModel.length > 1) {
              const selectionSet = new Set(selectionModel);
              const result = newSelectionModel.filter((s) => !selectionSet.has(s));
              setSelectionModel(result);
            } else {
              setSelectionModel(newSelectionModel);
            }
          }}
          selectionModel={selectionModel}
        />
      </Box>
    </Grid>
  );
}

export default BotParametersDataTable;
