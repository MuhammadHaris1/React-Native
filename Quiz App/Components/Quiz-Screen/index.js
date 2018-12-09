import React from 'react'
import { View, Text, ScrollView, Button, Alert } from 'react-native';
import RadioButton from 'react-native-radio-buttons'

var correctAnswers = []

export default class QuizScreen extends React.Component {
    state = {
        result: null,
        ans: '', 
        percentage: '',
        
    }


    componentWillMount() {
        fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')
            .then((res) => res.json())
            .then(result => this.setState({ result }))
            .catch(err => console.log(err))
    }

    submitQuiz = () => {
        const { result } = this.state;
        const percentage = `${(correctAnswers.length / result.results.length) * 100} %`
        this.setState({ percentage })

    }


    render() {
        const { result, percentage } = this.state
        console.log(correctAnswers)
        console.log(percentage)
        return (
            <ScrollView>
                <View >
                    {(result && !percentage) ? result.results.map((value, index) => {
                        const correctAns = value.correct_answer;
                        const incorrectAns = value.incorrect_answers;
                        const allOptions = [correctAns, ...incorrectAns]


                        return (
                            <View key={Math.random()} style={{ padding: 10, margin: 10 }} >
                                <Text style={{ fontWeight: 'bold', backgroundColor: 'gray', padding: 10, borderRadius: 10, color: 'white' }}>Q{++index}: {value.question}</Text>
                                <RadioButton
                                    onSelection={(e) => {
                                        
                                        if (value.correct_answer === e) {
                                            correctAnswers.push(e)
                                            // console.log(correctAnswers)
                                            // this.setState({ correctAnswers })
                                        }}
                                    } 
                              options={allOptions} />

                            </View>
                        )
                    }) :(
                        !percentage ?
                        <Text style={{ padding: 20, textAlign: 'center' }} >Please wait...</Text>:
                        <View>
                        <Text style={{ padding: 20, textAlign: 'center', fontSize: 20 }} >Your Percentage is ===> {percentage} </Text>
                        <Button title="Play Again" onPress={() => {
                            this.setState({percentage: ''})
                            correctAnswers=[]
                        }
                            } />
                        </View>
                    )
                    }
                   {result && !percentage && <Button title="Submit" onPress={this.submitQuiz} />}
                
                </View>
            </ScrollView>
        );
    }
}
