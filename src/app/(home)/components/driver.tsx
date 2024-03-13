'use client'
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export function Driver({ givenName, familyName, totalPoints, position, constructorId }: DriverPoints & { position: number }) {
    const [constructor, setConstructor] = useState<string | null>(null)

    const getConstructor = useCallback(async (constructorId: string) => {
        const baseURL = process.env.NODE_ENV === 'production' ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';
        await axios.get(`${baseURL}/api/constructor`, {
            headers: {
                constructorId
            }
        }).then((res) => {
            const data: Constructor = res.data.data
            setConstructor(data.name)
        }).catch((err) => console.error(err))
    }, [])

    const getDriverPhotoUrl = useCallback(() => {
        return `https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${givenName[0].toUpperCase()}/${givenName.substring(0, 3).toUpperCase()}${familyName.substring(0, 3).toUpperCase()}01_${givenName}_${familyName}/${givenName.substring(0, 3).toLowerCase()}${familyName.substring(0, 3).toLowerCase()}01.png.transform/2col/image.png`
    }, [familyName, givenName])

    const getDriverNumberUrl = useCallback(() => {
        return `https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/${givenName.substring(0, 3).toUpperCase()}${familyName.substring(0, 3).toUpperCase()}01.png.transform/2col/image.png`
    }, [familyName, givenName])

    useEffect(() => {
        getConstructor(constructorId)
    }, [getConstructor, constructorId])

    return (
        <div className={cn("group flex rounded w-96 items-center", {
            "bg-[#38393e] h-32 text-white": position === 1,
            "bg-white h-16 text-black": position > 1
        })}>
            <div className="w-11 flex justify-center"><h2 className="font-bold">{position}</h2></div>
            <div className={cn("h-full w-fit", {
                "py-5": position === 1,
                "py-3.5": position > 1
            })}>
                <div className={cn("h-full w-1", {
                    "bg-ferrari": constructorId === "ferrari",
                    "bg-mercedes": constructorId === "mercedes",
                    "bg-mclaren": constructorId === "mclaren",
                    "bg-aston_martin": constructorId === "aston_martin",
                    "bg-haas": constructorId === "haas",
                    "bg-williams": constructorId === "williams",
                    "bg-sauber": constructorId === "sauber",
                    "bg-rb": constructorId === "rb",
                    "bg-alpine": constructorId === "alpine",
                })} />
            </div>
            <div className={cn("flex-1 flex flex-col pl-2.5 justify-center group-hover:translate-x-1 transition-all h-full", {
                "justify-between py-5": position === 1,
                "py-3.5": position > 1
            })}>
                <h2 className={cn({
                    "text-lg leading-4": position === 1,
                    "text-sm": position > 1,
                })}>
                    {givenName}
                    {position === 1 ? <br /> : " "}
                    <span className={cn("uppercase", {
                        "font-black text-2xl": position === 1,
                        "font-bold": position > 1
                    })}>
                        {familyName}
                    </span>
                </h2>
                <p className={cn("text-[0.6rem]", {
                    "text-muted-foreground": position > 1,
                })}>
                    {constructor
                    ? (
                        constructorId === "rb"
                        ? <span><span className="blur-[2px]">{constructor?.slice(0,3)}</span>{constructor?.slice(2)}</span>
                        : constructor
                    )
                    : "loading..."}
                </p>
            </div>
            <div className={cn("h-full flex min-w-20", {
                "relative items-end": position === 1,
                "items-center": position > 1
            })}>
                <div className={cn("h-full w-fit flex items-end justify-end relative object-contain transition-all", {
                    "absolute right-0 bottom-0 -ml-8 h-fit group-hover:-ml-10": position === 1,
                    "grayscale group-hover:grayscale-0 translate-x-3 group-hover:translate-x-0 opacity-50 group-hover:opacity-100": position > 1
                })}>
                    <Image
                        alt={`${givenName} ${familyName}`}
                        src={getDriverPhotoUrl()}
                        width={0}
                        height={0}
                        className="object-contain h-full w-fit"
                        unoptimized
                    />
                    <Image
                        alt={`Permanent number of ${givenName} ${familyName}`}
                        src={getDriverNumberUrl()}
                        width={0}
                        height={0}
                        className={cn("w-fit object-contain absolute bottom-1", {
                            "h-8 -left-6": position === 1,
                            "h-6 -left-3": position > 1,
                        })}
                        unoptimized
                    />
                </div>
                <div className="w-20 flex justify-center py-2">
                    <Badge className="bg-[#ededed] text-black text-[0.7rem] font-normal z-10 hover:bg-[#ededed]">
                        <p><span className="font-bold">{totalPoints}</span> PTS</p>
                    </Badge>
                </div>
            </div>
        </div>
    )
}