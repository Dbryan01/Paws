import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [pets, setPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/pets')
      .then(response => setPets(response.data))
      .catch(error => console.log(error));
  }, []);

  const filteredPets = searchQuery
    ? pets.filter(pet => pet.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : pets;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search pets by name"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />

      <FlatList
        data={filteredPets}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.petContainer}>
            <Text>{item.name}</Text>
            <Button title="View Details" onPress={() => navigation.navigate('PetDetail', { pet: item })} />
          </View>
        )}
      />

      <Button title="Add Pet" onPress={() => navigation.navigate('AddPet')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 },
  petContainer: { padding: 10, borderBottomWidth: 1, borderColor: 'gray' }
});
