import { NextResponse } from "next/server"

export async function GET(req: Request) {
	const data: { year: string; round: string } = await req.json()
	try {
		const response = await fetch(
			`http://ergast.com/api/f1/${data.year}/${data.round}/sprint.json`
		)
		const results: Root = await response.json()
		return NextResponse.json(
			{ data: results.MRData.RaceTable?.Races, message: "success" },
			{ status: 200 }
		)
	} catch (err) {
		return NextResponse.json({ message: err }, { status: 403 })
	}
}
