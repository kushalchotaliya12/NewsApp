import React, { Component } from 'react';
import {
   StyleSheet,
   Text,
   View,
   Dimensions,
   TouchableOpacity
  } from 'react-native';
import { Card, Button } from 'react-native-elements';
import CardContainer from './CardContainer';
import { getNews } from './news';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const DATA = [
{ id: 1, text: 'Card #1', uri: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f28261f0564880c9086a57ee87a68887&auto=format&fit=crop&w=500&q=60' },
{ id: 2, text: 'Card #2', uri: 'https://images.unsplash.com/photo-1535576434247-e0f50b766399?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=232f6dbab45b3f3a6f97e638c27fded2&auto=format&fit=crop&w=500&q=60' },
{ id: 3, text: 'Card #3', uri: 'https://images.unsplash.com/photo-1535565454739-863432ea3c0e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7edfb9bc7d214dbf2c920723cb0ffce2&auto=format&fit=crop&w=500&q=60' },
{ id: 4, text: 'Card #4', uri: 'https://images.unsplash.com/photo-1535546204504-586398ee6677?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7320b162b147a94d4c41377d9035e665&auto=format&fit=crop&w=500&q=60' },
{ id: 5, text: 'Card #5', uri: 'https://images.unsplash.com/photo-1535531298052-7457bcdae809?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f15acb2aedb30131bb287589399185a2&auto=format&fit=crop&w=500&q=60' },
{ id: 6, text: 'Card #6', uri: 'https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ebe64b284c0ccffbac6a0d7ce2c8d15a&auto=format&fit=crop&w=500&q=60' },
{ id: 7, text: 'Card #7', uri: 'https://images.unsplash.com/photo-1535540707939-6b4813adb681?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ce3177d04728f7d1811e342b47d1e391&auto=format&fit=crop&w=500&q=60' },
{ id: 8, text: 'Card #8', uri: 'https://images.unsplash.com/photo-1535486509975-18366f9825df?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ea59f63a657824d02872bb907fe85e76&auto=format&fit=crop&w=500&q=60' }
];


export default class Setup extends Component {

   constructor(props){
      super(props);
      this.state = {
         articles : [],
         refreshing : true
      }
      this.page = 1
   }

   componentDidMount(){
      this.fetchNews()
   }

   fetchNews = () => {
      getNews(this.page)
      .then(articles => this.setState({ articles, refreshing: false}))
      .catch(() => this.setState({refreshing: false}))
   }

   renderCard = (item) => {
      return (
         
        <Card
          key={item.publishedAt}
          title={item.text}
          image={{ uri: item.urlToImage }}
          imageStyle={{height:SCREEN_HEIGHT*0.4}}
          containerStyle={{height:SCREEN_HEIGHT*0.85, alignSelf:'center', width:SCREEN_WIDTH*0.9}}
         >
         <View style={{justifyContent:'space-between'}}>
         
           <Text style={{fontWeight:'bold', fontSize:16}}>{item.title}</Text>
         
            <Text style={{ marginBottom: 10, height:100 }}>
               {item.description}
            </Text>
            <Button
               backgroundColor='#03A9F4'
               title="More details"
               style={{height:100}}
            />
            </View>
         </Card>
      );
   }
   render() {
      return (
         <View style={styles.container}>         
            <CardContainer
               data={this.state.articles}
               renderCard={this.renderCard}
            />
         </View>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
   }
});