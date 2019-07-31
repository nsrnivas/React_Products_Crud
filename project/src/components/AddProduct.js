import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state={
            user_name:sessionStorage.getItem("user_name"),
            product_name:''
        }
    }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    addProduct = (e) => {
        console.log('addproduct')
        var sendInfo = {
            user_name: this.state.user_name,
            product_name: this.state.product_name,
        };

        $.ajax({
            type: "POST",
            url: "http://localhost:3001/create_product",
            dataType: "json",
            success: function (msg) {
                if (msg) {
                    alert("New Product has been added");
                    this.props.getCall();
                } else {
                    alert("Cannot add to list !");
                }
            }.bind(this), failure:function(){
                alert('cannot add to list');
            },
            data: sendInfo
        });
    };

    render() {
        return (
            <div>
                <MuiThemeProvider>
                        <AppBar
                            title="Add Product"
                        />
                        <TextField
                            hintText="Enter your Product Name"
                            name="product_name"
                            floatingLabelText="ProductName"
                            onChange={this.onInputChange}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={this.addProduct} />
                    <br/>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default AddProduct;