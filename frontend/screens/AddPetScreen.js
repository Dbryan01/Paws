import React, { useState } from 'react';
import { View, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

export default function AddPetScreen({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const addPet = async () => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('image', {
      uri: image,
      name: `pet-${Date.now()}.jpg`,
      type: 'image/jpeg',
    });

    try {
      await axios.post('http://localhost:5000/api/pets/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'Pet added successfully!');
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Could not add pet.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Pet Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Pet Description" value={description} onChangeText={setDescription} style={styles.input} />

      <Button title="Pick an image from camera roll" onPress={uploadImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Button title="Add Pet" onPress={addPet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 },
  image: { width: 100, height: 100, marginVertical: 10 }
});
