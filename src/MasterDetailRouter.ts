import {
  // @ts-ignore
  createConfigGetter,
  // @ts-ignore
  getScreenForRouteName,
  NavigationAction,
  NavigationActions,
  NavigationRoute,
  NavigationRouteConfig,
  NavigationScreenConfig,
  NavigationScreenOptions,
  NavigationState,
  // @ts-ignore
  pathUtils,
} from 'react-navigation'

import { validateRouteConfigs } from './validateRouteConfigs'

export enum MasterDetailRoute {
  Master = 'Master',
  Detail = 'Detail',
}
const MasterDetailRouteOrder = [MasterDetailRoute.Master, MasterDetailRoute.Detail]
type MasterDetailRoutes = MasterDetailRoute.Master | MasterDetailRoute.Detail
type MasterDetailChildRouters = { [key in keyof typeof MasterDetailRoute]: any }

export interface MasterDetailRouterConfig {
  masterRouteParams?: any
  detailRouteParams?: any
  navigationOptions?: NavigationScreenConfig<NavigationScreenOptions>
}

export interface MasterDetailNavigationRouteConfigMap /* extends NavigationRouteConfigMap */ {
  Master: NavigationRouteConfig
  Detail: NavigationRouteConfig
}

const getChildRouterForRouteName = (
  routeConfigs: MasterDetailNavigationRouteConfigMap,
  routeName: MasterDetailRoutes
) => {
  const screen = getScreenForRouteName(routeConfigs, routeName)
  return screen && screen.router ? screen.router : null
}

export default (routeConfigs: MasterDetailNavigationRouteConfigMap, config: MasterDetailRouterConfig = {}) => {
  // Fail fast on invalid route definitions
  validateRouteConfigs(routeConfigs)

  const { masterRouteParams, detailRouteParams } = config

  const childRouters: MasterDetailChildRouters = MasterDetailRouteOrder.reduce(
    (sum, routeName: MasterDetailRoutes) => ({
      ...sum,
      [routeName]: getChildRouterForRouteName(routeConfigs, routeName),
    }),
    { Master: undefined, Detail: undefined }
  )

  const { getPathAndParamsForRoute, getActionForPathAndParams } = pathUtils.createPathParser(
    childRouters,
    routeConfigs,
    config
  )

  const resetChildRoute = (routeName: MasterDetailRoutes): NavigationRoute => {
    const params = routeName === MasterDetailRoute.Master ? masterRouteParams : detailRouteParams
    const childRouter = childRouters[routeName]
    const leafStateDefaults = { index: 0, routes: [] }
    const childState = { key: routeName, routeName, params }
    return !childRouter
      ? {
          ...leafStateDefaults,
          ...childState,
        }
      : {
          ...leafStateDefaults,
          ...childRouter.getStateForAction(NavigationActions.init()),
          ...childState,
        }
  }

  const getInitialState = () => {
    const routes = MasterDetailRouteOrder.map(resetChildRoute)
    return {
      routes,
      index: 0, // we don't really ever change the index
      isTransitioning: false,
      key: '',
      params: {},
    }
  }

  return {
    getScreenOptions: createConfigGetter(routeConfigs, config.navigationOptions),

    getActionCreators: (route: NavigationRoute, stateKey: string) => ({}),

    getStateForAction: (action: NavigationAction, inputState?: NavigationState) => {
      const state = inputState || getInitialState()

      // forward back action to route which took last navigation event

      // Let the first child that handles it handle it
      for (const childLastState of state.routes) {
        const childRouter = childRouters[childLastState.routeName as MasterDetailRoute]
        if (!childRouter) {
          continue
        }

        const childState = childRouter.getStateForAction(action, childLastState)
        // child router did handle the action -> return the new result
        if (childState && childState !== childLastState) {
          const routes = state.routes.map(s =>
            s.routeName !== childState.routeName
              ? { ...s }
              : {
                  ...s,
                  ...childState,
                }
          )
          return {
            ...state,
            routes,
          }
        }
      }

      return state
    },

    getComponentForState: (state: NavigationState) => undefined,

    getComponentForRouteName: (routeName: string) => {
      return getScreenForRouteName(routeConfigs, routeName)
    },

    getPathAndParamsForState: (state: NavigationState) => {
      const route = state.routes[state.index]
      return getPathAndParamsForRoute(route)
    },

    getActionForPathAndParams: (path: any, params: any) => {
      return getActionForPathAndParams(path, params)
    },
  }
}
