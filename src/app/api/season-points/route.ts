import { prismaClient } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allPoints = await prismaClient.points.findMany({});

    const pointsByDriver: { [key: string]: number } = allPoints.reduce((acc, point) => {
      if (acc[point.driverId]) {
        acc[point.driverId] += Number(point.points);
      } else {
        acc[point.driverId] = Number(point.points);
      }
      return acc;
    }, {} as { [key: string]: number });

    const drivers: Driver[] = await fetch('https://ergast.com/api/f1/current/drivers.json')
    .then(res => res.json())
    .then(data => data.MRData.DriverTable.Drivers)

    const totalPointsByDriver = Object.entries(pointsByDriver)
    .map(([driverId, points]) => {
      const driver = drivers.find(driver => driver.driverId === driverId)!
      return ({
        ...driver,
        totalPoints: points
      })
    }).sort((a, b) => b.totalPoints - a.totalPoints);
    return NextResponse.json({ data: totalPointsByDriver, message: 'success' }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 })
  }
}

export async function POST() {
  try {
    const allPoints = await prismaClient.points.findMany({});
    const lastRound = allPoints.reduce((acc, point) => {
      if (acc < Number(point.round)) {
        acc = Number(point.round);
      }
      return acc;
    }, 0)

    const raceData: Race | undefined = await fetch(`http://ergast.com/api/f1/current/${lastRound + 1}/results.json`).then(res => res.json()).then(data => data.MRData.RaceTable.Races[0])

    if (raceData && raceData.Results && raceData.Results.length > 0) {
      const raceFilteredResults = raceData.Results.filter(result => result.Constructor.constructorId !== "red_bull")
      const raceResult = raceFilteredResults.sort((a, b) => Number(a.position) - Number(b.position))

      const fastestLapDriverId = raceResult.filter(driver => driver.FastestLap).sort((a, b) => Number(a.FastestLap.rank) - Number(b.FastestLap.rank))[0].Driver.driverId

      // for loop to update first 10 drivers
      for (let i = 0; i < raceResult.length; i++) {
        // update prisma Points table with race results
        await prismaClient.points.create({
          data: {
            driverId: raceResult[i].Driver.driverId,
            description: "Finished race in position " + (i + 1),
            position: `${i + 1}`,
            points: i < 10 ? ['25', '18', '15', '12', '10', '8', '6', '4', '2', '1'][i] : '0',
            round: raceData.round,
            season: raceData.season
          }
        })

        if (raceResult[i].Driver.driverId === fastestLapDriverId && i < 10) {
          // update prisma Points with fastest lap
          await prismaClient.points.create({
            data: {
              driverId: fastestLapDriverId,
              description: "Fastest lap",
              points: '1',
              round: raceData.round,
              season: raceData.season
            }
          })
        }
      }
    }

    // GET Sprint Results
    const sprintData: Race | undefined = await fetch(`http://ergast.com/api/f1/current/${lastRound + 1}/sprint.json`).then(res => res.json()).then(data => data.MRData.RaceTable.Races[0])

    if (sprintData && sprintData.SprintResults && sprintData.SprintResults.length > 0) {
      const springFilteredResults = sprintData.SprintResults.filter(result => result.Constructor.constructorId !== "red_bull")
      const springResult = springFilteredResults.sort((a, b) => Number(a.position) - Number(b.position))

      // for loop to update first 10 drivers
      for (let i = 0; i < 8; i++) {
        // update prisma Points table with race results
        await prismaClient.points.create({
          data: {
            driverId: springResult[i].Driver.driverId,
            description: "Finished sprint in position " + (i + 1),
            position: `${i + 1}`,
            points: ['8', '7', '6', '5', '4', '3', '2', '1'][i],
            round: sprintData.round,
            season: sprintData.season
          }
        })
      }
    }

    return NextResponse.json({ message: 'success' }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 })
  }
}