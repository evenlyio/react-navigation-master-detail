import * as React from 'react'

import { Button, Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'

export const DummyScreen1 = withNavigation(({ navigation }) => (
  <View style={{ flex: 1 }}>
    <Text>Dummy 1</Text>
    <Button onPress={() => navigation.navigate('DummyScreen2')} title={'Navigate Master to 2'} />
  </View>
))

export const DummyScreen2 = withNavigation(({ navigation }) => (
  <View style={{ flex: 1 }}>
    <Text>Dummy 2</Text>
    <Button onPress={() => navigation.navigate('DummyScreen4')} title={'Navigate Detail to 4'} />
  </View>
))

export const DummyScreen3 = () => <Text style={{ flex: 1 }}>Dummy 3</Text>

export const DummyScreen4 = withNavigation(({ navigation }) => (
  <View style={{ flex: 1 }}>
    <Text>Dummy 4</Text>
    <Button
      onPress={() => {
        navigation.navigate('DummyScreen1')
        navigation.navigate('DummyScreen3')
      }}
      title={'Reset'}
    />
  </View>
))
