import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public';

const AppRoutes = () => {
  const commonRoutes = [{ path: '/', element: <></> }];
  const element = useRoutes([...publicRoutes, ...commonRoutes]);

  return <>{element}</>;
};
export default AppRoutes;
