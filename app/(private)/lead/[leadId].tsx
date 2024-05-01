import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
  return (
    <SafeAreaView>
      <View style={styles.viewContainer}>
        <Text>Lead Detail Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  viewContainer: {
    padding: 20,
  },
});
