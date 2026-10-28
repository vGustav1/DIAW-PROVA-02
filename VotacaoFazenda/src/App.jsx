import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Resultado from './pages/Resultado';
import Votacao from './pages/Votacao';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <div className="app-conteudo">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/votacao" element={<Votacao />} />
            <Route path="/resultado" element={<Resultado />} />
            <Route
              path="*"
              element={(
                <main className="pagina pagina-nao-encontrada">
                  <h1>Página não encontrada</h1>
                  <p>Use o menu acima para voltar à votação.</p>
                </main>
              )}
            />
          </Routes>
        </div>
        <footer className="rodape">DIAW 2026, PUC Minas</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;