import React, { Component } from 'react';

class RedditSingle extends Component  {

      render() {
        var list =[];
        var i=0;
        while (i <localStorage.length){
          var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
          list.push(
            <li key ={item.data.id}>
              <p> 
              <a href={item.data.title} 
                
                onClick= {function (id, e){
                  e.preventDefault();
                  this.props.onChangePage(id);
                }.bind(this, item.data.id )}> 
              {item.data.title} </a> </p>
            </li>);
          i = i + 1;
        }
      return (
         <ul>
              {list}
         </ul>
      );
    }
  }


export default RedditSingle;