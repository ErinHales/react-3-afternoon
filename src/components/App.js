import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post.js'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.baseURL = "https://practiceapi.devmountain.com/api/posts"
  }
  
  componentDidMount = () => {
    axios.get(this.baseURL).then(results => {
      this.setState({
        posts: results.data
      })
    })
  }

  updatePost(id, text) {
    console.log(this.state.posts);
    axios.put(`${this.baseURL}?id=${id}`,{text}).then(results => {
      this.setState({
        posts: results.data
      })
    })
  }

  deletePost(id) {
    axios.delete(`${this.baseURL}?id=${id}`).then(results => {
      this.setState({
        posts: results.data
      })
    })
  }

  createPost(text) {
    axios.post(`${this.baseURL}`, {text}).then(results => {
      this.setState({
        posts: results.data
      })
    })
  }

  // Another function to filter through
  // search = text => {
  //   axios.get(`${this.baseURL}/filter?text=${text}`).then(results => {
  //     this.setState({
  //       posts: results.data
  //     })
  //   })
  // }

  search = text => {
    let newPosts = this.state.posts.filter(post => {
      return post.text.includes(text);
    })
    this.setState({
      posts: newPosts
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchFn={this.search} clearSearchFn={this.clearSearch}/>

        <section className="App__content">

          <Compose text={posts.text} createPostFn={this.createPost}/>
          {posts.map(post => { return (
            <Post 
              key={post.id} 
              text={post.text} 
              date={post.date} 
              updatePostFn={this.updatePost} 
              id={post.id}
              deletePostFn={this.deletePost} />
          )
          })}
          
        </section>
      </div>
    );
  }
}

export default App;
