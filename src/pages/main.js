/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable keyword-spacing */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text , FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import api from '../services/api';

export default class Main extends Component {
    
    static navigationOptions = {
        title: 'Header'
    };

    state = {
        productInfo:{},
        docs:[],
        page: 1,
    };

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const {docs, ...productInfo} = response.data;
        this.setState({
            docs:[... this.state.docs, ...docs],
            productInfo,
            page
        });
        console.log(docs);
    };

    loadMore = () => {
        const {page,productInfo} = this.state;
        if(page === productInfo.page) return;
        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    };
    renderItem = ({item}) => (
        <View style = {styles.productContainer}>
            <Text style = {styles.productTitle}>{item.title}:</Text>
            <Text style = {styles.productDescription}>{item.description}</Text>
            <View style = {{
                flex: 1, 
                flexDirection: 'row', 
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableOpacity 
                    style = {styles.productButton} 
                    onPress = {() => {
                        this.props.navigation.navigate('Product', {product: item});
                    }}
                >
                    <Text style = {styles.productButtonText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style = {styles.productButton} 
                    onPress = {() => {
                        this.props.navigation.navigate('Product', {product: item});
                    }}
                >
                    <Text style = {styles.productButtonText}>Gráficos</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );

    render() {
        return (
            <View style = {styles.container}>
                <FlatList 
                    contentContainerStyle = {styles.list}
                    data = {this.state.docs}
                    keyExtractor = {item => item._id}
                    renderItem = {this.renderItem}
                    onEndReached = {this.loadMore}
                    onEndReachedThreshold = {0.5}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#e0f9ff'
    },
    list:{
        padding: 20
    },
    
    productContainer:{
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 6,
        padding: 20,
        marginBottom: 20
    },

    productTitle:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },

    productDescription:{
        fontSize: 16,
        color:'#999',
        marginTop: 5,
        lineHeight: 24
    },
    
    productButton:{
        height: 42,
        width: 120,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#DA552F',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

    productButtonText:{
        fontSize: 16,
        color: '#DA552F',
        fontWeight: 'bold'
    },

});