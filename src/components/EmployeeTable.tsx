import { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  ActionIcon,
  Menu,
} from '@mantine/core';
import { IconDots, IconTrash, IconEdit, IconEye } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  tableRow: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.colors.dark[9],
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

type Employee = {
  address: string;
  birthdate: string;
  city: string;
  collectionId: string;
  collectionName: string;
  contact_number: number;
  created: string;
  date_hired: string;
  employment_status: string;
  department: string;
  email: string;
  first_name: string;
  gender: string;
  id: string;
  last_name: string;
  marital_status: string;
  nationality: string;
  position: string;
  province: string;
  updated: string;
  create_at: string;
};

interface TableScrollAreaProps {
  data: Employee[];
  setSelectedEe: (employee: Employee) => void;
  setEeModalOpened: (opened: boolean) => void;
}

export default function EmployeeTable({
  data,
  setSelectedEe,
  setEeModalOpened,
}: TableScrollAreaProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [openedIndex, setOpenedIndex] = useState('');

  const handleChange = (index: string) => {
    setOpenedIndex(index === openedIndex ? '' : index);
  };

  const rows = data?.map((row) => (
    <tr
      key={row.id}
      onClick={() => {
        setSelectedEe(row);
        setEeModalOpened(true);
      }}
      className={cx(classes.tableRow)}
    >
      <td>{row.id}</td>
      <td>{`${row.last_name}, ${row.first_name}`}</td>
      <td>{row.department}</td>
      <td>{row.position}</td>
      <td>{row.employment_status}</td>
      <td>{row.date_hired}</td>
      <td>{row.created}</td>
      <td>
        <Menu
          shadow="md"
          width={200}
          opened={openedIndex === row.id}
          onChange={() => handleChange(row.id)}
        >
          <Menu.Target>
            <ActionIcon>
              <IconDots size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Employee</Menu.Label>
            <Menu.Item icon={<IconEdit size={14} />}>Edit</Menu.Item>
            <Menu.Item icon={<IconEye size={14} />}>View</Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item color="red" icon={<IconTrash size={14} />}>
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));

  return (
    <ScrollArea
      sx={{ height: 300 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Employement Status</th>
            <th>Date Hired</th>
            <th>Created At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
