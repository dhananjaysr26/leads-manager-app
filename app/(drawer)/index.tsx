import { useRouter, Stack } from 'expo-router';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent title="Create and Manage Leads">
          <Button title="Go to Leads" onPress={() => router.push('/(drawer)/(tabs)')} />
        </ScreenContent>
      </Container>
    </>
  );
}
