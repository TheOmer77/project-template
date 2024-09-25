import { hc } from '@repo/backend/hc';

export const apiClient = hc(import.meta.env.VITE_BACKEND_URL || '/api');
