import { Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function CreateLead() {
  return (
    <>
      <Stack.Screen options={{ title: 'Create Lead' }} />
      <Container>
        <ScreenContent title="Create Lead" />
      </Container>
    </>
  );
}
