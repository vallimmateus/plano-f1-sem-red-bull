import { prismaClient } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 60 * 10 // 10 minutes

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
      const allPositions = allPoints
        .filter(point => point.driverId === driverId && point.description.includes("Finished race in position") && point.position !== null)
        .map(point => point.position)
        .reduce((acc, position) => {
          if (position === null) {
            return acc
          }
          if (!acc[position]) {
            acc[position] = 0;
          }
          acc[position]++;
          return acc
        }, {
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 0,
          "6": 0,
          "7": 0,
          "8": 0,
          "9": 0,
          "10": 0,
          "11": 0,
          "12": 0,
          "13": 0,
          "14": 0,
          "15": 0,
          "16": 0,
          "17": 0,
          "18": 0,
          "19": 0,
          "20": 0,
          "21": 0,
          "22": 0,
        } as { [key: string]: number } )

      const allConstructors = allPoints
        .filter(point => point.driverId === driverId)
        .reduce((acc, point) => {
          if (!acc[point.constructorId]) {
            acc[point.constructorId] = { points: 0, count: 0 };
          }
          acc[point.constructorId].points += Number(point.points);
          acc[point.constructorId].count++;
          return acc;
        }, {} as { [key: string]: {
          points: 0,
          count: 0
        } })

        const constructorWithMaxPoints = Object.entries(allConstructors)
          .reduce((maxConstructor, [constructorId, {points, count}]) => {
            if (points > maxConstructor.points) {
              return { constructorId, points, count };
            } else if (count > maxConstructor.count) {
              return { constructorId, points, count };
            }
            return maxConstructor;
          }, { constructorId: '', points: 0, count: 0 }).constructorId

      return ({
        ...driver,
        totalPoints: points,
        constructorId: constructorWithMaxPoints,
        countPositions: allPositions
      })
    })
    .sort((a, b) => b.countPositions["22"] - a.countPositions["22"])
    .sort((a, b) => b.countPositions["21"] - a.countPositions["21"])
    .sort((a, b) => b.countPositions["20"] - a.countPositions["20"])
    .sort((a, b) => b.countPositions["19"] - a.countPositions["19"])
    .sort((a, b) => b.countPositions["18"] - a.countPositions["18"])
    .sort((a, b) => b.countPositions["17"] - a.countPositions["17"])
    .sort((a, b) => b.countPositions["16"] - a.countPositions["16"])
    .sort((a, b) => b.countPositions["15"] - a.countPositions["15"])
    .sort((a, b) => b.countPositions["14"] - a.countPositions["14"])
    .sort((a, b) => b.countPositions["13"] - a.countPositions["13"])
    .sort((a, b) => b.countPositions["12"] - a.countPositions["12"])
    .sort((a, b) => b.countPositions["11"] - a.countPositions["11"])
    .sort((a, b) => b.countPositions["10"] - a.countPositions["10"])
    .sort((a, b) => b.countPositions["9"] - a.countPositions["9"])
    .sort((a, b) => b.countPositions["8"] - a.countPositions["8"])
    .sort((a, b) => b.countPositions["7"] - a.countPositions["7"])
    .sort((a, b) => b.countPositions["6"] - a.countPositions["6"])
    .sort((a, b) => b.countPositions["5"] - a.countPositions["5"])
    .sort((a, b) => b.countPositions["4"] - a.countPositions["4"])
    .sort((a, b) => b.countPositions["3"] - a.countPositions["3"])
    .sort((a, b) => b.countPositions["2"] - a.countPositions["2"])
    .sort((a, b) => b.countPositions["1"] - a.countPositions["1"])
    .sort((a, b) => b.totalPoints - a.totalPoints);
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

    // Fetch all races of the current season
    const scheduleRaces: Race[] | undefined = await fetch(`http://ergast.com/api/f1/current.json`)
    .then(res => res.json())
    .then(data => data.MRData.RaceTable.Races);

    if (!scheduleRaces) {
    throw new Error('Failed to fetch schedule races');
    }

    // Filter out the races that have already happened
    const remainingRaces = scheduleRaces.filter(race => {
      const raceDateTime = new Date(`${race.date}T${race.time}`);
      const now = new Date();
      if (race.Sprint) {
        const sprintDateTime = new Date(`${race.Sprint.date}T${race.Sprint.time}`)
        return Number(race.round) > lastRound && (raceDateTime < now || sprintDateTime < now);
      }
      return Number(race.round) > lastRound && raceDateTime < now;
    }).map(race => race.round);

    for (let round of remainingRaces) {
      // GET Sprint Results
      const sprintData: Race | undefined = await fetch(`http://ergast.com/api/f1/current/${round}/sprint.json`).then(res => res.json()).then(data => data.MRData.RaceTable.Races[0])
  
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
              season: sprintData.season,
              constructorId: springResult[i].Constructor.constructorId
            }
          })
        }
      }
  
      const raceData: Race | undefined = await fetch(`http://ergast.com/api/f1/current/${round}/results.json`).then(res => res.json()).then(data => data.MRData.RaceTable.Races[0])
  
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
              season: raceData.season,
              constructorId: raceResult[i].Constructor.constructorId
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
                season: raceData.season,
                constructorId: raceResult[i].Constructor.constructorId
              }
            })
          }
        }
      }
  
      if (!raceData && !sprintData) {
        throw new Error('Failed to fetch race and/or sprint results');
      }
    }
    

    return NextResponse.json({ message: 'success' }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 })
  }
}