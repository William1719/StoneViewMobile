import React from 'react';
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

// Icons
import { Entypo, Ionicons } from '@expo/vector-icons';

// Screens
import Feed from "./assets/Screen/TabScreens/Feed";
import Database from "./assets/Screen/TabScreens/Database";
import Appointment from './assets/Screen/TabScreens/appointment';

// Componentes
import ContactDetails from './assets/Screen/ComponentShow/ContactDetails';
import TableExample from './assets/components/tabla';
import EditContact from './assets/Screen/ComponentShow/EditContact';
import AddContact from './assets/Screen/ComponentShow/AddContact';
import ShowAppointment from './assets/Screen/ComponentShow/ShowAppointmet';
import AddAppointment from './assets/Screen/ComponentShow/AddAppointment';
import EditAppointment from './assets/Screen/ComponentShow/EditAppointment';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ color, focused, size }) => {
          if (route.name === "Inicio") {
            return <Entypo name="home" size={24} color={focused ? "green" : "gray"} />;
          } else if (route.name === "Base de Clientes") {
            return <Ionicons name="person-add-sharp" size={24} color={focused ? "green" : "gray"} />;
          } else if (route.name === "Citas") {
            return <Ionicons name="calendar" size={24} color={focused ? "green" : "gray"} />;
          }
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Feed} />
      <Tab.Screen name="Base de Clientes" component={Database} />
      <Tab.Screen name='Citas' component={Appointment} />
      
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator>
      {/*Aqui va la navegacion de la base de datos */}
      <Stack.Screen name="TabGroup" component={TabGroup} options={{ headerShown: false }} />
      <Stack.Screen name="TableExample" component={TableExample} options={{ title: 'Contactos' }} />
      <Stack.Screen name="ContactDetails" component={ContactDetails} options={{ title: 'Detalles del Contacto' }} />
      <Stack.Screen name="EditContact" component={EditContact} options={{ title: 'Editar Contacto' }} />
      <Stack.Screen name="AddContact" component={AddContact} options={{ title: 'Agregar Contacto' }} />

      {/*Aqui de las citas*/}
      <Stack.Screen name='ShowAppointment' component={ShowAppointment}  />
      <Stack.Screen name='Agendar una cita' component={AddAppointment} />
      <Stack.Screen name='EditAppointment' component={EditAppointment} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
