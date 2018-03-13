import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import json_file from '/home/njay/reactApp/hello-world/src/project_cards.json';
import 'react-taco-table/dist/react-taco-table.css';
import { TacoTable, DataType, Formatters } from 'react-taco-table';
import Request from 'react-http-request';
import $ from 'jquery';


var total =9;
const data0 = [];
const columns0 = [
    {
        id: '',
        type: DataType.String,
        header:<header className="tile-header" >

        </header>,
    },
    {
        id: '',
        type: DataType.String,
        header: <header className="tile-header" >
        </header>,
    }

];

const columns1 = [
    {
        id: 'PROJECT',
        type: DataType.String,
        header: 'Project',
        width:200,


    },
    {
        id: 'STATE',
        type: DataType.String,
        header: 'State',
        width:150,
    },
    {
        id: 'TASK',
        type: DataType.String,
        header: 'Task',
        renderer(cellData, { column, rowData }) {
            return <a href={rowData.URL} target="_blank">{cellData}</a>;
        },
    },
    {
        id: 'USER',
        type: DataType.String,
        header: 'User',

    },
    {
        id: 'CREATED',
        type: DataType.String,
        header: 'Created',
        width:200,
    },
    {
        id: 'UPDATED',
        type: DataType.String,
        header: 'Last Update',
        width:200,
    },
    {
        id: 'DELAY',
        type: DataType.SVGAnimatedInteger,
        header: 'Delay (Days)',
        width:200,

    },

];


class App extends Component {

    render() {
        return (
            <div >
                <header className="App-header" >
                    <img src={logo} align="left" className="App-logo" alt="logo" />
                    <h1 className="App-title" >Github Project Card Tracker</h1>
                </header>

                <header className="App-header1" >
                    <Request url='http://localhost:9090/githubProjectCardTracker/Head' method='get' accept='json'>
                        {
                            ({error, result, loading}) => {
                                if (loading) {
                                    return <div align="center"><p align="center">loading...</p></div>;
                                } else {
                                    return <div align="center">
                                        <table>
                                            <tr>
                                                <td width="700">
                                                    <table>
                                                        <td>
                                                            <tr>
                                                                <div className="cardheader1">
                                                                    Number of Non moving Cards
                                                                </div>
                                                            </tr>
                                                            <tr>
                                                                <div align="center" className="card">
                                                                    {result.body.count}

                                                                </div>
                                                            </tr>
                                                        </td>
                                                    </table>

                                                </td>
                                                <td width="700">
                                                    <div className="image">
                                                        <img src="https://tctechcrunch2011.files.wordpress.com/2010/07/github-logo.png?w=400" height="170pt"/>
                                                    </div>
                                                </td>
                                                <td width="700">
                                                    <table>
                                                        <td>
                                                            <tr>
                                                                <div className="cardheader2">
                                                                    Last update Threshold (Days)
                                                                </div>
                                                            </tr>
                                                            <tr>
                                                                <div align="center" className="card">
                                                                    {result.body.threshold}
                                                                </div>
                                                            </tr>
                                                        </td>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                }
                            }
                        }
                    </Request>
                </header>

                <h2 className="intro">
                    Following Project Cards have not been updated recently..
                </h2>

                <Request url='http://localhost:9090/githubProjectCardTracker/dashboard' method='get' accept='json'>
                    {
                        ({error, result, loading}) => {
                            if (loading) {
                                return <div align="center"><p align="center">loading...</p></div>;
                            } else {
                                return <div align="center"><TacoTable columns={columns1} data={result.body} />
                                        </div>
                            }
                        }
                    }
                </Request>

            <div className="footer">
                WSO2 Lanka (Pvt) Ltd
                <p>All the project cards shown in the above table have not been updated recently</p>
            </div>

            </div>

        );
    }
}


export default App;

