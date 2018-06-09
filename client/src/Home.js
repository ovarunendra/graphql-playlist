import React from 'react';
// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const Home = () => (
    <div id="main">
        <h1>Reading List</h1>
        <BookList />
        <AddBook />
    </div>
)

export default Home;
