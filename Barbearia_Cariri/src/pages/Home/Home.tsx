import { useEffect, useState } from "react";


import Introduction from "../components/Introduction/Introduction.tsx";
import Cards_Services from "../components/Cards/Cards.tsx";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen.tsx";




function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}

      <div className={`page ${loading ? "hidden" : "show"}`}>
        <Introduction />
        <Cards_Services />
      </div>
    </>
  );
}

export default Home;
