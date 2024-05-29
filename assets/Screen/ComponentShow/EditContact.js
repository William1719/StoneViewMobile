// components/EditContact.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import app from '../../firebase/Firebase-config';

const EditContact = ({ route, navigation }) => {
  const { contact } = route.params;
  const [nombre, setNombre] = useState(contact.nombre || '');
  const [telefono, setTelefono] = useState(contact.telefono || '');
  const [email, setEmail] = useState(contact.email || '');
  const [mensaje, setMensaje] = useState(contact.mensaje || '');
  const [ciudad, setCiudad] = useState(contact.ciudad || '');
  const [servicio, setServicio] = useState(contact.servicio || '');

  const handleSave = async () => {
    if (!nombre || !telefono || !email || !mensaje || !ciudad || !servicio) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const db = getFirestore(app);
    try {
      await updateDoc(doc(db, 'contactos', contact.id), {
        nombre,
        telefono,
        email,
        mensaje,
        ciudad,
        servicio,
      });
      Alert.alert('Contacto actualizado', 'El contacto ha sido actualizado exitosamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error actualizando el contacto: ', error);
      Alert.alert('Error', 'Hubo un problema al actualizar el contacto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Mensaje:</Text>
      <TextInput
        style={styles.input}
        value={mensaje}
        onChangeText={setMensaje}
      />
      <Text style={styles.label}>Ciudad:</Text>
      <TextInput
        style={styles.input}
        value={ciudad}
        onChangeText={setCiudad}
      />
      <Text style={styles.label}>Servicio:</Text>
      <TextInput
        style={styles.input}
        value={servicio}
        onChangeText={setServicio}
      />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default EditContact;
