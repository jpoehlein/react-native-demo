import React, { Component } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { ListItem } from "react-native-elements";

import MediaService from "../../library/services/media-service";
import { Result } from "../../library/models/TvShows";
import UrlBuilder from "../../utils/url-builder";
import ImageSizesEnum from "../../library/enums/image-sizes-enum";
import { Order } from "../../library/enums/order-enum";
import Filters from "../../utils/filters";

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

  mediaService: MediaService;

  constructor(props) {
    super(props);
    this.mediaService = new MediaService();
  }

  async componentDidMount() {
    await this.getFilteredTopTvShows();
  }

  private async getFilteredTopTvShows() {
    try {
      let results = await this.mediaService.getTopTvShowsAsync();
      this.setState({
        data: Filters.sortByProperty<Result>(
          results.data.results,
          "popularity",
          Order.Descending
        ),
        error: results.status !== 200 || null,
        loading: false,
        refreshing: false
      });
    } catch (error) {
      this.setState({ error, loading: false });
      console.log("HomeScreen.componentDidMount -> Exception: ", error);
    }
  }

  private keyExtractor = (item, index) => index.toString();

  private renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={`Air Date: ${item.first_air_date}\nRating: ${item.popularity}`}
      leftAvatar={{
        source: {
          uri: UrlBuilder.buildImageUrl(
            item.poster_path,
            ImageSizesEnum.PosterSizes.w45
          )
        }
      }}
      bottomDivider
      chevron
    />
  );

  private renderToScreen() {
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

  render() {
    return this.renderToScreen();
  }
}
