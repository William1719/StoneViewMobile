// assets/Screen/ComponentShow/AddContact.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import app from '../../firebase/Firebase-config';

const AddContact = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [servicio, setServicio] = useState('');
  const [contacto, setContacto] = useState('');

  const handleAddContact = async () => {
    const db = getFirestore(app);
    try {
      await addDoc(collection(db, 'contactos'), { nombre, mensaje, telefono, email, ciudad, servicio, contacto });
      navigation.goBack();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefono"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mensaje"
        value={mensaje}
        onChangeText={setMensaje}
      />
      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        value={ciudad}
        onChangeText={setCiudad}
      /> 
      <TextInput
        style={styles.input}
        placeholder="Servicio"
        value={servicio}
        onChangeText={setServicio}
      />
      <TextInput
        style={styles.input}
        placeholder="¿De donde viene este contacto?"
        value={contacto}
        onChangeText={setContacto}
      />
      <Button title="Agregar Contacto" onPress={handleAddContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default AddContact;
