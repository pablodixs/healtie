'use client'

import { useEffect } from 'react'
import { debounce } from 'lodash'

export function useMapBounds(map, setBbox) {
    useEffect(() => {
        if (!map) return

        const handleMove = debounce(() => {
            const bounds = map.getBounds()

            setBbox({
                minLat: bounds.getSouth(),
                minLon: bounds.getWest(),
                maxLat: bounds.getNorth(),
                maxLon: bounds.getEast(),
            })
        }, 300)

        map.on('moveend', handleMove)

        return () => {
            map.off('moveend', handleMove)
            handleMove.cancel()
        }
    }, [map, setBbox])
}
