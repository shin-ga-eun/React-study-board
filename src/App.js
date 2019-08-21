import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Board from './Board';
import Test from './test';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <test/>
                    {/* 게시판입니다.
                    <Board/> */}
                </div>
            </Router>
        );
    }
}

export default App;