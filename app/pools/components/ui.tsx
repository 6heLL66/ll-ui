'use client';

import { usePools } from "@/features/pools/usePools";
import { PoolsTable } from "@/widgets/pools-table/ui"

export const PoolsUI = () => {
    const { pools, page, limit, handlePageChange, handleSearchTermChangeDebounced, query} = usePools();

    return <PoolsTable loading={query.isFetching} pools={pools?.pairs ?? []} totalCount={pools?.total ?? 0} page={page} limit={limit} onPageChange={handlePageChange} onSearch={handleSearchTermChangeDebounced} />
}