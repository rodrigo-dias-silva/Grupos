import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native';

export default function FabButton({ setVisible, userStatus }) {

  const navigation = useNavigation()

  function handleNavigateBtn() {

    userStatus ? setVisible() : navigation.navigate('SignIn')
  }

  return (
    <TouchableOpacity
      className='bg-btn-login w-14 h-14 rounded-full items-center justify-center absolute bottom-6 right-5'
      activeOpacity={.8}
      onPress={handleNavigateBtn}
    >
      <View>
        <Text className='text-2xl font-bold text-title'>+</Text>
      </View>
    </TouchableOpacity>
  )
}