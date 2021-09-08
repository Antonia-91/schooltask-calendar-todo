import React, { useState } from "react";

const Api = () => {
  const [holidays, setHolidays] = useState([]);

  const getAPI = async () => {
    const API_CALL = await fetch("https://sholiday.faboul.se/dagar/v2.1/2021");
    const data = await API_CALL.json();
    setHolidays([data.dagar]);
    console.log(holidays);
  };
  //getAPI();

  return (
    <>
      <button onClick={() => getAPI()}>Hämta svenska holidays</button>
    </>
  );
};

export default Api;
