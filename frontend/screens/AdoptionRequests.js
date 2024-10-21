import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function AdoptionRequests({ navigation }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/adoption')
      .then(response => setRequests(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.requestContainer}>
            <Text>User ID: {item.userId}</Text>
            <Text>Pet ID: {item.petId}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  requestContainer: { padding: 10, borderBottomWidth: 1, borderColor: 'gray' }
});
