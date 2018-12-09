import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import CustomCamera from './Components/Camera';
import AppBar from './Components/Header';
import QuizScreen from './Components/Quiz-Screen'

export default class App extends React.Component {
  state = {
    faceDetected: false,
    quiz: false,
  }

  faceDetected = () => {
    this.setState(({ faceDetected: true }))
  }

  render() {
    const { faceDetected, quiz } = this.state
    
    return (
      <View style={{ flex: 1 }}>
        <AppBar />
        {!faceDetected ? <CustomCamera faceDetection={this.faceDetected} /> : (
        quiz ?
        <QuizScreen />
        :
        <View style={{alignContent: 'center'}}>
        <Button
          style={{padding: 50}}
          title="Start Quiz"
          color="#841584"
          onPress={() => this.setState({ quiz: true})}
          accessibilityLabel="Start the quiz"
        /></View>)}
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
