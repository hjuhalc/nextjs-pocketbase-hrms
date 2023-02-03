import Head from 'next/head';
import EmployeeTable from '@/components/EmployeeTable';
import AppBar from '@/components/AppBar';
import { Box, Button, Container, Flex, Grid, Card } from '@mantine/core';
import useSwr from 'swr';
import { useRouter } from 'next/router';
import { useState } from 'react';
import EmployeeModal from '@/components/EmployeeModal';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
};

export default function Home() {
  const { data, error } = useSwr('/api/employees', fetcher);
  const router = useRouter();
  const [selectedEe, setSelectedEe] = useState<Employee>({} as Employee);
  const [eeModalOpened, setEeModalOpened] = useState(false);

  if (data?.status === 401) router.push('/auth');
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>HRMS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid>
          <Grid.Col span={1}>
            <AppBar />
          </Grid.Col>
          <Grid.Col span={11}>
            <EmployeeModal
              title="Edit employee record"
              opened={eeModalOpened}
              setOpened={setEeModalOpened}
              employee={selectedEe}
            />
            <Container sx={{ marginTop: '6%' }} size="xl">
              <Card shadow="sm">
                <Flex
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 24,
                  }}
                >
                  <Button
                    sx={{
                      width: '20%',
                      '@media (max-width: 768px)': {
                        width: '100%',
                      },
                    }}
                  >
                    Add Employee
                  </Button>
                  <Box
                    sx={{
                      width: '100%',
                    }}
                  >
                    <EmployeeTable
                      setSelectedEe={setSelectedEe}
                      setEeModalOpened={setEeModalOpened}
                      data={data?.employees}
                    />
                  </Box>
                </Flex>
              </Card>
            </Container>
          </Grid.Col>
        </Grid>
      </main>
    </>
  );
}
