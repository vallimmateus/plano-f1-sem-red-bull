import axios from "axios";
import { Standings } from "./components/standings";

async function getStandings() {
  const baseURL = process.env.NODE_ENV === 'production' ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';
  await axios.post(`${baseURL}/api/season-points`)
  const response = await axios.get(`${baseURL}/api/season-points`)
  const data = response.data.data
  return data as DriverPoints[]
}

export default async function Home() {
  const standings = await getStandings()

  return (
    <main className="w-full h-full bg-[radial-gradient(#514e61,_#14141c)]">
      <div className="flex min-h-screen flex-col items-center p-20 w-full h-full bg-[url('https://www.formula1.com/etc/designs/fom-website/images/patterns/plus-x1.png')] bg-repeat">
        <Standings driversPoints={standings} />
      </div>
    </main>
  );
}
