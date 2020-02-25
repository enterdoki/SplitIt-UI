import React, { memo } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';

class HomeScreen extends React.Component {

  render() {
    return (
      <Background>
        
        <Header>Let’s start</Header>
        <Paragraph>
          Welcome to SplitIt. Here, you can split your restaurant bills with ease! Hope you enjoy your stay.
    </Paragraph>
        <Button mode="outlined" onPress={() => this.props.navigation.navigate('LoginScreen')}>
          Logout
    </Button>
      </Background>
    )
  }
}

export default memo(HomeScreen);
