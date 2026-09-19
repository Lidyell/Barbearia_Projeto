import { useEffect, useState } from "react";


import Introduction from "../../components/Introduction/Introduction";
import Cards_Services from "../../components/Cards/Cards";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";




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
