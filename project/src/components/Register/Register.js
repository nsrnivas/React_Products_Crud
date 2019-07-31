import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import $ from "jquery";
class Register extends Component {
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

    register = (e) => {
        var sendInfo = {
            user_name: this.state.user_name,
            password: this.state.password,
        };

        $.ajax({
            type: "POST",
            url: "http://localhost:3001/create_user_credentials",
            dataType: "json",
            crossDomain: true,
            withCredentials: false,
            headers: {  'Access-Control-Allow-Origin': 'htt://localhost:3000' },
            success: function (msg) {
                if (msg) {
                    alert("New user has been added");
                    window.location.replace('/login')
                } else {
                    alert("Cannot add to list !");
                }
            },

            data: sendInfo
        });
    };


    render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
             showMenuIconButton={false}
           />
              <TextField
                  hintText="Enter your Username"
                  name="user_name"
                  floatingLabelText="UserName"
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
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={this.register}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;