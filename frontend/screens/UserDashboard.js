import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function UserDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome, User!</Text>
      <Button title="View Pets" onPress={() => navigation.navigate('Home')} />
      {/* Add more user functionalities */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
