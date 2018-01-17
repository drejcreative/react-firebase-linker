import React, { Component } from 'react';
import firebase from 'firebase';
import orderBy from 'lodash/orderBy';

import { tasksRef, setItem, timeRef, auth, provider } from './firebase';

import Header from './components/Header/Header';
import Item from './components/Item/Item';
import Form from './components/Form/Form';
import Wrap from './hoc/Wrap';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.link = tasksRef;
  }

  state = {
    id: '',
    username: '',
    title: '',
    text: '',
    link: '',
    image: '',
    price: '',
    time: timeRef,
    items: [],
    tasksLoading: true,
    user: null,
    sidemenu: false,
    editMode: false,
    messageLoading: false,
    messageTasks: false
  }

  componentDidMount() {
    const itemsRef = this.link;
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];

      for (let item in items) {
        newState.push({
          id: item,
          time: items[item].time,
          title: items[item].title,
          user: items[item].user,
          text: items[item].text,
          link: items[item].link,
          image: items[item].image,
          price: items[item].price,
        });
      }

      this.setState({
        items: newState,
        tasksLoading: false
      });
    });

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const itemsRef = this.link;
    const item = {
      title: this.state.title,
      user: this.state.user.displayName || this.state.user.email,
      time: this.state.time,
      text: this.state.text,
      link: this.state.link,
      image: this.state.image,
      price: +this.state.price
    }
    itemsRef.push(item);
    this.setState({
      title: '',
      username: '',
      text: '',
      link: '',
      image: '',
      price: ''
    });
  }

  handleEdit = (data) => {
    if(data.user === this.state.user.displayName || data.user === this.state.user.email) {
      this.setState({
        id: data.id,
        editMode: true,
        sidemenu: true,
        title: data.title,
        username: data.username,
        text: data.text,
        link: data.link,
        image: data.image,
        price: data.price,
      })
    }
  }

  onEditSave = e => {
    e.preventDefault();
    const item = {
      title: this.state.title,
      user: this.state.user.displayName || this.state.user.email,
      time: this.state.time,
      text: this.state.text,
      link: this.state.link,
      image: this.state.image,
      price: +this.state.price
    }
    const itemId = setItem(this.state.id);
    itemId.update(item);
    this.setState({
      title: '',
      username: '',
      text: '',
      link: '',
      image: '',
      price: ''
    });
  }

  getData = () => {
    const { items, tasksLoading, edit } = this.state;
    const orderedItems = orderBy(
      items,
      ['time'],
      ['desc']
    );

    let itemData = (
      orderedItems.map((item) => {
          return (
            <Wrap key={item.id}>
              <Item
                item={item}
                username={this.state.user.displayName}
                useremail={this.state.user.email}
                edit={this.handleEdit}
              />
            </Wrap>
          )
        })
    )

    let taskList;

    if (tasksLoading) {
      taskList = <div className="taskList-empty">Loading...</div>
    } else if (items.length) {
      taskList = (
        <ul>
          {itemData}
        </ul>
      )
    } else {
      taskList = <div className="taskList-empty">No Tasks</div>;
    }

    return taskList;
  }

  handleLogout = () => {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  handleLogin = () => {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  onSidemenuOpen = () => {
    this.setState({
      sidemenu: true
    })
  }

  onSidemenuClose = () => {
    this.setState({
      sidemenu: false,
      editMode: false,
      title: '',
      username: '',
      text: '',
      link: '',
      image: '',
      price: ''
    })
  }

  logedUser = () => {
    return (
      <Wrap>
        <div className='user-profile'>
          <img src={this.state.user.photoURL} />
        </div>
        <div className='container'>
          <Form
            submit={this.handleSubmit}
            change={this.handleChange}
            edit={this.onEditSave}
            ifEdit={this.state.editMode}
            username={this.state.user.displayName || this.state.user.email}
            currentItem={this.state.title}
            text={this.state.text}
            link={this.state.link}
            image={this.state.image}
            price={this.state.price}
            sidemenuHandlerOpen={this.onSidemenuOpen}
            sidemenuHandlerClose={this.onSidemenuClose}
            sidemenu={this.state.sidemenu}
          />
          <section className='display-item'>

                  {this.getData()}
                  
          </section>
        </div>
      </Wrap>
    )
  }

  renderMain = () => {
    return (
      this.state.user ?
          this.logedUser()
          :
          <div className='wrapper'>
            <p className="not-logged-in"><i className="fa fa-exclamation-circle" aria-hidden="true"></i> You must be logged in to see content.</p>
          </div>
    )
  }

  render() {
    return (
      <div className='app'>
        <Header
          name="Application"
          user={ this.state.user }
          logout={this.handleLogout}
          login={this.handleLogin}
        />

        <div className="page-wrapper">
          {this.renderMain()}
        </div>

      </div>
    );
  }
}

export default App;
