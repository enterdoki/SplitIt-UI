import React, { memo } from 'react';
import { Text, KeyboardAvoidingView, Platform, View, ScrollView, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { Appbar, ActivityIndicator, Banner, Searchbar } from 'react-native-paper';
import Paragraph from '../components/Paragraph';
import { connect } from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { uploadReceiptDataThunk, resetReceiptDataThunk } from '../store/utilities/receipt';
import { logoutUserThunk } from '../store/utilities/user';
import Receipt from '../components/Receipt';
import { theme } from '../core/theme';
import { getFriendsThunk, getPendingFriendsThunk, resetFriendDataThunk } from '../store/utilities/friend';
import { SearchableFlatList } from "react-native-searchable-list";
import Details from '../components/Details';

class HomeScreen extends React.Component {
  _isMounted = false
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      balance: 0,
      image: ' ',
      query: '',
      toggleDetails: false,
      searchAttribute: "firstName",
      ignoreCase: true
    }
  }

  async componentDidMount() {
    this._isMounted = true;
    const id = this.props.user['user'].id;

    await this.props.getFriendsThunk(id);
    await this.props.getPendingFriendsThunk(id);

    this.setState({
      firstName: this.props.user['user'].firstName,
      lastName: this.props.user['user'].lastName,
      balance: this.props.friend.balance,
      image: this.props.user['user'].profilePicture,
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _pickLibraryImage = async () => {
    if (Constants.platform.ios || Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        if (Constants.platform.ios) alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
      else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if (!result.cancelled) {
          this.props.uploadReceiptDataThunk(this.props.user['user'].id, result.uri);
        }
      }
    }
  };

  _pickCameraImage = async () => {
    if (Constants.platform.ios || Constants.platform.android) {
      const status1 = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const status2 = await Permissions.askAsync(Permissions.CAMERA);
      if (status1.status !== 'granted' && status2.status !== 'granted') {
        if (Constants.platform.ios) alert('Sorry, we need camera roll and camera permissions to make this work!');
        return;
      }
      else {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if (!result.cancelled) {
          this.props.uploadReceiptDataThunk(this.props.user['user'].id, result.uri);
        }
      }
    }
  };

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  handleLogout = () => {
    this.props.resetFriendDataThunk()
    this.props.resetReceiptDataThunk()
    this.props.logoutUserThunk(this.props.navigation)
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
        <ImageBackground
          source={require('../assets/background_dot.png')}
          resizeMode="repeat"
          style={styles.background}
        >
          <Appbar.Header >
            <Appbar.Content
              style={{ flex: 0, alignItems: 'flex-start' }}
              title={this.state.firstName.charAt(0) + this.state.lastName.charAt(0)}
              subtitle='Logout'
              onPress={() => this.handleLogout()}
            />
            <Appbar.Action style={styles.bar} size={35}
              icon={() => (
                <Image
                  source={{ uri: this.state.image }}
                  style={{ width: 40, height: 40, overflow: 'hidden', borderRadius: 200 / 2 }}
                />
              )}
            />

            <Appbar.Action style={{ alignItems: 'flex-end' }} size={30} icon="plus" onPress={() => this.showActionSheet()} />


          </Appbar.Header>

          <Banner
            style={{ margin: 5 }}
            visible={true}
            actions={[
              {
                label: 'View Details',
                onPress: () => this.setState({ toggleDetails: !this.state.toggleDetails }),
              },
              {
                label: 'Settle Balance',
                onPress: () => console.log('pay pressed.'),
              },
            ]}
          >
            <Paragraph>Your current balance is: ${this.state.balance}.</Paragraph>
          </Banner>

          {this.state.toggleDetails && <Details />}

          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            {(this.props.receipt.pending === true && this.props.receipt.success === false) ? (<ActivityIndicator animating={true} color='#0099FF' size='small' style={styles.spinner} />) : (<View />)}
            {(this.props.receipt.pending === false && this.props.receipt.success === true) ? (<Receipt />) : (<View />)}

            {/* <Receipt /> */}

            <ActionSheet
              ref={o => this.ActionSheet = o}
              title={'Select an image from...'}
              options={['Camera', 'Photo Library', 'Cancel']}
              cancelButtonIndex={2}
              destructiveButtonIndex={2}
              onPress={(index) => {
                if (index == 0) {
                  this._pickCameraImage()
                }
                if (index == 1) {
                  this._pickLibraryImage()
                }
              }}
            />
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  bar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  spinner: {
    position: 'absolute',
    top: 0, left: 0,
    right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    position: 'absolute',
    bottom: 0
  }
});

const mapState = state => ({
  user: state.user,
  receipt: state.receipt,
  friend: state.friend
})

export default connect(mapState, { uploadReceiptDataThunk, logoutUserThunk, getFriendsThunk, getPendingFriendsThunk, resetFriendDataThunk, resetReceiptDataThunk })(memo(HomeScreen));
