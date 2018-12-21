import * as React from 'react';
import logo from './logo.svg';
import Button from "@material-ui/core/Button"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import {TPixabayImage,IPixabayAPI} from "./pixabayapi"
type TPixabayFinderState = {
  images: TPixabayImage[],
  errorMessage: string,
  //more fields come here leter
}
type TPixabaFinderProps = {
  pixabayApi: IPixabayAPI,
}
class App extends React.Component<TPixabaFinderProps,TPixabayFinderState> {
  public state: TPixabayFinderState = {
    images:[],
    errorMessage: ""
  }
  async componentDidMount(){
    try {
      const images = await this.props.pixabayApi.queryImagesFromPixabay("dogs",15) 
      this.setState({images,errorMessage:""})
    } catch(reason) {
      console
      this.setState({images:[],errorMessage: "Error:" + reason})
    }
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
