import { MasterDetailNavigationRouteConfigMap } from './MasterDetailRouter';
import { MasterDetailConfig } from './createMasterDetailNavigator';
declare const createContainedMasterDetailNavigator: (routeConfigMap: MasterDetailNavigationRouteConfigMap, masterDetailConfig?: MasterDetailConfig) => import("react-navigation").NavigationContainer;
export default createContainedMasterDetailNavigator;
