import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Text, View } from 'react-native';

import { useAuth } from '~/provider/AuthProvider';

const UserDetails = ({
  name,
  contactNumber,
  username,
}: {
  name: string;
  contactNumber: string;
  username: string;
}) => {
  return (
    <View
      style={{
        backgroundColor: 'blue',
        display: 'flex',
        gap: 5,
        padding: 12,
        marginTop: 20,
        height: 150,
      }}>
      <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>{name}</Text>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row-reverse',
          justifyContent: 'flex-end',
          gap: 10,
        }}>
        <Text style={{ color: 'white' }}>{contactNumber}</Text>
        <FontAwesome name="mobile-phone" size={24} color="white" />
      </View>
      <Text style={{ color: '#c9c6c5' }}>{'@ ' + username}</Text>
    </View>
  );
};

export default function CustomDrawerContent(props: any) {
  const { signOut, user } = useAuth();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <UserDetails
          name={user?.userInfo?.name}
          contactNumber={user?.userInfo?.contactNumber}
          username={user?.userInfo?.username}
        />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ borderWidth: 1, margin: 5, borderColor: '#e1e2e3', borderRadius: 5 }}>
        <DrawerItem
          label="Logout"
          labelStyle={{ color: 'red' }}
          onPress={() => signOut()}
          icon={({ size }) => <AntDesign name="logout" size={size} color="red" />}
        />
      </View>
    </View>
  );
}
