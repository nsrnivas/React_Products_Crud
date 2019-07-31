import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from '../Register/Register';


class Login extends Component {
constructor(props){
  super(props);
  this.state={
  user_name:'',
  password:''
  }
 }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    login = (e) => {
        $.ajax({
            type: "GET",
            url: "http://localhost:3001/login/"+this.state.user_name+"/"+this.state.password,
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.msg=='success') {
                    sessionStorage.setItem('user_name', data.user_name)
                   window.location.replace('/userpage');
                }
            },failure:function(){alert('login failed due to invallid credentials')
            }
        });
    };



render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             name="user_name"
             floatingLabelText="Username"
             onChange={this.onInputChange}
             />
           <br/>
             <TextField
               type="password"
               name="password"
               hintText="Enter your Password"
               onChange={this.onInputChange}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={this.login} />
         </div>

         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;