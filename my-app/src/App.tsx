
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';

import * as React from 'react';
import './App.css';


interface IState {
  animal: any,
  ok: any,
  results: any
}

export default class App extends React.Component<{},IState> {
  constructor(props: any) {
    super(props)

    this.state = {
      animal: "",
      ok: "",
      results: "",
    }

   //  this.getDogApi = this.getDogApi.bind(this);
  }

  public async getDogApi() {
    const dogApi = await fetch('https://random.dog/woof.json');
    const data= await dogApi.json();
    this.setState({
      ok: "ok",
      results: data.url

    })
    if (this.state.results.includes(".mp4")) {
      this.getDogApi();
    }
  }

  public async getCatApi() {
    const catApi = await fetch('https://aws.random.cat/meow');
    const data= await catApi.json();
    this.setState({
      ok: "ok",
      results: data.file

    })
  }

  public async getFoxApi() {
    const foxApi = await fetch('https://randomfox.ca/floof/');
    const data= await foxApi.json();
    this.setState({
      ok: "ok",
      results: data.image

    })
  }
  

  public handleChange = (event:any) => {
    this.setState({
      animal: event.target.value
    })
  }

  public handleClick = () => {
    this.setState({
      ok: "not ok"
    })
    switch(this.state.animal) {
      case "Dogs":
        this.getDogApi();
        break;
      case "Cats":
        this.getCatApi();
        break;
      case "Foxes":
        this.getFoxApi();
        break;
      default:
        break;
    } 
  }

  public createImage() {
    
    const body = document.getElementsByTagName('body')[0]
    const image = document.createElement('img');
    image.src = this.state.results
    image.alt = this.state.results
    image.id = "image"
    body.appendChild(image);

  }

  public removeImage() {
    const body = document.getElementsByTagName('body')[0]
    const image = document.getElementById("image")
    if (image != null) {
      body.removeChild(image)
    }
  }




  public render() {
    return (
      <div className="container-fluid">
        <div className="display">
          {
              this.state.ok === "not ok" ? (
              <CircularProgress thickness={3}/>
            ) : (
              <img className="image" src={this.state.results} alt={this.state.results}/>
            )
          }

        </div>
        <div className="formStuff">
          <form autoComplete="off" className="form">
            <div className="DropDown">
          <FormControl>
          <InputLabel htmlFor="demo-controlled-open-select">Animal</InputLabel>
           <Select 
           style={{
             fontSize:'30px',
             height: '50px',
             width:'350px'
           }}
            value={this.state.animal} 
            onChange={this.handleChange}
            inputProps={{
              id: 'demo-controlled-open-select',
              name: 'animal'
              
            }}>
            <MenuItem value="Dogs">Dogs</MenuItem>
            <MenuItem value="Cats">Cats</MenuItem>
            <MenuItem value="Foxes">Foxes</MenuItem>
          </Select>
        </FormControl>
        </div>
        <div className="Button">
          <Button style={{
            fontSize: '30px',
            height:'50px',
            width:'50px'
          }}
          variant="fab"
          color= "primary"
           onClick={this.handleClick}>{<PlayCircleFilled/>}</Button>
            </div>
        </form>
      </div>

    </div>
    
    );
  }


}