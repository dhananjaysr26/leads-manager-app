import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';

import { formatDate } from '~/lib/date';

const FilterButton = ({ title, active, onPress }: any) => (
  <TouchableOpacity
    style={[styles.filterButton, active && styles.activeFilterButton]}
    onPress={onPress}>
    <Text style={[styles.filterButtonText, active && styles.activeFilterButtonText]}>{title}</Text>
  </TouchableOpacity>
);

const Leads = ({ leads }: { leads: any[] }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const router = useRouter();

  const renderLeadCard = ({ item }: any) => (
    <TouchableOpacity
      style={styles.leadCard}
      onPress={() => router.push(`/(private)/lead/${item?.leadId}`)}>
      <View style={styles.leadInfo}>
        <View style={styles.headingContainer}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <FontAwesome5 name="user-tie" size={24} color="black" />
            <Text style={styles.leadName}>{item.name}</Text>
          </View>
          <Text style={styles.date}>{formatDate(item.created_at)}</Text>
        </View>
        <Text style={styles.leadPhone}>{item.phoneNumber}</Text>
        <Text style={styles.leadAddress}>{item.address}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#ccc" />
    </TouchableOpacity>
  );
  const handleFilterPress = (filter: any) => {
    setActiveFilter(filter);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recent Artifacts</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}>
          <FilterButton
            title="All"
            active={activeFilter === 'All'}
            onPress={() => handleFilterPress('All')}
          />
          <FilterButton
            title="Generated"
            active={activeFilter === 'Generated'}
            onPress={() => handleFilterPress('Generated')}
          />
          <FilterButton
            title="Acknowledged"
            active={activeFilter === 'Acknowledged'}
            onPress={() => handleFilterPress('Acknowledged')}
          />
        </ScrollView>
      </View>
      {leads?.length > 0 ? (
        <FlatList
          data={leads}
          renderItem={renderLeadCard}
          keyExtractor={(item) => item.leadId.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Leads Not Found!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 90,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
    paddingBottom: 80,
  },
  header: {
    padding: 16,
  },
  headingContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    paddingBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  filterContainer: {
    marginTop: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    color: '#333',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  listContainer: {
    paddingVertical: 16,
    backgroundColor: '#f5f5f5',
  },
  leadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  leadInfo: {
    flex: 1,
  },
  leadName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    fontWeight: '700',
  },
  leadPhone: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  leadAddress: {
    fontSize: 14,
    color: '#666',
  },
});

export default Leads;
