'use client'
import axios from "axios"
import { useCallback, useEffect, useState } from "react"

type DriverPoints = Driver & {
    totalPoints: number
}

export function Standings() {
    const [table, setTable] = useState<DriverPoints[]>([])

    const getSeasonPoints = useCallback(async () => {
        await axios
            .get('/api/season-points')
            .then((res) => setTable(res.data.data))
    }, [])

    const updateSeasonPoints = useCallback(async () => {
        await axios
            .post('/api/season-points')
    }, [])
    
    useEffect(() => {
        getSeasonPoints()
    }, [getSeasonPoints])

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Season Classification</h1>
            <button onClick={updateSeasonPoints}>Update</button>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Driver</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {table.map((driver, index) => (
                        <tr key={driver.driverId}>
                            <td>{index + 1}</td>
                            <td>{driver.givenName} {driver.familyName}</td>
                            <td>{driver.totalPoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
    
}