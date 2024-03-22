import { isArray, cloneDeep, isString } from 'lodash';

class User {
  static parseInitialForm(user, allProjects = []) {
    let projectsParsed = [];
    if (isArray(allProjects)) {
      projectsParsed = allProjects.map((el) => {
        //* Default project of users
        const nextEl = cloneDeep({ ...el, isOwned: false, branches: [] });

        if (isArray(user?.projects)) {
          user.projects.forEach((item) => {
            if (item.id === nextEl.value) {
              nextEl.isOwned = true;
              nextEl.branches = [...item.branches];
            }
          });
        }

        return nextEl;
      });
    }

    const isUserAvailable = user && !!user?.id;

    const defaultUser = {
      staffCode: '',
      fullname: '',
      phoneNumber: '',
      email: '',
      userRole: '',
      userTitle: '',
      projectSelecting: '',
      projects: projectsParsed,
      gender: '1',
      dob: null,
      note: '',
    }

    return isUserAvailable
      ? { ...defaultUser, ...user, projects: projectsParsed, projectSelecting: user?.projects?.[0]?.id || '' }
      : {
        ...defaultUser
      };
  }


  static parseBodyToRequest(values, isEdit) {
    const nextValues = cloneDeep(values);
    nextValues.username = nextValues.email.split('@')[0];
    nextValues.password = 'email@123';

    nextValues.projects = nextValues.projects
      .filter((el) => el.isOwned)
      .map((el) => {
        const nextBranch = cloneDeep(el?.branches || []);

        return {
          id: el.value,
          branches: nextBranch.reduce((newArr, currentValue) => {
            if (currentValue.label === "Tất cả") {
              newArr = currentValue.value
            }
            if (!currentValue.label) {
              newArr.push(currentValue)
            }
            if (!!currentValue.label && currentValue.label !== "Tất cả") {
              newArr.push(currentValue.value)
            }
            return newArr
          }, [])
        }
      });

    delete nextValues.projectSelecting;
    if (isEdit) {
      delete nextValues.password;
    }
    return nextValues;
  }
}

export default User;
