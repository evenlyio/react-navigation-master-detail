import { createNavigator } from 'react-navigation'

import MasterDetailRouter, {
  MasterDetailNavigationRouteConfigMap,
  MasterDetailRouterConfig,
} from './MasterDetailRouter'
import MasterDetailView, { MasterDetailViewConfig } from './MasterDetailView'

export interface MasterDetailConfig extends MasterDetailViewConfig, MasterDetailRouterConfig {}

const createMasterDetailNavigator = (
  routeConfigMap: MasterDetailNavigationRouteConfigMap,
  masterDetailConfig: MasterDetailConfig = {}
) => {
  const router = MasterDetailRouter(routeConfigMap, masterDetailConfig)
  return createNavigator(MasterDetailView, router, masterDetailConfig)
}

export default createMasterDetailNavigator
