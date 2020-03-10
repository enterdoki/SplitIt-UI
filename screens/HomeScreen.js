import React, { memo } from 'react';
import { Text, View, ScrollView, StyleSheet, ImageBackground, Image, TouchableHighlight } from 'react-native'
import { Appbar } from 'react-native-paper';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { connect } from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { getReceiptDataThunk } from '../store/utilities/receipt';

class HomeScreen extends React.Component {
  _isMounted = false
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      balance: 0,
      image: ' ',
      selectedImage: null
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      firstName: this.props.user['user'].firstName,
      lastName: this.props.user['user'].lastName,
      balance: this.props.user['user'].balance,
      image: this.props.user['user'].profilePicture
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _pickImage = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
      else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
        });
    
        if (!result.cancelled) {
          this.setState({ selectedImage: result.uri});          
        }
        
        this.props.getReceiptDataThunk(this.props.user['user'].id, this.state.selectedImage);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/background_dot.png')}
          resizeMode="repeat"
          style={styles.background}
        >
          <Appbar.Header >
            {/* <Appbar.Action style={{ alignItems: 'flex-start' }} size={30} icon="dots-vertical" onPress={() => console.log('menu click')} /> */}
            <Appbar.Content 
              style={{ flex: 0, alignItems: 'flex-start' }}
              title={this.state.firstName.charAt(0)}
              subtitle={this.state.lastName.charAt(0)}
            />
            <Appbar.Action style={styles.bar} size={35}
              icon={() => (
                <Image
                  source={{ uri: this.state.image }}
                  style={{ width: 40, height: 40, overflow: 'hidden', borderRadius: 200 / 2 }}
                />
              )}
            />

            <Appbar.Action style={{ alignItems: 'flex-end' }} size={30} icon="plus" onPress={() => this._pickImage()} />


          </Appbar.Header>

          {/* <Header>Let's get rolling!</Header> */}
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Paragraph>
              Welcome to SplitIt. Here, you can split your restaurant bills with ease! Hope you enjoy your stay.
          Hello {this.state.firstName} {this.state.lastName}! Your current balance fuck: ${this.state.balance}.
            </Paragraph>

            <Button mode="outlined" onPress={() => this.props.navigation.navigate('LoginScreen')}>
              Logout
          </Button>
          </ScrollView>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bar: {
    flex: 1,
    alignItems: 'center',
    // width: 50,
    // height: 50,
    // overflow:'hidden'
    justifyContent: 'center',

  },
  container: {
    flex: 1,
    // alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
  }
});

const mapState = state => ({
  user: state.user,
  receipt: state.receipt
})

export default connect(mapState, {getReceiptDataThunk})(memo(HomeScreen));
