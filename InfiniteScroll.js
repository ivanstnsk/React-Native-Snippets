import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

function getFakeData(size) {
  const res = [];
  for (let i = 0; i < size; i++) {
    res.push({ name: `Name ${i}` });
  }
  return res;
}

const ITEMS_LOAD_LIMIT = 10;

class Screen extends Component {
  state = {
    loading: false,
    feedList: [],
    refreshing: false,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = (refresh = false) => {
    this.setState(
        { loading: true, refreshing: refresh },
        () => {
          const data = getFakeData(ITEMS_LOAD_LIMIT); // LOAD DATA HERE
          this.setState({
            feedList: refresh
                ? data
                : [...this.state.feedList, ...data],
            loading: false,
            refreshing: false,
          });
        }
    );
  }

  loadMoreData = () => this.loadData(false);

  refreshData = () => this.loadData(true);

  renderFeedItem = ({ item, index }) => {
    const { name } = item;

    return (
      <View key={`item${index}`}><Text>{name}</Text></View>
    );
  }

  renderHeader = () => {
    return null;
  }

  renderFooter = () => {
    return null;
  }

  render() {
    return (
      <FlatList
        data={this.state.feedList}
        renderItem={this.renderFeedItem}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        loading={this.state.loading}
        refreshing={this.state.refreshing}
        onEndReached={this.loadMoreData}
        onRefresh={this.refreshData}
      />
    );
  }
}

export default Screen;
