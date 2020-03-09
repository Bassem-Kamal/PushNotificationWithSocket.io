
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import io from 'socket.io-client';
import { LocalNotification } from './LocalPushController';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatMessages: []
    }
  }

  /**
   * we should set socket.io server in componentDidMount method because,
   * it is a syncronise function
   */
  componentDidMount() {
    //create field to be our socket.io server to listen to the server
    this.socket = io('http://192.168.1.9:3000');
    // listen to our socket with event 'Chat Message'
    this.socket.on('Chat Message', message => {
      // we got data from the server so, we add it to our state array
      this.setState({ chatMessages: [...this.state.chatMessages, message] });
      //>>>>>>>> here I should pop up notification
      LocalNotification(message);
    });
  }

  // send the message to socket.io & cleare the chatMessage state
  _send = () => {
    // console.log('inside method !');
    // we emit data to our socket with event 'Chat Message'
    this.socket.emit('Chat Message', this.state.chatMessage);
    console.log('after emit !');
    this.setState({ chatMessage: '' });  ///// dosen\t work
    console.log('after setState!');       /// loged fine !!!

  }

  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.text}>Socket.io</Text>
        <TextInput
          style={styles.input}
          // placeholder='write here !!'
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={this._send}
          onChangeText={message => {
            //   console.log(message);
            this.setState({ chatMessage: message });  // working fine*******
            //   console.log('state: ' +this.state.chatMessage)
          }
          }>
        </TextInput>
        <FlatList
          data={this.state.chatMessages}
          renderItem={({ item }) => <Text style={styles.textItem}>{item}</Text>}

        />
      </View >
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  input: {
    margin: 10,
    borderWidth: 3,
    color: 'red',
    fontSize: 20,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  text: {
    marginBottom: 80,
    color: 'black',
    fontSize: 30,
    fontWeight: '600',
    padding: 4,
    textAlign: 'center'
  },
  textItem: {
    margin: 4,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 15,
    paddingHorizontal: 10,
    fontSize: 30,
    textAlignVertical: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#4c9',
  }
});
export default App;
