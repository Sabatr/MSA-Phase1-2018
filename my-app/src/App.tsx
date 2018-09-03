
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import PlayArrow from '@material-ui/icons/PlayArrow';

import * as React from 'react';
import './App.css';

interface IState {
  // These are the states of the application
  // Breed - the breed of dogs
  // input - what the user types
  // loading - checks the status of retrieving the image from the api
  // results - the resulting image link
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

  /**
   * This function asynchronously calls requests to the api
   * @param breed the entered breed of dog
   */
  public async getDogApi(breed: string) {
    // Getting all of the breed lists via a response object
    const breedList = await fetch('https://dog.ceo/api/breeds/list/all');
    // converting the response into a js object
    const breedData = await breedList.json();
    // retrieving the information and containing it into an array
    const list = Object.keys(breedData.message);
    let success = false;
    list.forEach((element) =>{
      // check if the entered breed is a valid one
      if (breed.toLowerCase() === element) {
        success = true;
      }
    });
    if (success) {
      // Getting the response object for random images of a certain dog breed
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

  /**
   * This function handles any changes when the user types in the textfield
   */
  public handleChange = (event:any) => {
    this.setState({
      input: event.target.value
    })
  }

  /**
   * This function handles any clicks to the button
   */
  public handleClick = () => {
    if (this.state.input !== "") {
      this.setState({
        loading: "loading"
      })
      this.getDogApi(this.state.input);
    }
  }

  /**
   * Renders the output
   */
  public render() {
    return (
      <div className="container-fluid">
        <div className="display">
          {
            // checks the loading state, displays a progress if its still loading
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