import { useState, useRef, FormEvent, ChangeEventHandler } from 'react';
import {
  Autocomplete,
  Loader,
  PasswordInput,
  Text,
  Group,
  Anchor,
  Container,
  Button,
  TextInput,
} from '@mantine/core';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // TODO: Use Mantine form hooks rather than invoking handleSubmit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const resp = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!resp.ok) {
      console.error('Failed to login');

      const { data } = await resp.json();
      const { message: dataMessage, identity } = data || {};
      const { message: identityMessage } = identity || {};

      if (dataMessage) alert(dataMessage);
      if (identityMessage) alert(identityMessage);

      return;
    }

    router.push('/');
  };

  return (
    <Container>
      <form action="#">
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          label="Email"
          placeholder="Enter your email"
        />
        <Group position="apart" mb={5}>
          <Text component="label" htmlFor="password" size="sm" weight={500}>
            Password
          </Text>

          <Anchor<'a'>
            href="#"
            onClick={(event) => event.preventDefault()}
            sx={(theme) => ({
              paddingTop: 2,
              color:
                theme.colors[theme.primaryColor][
                  theme.colorScheme === 'dark' ? 4 : 6
                ],
              fontWeight: 500,
              fontSize: theme.fontSizes.xs,
            })}
          >
            Forgot your password?
          </Anchor>
        </Group>
        <PasswordInput
          placeholder="Enter your password"
          id="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Button type="submit" onClick={handleSubmit} color="dark">
          Login
        </Button>
      </form>
    </Container>
  );
}
