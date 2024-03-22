import CommonStyles from 'components/CommonStyles';
import EachTodo from 'components/EachTodo';
import { useGetListTodos } from 'hooks/todos/useTodoHooks';
import { useAuthentication } from 'providers/AuthenticationProvider';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = (props) => {
  const { t } = useTranslation();
  const { logout } = useAuthentication();
  const [state, setState] = useState('');
  const { data: resListTodos, isLoading: loading, error, refetch, ...rest } = useGetListTodos();
  const data = resListTodos?.data || [];
  const searchRef = useRef();

  //! Function
  const onLogout = () => {
    logout();
  };

  const handleSearch = (value) => {
    setState(value);
    searchRef.current && clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      window.localStorage.setItem('search', value);
    }, 500);
  };

  useEffect(() => {
    const search = window.localStorage.getItem('search');
    if (search) {
      setState(search);
    }
  }, []);

  //! Render
  return (
    <CommonStyles.Content>
      <h3>{t('message:hello')}</h3>
      <button
        type="button"
        onClick={() => {
          setState(!state);
        }}
      >
        Stress test useSafeEffect
      </button>
      <input onChange={(e) => handleSearch(e.target.value)} value={state} />
      <button onClick={onLogout}>Logout</button>
      {loading ? (
        'Loading ...'
      ) : (
        <div className="container mx-auto p-3">
          <h3>List Todo</h3>
          <hr />
          {data.map((el) => (
            <EachTodo key={el.id} item={el} />
          ))}
        </div>
      )}
    </CommonStyles.Content>
  );
};
export default HomePage;
