import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import { TodoProvider } from './context/TodoContext';
import theme from './theme';
import './App.css';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoProvider>
        <BrowserRouter>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 min-w-0 pb-0 md:pb-0 lg:pb-0">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calendar" element={<CalendarPage />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TodoProvider>
    </ThemeProvider>
  );
}
