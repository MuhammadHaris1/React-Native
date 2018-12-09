import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class AppBar extends React.Component {
  
    render() {
        return(
            <View style={{paddingTop: 24}}> 
                <Text style={{backgroundColor: 'rgb(88, 88, 238)', padding: 20}}>Quiz App</Text>
            </View>    
        );
    }
}

