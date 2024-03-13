'use client'

import { TitlePage } from "@/components/title-page"
import { Driver } from "./driver"

export function Standings({driversPoints}: {driversPoints: DriverPoints[]}) {
    return (
        <div className="flex flex-col items-center justify-center text-white">
            <TitlePage>Classificação</TitlePage>
            {/* <button onClick={updateSeasonPoints}>Update</button> */}
            <div className="flex flex-col gap-1">
                    {driversPoints.map((driver, index) => (
                        <Driver {...driver} position={index + 1} key={index} />
                    ))}
            </div>
        </div>
    )
    
}