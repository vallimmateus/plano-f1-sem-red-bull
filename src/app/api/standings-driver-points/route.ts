import { prismaClient } from "@/lib/prisma"
import { transformHistoricalDataToStandings } from "@/lib/utils"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 60 * 10 // 10 minutes

export async function GET() {
	try {
		const allPoints = await prismaClient.points.findMany({})

		const drivers: Driver[] = await fetch(
			"https://ergast.com/api/f1/current/drivers.json"
		)
			.then(res => res.json())
			.then(data => data.MRData.DriverTable.Drivers)

		const raceSchedule: Race[] = await fetch(
			"https://ergast.com/api/f1/current.json"
		)
			.then(res => res.json())
			.then(data => data.MRData.RaceTable.Races)

		const constructors: Constructor[] = await fetch(
			"https://ergast.com/api/f1/current/constructors.json"
		)
			.then(res => res.json())
			.then(data => data.MRData.ConstructorTable.Constructors)

		const totalPointsByDriver = transformHistoricalDataToStandings(
			allPoints,
			drivers,
			raceSchedule,
			constructors
		)
		return NextResponse.json(
			{ data: totalPointsByDriver, message: "success" },
			{ status: 200 }
		)
	} catch (err) {
		return NextResponse.json({ message: err }, { status: 403 })
	}
}
