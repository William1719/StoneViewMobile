// components/tabla.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import App from '../firebase/Firebase-config';
import { useNavigation } from '@react-navigation/native';

const TableExample = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const db = getFirestore(App);
    const unsubscribe = onSnapshot(collection(db, 'contactos'), (snapshot) => {
      const fetchedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(fetchedData);
    });
    return () => unsubscribe();
  }, []);

  const handlePress = (contact) => {
    navigation.navigate('ContactDetails', { contact });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>StoneView</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <TouchableOpacity style={styles.cell} onPress={() => handlePress(item)}>
              <Text style={styles.cellText}>{item.nombre}</Text>
              <Text style={styles.cell} numberOfLines={1}>{item.mensaje}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cellText: {
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: '#555',
  },
  cellText: {
    fontSize: 16,
    color: '#555',
  },
});

export default TableExample;
