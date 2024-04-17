import { NextResponse } from "next/server"

import { prismaClient } from "@/lib/prisma"
import { transformHistoricalDataToConstructorStandings } from "@/lib/utils"

export const dynamic = "force-dynamic"
export const revalidate = 60 * 10 // 10 minutes

export async function GET() {
	try {
		const allPoints = await prismaClient.points.findMany({})

		const constructors: Constructor[] = await fetch(
			"https://ergast.com/api/f1/current/constructors.json"
		)
			.then(res => res.json())
			.then(data => data.MRData.ConstructorTable.Constructors)

		const raceSchedule: Race[] = await fetch(
			"https://ergast.com/api/f1/current.json"
		)
			.then(res => res.json())
			.then(data => data.MRData.RaceTable.Races)

		const totalPointsByConstructor =
			transformHistoricalDataToConstructorStandings(
				allPoints,
				constructors,
				raceSchedule
			)

		return NextResponse.json(
			{ data: totalPointsByConstructor, message: "success" },
			{ status: 200 }
		)
	} catch (err) {
		return NextResponse.json({ message: err }, { status: 403 })
	}
}
