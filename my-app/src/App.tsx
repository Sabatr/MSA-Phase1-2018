
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import PlayArrow from '@material-ui/icons/PlayArrow';

import * as React from 'react';
import './App.css';


interface IState {
  breed: any,
  input: any,
  loading: any,
  results: any
}

export default class App extends React.Component<{},IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      breed: [],
      input: "",
      loading: "",
      results: ""
    }
  }


  public async getDogApi(breed: string) {
    const breedList = await fetch('https://dog.ceo/api/breeds/list/all');
    const breedData = await breedList.json();
    const list = Object.keys(breedData.message);
    let success = false;
    list.forEach((element) =>{
      if (breed.toLowerCase() === element) {
        success = true;
      }
    });
    if (success) {
      const dogApi = await fetch('https://dog.ceo/api/breed/'+breed.toLowerCase()+'/images/random');
      const data= await dogApi.json();
      this.setState({
        loading: "has loaded",
        results: data.message
      })
    } else {
      alert('enter valid breed name');    
      this.setState({
        loading: "has loaded"
      })
    }

  }

  public handleChange = (event:any) => {
    this.setState({
      input: event.target.value
    })
  }

  public handleClick = () => {
    if (this.state.input !== "") {
      this.setState({
        loading: "loading"
      })
      this.getDogApi(this.state.input);
    }
  }

  public render() {
    return (
      <div className="container-fluid">
        <div className="display">
          {
            this.state.loading === "loading" ? (
            <CircularProgress thickness={5}/>
            ) : (
                  <img className="image" src={this.state.results} alt={this.state.results}/>
            )
          }
        </div>
        <div className="formStuff" style={{margin: '0 auto', width: '25%'}}>
          <form autoComplete="on" className="form">
              <div className="input">
                  <TextField
                    placeholder="Dog breed"
                    label="Breed"
                    className="textfield"
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                    onChange={this.handleChange}
                
                  />
              </div>
              <div className="buttonDiv">
                  <Button className="button"
                    style={{
                      background: 'rgb(255, 255, 255)'
                    }}
                    variant="outlined"
                    onClick={this.handleClick}>
                    Go{<PlayArrow/>}
                  </Button>
              </div>
          </form>
         </div>
      </div>
    );
  }


}