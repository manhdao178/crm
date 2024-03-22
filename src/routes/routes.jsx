import { lazy } from 'react';
import withErrorBoundary from 'components/HOCs/withErrorBoundary';
import { RouteBase } from 'constants/routeUrl';
import withPermission from 'HOCs/withPermission';
import { roles } from 'constants/index';

const HomePage = lazy(() => import('views/Home'));
const Dashboard = lazy(() => import('views/Dashboard'));
const LineList = lazy(() => import('views/LineList'));
const Page404 = lazy(() => import('views/Page404'));
const UserList = lazy(() => import('views/UserList'));
const Test = lazy(() => import('views/Test'));
const Permission = lazy(() => import('views/Permission'));
const Data = lazy(() => import('views/Data'));
const Contacts = lazy(() => import('views/Contacts'));
const BrandManagement = lazy(() => import('views/BrandManagement'));
const Services = lazy(() => import('views/Services'));
const Projects = lazy(() => import('views/Projects'));
const TelesaleDashboard = lazy(() => import('views/TelesaleDashboard'));
const FanpageDashboard = lazy(() => import('views/FanpageDashboard'));
const Archives = lazy(() => import('views/Archives'));
const Report = lazy(() => import('views/Report'));
const Accounts = lazy(() => import('views/ListAccounts'));
const Profile = lazy(() => import('views/Profile'));
const AdsDailyReport = lazy(() => import('views/AdsDailyReport'));
const AdsMonthlyReport = lazy(() => import('views/AdsMonthlyReport'));
const AdsKPI = lazy(() => import('views/AdsKPI'));
const AdminAdsDailyReport = lazy(() => import('views/AdminAdsDailyReport'));
const TelesaleManage = lazy(() => import('views/TelesaleManage'));

//* For secured route
const routes = [
  {
    path: RouteBase.Dashboard,
    name: 'Dashboard',
    component: withErrorBoundary(withPermission(Dashboard, [roles.ALL])),
  },

  {
    path: RouteBase.LineList,
    exact: true,
    name: 'LineList',
    component: withErrorBoundary(withPermission(LineList, [roles.ADMIN, roles.MASTER_ADMIN])),
  },
  { path: RouteBase.Test, exact: true, name: 'Test', component: withErrorBoundary(Test) },
  {
    path: RouteBase.Data,
    exact: true,
    name: 'Data',
    component: withErrorBoundary(withPermission(Data, [roles.PAGE_LEAD, roles.FANPAGE])),
  },
  {
    path: RouteBase.FanpageDashboard,
    exact: true,
    name: 'FanpageDashboard',
    component: withErrorBoundary(withPermission(FanpageDashboard, [roles.PAGE_LEAD, roles.FANPAGE])),
  },
  {
    path: RouteBase.TelesaleDashboard,
    exact: true,
    name: 'TelesaleDashboard',
    component: withErrorBoundary(withPermission(TelesaleDashboard, [roles.TELESALE, roles.TELESALE_LEAD])),
  },
  {
    path: RouteBase.Permission,
    exact: true,
    name: 'Perrmission',
    component: withErrorBoundary(withPermission(Permission, [roles.ADMIN, roles.MASTER_ADMIN])),
  },
  {
    path: RouteBase.UserList,
    exact: true,
    name: 'UserList',
    component: withErrorBoundary(withPermission(UserList, [roles.ADMIN, roles.MASTER_ADMIN])),
  },
  {
    path: RouteBase.Contacts,
    exact: true,
    name: 'Contacts',
    component: withErrorBoundary(withPermission(Contacts, [roles.TELESALE_LEAD, roles.TELESALE])),
    // component: withErrorBoundary(Contacts),
  },
  {
    path: RouteBase.Archives,
    exact: true,
    name: 'Archives',
    component: withErrorBoundary(withPermission(Archives, [roles.TELESALE_LEAD, roles.TELESALE])),
    // component: withErrorBoundary(Contacts),
  },
  {
    path: RouteBase.Report,
    exact: true,
    name: 'Report',
    component: withErrorBoundary(
      withPermission(Report, [roles.TELESALE_LEAD, roles.TELESALE, roles.PAGE_LEAD, roles.FANPAGE]),
    ),
  },
  {
    path: RouteBase.BrandManagement,
    exact: true,
    name: 'BrandManagement',
    component: withErrorBoundary(withPermission(BrandManagement, [roles.ADMIN, roles.MASTER_ADMIN])),
  },
  {
    path: RouteBase.Accounts,
    exact: true,
    name: 'Accounts',
    component: withErrorBoundary(withPermission(Accounts, [roles.ADMIN, roles.MASTER_ADMIN])),
  },
  {
    path: RouteBase.Services,
    exact: true,
    name: 'Services',
    component: withErrorBoundary(withPermission(Services, [roles.ADMIN, roles.MASTER_ADMIN])),
  },
  {
    path: RouteBase.Projects,
    exact: true,
    name: 'Projects',
    component: withErrorBoundary(withPermission(Projects, [roles.MASTER_ADMIN])),
  },
  {
    path: RouteBase.Profile,
    exact: true,
    name: 'Profile',
    component: withErrorBoundary(withPermission(Profile, [roles.ALL])),
  },
  {
    path: RouteBase.DailyReport,
    exact: true,
    name: 'AdsDailyReport',
    component: withErrorBoundary(withPermission(AdsDailyReport, [roles.ADS])),
  },
  {
    path: RouteBase.AdminDailyReport,
    exact: true,
    name: 'AdminAdsDailyReport',
    component: withErrorBoundary(withPermission(AdminAdsDailyReport, [roles.ADS_ADMIN])),
  },
  {
    path: RouteBase.MonthlyReport,
    exact: true,
    name: 'AdsMonthlyReport',
    component: withErrorBoundary(withPermission(AdsMonthlyReport, [roles.ADS, roles.ADS_ADMIN])),
  },
  {
    path: RouteBase.KPI,
    exact: true,
    name: 'AdsKPI',
    component: withErrorBoundary(withPermission(AdsKPI, [roles.ADS_ADMIN])),
  },
  {
    path: RouteBase.TelesaleManage,
    exact: true,
    name: 'TeleManage',
    component: withErrorBoundary(withPermission(TelesaleManage, [roles.TELESALE_LEAD])),
  },
  { name: '404', component: withErrorBoundary(Page404) },
];

export default routes;
