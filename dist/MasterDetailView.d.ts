import * as React from 'react';
import { NavigationDescriptor, NavigationInjectedProps } from 'react-navigation';
export interface MasterDetailViewConfig {
    masterWidth?: number;
}
interface Props {
    screenProps?: {
        [key: string]: any;
    };
    navigationConfig: MasterDetailViewConfig;
    descriptors: {
        [key: string]: NavigationDescriptor;
    };
}
export default class MasterDetailView extends React.Component<Props & NavigationInjectedProps> {
    render(): JSX.Element;
}
export {};
