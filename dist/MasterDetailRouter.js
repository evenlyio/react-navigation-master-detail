"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const validateRouteConfigs_1 = require("./validateRouteConfigs");
var MasterDetailRoute;
(function (MasterDetailRoute) {
    MasterDetailRoute["Master"] = "Master";
    MasterDetailRoute["Detail"] = "Detail";
})(MasterDetailRoute = exports.MasterDetailRoute || (exports.MasterDetailRoute = {}));
const MasterDetailRouteOrder = [MasterDetailRoute.Master, MasterDetailRoute.Detail];
const getChildRouterForRouteName = (routeConfigs, routeName) => {
    const screen = react_navigation_1.getScreenForRouteName(routeConfigs, routeName);
    return screen && screen.router ? screen.router : null;
};
exports.default = (routeConfigs, config = {}) => {
    // Fail fast on invalid route definitions
    validateRouteConfigs_1.validateRouteConfigs(routeConfigs);
    const { masterRouteParams, detailRouteParams } = config;
    const childRouters = MasterDetailRouteOrder.reduce((sum, routeName) => (Object.assign({}, sum, { [routeName]: getChildRouterForRouteName(routeConfigs, routeName) })), { Master: undefined, Detail: undefined });
    const { getPathAndParamsForRoute, getActionForPathAndParams } = react_navigation_1.pathUtils.createPathParser(childRouters, routeConfigs, config);
    const resetChildRoute = (routeName) => {
        const params = routeName === MasterDetailRoute.Master ? masterRouteParams : detailRouteParams;
        const childRouter = childRouters[routeName];
        const leafStateDefaults = { index: 0, routes: [] };
        const childState = { key: routeName, routeName, params };
        return !childRouter
            ? Object.assign({}, leafStateDefaults, childState) : Object.assign({}, leafStateDefaults, childRouter.getStateForAction(react_navigation_1.NavigationActions.init()), childState);
    };
    const getInitialState = () => {
        const routes = MasterDetailRouteOrder.map(resetChildRoute);
        return {
            routes,
            index: 0,
            isTransitioning: false,
            key: '',
            params: {},
        };
    };
    return {
        getScreenOptions: react_navigation_1.createConfigGetter(routeConfigs, config.navigationOptions),
        getActionCreators: (route, stateKey) => ({}),
        getStateForAction: (action, inputState) => {
            const state = inputState || getInitialState();
            // forward back action to route which took last navigation event
            // Let the first child that handles it handle it
            for (const childLastState of state.routes) {
                const childRouter = childRouters[childLastState.routeName];
                if (!childRouter) {
                    continue;
                }
                const childState = childRouter.getStateForAction(action, childLastState);
                // child router did handle the action -> return the new result
                if (childState && childState !== childLastState) {
                    const routes = state.routes.map(s => s.routeName !== childState.routeName
                        ? Object.assign({}, s) : Object.assign({}, s, childState));
                    return Object.assign({}, state, { routes });
                }
            }
            return state;
        },
        getComponentForState: (state) => undefined,
        getComponentForRouteName: (routeName) => {
            return react_navigation_1.getScreenForRouteName(routeConfigs, routeName);
        },
        getPathAndParamsForState: (state) => {
            const route = state.routes[state.index];
            return getPathAndParamsForRoute(route);
        },
        getActionForPathAndParams: (path, params) => {
            return getActionForPathAndParams(path, params);
        },
    };
};
