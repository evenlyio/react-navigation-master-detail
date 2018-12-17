"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const MasterDetailRouter_1 = __importDefault(require("./MasterDetailRouter"));
const MasterDetailView_1 = __importDefault(require("./MasterDetailView"));
const createMasterDetailNavigator = (routeConfigMap, masterDetailConfig = {}) => {
    const router = MasterDetailRouter_1.default(routeConfigMap, masterDetailConfig);
    return react_navigation_1.createNavigator(MasterDetailView_1.default, router, masterDetailConfig);
};
exports.default = createMasterDetailNavigator;
