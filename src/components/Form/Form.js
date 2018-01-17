import React from 'react';
import Wrap from '../../hoc/Wrap';

import './Form.css';

const Form = (props) => {

  return (
    <Wrap>
      <div className={props.sidemenu ? 'add open' : 'add'}
           onClick={props.sidemenu ? props.sidemenuHandlerClose : props.sidemenuHandlerOpen}>
           <i className="fa fa-plus-circle" aria-hidden="true"></i>
      </div>
      <section className={props.sidemenu ? 'add-item open' : 'add-item'}>
          <h3>Add new Item</h3>
        <form onSubmit={props.ifEdit ? props.edit : props.submit}>
            <input
              onChange={props.change}
              value={props.username}
              type="text" name="username" placeholder="What's your name?"
              required />
            <input
              onChange={props.change}
              value={props.currentItem}
              type="text" name="title" placeholder="What to add?"
              required />
            <input
              onChange={props.change}
              value={props.text}
              type="text" name="text" placeholder="Description?"
              required  />
            <input
              onChange={props.change}
              value={props.link}
              type="text" name="link" placeholder="Link?"
              required  />
            <input
              onChange={props.change}
              value={props.image}
              type="text" name="image" placeholder="Image link?"
              required  />
            <input
              onChange={props.change}
              value={props.price}
              type="number" name="price" placeholder="Price?"
              required />
            <button>Add Item</button>
          </form>
      </section>
    </Wrap>
  )
}

export default Form;
