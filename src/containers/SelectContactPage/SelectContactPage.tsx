import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  IUser,
  IRoom,
  State,
  store,
  IStyleState,
  ISettingState,
  clearSelectContactsActionDispatch,
  createRoomAndFetchMessagesRequestActionDispatch,
  uploadAssetAndCreateRoomAndFetchMessagesRequestActionDispatch,
  MODAL_KEY_CREATE_ROOM,
  } from 'swagchat-sdk';
import {
  TopBar,
  ContactList,
  Button,
  Modal,
} from '../../components';
import { RoomEditForm } from '../../components/internal/RoomEditForm/RoomEditForm';

export interface IReduxSelectContactProps extends RouteComponentProps<any> {
  title: string;
  userId: string;
  contacts: IUser[];
  selectContacts: {[key: string]: IUser};
  updateName: string;
  updatePictureUrl: string;
  styleState: IStyleState;
  settingState: ISettingState;
  selectContactTitle: string;
  noContactListText: string;
  noContactListImage: string;
  roomListRoutePath: string;
}

class ReduxSelectContact extends React.Component<IReduxSelectContactProps, {}> {
  private _createRoomModalView: Modal | null;

  componentWillUnmount() {
    clearSelectContactsActionDispatch();
  }

  // componentWillReceiveProps(nextProps: IReduxSelectContactProps) {
  //   if (nextProps.styleState.isDisplayModal === true) {
  //     this._createRoomModalView ? this._createRoomModalView.onModalClick() : null;
  //   }
  // }

  onCloseButton() {
    if (this.props.history) {
      store.dispatch(push(this.props.roomListRoutePath));
    }
  }

  onOkButton() {
    const room: IRoom = {
      userId: this.props.userId,
      type: 0, // Update in saga
      name: '',
    };
    createRoomAndFetchMessagesRequestActionDispatch(room);
  }

  onRoomCreateOkClick = () => {
    uploadAssetAndCreateRoomAndFetchMessagesRequestActionDispatch();
  }

  render(): JSX.Element {
    const { selectContactTitle, contacts, selectContacts, updateName, updatePictureUrl, noContactListText, noContactListImage} = this.props;
    if (!contacts) {
      return <div />;
    }
    return (
      <div>
        <TopBar
          title={selectContactTitle}
          leftButton={
            <Button
              icon={<i className="material-icons">close</i>} onClick={this.onCloseButton.bind(this)}
              shape="square"
              color="linkPrimary"
            />
          }
          rightButton={
            <Button
              icon={<i className="material-icons">done</i>} onClick={this.onOkButton.bind(this)}
              shape="square"
              color="linkPrimary"
            />
          }
        />
        <ContactList
          contacts={contacts}
          selectedContacts={selectContacts}
          noContactListText={noContactListText}
          noContactListImage={noContactListImage}
          style={{marginTop: '47px'}}
        />
        <Modal
          ref={(child) => this._createRoomModalView = child}
          buttonPosition="top"
          modalKey={MODAL_KEY_CREATE_ROOM}
          title="グループ情報登録"
          component={
            <RoomEditForm
              roomName={updateName}
              roomPictureUrl={updatePictureUrl}
            />
          }
          onOkModalClick={this.onRoomCreateOkClick.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  if (state.client.client && state.user.user) {
    return {
      userId: state.client.client.user.userId,
      contacts: state.user.contacts,
      selectContacts: state.user.selectContacts,
      updateName: state.room.updateName,
      updatePictureUrl: state.room.updatePictureUrl,
      styleState: state.style,
      settingState: state.setting,
      selectContactTitle: state.setting.selectContactTitle,
      noContactListText: state.setting.noContactListText,
      noContactListImage: state.setting.noContactListImage,
      roomListRoutePath: state.setting.roomListRoutePath,
    };
  }
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IReduxSelectContactProps) => {
  ownProps; // TODO
  dispatch; // TODO
  return {};
};

export const SelectContactPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxSelectContact);
