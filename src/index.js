import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTsearch from 'youtube-api-search'
const API_KEY = 'AIzaSyDSIFhZhKx20SPAndyFB_o809YFv6LB2dE';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';

// import App from './components/app';
// import reducers from './reducers';

// const createStoreWithMiddleware = applyMiddleware()(createStore);

// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <App />
//   </Provider>
//   , document.querySelector('.container'));

// YTsearch({ 'key': API_KEY, 'term': 'surfboards' }, function (data) {
//   console.log(data);
// });

class App extends Component {
  constructor(props) {
    super(props);


    this.state = {
       videos: [],
    selectedVideo: null
   };

   this.videoSearch('surfboards')

  
   
  }

  videoSearch(term){
      
    YTsearch({ 'key': API_KEY, 'term': term },(videos) => {

      this.setState({ videos: videos });
      this.setState({selectedVideo: videos[0]})
    });
  }
  render() 
  {
    const videoSearch=_.debounce((term)=>{this.videoSearch(term)},300)
    return (
      <div>
        <SearchBar 
        OnSearchTermChange={videoSearch}
        />
        <VideoDetail 
        video={this.state.selectedVideo}
      />
        <VideoList
        onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
         videos={this.state.videos} />
      </div>
      )
  }
  ;

};

ReactDOM.render(<App />, document.querySelector('.container'));