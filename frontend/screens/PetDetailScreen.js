import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function PetDetailScreen({ route, navigation }) {
  const { pet } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{pet.name}</Text>
      <Image source={{ uri: pet.imageUrl }} style={styles.image} />
      <Text style={styles.description}>{pet.description}</Text>
      <Button title="Adopt" onPress={() => {/* Handle adoption request here */}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold' },
  image: { width: '100%', height: 300, marginVertical: 10 },
  description: { fontSize: 16 }
});
