import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import app from '../../firebase/Firebase-config';

const EditAppointment = ({ route, navigation }) => {
  const { contact } = route.params;
  const [nombre, setNombre] = useState(contact.nombre || '');
  const [time, settime] = useState(contact.time || '');
  const [description, setdescription] = useState(contact.description || '');
  const [date, setdate] = useState(contact.date || '');
  const [estado, setEstado] = useState(contact.estado || 'Activo');

  const handleSave = async () => {
    if (!nombre || !time || !description || !date) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const db = getFirestore(app);
    try {
      await updateDoc(doc(db, 'appointments', contact.id), {
        nombre,
        time,
        description,
        date,
        estado,
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
        value={time}
        onChangeText={settime}
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setdescription}
        keyboardType="description-address"
      />
      <Text style={styles.label}>Fecha:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setdate}
      />
      <Text style={styles.label}>Estado de la cita:</Text>
      <Picker
        selectedValue={estado}
        onValueChange={(itemValue) => setEstado(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Activo" value="Activo" />
        <Picker.Item label="Finalizado" value="Finalizado" />
      </Picker>
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

export default EditAppointment;
