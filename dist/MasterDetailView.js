"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_navigation_1 = require("react-navigation");
const MasterDetailRouter_1 = require("./MasterDetailRouter");
const styles = react_native_1.StyleSheet.create({
    main: { flex: 1, flexDirection: 'row-reverse' },
    master: {
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOpacity: 0.5,
    },
});
class MasterDetailView extends React.Component {
    render() {
        const { descriptors, screenProps, navigationConfig: { masterWidth = 320 }, } = this.props;
        const masterDescriptor = descriptors[MasterDetailRouter_1.MasterDetailRoute.Master];
        const detailDescriptor = descriptors[MasterDetailRouter_1.MasterDetailRoute.Detail];
        return (<react_native_1.View style={styles.main}>
        <react_navigation_1.SceneView component={detailDescriptor.getComponent()} navigation={detailDescriptor.navigation} screenProps={screenProps}/>
        <react_native_1.View style={[styles.master, { width: masterWidth }]}>
          <react_navigation_1.SceneView component={masterDescriptor.getComponent()} navigation={masterDescriptor.navigation} screenProps={screenProps}/>
        </react_native_1.View>
      </react_native_1.View>);
    }
}
exports.default = MasterDetailView;
