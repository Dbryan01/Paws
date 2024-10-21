import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function AdminDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome, Admin!</Text>
      <Button title="Add Pet" onPress={() => navigation.navigate('AddPet')} />
      <Button title="View Adoption Requests" onPress={() => navigation.navigate('AdoptionRequests')} />
      {/* Add more admin functionalities */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
