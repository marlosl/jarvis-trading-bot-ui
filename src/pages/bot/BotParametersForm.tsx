import React, { FC, useEffect } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Alert, Button, Collapse, Grid, Typography } from '@mui/material';
import { botParameterResources } from '../../resources';
import { useNavigate, useParams } from 'react-router-dom';
import { getBotParameters, postBotParameters } from '../../services/BotParametersService';

export interface State {
	id: number;
    broker: string;
	percentageTax: number;
	stopLossPercentage: number;
	minimumLimitPercentage: number;
	rsiPeriod: number;
	rsiOverbought: number;
	rsiOversold: number;
	maxNumberNegotiations: number;
	minPeriodNextNegotiation: number;
	symbol: string;
	buyingQty: number;
	buyingAsset: string;
	sellingAsset: string;
	streamSymbol: string;
	streamInterval: number;
	created: string;
	closed: string;
}

const BotParametersForm: FC = () => {
    const [values, setValues] = React.useState<State>({
        id: 0,
        broker: '',
        percentageTax: 0,
        stopLossPercentage: 0,
        minimumLimitPercentage: 0,
        rsiPeriod: 0,
        rsiOverbought: 0,
        rsiOversold: 0,
        maxNumberNegotiations: 0,
        minPeriodNextNegotiation: 0,
        symbol: '',
        buyingQty: 0,
        buyingAsset: '',
        sellingAsset: '',
        streamSymbol: '',
        streamInterval: 0,
        created: '',
        closed: ''
    });

    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [isFormError, setFormError] = React.useState<boolean | undefined>(false);
    const [isInitialized, setInitialized] = React.useState<boolean>(false);
    const { idBotParam } = useParams();
    const navigate = useNavigate();
    
    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === 'number') {
            setValues({ ...values, [prop]: Number(event.target.value) });
        } else {
            setValues({ ...values, [prop]: event.target.value as string });
        }
    };

    const selectHandleChange = (prop: keyof State) => (event: SelectChangeEvent) => {
        let value = event.target.value as string;
        setValues({ ...values, [prop]: value });
    };

    const save = async () => {
        setFormError(false);
        try {
            let response = await postBotParameters(values);
            if (response != null && !response.success) {
                setFormError(true);
                let message = String(response.error);
                setErrorMessage(message);
            } else if (response != null && response.success) {
                navigate('/bot-parameters', { replace: true })
            }
        } catch(error) {
            console.error("------------------------- START FORM SAVE ERROR -------------------------");
            console.error(error);
            console.error("-------------------------- END FORM SAVE ERROR --------------------------");
            setFormError(true);
            setErrorMessage(String(error));
        }    
    }

    const bootstrap = async () => {
        if (idBotParam && !isInitialized) {
            let response = await getBotParameters(idBotParam);
            if (response.success) {
                let data = response.data;
                console.log("data:", data);
                setValues(data);
                setInitialized(true);
            }
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
            <Box sx={{ maxWidth: 700 }}>
                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'center' }}>
                    <Box sx={{ width: 1, mx: 'auto', textAlign: 'center', p: 1 }}>
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1, paddingBottom: 2.5 }}>
                            Bot Parameters
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'center' }}>
                    <Collapse in={isFormError}>
                        <Alert variant="filled" severity="error">{errorMessage}</Alert>
                    </Collapse>
                </Box>
                
                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'left' }}>
                    <FormControl sx={{ m: 1, width: '25%' }}>
                        <InputLabel htmlFor="broker">{botParameterResources.Broker}</InputLabel>
                        <Select
                            required
                            error={isFormError}
                            id="broker"
                            value={values.broker}
                            onChange={selectHandleChange('broker')}
                            label={botParameterResources.Broker}
                        >
                            <MenuItem value={'Binance'}>Binance</MenuItem>
                            <MenuItem value={'KuCoin'}>KuCoin</MenuItem>
                        </Select>                        
                    </FormControl>
                </Box>

                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'left' }}>
                    <FormControl sx={{ m: 1, width: '25%' }}>
                        <InputLabel htmlFor="percentage-tax">{botParameterResources.PercentageTax}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="percentage-tax"
                            value={values.percentageTax}
                            onChange={handleChange('percentageTax')}
                            startAdornment={<InputAdornment position="start">%</InputAdornment>}
                            label={botParameterResources.PercentageTax}
                            type="number"
                            inputProps={{ step: "0.01" }}                    
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <InputLabel htmlFor="stop-loss-percentage">{botParameterResources.StopLossPercentage}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}                        
                            id="stop-loss-percentage"
                            value={values.stopLossPercentage}
                            onChange={handleChange('stopLossPercentage')}
                            startAdornment={<InputAdornment position="start">%</InputAdornment>}
                            label={botParameterResources.StopLossPercentage}
                            type="number"
                            inputProps={{ step: "0.01" }}                    
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '35%' }}>
                        <InputLabel htmlFor="minimum-limit-percentage">{botParameterResources.MinimumLimitPercentage}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}                        
                            id="minimum-limit-percentage"
                            value={values.minimumLimitPercentage}
                            onChange={handleChange('minimumLimitPercentage')}
                            startAdornment={<InputAdornment position="start">%</InputAdornment>}
                            label={botParameterResources.MinimumLimitPercentage}
                            type="number"
                            inputProps={{ step: "0.01" }}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'left' }}>
                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <InputLabel htmlFor="rsi-period">{botParameterResources.RsiPeriod}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}                        
                            id="rsi-period"
                            value={values.rsiPeriod}
                            onChange={handleChange('rsiPeriod')}
                            label={botParameterResources.RsiPeriod}
                            type="number"
                            inputProps={{ step: "1", shrink: true }}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <InputLabel htmlFor="rsi-overbought">{botParameterResources.RsiOverbought}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}                        
                            id="rsi-overbought"
                            value={values.rsiOverbought}
                            onChange={handleChange('rsiOverbought')}
                            label={botParameterResources.RsiOverbought}
                            startAdornment={<InputAdornment position="start">%</InputAdornment>}
                            type="number"
                            inputProps={{ step: "0.01" }}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <InputLabel htmlFor="rsi-oversold">{botParameterResources.RsiOversold}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}                        
                            id="rsi-oversold"
                            value={values.rsiOversold}
                            onChange={handleChange('rsiOversold')}
                            label={botParameterResources.RsiOversold}
                            startAdornment={<InputAdornment position="start">%</InputAdornment>}
                            type="number"
                            inputProps={{ step: "0.01" }}
                        />
                    </FormControl>
                </Box>
                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'left' }}>
                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <InputLabel htmlFor="max-number-negotiations">{botParameterResources.MaxNumberNegotiations}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}                        
                            id="max-number-negotiations"
                            value={values.maxNumberNegotiations}
                            onChange={handleChange('maxNumberNegotiations')}
                            label={botParameterResources.MaxNumberNegotiations}
                            type="number"
                            inputProps={{ step: "1", shrink: true }}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <InputLabel htmlFor="min-period-next-negotiation">{botParameterResources.MinPeriodNextNegotiation}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="min-period-next-negotiation"
                            value={values.minPeriodNextNegotiation}
                            onChange={handleChange('minPeriodNextNegotiation')}
                            label={botParameterResources.MinPeriodNextNegotiation}
                            type="number"
                            inputProps={{ step: "1", shrink: true }}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'left' }}>
                    <FormControl sx={{ m: 1, width: '25%' }}>
                        <InputLabel htmlFor="symbol">{botParameterResources.Symbol}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="symbol"
                            value={values.symbol}
                            onChange={handleChange('symbol')}
                            label={botParameterResources.Symbol}
                            type="text"
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <InputLabel htmlFor="buying-qty">{botParameterResources.BuyingQty}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="buying-qty"
                            value={values.buyingQty}
                            onChange={handleChange('buyingQty')}
                            label={botParameterResources.BuyingQty}
                            type="number"
                            inputProps={{ step: "1", shrink: true }}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'left' }}>
                    <FormControl sx={{ m: 1, width: '25%' }}>
                        <InputLabel htmlFor="buying-asset">{botParameterResources.BuyingAsset}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="buying-asset"
                            value={values.buyingAsset}
                            onChange={handleChange('buyingAsset')}
                            label={botParameterResources.BuyingAsset}
                            type="text"
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <InputLabel htmlFor="selling-asset">{botParameterResources.SellingAsset}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="selling-asset"
                            value={values.sellingAsset}
                            onChange={handleChange('sellingAsset')}
                            label={botParameterResources.SellingAsset}
                            type="text"
                        />
                    </FormControl>
                </Box>

                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'left' }}>
                    <FormControl sx={{ m: 1, width: '25%' }}>
                        <InputLabel htmlFor="stream-symbol">{botParameterResources.StreamSymbol}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="stream-symbol"
                            value={values.streamSymbol}
                            onChange={handleChange('streamSymbol')}
                            label={botParameterResources.StreamSymbol}
                            type="text"
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <InputLabel htmlFor="stream-interval">{botParameterResources.StreamInterval}</InputLabel>
                        <Select
                            required
                            error={isFormError}
                            id="selling-interval"
                            value={((values.streamInterval as unknown) as string)}
                            onChange={selectHandleChange('streamInterval')}
                            label={botParameterResources.StreamInterval}
                        >                        
                            <MenuItem value={60}>1m</MenuItem>
                            <MenuItem value={180}>3m</MenuItem>
                            <MenuItem value={300}>5m</MenuItem>
                            <MenuItem value={900}>15m</MenuItem>
                            <MenuItem value={1800}>30m</MenuItem>
                            <MenuItem value={3600}>1h</MenuItem>
                            <MenuItem value={7200}>2h</MenuItem>
                            <MenuItem value={14400}>4h</MenuItem>
                            <MenuItem value={21600}>6h</MenuItem>
                            <MenuItem value={28800}>8h</MenuItem>
                            <MenuItem value={43200}>12h</MenuItem>
                            <MenuItem value={86400}>1d</MenuItem>
                            <MenuItem value={259200}>3d</MenuItem>
                            <MenuItem value={604800}>1w</MenuItem>
                            <MenuItem value={2592000}>1M</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'center' }}>
                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <Button variant="contained" component="span" onClick={save}>
                            Save
                        </Button>
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <Button variant="contained" component="span" onClick={() => {navigate('/bot-parameters', { replace: true })}}>
                            Cancel
                        </Button>
                    </FormControl>
                </Box>
                
            </Box>
        </Grid>
    )
}

export default BotParametersForm;