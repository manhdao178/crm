import CommonStyles from 'components/CommonStyles';
import { useGetListTodos } from 'hooks/todos/useTodoHooks';
import React from 'react';
import SimpleDialogDemo from './Simple';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Calories',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat (g)',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Carbs (g)',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)',
  },
];

const createData = (name, calories, fat, carbs, protein) => {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
};

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

const Dashboard = (props) => {
  const { data: resListTodos, isLoading, error, refetch } = useGetListTodos();

  const data = [
    {
      id: 1,
      name: 'Ahihi',
      age: 3,
      year: 2022,
    },
    {
      id: 2,
      name: 'Ahihi 2',
      age: 4,
      year: 2022,
    },
    {
      id: 3,
      name: 'Ahihi 3',
      age: 5,
      year: 2022,
    },
  ];

  const columns = [
    {
      label: 'ID',
      id: 'id',
    },
    {
      label: 'Name',
      id: 'name',
      Cell: (row) => {
        return <div style={{ color: 'red' }}>${row.name}</div>;
      },
      component: 'th',
    },
    {
      label: 'Age',
      id: 'age',
    },
    {
      label: 'Year',
      id: 'year',
    },
  ];

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div>
      <CommonStyles.Table data={data} columns={columns} hasCheckbox={false} />
    </div>
  );
};

export default Dashboard;
