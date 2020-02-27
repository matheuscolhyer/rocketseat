/* eslint-disable comma-dangle */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */

import {createStackNavigator} from 'react-navigation';
import Main from './pages/main';
import Product from './pages/product';

export default createStackNavigator(
{
    Main,
    Product
},
{
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#6ebaff'
        },
        headerTintColor: '#FFF'
    },
}
);