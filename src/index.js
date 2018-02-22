import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyC8psRNKe_zkRTcHacVdjHC8EqpaQw3Z9I';


//Creating component for HTML
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            videos: [ ],
            selectedVideo: null
            
        };
        this.videoSearch('freedawkins');
    }
    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
             });
        });
    }
    render() {
        const videoSearch = _debounce((term) => { this.videoSearch(term) }, 300);
        return (
        <div>
            <SearchBar onSearchTermChange = {term => this.videoSearch(term)}/>
            <VideoDetail video = {this.state.selectedVideo}/>
            <VideoList onVideoSelect= {selectedVideo => this.setState({selectedVideo}) }
            videos = {this.state.videos} />
        </div>
        );
    }
}
//Take this component's generated HTML and put on DOM
ReactDOM.render(<App />, document.querySelector('.container'));
