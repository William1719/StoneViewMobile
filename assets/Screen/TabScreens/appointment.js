import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import app from '../../firebase/Firebase-config';
import { useNavigation } from '@react-navigation/native';

import { FAB } from 'react-native-elements';

const Appointment = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const db = getFirestore(app);
        const unsubscribe = onSnapshot(collection(db, 'appointments'), (snapshot) => {
            const fetchedData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(fetchedData);
        });
        return () => unsubscribe();
    }, []);

    const handlePress = (contact) => {
        navigation.navigate('ShowAppointment', { contact });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Citas con clientes</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.row,
                            item.estado === 'Activo' && styles.activeContainer,
                            item.estado === 'Finalizado' && styles.finalizadoContainer
                        ]}
                        onPress={() => handlePress(item)}
                    >

                        <View style={styles.textContainer}>
                            <Text style={styles.cellText}>{item.nombre}</Text>
                            <Text style={styles.cell} numberOfLines={1}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <FAB
                placement="right"
                color="green"
                icon={{ name: 'add', color: 'white' }}
                onPress={() => navigation.navigate('Agendar una cita')}
                style={styles.fab}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
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
    textContainer: {
        flex: 1,
    },
    cell: {
        fontSize: 16,
        color: '#555',
    },
    activeContainer: {
        backgroundColor: '#A1DE78',
    },
    finalizadoContainer: {
        backgroundColor: '#EEA3A3', 
    },
});

export default Appointment;
