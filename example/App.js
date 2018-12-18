import * as React from 'react'
import {registerRootComponent} from 'expo'

import { createStackNavigator } from 'react-navigation'
import createMasterDetailNavigator from '../dist/createContainedMasterDetailNavigator'

import { DummyScreen1, DummyScreen2, DummyScreen3, DummyScreen4 } from './src/Screens'

const MasterStack = createStackNavigator({
  DummyScreen1,
  DummyScreen2,
})

const DummyStack = createStackNavigator({
  DummyScreen3,
  DummyScreen4
})

const MasterDetail = createMasterDetailNavigator({
  Master: MasterStack,
  Detail: DummyStack,
})

registerRootComponent(MasterDetail)
