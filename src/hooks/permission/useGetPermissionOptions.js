import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import userRolesServices from 'services/userRolesServices';
import usersServices from 'services/usersServices';

export const useGetPermissionOptions = (params) => {
  return useQuery([queryKeys.permissionOptions, params], (params) => userRolesServices.getUserRolesOptions(params));
};
