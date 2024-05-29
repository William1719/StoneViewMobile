import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, Button, List, Divider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import App from '../../firebase/Firebase-config';
import { useNavigation } from '@react-navigation/native';

export default function AddAppointment() {
  const [nombre, setNombre] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedDateDisplay, setSelectedDateDisplay] = useState('');
  const [selectedTimeDisplay, setSelectedTimeDisplay] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchContacts = async () => {
      const db = getFirestore(App);
      const contactsCollection = collection(db, 'contactos');
      const contactSnapshot = await getDocs(contactsCollection);
      const contactList = contactSnapshot.docs.map(doc => doc.data());
      setContacts(contactList);
    };

    fetchContacts();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    // Actualizar la visualización de la fecha y la hora seleccionadas
    setSelectedDateDisplay(currentDate.toDateString());
    setSelectedTimeDisplay(currentDate.toLocaleTimeString());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleSave = async () => {
    const db = getFirestore(App);
    try {
      await addDoc(collection(db, 'appointments'), {
        nombre,
        date: selectedDateDisplay, // Usar la visualización en lugar de la fecha y la hora originales
        time: selectedTimeDisplay,
        description,
        estado: 'Activo' 
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleNombreChange = (text) => {
    setNombre(text);
    if (text.length > 0) {
      const filtered = contacts.filter(contact => 
        contact.nombre.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts([]);
    }
  };

  const handleNombreSelect = (selectedNombre) => {
    setNombre(selectedNombre);
    setFilteredContacts([]);  // Limpiar las sugerencias
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label="Nombre"
          value={nombre}
          onChangeText={handleNombreChange}
          mode="outlined"
          style={styles.input}
        />
        {filteredContacts.length > 0 && (
          <FlatList
            data={filteredContacts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleNombreSelect(item.nombre)}>
                <List.Item title={item.nombre} />
                <Divider />
              </TouchableOpacity>
            )}
            style={styles.list}
          />
        )}
         <Text style={styles.dateTimeText}>{`Fecha seleccionada: ${selectedDateDisplay}`}</Text>
        <Button mode="contained" onPress={() => showMode('date')} style={styles.button}>
          Seleccionar Fecha
        </Button>
        <Text style={styles.dateTimeText}>{`Hora seleccionada: ${selectedTimeDisplay}`}</Text>
        <Button mode="contained" onPress={() => showMode('time')} style={styles.button}>
          Seleccionar Hora
        </Button>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {/* Mostrar la fecha y hora seleccionadas */}
     
      
      <TextInput
        label="Descripción"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
        Guardar Cita
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  list: {
    maxHeight: 150,
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
    backgroundColor: 'green',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: 'blue',
  },
  dateTimeText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
