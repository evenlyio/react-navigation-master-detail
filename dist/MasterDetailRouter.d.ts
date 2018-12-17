import { NavigationAction, NavigationRoute, NavigationRouteConfig, NavigationScreenConfig, NavigationScreenOptions, NavigationState } from 'react-navigation';
export declare enum MasterDetailRoute {
    Master = "Master",
    Detail = "Detail"
}
export interface MasterDetailRouterConfig {
    masterRouteParams?: any;
    detailRouteParams?: any;
    navigationOptions?: NavigationScreenConfig<NavigationScreenOptions>;
}
export interface MasterDetailNavigationRouteConfigMap {
    Master: NavigationRouteConfig;
    Detail: NavigationRouteConfig;
}
declare const _default;
export default _default;
