import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import app from '../../firebase/Firebase-config';
import { useNavigation } from '@react-navigation/native';

const ShowAppointment = ({ route }) =>{
    const { contact } = route.params;
  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate('EditAppointment', { contact });
  };

  const handleDelete = async () => {
    const db = getFirestore(app);
    try {
      await deleteDoc(doc(db, 'appointments', contact.id));
      Alert.alert('Contacto eliminado', 'El contacto ha sido eliminado exitosamente.');
      navigation.goBack(); // Volver a la pantalla anterior
    } catch (error) {
      console.error('Error eliminando el contacto: ', error);
      Alert.alert('Error', 'Hubo un problema al eliminar el contacto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.value}>{contact.nombre}</Text>
      <Text style={styles.label}>Fecha:</Text>
      <Text style={styles.value}>{contact.date}</Text>
      <Text style={styles.label}>Hora:</Text>
      <Text style={styles.value}>{contact.time}</Text>
      <Text style={styles.label}>Descripcion:</Text>
      <Text style={styles.value}>{contact.description}</Text>
      <Text style={styles.label}>Estado de la cita:</Text>
      <Text style={styles.value}>{contact.estado}</Text>
      
      {/* Agrega más campos según sea necesario */}
      <View style={styles.buttonContainer}>
        <Button title="Editar" onPress={handleEdit} />
        <Button title="Eliminar" onPress={handleDelete} color="red" />
      </View>
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
  value: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ShowAppointment;
