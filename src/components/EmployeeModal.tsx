import { Modal, TextInput, Select, NumberInput, Flex } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

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
};

interface Data {
  title: string;
  employee: Employee;
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

export default function EmployeeModal({
  title,
  employee,
  opened,
  setOpened,
}: Data): JSX.Element {
  return (
    <Modal
      size="lg"
      opened={opened}
      onClose={() => setOpened(false)}
      title={title}
    >
      <Flex gap={12}>
        <TextInput
          label="First Name"
          sx={{
            width: '100%',
          }}
        />
        <TextInput
          label="Last Name"
          sx={{
            width: '100%',
          }}
        />
      </Flex>
      <DatePicker
        style={{ marginTop: 20 }}
        label="Birthdate"
        clearable={false}
      />
      <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={['Male', 'Female', 'Nonbinary']}
        label="Gender"
      />
      <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={['Single', 'Married', 'Widowed', 'Separated', 'Divorced']}
        label="Marital Status"
      />
      <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={['Admin', 'Engineering', 'Finance']}
        label="Department"
      />
      <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={['Executive', 'Coordinator', 'Analyst', 'Assistant', 'Manager']}
        label="Position"
      />
      <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={['Casual', 'Regular', 'Probationary']}
        label="Employment Status"
      />
      <NumberInput
        style={{ marginTop: 20 }}
        label="Contact Number"
        min={0}
        max={99999999999}
      />
      <TextInput style={{ marginTop: 20 }} label="Email" />
      <TextInput style={{ marginTop: 20 }} label="Address" />
      <TextInput style={{ marginTop: 20 }} label="City" />
      <TextInput style={{ marginTop: 20 }} label="Province" />
      <TextInput style={{ marginTop: 20 }} label="Nationality" />
    </Modal>
  );
}
