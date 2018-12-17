import { createNavigationContainer } from 'react-navigation'

import { MasterDetailNavigationRouteConfigMap } from './MasterDetailRouter'

import createMasterDetailNavigator, { MasterDetailConfig } from './createMasterDetailNavigator'

const createContainedMasterDetailNavigator = (
  routeConfigMap: MasterDetailNavigationRouteConfigMap,
  masterDetailConfig: MasterDetailConfig = {}
) => {
  const Navigator = createMasterDetailNavigator(routeConfigMap, masterDetailConfig)
  return createNavigationContainer(Navigator)
}

export default createContainedMasterDetailNavigator
