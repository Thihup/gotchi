import * as React from 'react';
import { Image, StyleSheet, Text, View, } from 'react-native';
import { Button, Form, Input, Item, Label } from 'native-base';
import Api from '../utils/api';
import { NavigationScreenProp } from 'react-navigation';
import { showMessage } from 'react-native-flash-message';

const logo = require('../../temporary.png');

interface LoginResponse {
  token: string
}

interface Navigation {
  navigate: NavigationScreenProp<any, any>,
}

interface Props {
  navigation: Navigation,
}

interface State {
  username: string,
  password: string,
  loading: boolean,
}

class Login extends React.PureComponent<Props, State> {
  state = {
    username: '',
    password: '',
    loading: false
  };

  handleUsername = (username: string) => this.setState({username});
  handlePassword = (password: string) => this.setState({password});

  onLogin = () => {
    this.setState({loading: true});
    Api.insecure_request('auth/signin', {
      username: this.state.username,
      password: this.state.password
    }, 'POST').then((data: LoginResponse) => {
      this.setState({loading: false});
      this.props.navigation.navigate('Home', {data});
    }).catch(error => {
      this.setState({loading: false});
      showMessage({
        message: "Error",
        description: error.message,
        type: "danger",
      });
    });
  };

  render() {
    const {
      username,
      password,
      loading
    } = this.state;
    return (
      <View style={styles.container}>
        <Form style={styles.loginContainer}>
          <Image style={styles.logo} source={logo}/>
          <Text style={styles.title}>Login</Text>
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
              onPress={this.onLogin}
              block
              light
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                Sign in
              </Text>
            </Button>
          </View>
        </Form>
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
    );
  }

  onRegister = () => {
    this.props.navigation.navigate('Register');
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

export default Login;