import * as React from 'react';
import './App.css';

interface IState {
  // this is used to get the image of the pokemon//
  imageFiles: any,
  // the name the user entered//
  input: any,
  // result in what pokemon you are//
  results: any

}

export default class App extends React.Component<{},IState> {
  constructor(props: any) {
    super(props)

    this.state = {
      imageFiles: [],
      input: "",
      results: ""
    }

    this.getApi = this.getApi.bind(this);
  }

  public handleChange = (event: any) => {
    this.setState({
      input: event.target.value,
    });
  }

  public findPokemon = async () => {
    // const Pokedex = require('pokeapi-js-wrapper');
    // const P = new Pokedex.Pokedex();
   // const pokemon = P.getPokemonByName('eevee');
    // alert(P.getPokemonByName('eevee').forms);
    // this.getApi;


   }

   public getApi() {
     this.setState({
       results: "test"
     });
  //  fetch('https://pokeapi.co/api/v2/pokemon/eevee')
     fetch('https://randomuser.me/api/?results=500')
      .then(output => {
        return output.json();
      }).then(data => {
        // this.setState({
        //   // results: data.output.map((stat: any) => {
        //   //   return stat.abiltiies.ability.name; 
        //   // })
        // })
        const pictures = data.output.map((pic: any) => {
          return (
            <div key={pic.output}>
              <img src={pic.picure.medium} />
             </div>
          )
        })
        this.setState({
          results:pictures
        });
      })
   }

  public render() {
    return (
      <div className="container-fluid">
        <div className="inputBar">
          <input id="input" type="text" placeholder="Enter your name." onChange={this.handleChange}/>
          <button onClick={this.getApi}>Click</button>
          <p>{this.state.results}</p>
        </div>
    </div>
    
    );
  }


}