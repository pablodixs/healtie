/**
 * Calcula a distância entre duas coordenadas geográficas usando a fórmula de Haversine
 * @param lat1 Latitude do primeiro ponto
 * @param lon1 Longitude do primeiro ponto
 * @param lat2 Latitude do segundo ponto
 * @param lon2 Longitude do segundo ponto
 * @returns Distância em quilômetros
 */
export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371 // Raio da Terra em quilômetros
    const dLat = toRadians(lat2 - lat1)
    const dLon = toRadians(lon2 - lon1)

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    return Math.round(distance * 100) / 100 // Arredonda para 2 casas decimais
}

function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
}

/**
 * Formata a distância para exibição
 * @param distance Distância em quilômetros
 * @returns String formatada da distância
 */
export function formatDistance(distance: number): string {
    if (distance < 1) {
        return `${Math.round(distance * 1000)} m`
    }
    return `${distance} km`
}
