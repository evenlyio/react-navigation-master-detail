"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getScreenComponent = (routeConfig) => !routeConfig ? null : routeConfig.screen ? routeConfig.screen : routeConfig;
exports.validateRouteConfigs = (routeConfigs) => {
    const routeNames = Object.keys(routeConfigs);
    if (routeNames.length !== 2) {
        throw new Error('Please specify two routes when configuring a master detail navigator.');
    }
    const checkForRoute = (routeName) => {
        if (routeNames.indexOf(routeName) < 0) {
            throw new Error(`Please provide a ${routeName} route when configuring a master detail navigator.`);
        }
    };
    ['Master', 'Detail'].forEach(routeName => checkForRoute(routeName));
    routeNames.forEach(routeName => {
        const routeConfig = routeConfigs[routeName];
        const screenComponent = getScreenComponent(routeConfig);
        if (!screenComponent ||
            (typeof screenComponent !== 'function' && typeof screenComponent !== 'string' && !routeConfig.getScreen)) {
            throw new Error(`The component for route '${routeName}' must be a React component. For example:

import MyScreen from './MyScreen';
...
${routeName}: MyScreen,
}

You can also use a navigator:

import MyNavigator from './MyNavigator';
...
${routeName}: MyNavigator,
}`);
        }
        if (routeConfig.screen && routeConfig.getScreen) {
            throw new Error(`Route '${routeName}' should declare a screen or a getScreen, not both.`);
        }
    });
};
