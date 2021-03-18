import React, { Component } from 'react';

class favouriteReddit extends Component  {

      render() {
        var favourite = this.props.favouriteItems;
        var i = 0;
        var items = [];
        while (i <localStorage.length){
          var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
          items.push(item) ;
          i = i + 1;
        }

        var list =[];
        if (favourite.length > 0 ){
          i=0;
          while (i < favourite.length){
            item = favourite[i];
            if (item.selected === true) {
              var selectedID = item.id;
              var j=0;
              while (j < items.length) {
                var rawItem = items[j];
                if (rawItem.data.id === selectedID){
                  list.push(
                    <li key ={rawItem.data.id}>
                      <p> <input type="button" value="remove" onClick= {function (id, e){
                          e.preventDefault();
                          //alert('remove selected');
                          this.props.removeItem(id);
                        }.bind(this, rawItem.data.id )}></input>
                        Title :  {rawItem.data.title}  </p>
                      <p>Score: {rawItem.data.score}</p>
                      <p>Link: <a href={rawItem.data.url} > {rawItem.data.url} </a> </p>
                    </li>);
                    break;
                }
                j = j + 1;
              }
            }
            i = i + 1;
          }
  
        }

        
      return (
        <div>
          <h1>Favourite Posts</h1>
          <ul>
              {list}
          </ul>
        </div>
        
      );
    }
  }


export default favouriteReddit;