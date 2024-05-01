import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import secureStoreHelper from '~/lib/localStorage';
import AuthProvider, { useAuth } from '~/provider/AuthProvider';
import { LocalUser } from '~/utils/constants/global';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

const InitialLayout = () => {
  const { user, signIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // if (user) {
    //   secureStoreHelper.saveToken(LocalUser, user);
    // }
    const inTabsGroup = segments[0] === '(drawer)';
    if (!inTabsGroup) {
      router.replace('/(drawer)');
    } else if (!user) {
      router.replace('/login');
    }
  }, [user]);

  // useEffect(() => {
  //   const lastUserLogin = secureStoreHelper.getToken(LocalUser);
  //   console.log({ lastUserLogin });
  //   if (lastUserLogin && Object.keys(lastUserLogin).length > 0) {
  //     signIn(lastUserLogin);
  //   }
  // }, []);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ title: 'Modal', presentation: 'modal' }} />
        </Stack> */}
        <InitialLayout />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
