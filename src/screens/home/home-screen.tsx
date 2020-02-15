import React, { Component } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { ListItem } from "react-native-elements";

import { HttpClientService } from "../../library/networking/http-client-service";
import { Result } from "../../library/models/TvShows";

export default class HomeScreen extends Component {
  tvShows: Result[];

  state = {
    loading: false,
    data: this.tvShows,
    page: 1,
    seed: 1,
    error: null,
    refreshing: false
  };

  httpClient: HttpClientService;

  constructor(props) {
    super(props);
    this.httpClient = new HttpClientService();
  }

  async componentDidMount() {
    try {
      let results = await this.httpClient.getTopTvShowsAsync();
      this.setState({
        data: results.data.results.sort((two, one) => {
          if (one.popularity > two.popularity) { return 1; }
          if (one.popularity < two.popularity) { return -1; }
          return 0;
        }),
        error: results.status !== 200 || null,
        loading: false,
        refreshing: false
      });
    } catch (error) {
      this.setState({ error, loading: false });
      console.log("HomeScreen.componentDidMount -> Exception: ", error);
    }
  }

  showEmptyListView() { return <View>...Loading</View>; }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <ListItem
      title={item.name + " - " + item.popularity}
      subtitle={"Air Date: " + item.first_air_date}
      leftAvatar={{ source: { uri: this.buildImageUrl(item.poster_path) } }}
      bottomDivider
      chevron
    />
  );

  buildImageUrl(posterPath: string) { return "https://image.tmdb.org/t/p/w500/" + posterPath; }

  render() {
    return (
      <SafeAreaView>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.data}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}
