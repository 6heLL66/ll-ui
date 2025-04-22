import { PairRouteService } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useMemo, useState } from "react";

export const usePools = () => {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(25);
    const [searchTerm, setSearchTerm] = useState('');

    const poolsQuery = useQuery({
        queryKey: ['pools', page, limit, searchTerm],
        queryFn: () => PairRouteService.allWithPagination(page, limit, null, undefined, null, null, searchTerm),
    })

    const handlePageChange = (page: number) => {
        setPage(page);
    }

    const handleLimitChange = (limit: number) => {
        setLimit(limit);
    }

    const handleSearchTermChange = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    }

    const handleSearchTermChangeDebounced = useMemo(() => {
        return debounce((searchTerm: string) => handleSearchTermChange(searchTerm), 500);
    }, []);

    return {
        query: poolsQuery,
        pools: poolsQuery.data,
        page,
        limit,
        searchTerm,
        handlePageChange,
        handleLimitChange,
        handleSearchTermChangeDebounced,
    }
}