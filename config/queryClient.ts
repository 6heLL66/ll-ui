import { OpenAPI } from '@/shared/api';
import { QueryClient } from '@tanstack/react-query';

OpenAPI.BASE = process.env.NEXT_PUBLIC_DLMM_API_URL ?? '';

export const queryClient = new QueryClient();
