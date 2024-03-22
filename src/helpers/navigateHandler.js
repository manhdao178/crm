import { roles } from 'constants/index';
import { RouteBase } from 'constants/routeUrl';

const navigateHandler = (navigate, role) => {
  const navigation = {
    [roles.RECEPTION]: () => navigate(RouteBase.Receptionist),
    [roles.ADMIN]: () => navigate(RouteBase.UserList),
    [roles.MASTER_ADMIN]: () => navigate(RouteBase.UserList),
    [roles.PAGE_LEAD]: () => navigate(RouteBase.FanpageDashboard),
    [roles.TELESALE_LEAD]: () => navigate(RouteBase.TelesaleDashboard),
    [roles.TELESALE]: () => navigate(RouteBase.TelesaleDashboard),
    [roles.ADS]: () => navigate(RouteBase.DailyReport),
    [roles.ADS_ADMIN]: () => navigate(RouteBase.AdminDailyReport),
    [roles.FANPAGE]: () => navigate(RouteBase.FanpageDashboard),
  };
  navigation[role]?.();
};

export default navigateHandler;
