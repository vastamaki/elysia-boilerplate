import type { RouteConfig } from '@react-router/dev/routes';
import { index, layout, route } from '@react-router/dev/routes';

export default [
  // Root index route - redirects to login or dashboard based on auth status
  index('routes/index.tsx'),

  // Auth routes with layout
  layout('layouts/auth-layout.tsx', [route('auth/*', 'routes/auth/index.tsx')]),

  // Protected routes with dashboard layout
  layout('layouts/protected-layout.tsx', [route('dashboard', 'routes/dashboard/index.tsx')]),
] satisfies RouteConfig;
