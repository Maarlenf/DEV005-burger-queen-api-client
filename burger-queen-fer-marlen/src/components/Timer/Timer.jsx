import { useState, useEffect } from "react";

function Timer({ time }) {
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      let fechaActual = new Date();
      let fechaAPI = new Date(time);
      let diferenciaTiempo = fechaActual.getTime() - fechaAPI.getTime();
      let segundosTranscurridos = Math.floor(diferenciaTiempo / 1000);
      let minutosTranscurridos = Math.floor(segundosTranscurridos / 60);
      let horasTranscurridas = Math.floor(minutosTranscurridos / 60);
      let diasTranscurridos = Math.floor(horasTranscurridas / 24);
      //   console.log(fechaAPI);
      //   console.log(`${diasTranscurridos}`);
      setElapsedTime(
        `${diasTranscurridos} dias, ${horasTranscurridas % 24}:${
          minutosTranscurridos % 60
        }:${segundosTranscurridos % 60} hrs.`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);
  return <span data-testid='timerTest'>{elapsedTime}</span>;
}

export default Timer;
