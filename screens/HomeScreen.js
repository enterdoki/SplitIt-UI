import React, { memo } from 'react';
import { Text, View, ScrollView, StyleSheet, ImageBackground, Image, TouchableHighlight } from 'react-native'
import { Appbar } from 'react-native-paper';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { connect } from "react-redux";

class HomeScreen extends React.Component {
  _isMounted = false
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      balance: 0,
      image: ' '
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

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/background_dot.png')}
          resizeMode="repeat"
          style={styles.background}
        >
          <Appbar.Header >
            <Appbar.Action style={{ alignItems: 'flex-start' }} size={30} icon="dots-vertical" onPress={() => console.log('menu click')} />
            {/* <Appbar.Content 
              title={this.state.firstName}
              subtitle={this.state.lastName}
            /> */}
            <Appbar.Action style={styles.bar} size={35}
              icon={() => (
                <Image
                  source={{ uri: this.state.image }}
                  style={{ width: 40, height: 40, overflow: 'hidden', borderRadius: 200 / 2 }}
                />
              )}
            />

            <Appbar.Action style={{ alignItems: 'flex-end' }} size={30} icon="plus" onPress={() => console.log('add click')} />


          </Appbar.Header>

          {/* <Header>Let's get rolling!</Header> */}
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Paragraph>
              Welcome to SplitIt. Here, you can split your restaurant bills with ease! Hope you enjoy your stay.
          Hello {this.state.firstName} {this.state.lastName}! Your current balance: ${this.state.balance}.
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
    // alignItems: 'center',
    // width: 50,
    // height: 50,
    // overflow:'hidden'
    // justifyContent: 'center',

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
  user: state.user
})

export default connect(mapState)(memo(HomeScreen));
