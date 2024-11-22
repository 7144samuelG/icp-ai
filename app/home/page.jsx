"use client";

import { useEffect } from "react";
import Main from "./_components/main";
import { initSatellite } from "@junobuild/core";

const HomePage = () => {
  useEffect(() => {
    (async () =>
      await initSatellite({
        satelliteId: "tcalk-7iaaa-aaaal-arsaq-cai",
      }))();
  }, []);
  return (
    <div className="max-w-[1300px] mx-auto px-2 h-full">
      <Main />
    </div>
  );
};

export default HomePage;
