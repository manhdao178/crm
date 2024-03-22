import CommonIcons from 'components/CommonIcons';
import IconDoc from 'components/CommonIcons/IconMenu/IconDoc';
import { RouteBase } from './routeUrl';
import React from 'react';
import IconDecentralization from 'components/CommonIcons/IconMenu/IconDecentralization';
import IconEditChange from 'components/CommonIcons/IconMenu/IconEditChange';
import IconActivity from 'components/CommonIcons/IconMenu/IconActivity';
import IconCategory from 'components/CommonIcons/IconMenu/IconCategory';
import IconCall from 'components/CommonIcons/IconMenu/IconCall';
import Icon2User from 'components/CommonIcons/IconMenu/Icon2User';
import IconHome from 'components/CommonIcons/IconMenu/IconHome';
import IconChart from 'components/CommonIcons/IconMenu/IconChart';
import IconSquare from 'components/CommonIcons/IconMenu/IconSquare';


export const leftmenu = [
  {
    'DATA PERMISSIONS': [
      {
        label: 'List of employee',
        icon: IconDoc,
        path: RouteBase.UserList,
      },
      {
        label: 'Permissions',
        icon: IconDecentralization,
        path: RouteBase.Permission,
      },
    ],
  },
  {
    'Category': [
      {
        label: 'Branch',
        icon: IconEditChange,
        path: RouteBase.BrandManagement,
      },
      {
        label: 'Service',
        icon: IconActivity,
        path: RouteBase.Services,
      },
    ],
  },
  {
    ADS: [
      {
        label: 'Account',
        icon: IconCategory,
        path: RouteBase.Accounts,
      },
    ],
  },
  {
    'Call center': [
      {
        label: 'Line',
        icon: IconCall,
        path: RouteBase.LineList,
      },
    ],
  },
  {
    'Brand': [
      {
        label: 'Brand management',
        icon: IconSquare,
        path: RouteBase.Projects,
      },
    ],
  },
];
export const adminMenu = [
  {
    'DATA PERMISSIONS': [
      {
        label: 'List of employee',
        icon: IconDoc,
        path: RouteBase.UserList,
      },
      {
        label: 'Permissions',
        icon: IconDecentralization,
        path: RouteBase.Permission,
      },
    ],
  },
  {
    'Category': [
      {
        label: 'Branch',
        icon: IconEditChange,
        path: RouteBase.BrandManagement,
      },
      {
        label: 'Service',
        icon: IconActivity,
        path: RouteBase.Services,
      },
    ],
  },
  {
    'Call center': [
      {
        label: 'Line',
        icon: IconCall,
        path: RouteBase.LineList,
      },
    ],
  },
];

export const menuTelesale = [
  {
    'Category': [
      {
        label: 'Dashboard',
        icon: IconHome,
        path: RouteBase.TelesaleDashboard,
      },
      {
        label: 'Contact',
        icon: Icon2User,
        path: RouteBase.Contacts,
      },
      {
        label: 'Report',
        icon: IconChart,
        path: RouteBase.Report,
      },
      {
        label: 'Archives',
        icon: IconChart,
        path: RouteBase.Archives
      },
    ],
  },
];
export const menuFanpage = [
  {
    'Category': [
      {
        label: 'Dashboard',
        icon: IconHome,
        path: RouteBase.FanpageDashboard,
      },
      {
        label: 'Data',
        icon: IconDoc,
        path: RouteBase.Data,
      },
      {
        label: 'Report',
        icon: IconChart,
        path: RouteBase.Report
      },
    ],
  },
];
export const menuTelesaleLead = [
  {
    'Category': [
      {
        label: 'Dashboard',
        icon: IconHome,
        path: RouteBase.TelesaleDashboard,
      },

      {
        label: 'Contact',
        icon: Icon2User,
        path: RouteBase.Contacts,
      },
      {
        label: 'Telesale management',
        icon: CommonIcons.ManageUser,
        path: RouteBase.TelesaleManage
      },
      {
        label: 'Report',
        icon: IconChart,
        path: RouteBase.Report,
      },
      {
        label: 'Archives',
        icon: IconChart,
        path: RouteBase.Archives
      },

    ],
  },
];
export const menuAds = [
  {
    'Category': [
      {
        label: 'DailyReport',
        icon: IconDoc,
        path: RouteBase.DailyReport,
      },
      {
        label: 'MonthlyReport',
        icon: CommonIcons.Calendar,
        path: RouteBase.MonthlyReport,
      },
    ],
  },
];
