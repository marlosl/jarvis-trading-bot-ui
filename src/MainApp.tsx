import React, { FC } from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme';
import { Home, LoginPage, MainPage, ParametersForm } from './pages';
import { BotParametersDataTable, BotParametersForm } from './pages/bot';
import { ChartOptionsForm, ViewChartsPage } from './pages/chart';
import { AuthProvider, RequireAuth } from './provider';
import { fetchUser } from './services/AuthService';

const MainApp: FC = () => {
  const bootstrap = async () => {
    await fetchUser();
  }  
  
  bootstrap();
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route
            path="/" 
            element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            } 
          >
            <Route index element={<Home />} />
            <Route path="parameters" element={<ParametersForm />}/>
            <Route path="bot-parameters" element={<React.Fragment><Outlet /></React.Fragment>}>
              <Route index element={<BotParametersDataTable />} />
              <Route path="new" element={<BotParametersForm />} />
              <Route path="edit/:idBotParam" element={<BotParametersForm />} />
            </Route>
            <Route path="chart" element={<React.Fragment><Outlet /></React.Fragment>}>
              <Route index element={<ChartOptionsForm />} />
              <Route path="view/:idBotParam/:start/:end" element={<ViewChartsPage />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MainApp;