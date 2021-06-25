import React, { useState, useCallback } from "react";
import { View, FlatList } from "react-native";

import { Background } from "../../components/Background";
import { CategorySelect } from "../../components/CategorySelect";
import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { ListDivider } from "../../components/ListDivider";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { Load } from "../../components/Load";

import { styles } from "./styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../config/database";

export function Home() {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? 
      setCategory('') :
      setCategory(categoryId)
  }

  function handleAppontmentDetails() {
    navigation.navigate('AppointmentDetails');
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    if (category) {
      setAppointments(storage.filter(item => item.category === category))
      console.log(appointments);
    } else {
      setAppointments(storage);
    }

    setLoading(false);    
  }

  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [category]));

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Profile />
          <ButtonAdd onPress={handleAppointmentCreate} />
        </View>

        <View>
          <CategorySelect
            categorySelected={category}
            setCategory={handleCategorySelect}
          />
        </View>          

        {
          loading 
          ? <Load />
          : <>
              <ListHeader
                title='Partidas Agendadas'
                subtitle={`Total ${appointments.length}`}
              />
              
              <FlatList
                data={appointments}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <Appointment 
                    data={item}
                    onPress={handleAppontmentDetails}  
                  />
                )}
                ItemSeparatorComponent={() => <ListDivider />}
                contentContainerStyle={{ paddingBottom: 69 }}
                style={styles.matches}
                showsVerticalScrollIndicator={false}
              />
            </>
        }

        
      </View>
    </Background>
  );
}