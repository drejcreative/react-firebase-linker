import React from 'react';

import { setItem } from '../../firebase';

const Item = (props) => {

  const removeItem = itemId => {
    const item = setItem(itemId);
    item.remove();
  }

  const editItem = (item) => {
    props.edit(item);
  }

  return <li>
            <h3>{props.item.title}</h3>
            <img src={props.item.image }
                 alt={props.item.image}
                 onError={(e)=>{e.target.src='http://drpattydental.com/wp-content/uploads/2017/05/placeholder.png'}}
               />
            <p className="user">{props.item.user}</p>
            <p className="description">{props.item.text}</p>

            <div className="wrap">
              <p><a href={props.item.link} target="_blank">Link</a></p>
            <p className="price">{props.item.price}$</p>
            </div>

            <footer>
                <button
                  onClick={() => editItem(props.item)}
                  disabled={props.item.user != props.username} >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button
                  className="delete"
                  onClick={() => removeItem(props.item.id)}
                  disabled={props.item.user != props.username} >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </footer>

          </li>

}

export default Item;
