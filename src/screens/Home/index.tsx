import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";

import { Background } from "../../components/Background";
import { CategorySelect } from "../../components/CategorySelect";
import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { ListDivider } from "../../components/ListDivider";
import { ListHeader } from "../../components/ListHeader";
import { Appointment } from "../../components/Appointment";

import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [category, setCategory] = useState('');

  const navigation = useNavigation();

  const appointments = [
    {
      id: '1',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
    },
    {
      id: '2',
      guild: {
        id: '2',
        name: 'Lendários',
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
    },
  ]

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? 
      setCategory('') :
      setCategory(categoryId)
  }

  function handleAppontmentDetails() {
    navigation.navigate('AppointmentDetails');
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Profile />
          <ButtonAdd />
        </View>

        <View>
          <CategorySelect
            categorySelected={category}
            setCategory={handleCategorySelect}
          />

          <View style={styles.content}>
            <ListHeader
              title='Partidas Agendadas'
              subtitle='Total 6'
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
              style={styles.matches}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    </Background>
  );
}