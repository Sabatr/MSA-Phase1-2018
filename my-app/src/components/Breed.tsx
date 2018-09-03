
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import * as React from "react";
import './../App.tsx';
// These are the states of the breed list portion
// breed - the current breed
// cardArray - an array full of the card tags
// result - a random image for that breed
interface IBreedState {
        breed: any,
        cardArray: any,
        result: any
        
}
export default class Breed extends React.Component<{},IBreedState> {
constructor(props: any) {
        super(props);
        this.state = ({
                breed: "",
                cardArray: [],
                result: ""
                
        })
}

/**
 * This function asynchronously calls for the list of breeds and then stores all of the information
 * into an array for of cards. (From material-ui)
 */
public async getBreedList() {
        // Fetches the list of breeds on another thread
        const breedList = await fetch('https://dog.ceo/api/breeds/list/all');
        // Converts the response object into a javascript object
        const breedData = await breedList.json();
        const list = Object.keys(breedData.message);
        const cardList:any = [];
        list.forEach(async(element) => {
                const dogApi = await fetch('https://dog.ceo/api/breed/'+element+'/images/random');
                const data = await dogApi.json();
                this.setState({
                        breed: element,
                        result: data.message
                })
                // Creating the card for the specific breed
                cardList.push(
                <div style={{ float:'left',padding:'15px',borderWidth:'10px'}}>
                        <CardActionArea style={{background: 'white', borderRadius: '5%'}}>
                                <CardMedia
                                        component="img"
                                        className="card"
                                        style= {{
                                                borderRadius: '5%',          
                                                height:'220px',
                                                width: '220px'
                                        }}
                                        image={this.state.result}
                                        title={this.state.breed}
                                />
                                <CardContent>
                                        <Typography 
                                        variant="headline"
                                        component="h1">
                                        {this.state.breed}
                                        </Typography>
                                </CardContent>
                        </CardActionArea>
                </div>
                )
        })
        this.setState({
                cardArray: cardList
        })
}

// Upon loading the breedlist is set up
public componentDidMount() {
        this.getBreedList();
}

public render() {
        return (
                <div className="cards">
                        {this.state.cardArray}
                </div>
        );
}


}