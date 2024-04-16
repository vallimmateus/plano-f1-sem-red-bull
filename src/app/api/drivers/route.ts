import { NextResponse } from "next/server"

export async function GET(req: Request) {
	const year: string =
		req.headers.get("year") || new Date().getFullYear().toString()
	try {
		const response = await fetch(
			`https://ergast.com/api/f1/${year}/drivers.json`
		)
		const results: Root = await response.json()
		const drivers = results.MRData.DriverTable?.Drivers || []
		return NextResponse.json(
			{ data: drivers, message: "success" },
			{ status: 200 }
		)
	} catch (err) {
		return NextResponse.json({ message: err }, { status: 403 })
	}
}
