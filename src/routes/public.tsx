import LandingPage from '@/features/landing/pages/LandingPage';
import Detail from '@/features/user/pages/Detail';

export const publicRoutes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/:userId',
    element: <Detail />,
  },
];
