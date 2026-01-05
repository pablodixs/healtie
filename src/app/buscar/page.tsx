'use client'

import useSWR from 'swr'
import { AnimatePresence } from 'motion/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useCallback, useMemo } from 'react'

import { fetcher } from '@/lib/swrFetcher'
import { API_ENDPOINTS } from '@/lib/apiConfig'
import { useDebounce } from '@/hooks/useDebounce'
import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import { SuggestionResponse } from '@/interfaces/SearchSuggestions'
import { PageableEstablishmentResponse } from '@/interfaces/Establishment'

import { Heading } from '@/components/Typography/Heading'
import { HeroSearchBar } from '../ui/components/HeroSearchBar'

import {
    headingHiddenContainer,
    mainContainer,
    searchBarContainer,
} from './styles'

import { SearchSuggestions } from './components/search-suggestions'
import { SearchResults } from './components/search-results'
import { SearchEmpty } from './components/search-empty'
import { SearchLoadingView } from './components/search-loading-view'
import { SearchDefaultView } from './components/search-default-view'

const allowedFilters = ['HOSPITAL', 'UPA', 'UBS'] as const
type AllowedFilter = (typeof allowedFilters)[number]

function isAllowedFilter(value: string | null): value is AllowedFilter {
    return !!value && allowedFilters.includes(value as AllowedFilter)
}

const DEBOUNCE_DELAY = 300
const MIN_QUERY_LENGTH = 3

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { coords } = useUserGeolocation()

    const urlQuery = searchParams.get('q') || ''
    const rawFilterParam = searchParams.get('filter')
    const filterParam = isAllowedFilter(rawFilterParam) ? rawFilterParam : null

    const [query, setQuery] = useState(urlQuery)
    const [establishmentFilter, setEstablishmentFilter] = useState<
        string | null
    >(filterParam)
    const [inputFocused, setInputFocused] = useState(false)

    const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY)

    useEffect(() => {
        setQuery(urlQuery)
    }, [urlQuery])

    useEffect(() => {
        setEstablishmentFilter(filterParam)
    }, [filterParam])

    const suggestionsUrl = useMemo(() => {
        if (!debouncedQuery || debouncedQuery.length < MIN_QUERY_LENGTH) {
            return null
        }

        const params = new URLSearchParams({
            q: debouncedQuery,
        })

        if (coords) {
            params.append('lat', coords.latitude.toString())
            params.append('lon', coords.longitude.toString())
        }

        return `${API_ENDPOINTS.establishment.suggestions}?${params.toString()}`
    }, [debouncedQuery, coords])

    const searchUrl = useMemo(() => {
        if (!urlQuery || urlQuery.length < MIN_QUERY_LENGTH) {
            return null
        }

        const params = new URLSearchParams({
            q: urlQuery,
        })

        if (establishmentFilter) {
            params.append('t', establishmentFilter)
        }

        if (coords) {
            params.append('lat', coords.latitude.toString())
            params.append('lon', coords.longitude.toString())
        }

        return `${API_ENDPOINTS.establishment.search}?${params.toString()}`
    }, [urlQuery, establishmentFilter, coords])

    const { data: suggestions } = useSWR<SuggestionResponse[]>(
        suggestionsUrl,
        fetcher,
        {
            revalidateOnFocus: false,
            dedupingInterval: 500,
        }
    )

    const { data, isLoading } = useSWR<PageableEstablishmentResponse>(
        searchUrl,
        fetcher
    )

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value)
        },
        []
    )

    const handleSearch = useCallback(() => {
        const params = new URLSearchParams()

        if (query) {
            params.append('q', query)
        }

        if (establishmentFilter) {
            params.append('filter', establishmentFilter)
        }

        setInputFocused(false)
        router.replace(`/buscar?${params.toString()}`, { scroll: false })
    }, [query, establishmentFilter, router])

    const handleInputFocusChange = useCallback(() => {
        setInputFocused((prev) => !prev)
    }, [])

    const renderContent = () => {
        if (isLoading) {
            return <SearchLoadingView query={query} />
        }

        if (data?.empty) {
            return <SearchEmpty />
        }

        if (data && data.content.length > 0) {
            return <SearchResults data={data} coords={coords} />
        }

        return <SearchDefaultView />
    }

    return (
        <main className={mainContainer}>
            <div className={headingHiddenContainer}>
                <Heading>Buscar</Heading>
            </div>
            <div className={searchBarContainer}>
                <HeroSearchBar
                    showFilterOptions
                    filterValue={establishmentFilter}
                    onFilterChange={setEstablishmentFilter}
                    autoFocus
                    value={query}
                    onChange={handleChange}
                    searchAction={handleSearch}
                    isInputFocused={inputFocused}
                    onInputFocusChange={handleInputFocusChange}
                />
                <SearchSuggestions
                    localQuery={query}
                    inputFocused={inputFocused}
                    handleSearch={handleSearch}
                    suggestions={suggestions ?? null}
                />
            </div>
            <AnimatePresence mode="sync">{renderContent()}</AnimatePresence>
        </main>
    )
}
