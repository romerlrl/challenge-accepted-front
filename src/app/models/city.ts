export interface City {
    id: number
    name: string
    state: string
    latitude: number
    longitude: number
}

export function showCity(city: City): string {
    if (typeof city.name == typeof undefined) { return "" }
    return `${city.name} - ${city.state}`
}