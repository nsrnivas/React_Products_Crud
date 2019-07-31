import {Link} from "react-router-dom";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

function Home() {
    return (
        <MuiThemeProvider>
            <br/>
            <RaisedButton><Link to="/login/">Login</Link></RaisedButton>
            <RaisedButton><Link to="/register/">Register</Link></RaisedButton>
        </MuiThemeProvider>
                )
}
export default Home;
