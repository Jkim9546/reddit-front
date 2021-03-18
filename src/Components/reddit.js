import React, {Component} from 'react';
import RedditSingle from './redditSingle';
import FavouriteReddit from './favouriteReddit'

class Reddit extends Component {

    
    constructor(props) {
        super(props);
        
        this.state = {
            visiable: false,
            subReddit:'',
            favourite:[]
        };
    }

    loadSubReddit(){
        const url = 'https://www.reddit.com/r/' + this.state.subReddit + '/hot.json?limit=10';
        //console.log(url);
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            this.setState({
               visiable: true,
               children: data.data.children
            })
            this.initializeFavoourite()
            this.StoreIDonWebStorage()
        })
        .catch((error) => {
            console.log(error);
            alert('There was no SubReddit. Please check again subreddit name!!');
            this.setState({
                visiable: false,
                subReddit:''
             });
        });
    }

    initializeFavoourite(){
        if (this.state.children.length > 0)
        {
            var list = [];
            var i=0;
            while (i < this.state.children.length){
                list.push({
                    id: this.state.children[i].data.id,
                    selected : false
                })
                i = i + 1;
              } 
            this.setState({
                favourite : list
            })
        }
        //console.log(this.state.favourite);
    }

    StoreIDonWebStorage(){
        localStorage.clear();

        if (this.state.children.length > 0){
            var i=0;
            while (i < this.state.children.length){
                var id =  this.state.children[i].data.id;
                var value = JSON.stringify(this.state.children[i])
                localStorage.setItem(id, value);
                i = i + 1;
                }
                
              } 
    }

   updateInputValue(evt){
       this.setState({
        subReddit:evt.target.value 
       });
   }

    render() {
        if (this.state.visiable === true) {
            return (
                <div className="App">
                    SubReddit Name: 
                    <input value={this.state.subReddit} placeholder="input a subreddit name" onChange={evt => this.updateInputValue(evt)}/>
                    <input type="button" value ="GetSubReddit" onClick={() => this.loadSubReddit()}></input>
                    <RedditSingle onChangePage= {function(id){
                        var _id = id;
                        var newFavourite = Array.from(this.state.favourite)

                        var i=0;
                        while (i < newFavourite.length){
                            if (newFavourite[i].id === _id )
                            {
                                newFavourite[i].selected = true;
                                break;
                            }
                            i = i + 1;
                          } 
                        this.setState({
                            favourite : newFavourite
                        })
                    }.bind(this)}></RedditSingle>
                    <FavouriteReddit favouriteItems={this.state.favourite}  removeItem = {function(id){
                        var _id=id;
                        var newFavourite = Array.from(this.state.favourite)

                        var i=0;
                        while (i < newFavourite.length){
                            if (newFavourite[i].id === _id )
                            {
                                newFavourite[i].selected = false;
                                break;
                            }
                            i = i + 1;
                          } 
                        this.setState({
                            favourite : newFavourite
                        })
                    }.bind(this)}></FavouriteReddit>
                </div>
            )
        } else
        {
            return (
                <div className="App">
                    SubReddit Name: 
                    <input value={this.state.subReddit} placeholder="input a subreddit name" onChange={evt => this.updateInputValue(evt)}/>
                    <input type="button" value ="GetSubReddit" onClick={() => this.loadSubReddit()}></input>
                </div>
            )
        }
    }
}

export default Reddit;