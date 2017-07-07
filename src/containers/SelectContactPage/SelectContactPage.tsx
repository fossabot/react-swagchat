import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IUser, IRoom, RoomType } from 'swagchat-sdk';

import {
  contactsFetchRequestActionCreator,
  updateSelectContactsActionCreator,
  clearSelectContactsActionCreator,
  IContactsFetchRequestAction,
  IUpdateSelectContactsAction,
  IClearSelectContactsAction,
} from '../../actions/user';
import { State } from '../../stores';
import {
  TopBar,
  ContactList,
  Button,
  Close,
} from '../../';
import { IUserState } from '../../stores/user';
import {
  combinedCreateRoomAndMessagesFetchRequestActionCreator,
  ICombinedCreateRoomAndMessagesFetchRequestAction,
} from '../../actions/combined';

export interface ISelectContactPageProps extends RouteComponentProps<any> {
  title: string;
  userState: IUserState;
  noContactListText: string;
  noContactListImage: string;
  contactsFetchRequest: () => IContactsFetchRequestAction;
  updateSelectContacts: (contact: IUser) => IUpdateSelectContactsAction;
  clearSelectContacts: () => IClearSelectContactsAction;
  combinedCreateRoomAndMessagesFetchRequest: (room: IRoom) => ICombinedCreateRoomAndMessagesFetchRequestAction;
}

class SelectContactPage extends React.Component<ISelectContactPageProps, void> {
  componentDidMount() {
    if (this.props.history.action === 'PUSH') {
      this.props.contactsFetchRequest();
    }
  }

  componentDidUpdate() {
    if (this.props.history.action === 'POP' && this.props.userState.contacts.length === 0) {
      this.props.contactsFetchRequest();
    }
  }

  componentWillUnmount() {
    this.props.clearSelectContacts();
  }

  onContactTap(user: IUser) {
    this.props.updateSelectContacts(user);
  }

  onCloseButton() {
    if (this.props.history) {
      this.props.history.push({pathname: '/'});
    }
  }

  onOkButton() {
    console.log('onOkButton');
    const room: IRoom = {
      userId: this.props.userState.userId,
      type: RoomType.ONE_ON_ONE,
      name: '',
    };
    this.props.combinedCreateRoomAndMessagesFetchRequest(room);
  }

  render(): JSX.Element {
    return (
      <div>
        <TopBar
          title="Select contact"
          leftButton={<Button icon={<Close />} onClick={this.onCloseButton.bind(this)} />}
          rightButton={<Button text="OK" onClick={this.onOkButton.bind(this)} />}
        />
        <ContactList
          hasTopBar={true}
          contacts={this.props.userState.contacts}
          selectedContacts={this.props.userState.selectContacts}
          noContactListText={this.props.noContactListText}
          noContactListImage={this.props.noContactListImage}
          onClick={this.onContactTap.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  if (state.client.client && state.user.user) {
    return {
      userState: state.user,
      noContactListText: state.setting.noContactListText,
      noContactListImage: state.setting.noContactListImage,
    };
  }
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: ISelectContactPageProps) => {
  ownProps; // TODO
  return {
    contactsFetchRequest: () => dispatch(contactsFetchRequestActionCreator()),
    updateSelectContacts: (contact: IUser) => dispatch(updateSelectContactsActionCreator(contact)),
    clearSelectContacts: () => dispatch(clearSelectContactsActionCreator()),
    combinedCreateRoomAndMessagesFetchRequest: (room: IRoom) => dispatch(combinedCreateRoomAndMessagesFetchRequestActionCreator(room)),
  };
};

export const ContainerSelectContactPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectContactPage);
