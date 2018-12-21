import * as React from 'react';
import logo from './logo.svg';
import Button from "@material-ui/core/Button"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchIcon from "@material-ui/icons/Search"
import {TPixabayImage,IPixabayAPI} from "./pixabayapi"
type TPixabayFinderState = {
  images: TPixabayImage[],
  errorMessage: string,
  //more fields come here leter
  searchText:string,
}
type TPixabaFinderProps = {
  pixabayApi: IPixabayAPI,
}
class App extends React.Component<TPixabaFinderProps,TPixabayFinderState> implements ISearchBarEvents {
  public state: TPixabayFinderState = {
    images:[],
    errorMessage: "",
    searchText:"",
  }
  async componentDidMount(){
    await this.onSearchTextChange("dogs")
  }
  public onSearchTextChange = async (searchText:string) => {
    this.setState({searchText})
    const images = await this.props.pixabayApi.queryImagesFromPixabay(searchText,15) 
    this.setState({images,errorMessage:""})
  }
  render() {
    console.log("Images",this.state.images)
    return (
      <>
      <AppBar position="sticky"> 
        <Toolbar>
          <img src={logo} className="App-logo" alt="logo" width="56px"/>
          <Typography variant="h6" noWrap color="inherit">Pixabay Image Finder</Typography>
        </Toolbar>
        <Toolbar>
          <a href="https://pixabay.com/">
            <img src="https://pixabay.com/static/img/public/leaderboard_b.png" alt="Pixabay" width="100%"/>
          </a>
        </Toolbar>
      </AppBar>
      <SearchBar searchText={this.state.searchText} onSearchTextChange={this.onSearchTextChange} />
      {!this.state.images.length && <div>Loading Images...</div>}
      {this.state.errorMessage && <div>{this.state.errorMessage}</div>}
      {this.state.images.map(i=>{
        return (<div key={i.id}>{i.tags} by {i.user} <img src={i.largeImageURL} width="100%"/></div> )
      }) }
      </>
    )
  }
}
export default App;
interface ISearchBarEvents {
  onSearchTextChange(searchText:string):void
}
type TSearchBarProps = {
  searchText:string,
}
class SearchBar extends React.Component<TSearchBarProps & ISearchBarEvents> {
  public render() {
    return (
      <div>
        <TextField label="Search" value={this.props.searchText} style={{marginTop:8}}
          InputProps={{
            endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>
          }}
          helperText="Start typing search string" fullWidth
          onChange={(e) => this.props.onSearchTextChange(e.target.value)} //Lambda in JSX
        />
      </div>
    )
  }
}