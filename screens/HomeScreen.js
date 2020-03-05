import React, { memo } from 'react';
import Background from '../components/Background';
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
      balance: 0
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      firstName: this.props.user['user'].firstName,
      lastName: this.props.user['user'].lastName,
      balance: this.props.user['user'].balance
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <Background>

        <Header>Let’s start</Header>
        <Paragraph>
          Welcome to SplitIt. Here, you can split your restaurant bills with ease! Hope you enjoy your stay.
          Hello {this.state.firstName} {this.state.lastName}! Your current balance: ${this.state.balance}.
    </Paragraph>
        <Button mode="outlined" onPress={() => this.props.navigation.navigate('LoginScreen')}>
          Logout
    </Button>
      </Background>
    )
  }
}


const mapState = state => ({
  user: state.user
})

export default connect(mapState)(memo(HomeScreen));
