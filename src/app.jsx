
import React from 'react';
import { connect } from 'react-redux';
import values from 'lodash/values';
import reduce from 'lodash/reduce';
import some from 'lodash/some';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import filter from 'lodash/filter';

import Loader from './components/Loader';
import Artist from './components/Artist';
import Search from './components/Search';
import Tag from './components/Tag';

import {
  searchTerm,
  toggleFilterTag,
} from './actions';

import './styles/index.scss';

class App extends React.Component {
  render() {
    if (this.props.loadingTracks || this.props.loadingInfos) {
      return (<Loader
        desc={this.props.loadingTracks
          ? 'Loading favorite tracks'
          : 'Loading artists info'
        }
      />);
    }

    const maxArtistOccurences = !this.props.loadingInfos
      ? reduce(
        this.props.artists,
        (max, artist) => (max > artist.occurrences ? max : artist.occurrences),
        0
      ) : 0;

    const artists = this.props.artists
      .filter((artist) => {
        if (!this.props.filterTerm) {
          return true;
        }

        const artistNameMatch = artist.name.toLowerCase()
          .includes(this.props.filterTerm);

        const tagsMatch = some(
          artist.tags,
          (tag) => tag.name.toLowerCase().includes(this.props.filterTerm)
        );

        return artistNameMatch || tagsMatch;
      })
      .filter((artist) => {
        if (this.props.filterTags.length === 0) {
          return true;
        }

        return some(
          artist.tags,
          (tag) => this.props.filterTags.indexOf(tag.name.toLowerCase()) > -1
        );
      })
      .map((artist) => (
        <Artist
          key={artist.name}
          name={artist.name}
          image={artist.image}
          tags={artist.tags}
          url={artist.url}
          stars={maxArtistOccurences
            ? Math.floor((artist.occurrences / maxArtistOccurences) * 4)
            : 0}
        />
      ));

    const tags = reverse(sortBy(
      filter(this.props.tags, (tag) => tag.occurrences > 1),
      ['occurrences']
    )).map((tag) => (
      <Tag
        key={tag.name}
        name={tag.name}
        disabled={!this.props.filterTags.includes(tag.name)}
        clickable
        onClick={() => this.props.toggleFilterTag(tag.name)}
      />
    ));

    return (
      <div>
        <nav className="filter-bar">
          <div className="filter-tags">
            {tags}
          </div>
          <div>
            <Search onChange={(term) => this.props.searchTerm(term)} />
          </div>
        </nav>
        <div className="artists-container">
          {artists}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loadingTracks: state.get('loadingTracks'),
  loadingInfos:  state.get('loadingInfos'),
  artists:       values(state.get('artists').toJS()),
  tracks:        state.get('tracks').toJS(),
  tags:          state.get('tags').toJS(),
  filterTerm:    state.getIn(['filter', 'term']),
  filterTags:    state.getIn(['filter', 'tags']).toJS(),
});

export default connect(mapStateToProps, {
  searchTerm,
  toggleFilterTag,
})(App);
