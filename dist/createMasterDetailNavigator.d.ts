import { MasterDetailNavigationRouteConfigMap, MasterDetailRouterConfig } from './MasterDetailRouter';
import { MasterDetailViewConfig } from './MasterDetailView';
export interface MasterDetailConfig extends MasterDetailViewConfig, MasterDetailRouterConfig {
}
declare const createMasterDetailNavigator: (routeConfigMap: MasterDetailNavigationRouteConfigMap, masterDetailConfig?: MasterDetailConfig) => any;
export default createMasterDetailNavigator;
