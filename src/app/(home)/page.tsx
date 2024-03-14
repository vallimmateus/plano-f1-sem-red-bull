'use client'
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Standings } from "./components/standings";

export default function Page() {
  const [standings, setStandings] = useState<DriverPoints[]>([])
  
  const getStandings = useCallback(async () => {
    await axios.post("/api/season-points")
    await axios.get("/api/season-points")
      .then((res) => {
        const data: DriverPoints[] = res.data.data
        setStandings(data)
      }).catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    getStandings()
  }, [getStandings])

  return (
    <main className="w-full h-full bg-[radial-gradient(#514e61,_#14141c)]">
      <div className="flex min-h-screen flex-col items-center p-20 w-full h-full bg-[url('https://www.formula1.com/etc/designs/fom-website/images/patterns/plus-x1.png')] bg-repeat">
        <Standings driversPoints={standings} />
      </div>
    </main>
  );
}
