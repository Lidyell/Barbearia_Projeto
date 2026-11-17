import { Scissors } from 'lucide-react';
import './LoadingScreen.css';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loader">
        <div className="loader-icon-box">
          <Scissors size={32} className="loader-scissors" />
        </div>
        <h1 className="loader-title">Barbearia Castelo Branco</h1>
        <p className="loader-sub">Tradição & Estilo no Cariri</p>
        <div className="bar">
          <div className="bar-progress" />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
