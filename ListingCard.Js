//Rex Real estate
//Ryan Blankemeier
//Sample listing card for mobile app
//app will display vertical list of listingCards for homes

import React, { Component } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Button } from 'native-base';
import { withNavigation } from '@expo/ex-navigation';
import { Router } from 'expo'

@withNavigation
export default class ListingCard extends Component {
    constructor( props) {
        super(props);
    };

// called when user clicks on a specific card, pushes the data to listingInfo page
    _onClick(navigator) {
        navigator.push("listingDetail", {listingInfo: this.props.data});
    }

    render() {
        let picture = { uri: this.props.data.images };

//format price with $ sign
        let formatCurrency = function (n) {
            return "$" + formatDecimal(n);
        }

//convert to decimal
        let formatDecimal = function (n) {
            return n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }

// function to create basic info line
        let formatListingLine = function (beds, baths, sqft){
            let line = beds + " Beds, " + baths + " Baths";
            if (sqft > 0){
                line += ", " + formatDecimal(sqft) + "SqFt"
            }
            return line;
        }

//layout of the card
//if clicked, the navigator handles the switch to listingInfo page
        return (

            <Card>
                <CardItem cardBody>
                    <Image source={picture} style={{ flex: 1, borderWidth: 1, height: 200 }}></Image>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            {this.props.data.address.addressLine}
                        </Text>
                        <Text>
                            {formatCurrency(this.props.data.price)}
                        </Text>
                        <Text>
                            {formatListingLine(this.props.data.bedrooms, this.props.data.totalBaths, this.props.data.livingSquareFeet)}
                        </Text>
                        <Button onPress={() => {this._onClick(this.props.navigator);}}><Text> Click Me</Text></Button>
                    </Body>
                </CardItem>
            </Card>

        );
    }
};
var styles = StyleSheet.create({
    box: {
        padding: 10
    }
});
