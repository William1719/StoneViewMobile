// assets/Screen/TabScreens/Database.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-elements';
import TableExample from '../../components/tabla';
import { useNavigation } from '@react-navigation/native';

const Database = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <TableExample />
      <FAB
        placement="right"
        color="green"
        icon={{ name: 'add', color: 'white' }}
        onPress={() => navigation.navigate('AddContact')}
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
});

export default Database;
