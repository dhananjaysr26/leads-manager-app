import { Stack, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Leads from '~/components/leads/Leads';
import { useAuth } from '~/provider/AuthProvider';
import { getAllLeads } from '~/services/leads.services';

export default function Home() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<any[]>([]);
  const segments = useSegments();

  const fetchLeads = async () => {
    const res = await getAllLeads(user?.token);
    if (res.statusCode === 200) {
      setLeads(res.data);
    } else {
      return alert('Fetching Leads Failed!');
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [segments]);

  return (
    <>
      <Stack.Screen options={{ title: 'Tracker' }} />
      <View style={{ flex: 1, position: 'relative' }}>
        <View style={{ backgroundColor: 'blue', height: 120 }}>
          <Text style={styles.heading}>Here Are Your Monthly Updates</Text>
        </View>
        <Leads leads={leads} />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});
