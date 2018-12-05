import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Form, Input, Item, Label } from 'native-base';
import Api from '../utils/api';
import { NavigationScreenProp } from 'react-navigation';
import { showMessage } from 'react-native-flash-message';

interface Navigation {
  navigate: NavigationScreenProp<any, any>,
}

interface Props {
  navigation: Navigation,
}

interface State {
  username: string,
  password: string
}

class Register extends React.PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

  }

  handleUsername = (username: string) => this.setState({username});
  handlePassword = (password: string) => this.setState({password});

  onRegister = () => {
    Api.insecure_request('auth/signup', {
      username: this.state.username,
      password: this.state.password
    }, 'POST').then(() => {
      this.props.navigation.navigate('Login');
      showMessage({
        message: "Success",
        description: "You may now sign in",
        type: "success",
      });
    }).catch(error => {
      showMessage({
        message: "Something bad happened",
        description: error.message,
        type: "danger",
      });
    });
  };

  render(): React.ReactNode {

    const {username, password} = this.state;

    return (
      <View style={styles.container}>
        <Form style={styles.loginContainer}>
          <Text style={styles.title}>Register</Text>
          <Item inlineLabel>
            <Label>Username</Label>
            <Input
              onChangeText={this.handleUsername}
              placeholder={'your@email.com'}
              style={styles.input}
              value={username}
            />
          </Item>
          <Item inlineLabel>
            <Label>Password</Label>
            <Input
              onChangeText={this.handlePassword}
              placeholder={'your-email-password'}
              secureTextEntry={true}
              style={styles.input}
              value={password}
            />
          </Item>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.onRegister}
              block
              light
            >
              <Text style={styles.buttonText}>
                Sign up
              </Text>
            </Button>
          </View>
        </Form>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 25,
    color: '#fff',
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  buttonContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    padding: 10,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  }
});


export default Register;