import { OpenAPI as OpenAPICOMMON } from '@/shared/common-api';
import { OpenAPI as OpenAPIDLMM } from '@/shared/dlmm-api';
import { QueryClient } from '@tanstack/react-query';

OpenAPIDLMM.BASE = process.env.NEXT_PUBLIC_DLMM_API_URL ?? '';
OpenAPICOMMON.BASE = process.env.NEXT_PUBLIC_COMMON_API_URL ?? '';

export const queryClient = new QueryClient();
