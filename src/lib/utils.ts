import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDriverPhotoUrl(driver: Driver) {
  return `https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${driver.givenName[0].toUpperCase()}/${driver.givenName.substring(0,2).toUpperCase()}${driver.familyName.substring(0,2).toUpperCase()}01_${driver.givenName}_${driver.familyName}/${driver.givenName.substring(0,2).toLowerCase()}${driver.familyName.substring(0,2).toLowerCase()}01.png.transform/2col/image.png`
}