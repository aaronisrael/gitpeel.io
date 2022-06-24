import LandingPage from '@/features/landing/pages/LandingPage';
import UserDetail from '@/features/user/pages/Detail';
import RepoDetail from '@/features/repo/pages/Detail';

export const publicRoutes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/:userName',
    element: <UserDetail />,
  },
  {
    path: '/:userName/:repo',
    element: <RepoDetail />,
  },
];
