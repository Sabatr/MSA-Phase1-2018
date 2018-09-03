
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import * as React from "react";
import './../App.tsx';

interface IBreedState {
        breedList: any,
        cardArray: any,
        result: any
        
}
export default class FirstComponent extends React.Component<{},IBreedState> {

constructor(props: any) {
        super(props);
        this.state = ({
                breedList: "",
                cardArray: [],
                result: ""
                
        })
}

// public createCardForBreed() {
//         const body = document.getElementsByTagName('body')[0];
//         const element = document.createElement('div');
//         element.innerHTML = '<CardActionArea><CardMedia component="img" className="card" image={this.state.result} title={this.state.breedList}/> <CardContent><Typography variant="headline" component="h2">{this.state.breedList}</Typography></CardContent></CardActionArea>';        
//         body.appendChild(element);
// }

public async getBreedList() {
        const breedList = await fetch('https://dog.ceo/api/breeds/list/all');
        const breedData = await breedList.json();
        const list = Object.keys(breedData.message);
        const cardList:any = [];
        list.forEach(async(element) => {
                const dogApi = await fetch('https://dog.ceo/api/breed/'+element+'/images/random');
                const data = await dogApi.json();
                this.setState({
                        breedList: element,
                        result: data.message
                })
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
                                        title={this.state.breedList}
                                />
                                <CardContent>
                                        <Typography 
                                        variant="headline"
                                        component="h1">
                                        {this.state.breedList}
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