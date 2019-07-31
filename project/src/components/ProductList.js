import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import $ from 'jquery';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: sessionStorage.getItem("user_name"),
            products: props.products
        }
    }

    onInputChange = (e,index) => {
        e.persist()
        console.log("product_name",e.target)
        this.setState(state => (state.products[index].product_name = e.target.value));

    };

    componentDidMount = () => {
        this.props.getCall()
        console.log("props",this.props.products)
    };
    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (prevProps.products !== this.props.products) {
            this.setState({products:this.props.products});
        }
    };

    editProduct = (product) => {
        console.log('addproduct')
        var sendInfo = {
            user_name: sessionStorage.getItem("user_name"),
            product_name: this.state.product_name,
        };

        $.ajax({
            type: "PUT",
            url: "http://localhost:3001/update_product/"+product._id+"/"+this.state.user_name+"/"+product.product_name,
            dataType: "json",
            success: function (msg) {
                if (msg) {
                    alert("Product has been updated");
                } else {
                    alert("Cannot add to list !");
                }
            }.bind(this), failure:function(){
                alert('cannot add to list');
            },
            // data: sendInfo
        });
    };
    // editProduct(product_name){
    //     <TextField
    //         hintText="Enter your Product Name"
    //         name="product_name"
    //         floatingLabelText="ProductName"
    //         onChange={this.onInputChange}
    //     />
    // }
    test() {
        let test = this.state.products.map((product, index) => {
            return <div className="row">
                <div className="col-lg-6">
                    <TextField
                        disabled={this.state.products[index].user_name!==this.state.user_name}
                        hintText="Enter your Product Name"
                        name="product_name"
                        floatingLabelText="ProductName"
                        onChange={(event) => this.onInputChange(event, index)}
                        // defaultValue={this.state.products[index].product_name}
                        value={this.state.products[index].product_name}
                    />

                </div>
                <div className="col-lg-3">
                    <RaisedButton disabled={this.state.products[index].user_name!==this.state.user_name} label="update" primary={true} onClick={() => this.editProduct(product)}/>
                </div>
                <div className="col-lg-3">
                    <RaisedButton label="delete" primary={true} disabled={this.state.products[index].user_name!==this.state.user_name}
                                  onClick={() => this.props.deleteProduct(product.product_name)}/>
                </div>
            </div>
        })
        return test;
    }


getprodui=()=>{
                console.log("this.state.products.length",this.state.products.length)
              if(this.state.products.length<1){
                  return <div>
                      No Products available
                  </div>
              }else{
                  return <div>
                      <h1>Product List</h1>
                      <br/>
                      <div className="container">
                          <div className="row">
                              <div className="col-lg-6">
                                  <h4>Product Name</h4>
                              </div>
                          </div>
                          {this.test()}
                          <br/>
                      </div>
                  </div>
              }
}
    render() {
        return (
            this.getprodui()
        );
    }
}

export default ProductList;