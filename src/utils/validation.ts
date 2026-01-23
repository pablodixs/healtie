/**
 * Sanitizes a search query string to prevent injection attacks
 * @param query - The raw search query from user input
 * @returns Sanitized query string
 */
export function sanitizeSearchQuery(query: string): string {
    if (typeof query !== 'string') return ''
    
    // Remove any HTML tags
    const withoutTags = query.replace(/<[^>]*>/g, '')
    
    // Trim whitespace
    const trimmed = withoutTags.trim()
    
    // Limit length to reasonable maximum
    const maxLength = 200
    return trimmed.slice(0, maxLength)
}

/**
 * Validates and sanitizes latitude coordinate
 * @param lat - Latitude value to validate
 * @returns Valid latitude or null
 */
export function validateLatitude(lat: string | number | null): number | null {
    if (lat === null || lat === undefined) return null
    
    const parsed = typeof lat === 'string' ? parseFloat(lat) : lat
    
    if (isNaN(parsed) || parsed < -90 || parsed > 90) {
        return null
    }
    
    return parsed
}

/**
 * Validates and sanitizes longitude coordinate
 * @param lon - Longitude value to validate
 * @returns Valid longitude or null
 */
export function validateLongitude(lon: string | number | null): number | null {
    if (lon === null || lon === undefined) return null
    
    const parsed = typeof lon === 'string' ? parseFloat(lon) : lon
    
    if (isNaN(parsed) || parsed < -180 || parsed > 180) {
        return null
    }
    
    return parsed
}

/**
 * Validates CNES (Brazilian health establishment code)
 * @param cnes - CNES code to validate
 * @returns Valid CNES or null
 */
export function validateCNES(cnes: string | null): string | null {
    if (!cnes) return null
    
    // CNES should be numeric and typically 7 digits
    const sanitized = cnes.replace(/[^0-9]/g, '')
    
    if (sanitized.length < 3 || sanitized.length > 10) {
        return null
    }
    
    return sanitized
}
