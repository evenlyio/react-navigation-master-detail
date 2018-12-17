"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const createMasterDetailNavigator_1 = __importDefault(require("./createMasterDetailNavigator"));
const createContainedMasterDetailNavigator = (routeConfigMap, masterDetailConfig = {}) => {
    const Navigator = createMasterDetailNavigator_1.default(routeConfigMap, masterDetailConfig);
    return react_navigation_1.createNavigationContainer(Navigator);
};
exports.default = createContainedMasterDetailNavigator;
