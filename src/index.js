import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App.js';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

// Require Sass file so webpack can build it
import 'bootstrap/dist/css/bootstrap.css';
import'./styles/style.css';

ReactDOM.render(<BrowserRouter><ThemeProvider><CSSReset /><App /></ThemeProvider></BrowserRouter>, document.getElementById('root'));