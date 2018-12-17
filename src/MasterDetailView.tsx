import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  NavigationDescriptor,
  NavigationInjectedProps,
  // @ts-ignore
  SceneView,
} from 'react-navigation'

import { MasterDetailRoute } from './MasterDetailRouter'

export interface MasterDetailViewConfig {
  masterWidth?: number
}

interface Props {
  screenProps?: { [key: string]: any }
  navigationConfig: MasterDetailViewConfig
  descriptors: { [key: string]: NavigationDescriptor }
}

const styles = StyleSheet.create({
  main: { flex: 1, flexDirection: 'row-reverse' },
  master: {
    shadowColor: 'black',
    shadowRadius: 1,
    shadowOpacity: 0.5,
  },
})

export default class MasterDetailView extends React.Component<Props & NavigationInjectedProps> {
  public render() {
    const {
      descriptors,
      screenProps,
      navigationConfig: { masterWidth = 320 },
    } = this.props

    const masterDescriptor = descriptors[MasterDetailRoute.Master]
    const detailDescriptor = descriptors[MasterDetailRoute.Detail]

    return (
      <View style={styles.main}>
        <SceneView
          component={detailDescriptor.getComponent()}
          navigation={detailDescriptor.navigation}
          screenProps={screenProps}
        />
        <View style={[styles.master, { width: masterWidth }]}>
          <SceneView
            component={masterDescriptor.getComponent()}
            navigation={masterDescriptor.navigation}
            screenProps={screenProps}
          />
        </View>
      </View>
    )
  }
}
