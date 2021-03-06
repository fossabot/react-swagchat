import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  setAddonMessageActionDispatch,
  setCustomAddonMessageActionDispatch,
  setAddonRoomListItemActionDispatch,
  setNoMessageTextActionCreator,
  setNoMessageImageActionCreator,
  setNoAvatarImagesActionCreator,
  setInputMessagePlaceholderTextActionCreator,
  setRoomSettingTitleActionCreator,
  setRoomMembersTitleActionCreator,
  setMessageRoutePathActionCreator,
  setRoomSettingRoutePathActionCreator,
  setAuthParamsActionDispatch,
  setClientActionDispatch,
  store,
  routerHistory,
  IRealtimeConfig,
  Client,
} from 'swagchat-sdk';
import {
  MessagePage,
  RoomSettingPage,
  IContext,
} from '../containers/';
import {
  PluginMessageText,
  PluginMessageImage
} from '../addons/messages';
import {
  PluginRoomListItemRoomAndUserNameWithMessage,
  PluginRoomListItemRoomNameWithMessage,
} from '../addons/roomListItem';

export interface ISimpleMessengerProps {
  userId: string;
  accessToken?: string;
  apiEndpoint: string;
  apiKey?: string;
  apiSecret?: string;
  rtmProtocol?: string;
  rtmHost?: string;
  rtmPath?: string;
  messageRoutePath?: string;
  roomSettingRoutePath?: string;
  noMessageText?: string;
  noMessageImage?: string;
  inputMessagePlaceholderText?: string;
  roomSettingTitle?: string;
  roomMembersTitle?: string;
  noAvatarImages?: string[];
  renderDomId?: string;
  route?: any;
}

export class SimpleMessenger extends React.Component<ISimpleMessengerProps, {}> {
  public static defaultProps: Partial<ISimpleMessengerProps> = {
    userId: '',
    accessToken: '',
    apiEndpoint: '',
    apiKey: '',
    apiSecret: '',
    rtmProtocol: '',
    rtmHost: '',
    rtmPath: '',
    messageRoutePath: '/messages',
    roomSettingRoutePath: '/roomSetting',
    noMessageText: 'No messages.',
    noMessageImage: '',
    inputMessagePlaceholderText: 'Input text...',
    roomSettingTitle: 'Room Settings',
    roomMembersTitle: 'Members',
    noAvatarImages: ['https://unpkg.com/react-swagchat/dist/img/normal.png', 'https://unpkg.com/react-swagchat/dist/img/sad.png', 'https://unpkg.com/react-swagchat/dist/img/smile.png'],
    renderDomId: 'swagchat',
  };

  constructor(props: ISimpleMessengerProps, context: IContext) {
    super(props, context);

    const {
      route,
      userId,
      accessToken,
      apiEndpoint,
      apiKey,
      apiSecret,
      rtmProtocol,
      rtmHost,
      rtmPath,
      messageRoutePath,
      roomSettingRoutePath,
      noMessageText,
      noMessageImage,
      inputMessagePlaceholderText,
      noAvatarImages,
      roomMembersTitle,
      roomSettingTitle,
    } = props;

    const scMessagePlugins = route && route.scMessagePlugins ? route.scMessagePlugins : [
      new PluginMessageText(),
      new PluginMessageImage(),
    ];
    setAddonMessageActionDispatch(scMessagePlugins);

    const scCustomMessagePlugins = route && route.scMessagePlugins ? route.scMessagePlugins : [
      new PluginMessageText(),
      new PluginMessageImage(),
    ];
    setCustomAddonMessageActionDispatch(scCustomMessagePlugins);

    const scRoomListItemPlugins = route && route.scRoomListItemPlugins ? route.scRoomListItemPlugins : {
      1: new PluginRoomListItemRoomNameWithMessage(),
      2: new PluginRoomListItemRoomAndUserNameWithMessage(),
    };
    setAddonRoomListItemActionDispatch(scRoomListItemPlugins);

    store.dispatch(setNoMessageTextActionCreator(route ? route.noMessageText : noMessageText));
    store.dispatch(setNoMessageImageActionCreator(route ? route.noMessageImage : noMessageImage));
    store.dispatch(setInputMessagePlaceholderTextActionCreator(route ? route.inputMessagePlaceholderText : inputMessagePlaceholderText));
    store.dispatch(setRoomSettingTitleActionCreator(route ? route.roomSettingTitle : roomSettingTitle));
    store.dispatch(setRoomMembersTitleActionCreator(route ? route.roomMembersTitle : roomMembersTitle));
    store.dispatch(setNoAvatarImagesActionCreator(route ? route.noAvatarImages : noAvatarImages));
    store.dispatch(setMessageRoutePathActionCreator(route ? route.messageRoutePath : messageRoutePath));
    store.dispatch(setRoomSettingRoutePathActionCreator(route ? route.roomSettingRoutePath : roomSettingRoutePath));

    let rtmEndpoint = '';
    const tmpRtmProtocol = route ? route.rtmProtocol : rtmProtocol;
    let tmpRtmHost = route ? route.rtmHost : rtmHost;
    const tmpRtmPath = route ? route.rtmPath : rtmPath;
    if (!(tmpRtmProtocol === '' && tmpRtmHost === '' && tmpRtmPath === '')) {
      if (rtmHost === '') {
        tmpRtmHost = location.host;
      }
      rtmEndpoint = tmpRtmProtocol + '://' + tmpRtmHost + tmpRtmPath;
    }
    const realtimeConfig: IRealtimeConfig = {
      endpoint: rtmEndpoint,
    };

    setClientActionDispatch(new Client({
      apiKey: route ? route.apiKey : apiKey,
      apiSecret: route ? route.apiSecret : apiSecret,
      apiEndpoint: route ? route.apiEndpoint : apiEndpoint,
      realtime: realtimeConfig,
    }));
    setAuthParamsActionDispatch(
      route ? route.userId : userId,
      route ? route.accessToken : accessToken,
    );
  }

  render(): JSX.Element {
    return (
      <Provider store={store}>
        <ConnectedRouter history={routerHistory}>
          <Switch>
            <Route path={store.getState().setting.client.messageRoutePath + '/:messageId'} component={MessagePage} />
            <Route path={store.getState().setting.client.roomSettingRoutePath + '/:roomId'} component={RoomSettingPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export const renderSimpleMessenger = (params: any) => {
  ReactDom.render(
    <SimpleMessenger
      userId={params.userId ? params.userId : ''}
      accessToken={params.accessToken ? params.accessToken : ''}
      apiEndpoint={params.apiEndpoint ? params.apiEndpoint : ''}
      apiKey={params.apiKey ? params.apiKey : ''}
      apiSecret={params.apiSecret ? params.apiSecret : ''}
      rtmProtocol={params.rtmProtocol ? params.rtmProtocol : ''}
      rtmHost={params.rtmHost ? params.rtmHost : ''}
      rtmPath={params.rtmPath ? params.rtmPath : ''}
      messageRoutePath={params.messageRoutePath ? params.messageRoutePath : '/messages'}
      roomSettingRoutePath={params.roomSettingRoutePath ? params.roomSettingRoutePath : '/roomSetting'}
      noMessageText={params.noMessageText ? params.noMessageText : 'No messages.'}
      noMessageImage={params.noMessageImage ? params.noMessageImage : ''}
      inputMessagePlaceholderText={params.inputMessagePlaceholderText ? params.inputMessagePlaceholderText : 'Input text...'}
      roomSettingTitle={params.roomSettingTitle ? params.roomSettingTitle : 'Room Settings'}
      roomMembersTitle={params.roomMembersTitle ? params.roomMembersTitle : 'Members'}
      noAvatarImages={params.noAvatarImages ? params.noAvatarImages : ['https://unpkg.com/react-swagchat/dist/img/normal.png', 'https://unpkg.com/react-swagchat/dist/img/sad.png', 'https://unpkg.com/react-swagchat/dist/img/smile.png']}
    />, document.getElementById(params.renderDomId ? params.renderDomId : 'swagchat')
  );
};
