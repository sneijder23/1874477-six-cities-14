import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { LoadingScreen } from '../../pages/loading-screen';

type PublicRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

function PublicRoute(props: PublicRouteProps): JSX.Element {
  const { authorizationStatus, children } = props;

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  return authorizationStatus === AuthorizationStatus.Auth ? (
    <Navigate to={AppRoute.Root} />
  ) : (
    children
  );
}

export { PublicRoute };
