<h1> MSA-Phase1-2018</h1>
<h2>Link to the website: https://randomdogpictures.azurewebsites.net/ </h2>
<h5>Link to the api: https://dog.ceo/dog-api/ </h5>
<p>This website was made using React Typescript. It uses an api to fetch for random images of dogs online.<br>
There was also some use of material-ui for the buttons and stuff. </p>
<h4>Main</h4>
<img src="http://g.recordit.co/yzhz3LCdK1.gif" alt="Main menu gif" width="400" height="200" />
<h4>Listing</h4>
<img src="https://thumbs.gfycat.com/SilverYoungAmericanratsnake-size_restricted.gif" alt="List gif" width="400" height="200" />

<p>Here is an example of the use of material-ui. This is the TextField seen in the Main </p>

```
<TextField
  placeholder="Dog breed"
  label="Breed"
  className="textfield"
  inputProps={{
    'aria-label': 'Description',
  }}
  onChange={this.handleChange}
/>
```
<p> Here is an example of REST api calling. </p>
<p> This retrieves the response object. Notice the <em>await</em>. This is so that the fetch is called asynchronously <br>
The 'breed.toLowerCase()' is used to make sure the breed typed in is case insensitive. </p>

```
const dogApi = await fetch('https://dog.ceo/api/breed/'+breed.toLowerCase()+'/images/random');
```

<p> The response object is now converted into a javascript object using the .json() function.<br>
  Notice the <em>await</em> keyword. </p>

```
const data= await dogApi.json();
```

<p> We then can make use of interfaces to store the url. </p>

```
this.setState({
  results: data.message
})
```

<p> The results state now contains the url needed to load the image. We can simply open this with an <img> tag </p>

```
<img className="image" src={this.state.results} alt={this.state.results}/>
```
