import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
export default class App extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <Container>
          <Header/>
          <Text style = {styles.baseText}>Hello</Text>
        
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    marginVertical: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});