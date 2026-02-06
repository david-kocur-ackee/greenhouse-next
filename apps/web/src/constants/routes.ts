import type { ValuesOf } from '@workspace/common/types';

export const routes = {
    login: '/',
    home: '/home',
} as const satisfies Record<string, string>;

export type Route = ValuesOf<typeof routes>;

export const authRoutes = {
    profile: '/profile',
};

export type AuthRoute = ValuesOf<typeof authRoutes>;
