import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';

export default class CardHeaderFooterExample extends Component {
  handleNavigation = () => {
    this.props.handlecardnavigation();
    this.props.navigation.navigate('EditNote', this.props.item);
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.parentView}
        onLongPress={() => this.props.onlongPressCard(this.props.item.id)}
        onPress={this.handleNavigation}>
        <View
          style={{
            borderRadius: 10,
            padding: 15,
            backgroundColor: '#212121',
            // this.props.item.category_name == 'Work'
            //   ? '#C0EB6A'
            //   : this.props.item.category_name == 'Learn'
            //   ? '#2FC2DF'
            //   : this.props.item.category_name == 'Wishlist'
            //   ? '#FAD06C'
            //   : '#FF92A9',
          }}>
          <View style={styles.cardheader}>
            <Text style={styles.date}>
              {moment(this.props.item.created).fromNow()}
            </Text>
            <Text numberOfLines={1} style={styles.title}>
              {this.props.item.title}
            </Text>
          </View>

          <Text numberOfLines={1} style={styles.category}>
            {this.props.item.category_name}
          </Text>
          <Text
            numberOfLines={
              this.props.item.note
                ? this.props.item.note.split(/\r\n|\r|\n/).length + 3
                : 1
            }
            style={styles.note}>
            {this.props.item.note}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  parentView: {
    // backgroundColor:''
    borderColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 15,
    flex: 1,
  },
  date: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  title: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: -10,
    alignSelf: 'flex-start',
  },
  category: {
    fontSize: 15,
    color: 'white',
  },
  note: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
    // fontWeight: ,
  },
  cardheader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
});
