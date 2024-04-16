import { NextResponse } from "next/server"

export async function GET(req: Request) {
	const constructorId = req.headers.get("constructorId")
	try {
		const constructor: Constructor = await fetch(
			`https://ergast.com/api/f1/constructors/${constructorId}.json`
		)
			.then(res => res.json())
			.then(data => data.MRData.ConstructorTable.Constructors[0])

		return NextResponse.json(
			{ data: constructor, message: "success" },
			{ status: 200 }
		)
	} catch (err) {
		return NextResponse.json({ message: err }, { status: 403 })
	}
}
