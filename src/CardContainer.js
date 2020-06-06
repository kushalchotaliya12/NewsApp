//import liraries
import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Animated, PanResponder, LayoutAnimation, UIManager } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.30;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// create a component
class CardContainer extends Component {

   constructor(props) {
      super(props);
      const position = new Animated.ValueXY();
      const panResponder = PanResponder.create({
         onStartShouldSetPanResponder: () => true,
         onPanResponderMove: (event, gesture) => {
            position.setValue({ x: gesture.dx, y: gesture.dy });
         },
         onPanResponderRelease: (event, gesture) => {
            if (gesture.dx > SWIPE_THRESHOLD)
               this.completeSwipe('right');
            else if (gesture.dx < -SWIPE_THRESHOLD)
               this.completeSwipe('left');
            else
               this.resetPosition();
         }
      });
      this.state = { panResponder, position, index: 0 };
   }

   componentWillUpdate(){
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.spring();
   }


   completeSwipe(direction) {
      const x = (direction === 'right' ?
         SCREEN_WIDTH + 200 : -SCREEN_WIDTH - 200);
      Animated.timing(this.state.position, {
         toValue: { x, y: 0 },
         duration: 150
      }).start(() => this.onCompleteSwipe());
   }
   onCompleteSwipe() {
      this.setState({ index: this.state.index + 1 });
      this.state.position.setValue({ x: 0, y: 0 });
   }
   resetPosition() {
      Animated.spring(this.state.position, {
         toValue: { x: 0, y: 0 }
      }).start();
   }

   getCardStyle() {
      const { position } = this.state;
      const rotationX = SCREEN_WIDTH * 2;
      const rotate = position.x.interpolate({
         inputRange: [-rotationX, 0, rotationX],
         outputRange: ['-120deg', '0deg', '120deg']
      });
      return {
         ...position.getLayout(),
         transform: [{ rotate }]
      }
   }

   renderCards() {
      return this.props.data.map((item, index) => {
         if (index < this.state.index)
            return null;
         //Add animation only to the card on top
         if (index === this.state.index) {
            return (
               <Animated.View
                  style={[
                     styles.cardStyle,
                     this.getCardStyle()
                  ]}
                  {...this.state.panResponder.panHandlers}
                  key={item.id}
               >
                  {this.props.renderCard(item)}
               </Animated.View>
            )
         }
         return (
            <Animated.View
               key={item.id}
               style={[
                  styles.cardStyle,
                  { transform: [{ rotate: '0deg' }] },
                  { top: 10 * (index - this.state.index) },
                  { right: 10 * (index - this.state.index) }
               ]}               
            >
               {this.props.renderCard(item)}
            </Animated.View>
         );
      }).reverse();
   }

   render() {
      return (
         <View>
            {this.renderCards()}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   cardStyle: {
      width: SCREEN_WIDTH,
      position: 'absolute',
      // backgroundColor: 'blue'
   },
});
//make this component available to the app
export default CardContainer;