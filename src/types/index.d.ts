type Root = {
	MRData: Mrdata
}

type Mrdata = {
	xmlns: string
	series: string
	url: string
	limit: string
	offset: string
	total: string
	RaceTable?: RaceTable
	DriverTable?: DriverTable
	ConstructorTable?: ConstructorTable
}

type RaceTable = {
	season: string
	round: string
	Races: Race[]
}

type Race = {
	season: string
	round: string
	url: string
	raceName: string
	Circuit: Circuit
	date: string
	time: string
	Results?: Result[]
	FirstPractice?: EventRace
	SecondPractice?: EventRace
	ThirdPractice?: EventRace
	Qualifying?: EventRace
	Sprint?: EventRace
	SprintResults?: Result[]
}

type CircuitLocation = {
	lat: string
	long: string
	locality: string
	country: string
}

type Circuit = {
	circuitId: string
	url: string
	circuitName: string
	Location: CircuitLocation
}

type Result = {
	number: string
	position: string
	positionText: string
	points: string
	Driver: Driver
	Constructor: Constructor
	grid: string
	laps: string
	status: string
	Time: Time
	FastestLap: FastestLap
}

type DriverTable = {
	season: string
	Drivers: Driver[]
}

type Driver = {
	driverId: string
	permanentNumber: string
	code: string
	url: string
	givenName: string
	familyName: string
	dateOfBirth: string
	nationality: string
}

type Constructor = {
	constructorId: string
	url: string
	name: string
	nationality: string
}

type Time = {
	millis: string
	time: string
}

type Time2 = {
	time: string
}

type AverageSpeed = {
	units: string
	speed: string
}

type FastestLap = {
	rank: string
	lap: string
	Time: Time2
	AverageSpeed: AverageSpeed
}

type EventRace = {
	date: string
	time: string
}

type ConstructorTable = {
	constructorId: string
	Constructors: Constructor[]
}

type DriverPoints = Driver & {
	totalPoints: number
	position: number
	constructorId: string
	constructor: Constructor
	circuits: {
		[circuit: string]: {
			position: number
			springPosition?: number
			fastestLap: boolean
			totalPoints: number
			constructorId: string
		}
	}
}

type ConstructorPoints = Constructor & {
	totalPoints: number
	position: number
	circuits: {
		[circuit: string]: {
			[driverId: string]: {
				position: number
				springPosition?: number
				fastestLap: boolean
				totalPoints: number
			}
		}
	}
}
