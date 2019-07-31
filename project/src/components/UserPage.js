import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ProductList from './ProductList'
import AddProduct from './AddProduct'
import $ from 'jquery';

class UserPage extends Component {
    constructor(props){
        super(props);
        this.state={
            user_name:sessionStorage.getItem("user_name"),
            products:[]
        }
    }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    getCall=()=>{
        $.ajax({
            type: "GET",
            url: "http://localhost:3001/get_product/" + this.state.user_name,
            dataType: "json",
            success: function (data) {
                console.log(data)
                this.setState({products: data})
            }.bind(this),
            failure: function () {
                alert('login failed due to invallid credentials')
            }
        });
    };
    componentDidMount=()=> {
        this.getCall()
    };

    deleteProduct(product_name) {
        console.log(product_name);
        $.ajax({
            type: "DELETE",
            url: "http://localhost:3001/delete_product/" + product_name,
            dataType: "json",
            success: function () {
                alert('product has been successfully deleted');
                this.getCall()

            }.bind(this),
            failure: function () {
                alert('login failed due to invallid credentials')
            }
        })
    };
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AddProduct getCall={()=>this.getCall()} products={this.state.products}/>
                        <ProductList deleteProduct={this.deleteProduct} getCall={()=>this.getCall()} products={this.state.products}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
export default UserPage;