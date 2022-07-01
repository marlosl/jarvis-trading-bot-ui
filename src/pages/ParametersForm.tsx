import React, { FC, useEffect } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Alert, Button, Collapse, Grid, Typography } from '@mui/material';
import { parameterResources } from '../resources';
import { getParameters, postParameters } from '../services/ParametersService';

interface State {
    defaultPercentageTax: number;
	defaultStopLossPercentage: number;
	defaultMinimumLimitPercentage: number;
	defaultRsiPeriod: number;
	defaultRsiOverbought: number;
	defaultRsiOversold: number;
	telegramBotId: string;
	telegramApiId: string;
	telegramChatId: string;
	binanceApiKey: string;
	binanceSecretKey: string;
}

const ParametersForm: FC = () => {
    const [values, setValues] = React.useState<State>({
        defaultPercentageTax: 0,
        defaultStopLossPercentage: 0,
        defaultMinimumLimitPercentage: 0,
        defaultRsiPeriod: 1,
        defaultRsiOverbought: 0,
        defaultRsiOversold: 0,
        telegramBotId: '',
        telegramApiId: '',
        telegramChatId: '',
        binanceApiKey: '',
        binanceSecretKey: ''
    });
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [successMessage, setSuccessMessage] = React.useState<string>("");
    const [isFormError, setFormError] = React.useState<boolean | undefined>(false);
    const [isInitialized, setInitialized] = React.useState<boolean>(false);

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === 'number') {
            setValues({ ...values, [prop]: Number(event.target.value) });
        } else {
            setValues({ ...values, [prop]: event.target.value as string });
        }
    };

    const bootstrap = async () => {
        if (!isInitialized) {
            let response = await getParameters();
            if (response.success) {
                setValues(response.data);
                setInitialized(true);
            }
        }
    }

    const save = async () => {
        setFormError(false);
        setSuccessMessage("");
        try {
            let response = await postParameters(values);
            if (response != null && !response.success) {
                setFormError(true);
                let message = String(response.error);
                setErrorMessage(message);
            } else if (response != null && response.success) {
                setSuccessMessage("Parameters were saved successfully.");
            }
        } catch(error) {
            console.error("------------------------- START FORM SAVE ERROR -------------------------");
            console.error(error);
            console.error("-------------------------- END FORM SAVE ERROR --------------------------");
            setFormError(true);
            setErrorMessage(String(error));
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
                            Parameters
                        </Typography>
                    </Box>
                </Box>
                
                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'center' }}>
                    <Collapse in={isFormError}>
                        <Alert variant="filled" severity="error">{errorMessage}</Alert>
                    </Collapse>
                    <Collapse in={successMessage.length > 0}>
                        <Alert variant="filled" severity="success">{successMessage}</Alert>
                    </Collapse>
                </Box>

                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'left' }}>
                    <FormControl sx={{ m: 1, width: '25%' }}>
                        <InputLabel htmlFor="default-percentage-tax">{parameterResources.DefaultPercentageTax}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="default-percentage-tax"
                            value={values.defaultPercentageTax}
                            onChange={handleChange('defaultPercentageTax')}
                            startAdornment={<InputAdornment position="start">%</InputAdornment>}
                            label={parameterResources.DefaultPercentageTax}
                            type="number"
                            inputProps={{ step: "0.001" }}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <InputLabel htmlFor="default-stop-loss-percentage">{parameterResources.DefaultStopLossPercentage}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="default-stop-loss-percentage"
                            value={values.defaultStopLossPercentage}
                            onChange={handleChange('defaultStopLossPercentage')}
                            startAdornment={<InputAdornment position="start">%</InputAdornment>}
                            label={parameterResources.DefaultStopLossPercentage}
                            type="number"
                            inputProps={{ step: "0.01" }}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '35%' }}>
                        <InputLabel htmlFor="default-minimum-limit-percentage">{parameterResources.DefaultMinimumLimitPercentage}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="default-minimum-limit-percentage"
                            value={values.defaultMinimumLimitPercentage}
                            onChange={handleChange('defaultMinimumLimitPercentage')}
                            startAdornment={<InputAdornment position="start">%</InputAdornment>}
                            label={parameterResources.DefaultMinimumLimitPercentage}
                            type="number"
                            inputProps={{ step: "0.01" }}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'left' }}>
                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <InputLabel htmlFor="default-rsi-period">{parameterResources.DefaultRsiPeriod}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="default-rsi-period"
                            value={values.defaultRsiPeriod}
                            onChange={handleChange('defaultRsiPeriod')}
                            label={parameterResources.DefaultRsiPeriod}
                            type="number"
                            inputProps={{ step: "1", shrink: "true" }}                    
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <InputLabel htmlFor="default-rsi-overbought">{parameterResources.DefaultRsiOverbought}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="default-rsi-overbought"
                            value={values.defaultRsiOverbought}
                            onChange={handleChange('defaultRsiOverbought')}
                            label={parameterResources.DefaultRsiOverbought}
                            startAdornment={<InputAdornment position="start">%</InputAdornment>}
                            type="number"
                            inputProps={{ step: "0.01" }}                    
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <InputLabel htmlFor="default-rsi-oversold">{parameterResources.DefaultRsiOversold}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="default-rsi-oversold"
                            value={values.defaultRsiOversold}
                            onChange={handleChange('defaultRsiOversold')}
                            label={parameterResources.DefaultRsiOversold}
                            startAdornment={<InputAdornment position="start">%</InputAdornment>}
                            type="number"
                            inputProps={{ step: "0.01" }}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'left' }}>
                    <FormControl sx={{ m: 1, width: '25%' }}>
                        <InputLabel htmlFor="telegram-bot-id">{parameterResources.TelegramBotId}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="telegram-bot-id"
                            value={values.telegramBotId}
                            onChange={handleChange('telegramBotId')}
                            label={parameterResources.TelegramBotId}
                            type="text"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '40%' }}>
                        <InputLabel htmlFor="telegram-api-id">{parameterResources.TelegramApiId}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="telegram-api-id"
                            value={values.telegramApiId}
                            onChange={handleChange('telegramApiId')}
                            label={parameterResources.TelegramApiId}
                            type="text"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25%' }}>
                        <InputLabel htmlFor="telegram-chat-id">{parameterResources.TelegramChatId}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="telegram-chat-id"
                            value={values.telegramChatId}
                            onChange={handleChange('telegramChatId')}
                            label={parameterResources.TelegramChatId}
                            type="text"
                        />
                    </FormControl>                                
                </Box>

                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'left' }}>
                    <FormControl sx={{ m: 1, width: '75%' }}>
                        <InputLabel htmlFor="binance-api-key">{parameterResources.BinanceApiKey}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="binance-api-key"
                            value={values.binanceApiKey}
                            onChange={handleChange('binanceApiKey')}
                            label={parameterResources.BinanceApiKey}
                            type="text"
                        />
                    </FormControl>                
                </Box>

                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'left' }}>
                    <FormControl sx={{ m: 1, width: '75%' }}>
                        <InputLabel htmlFor="binance-secret-key">{parameterResources.BinanceSecretKey}</InputLabel>
                        <OutlinedInput
                            required
                            error={isFormError}
                            id="binance-secret-key"
                            value={values.binanceSecretKey}
                            onChange={handleChange('binanceSecretKey')}
                            label={parameterResources.BinanceSecretKey}
                            type="text"
                        />
                    </FormControl>                
                </Box>

                <Box sx={{ width: 1, my: 1, p: 1, textAlign: 'center' }}>
                    <FormControl sx={{ m: 1, width: '30%' }}>
                        <Button variant="contained" component="span" onClick={save}>
                            Save
                        </Button>
                    </FormControl>
                </Box>
            </Box>
        </Grid>
    );
}

export default ParametersForm;