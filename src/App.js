
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/Login';
import { theme } from './theme';
import Profil from './pages/Profil';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
