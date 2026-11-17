import { useEffect, useState } from "react";
import Introduction from "../../components/Introduction/Introduction";
import Diferenciais from "../../components/Diferenciais/Diferenciais";
import Cards_Services from "../../components/Cards/Cards";
import BarbeirosSection from "../../components/Barbeiros/BarbeirosSection";
import Depoimentos from "../../components/Depoimentos/Depoimentos";
import Localizacao from "../../components/Localizacao/Localizacao";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}

      <div className={`page ${loading ? "hidden" : "show"}`}>
        {/* 1. Hero Principal */}
        <Introduction />

        {/* 2. Diferenciais & Experiência */}
        <Diferenciais />

        {/* 3. Tabela & Cards de Serviços */}
        <Cards_Services />

        {/* 4. Mestres Barbeiros */}
        <BarbeirosSection />

        {/* 5. Depoimentos dos Clientes */}
        <Depoimentos />

        {/* 6. Localização, Horários e Mapa */}
        <Localizacao />
      </div>
    </>
  );
}

export default Home;
