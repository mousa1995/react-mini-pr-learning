import React, { Component } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import Info from './info';

export default class IpInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            info: null,
            isLoading: true
        }
    }

    async getIp() {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data; //return's a promise
    }

    async getInfo() {
        const ip = await this.getIp().ip;
        const response = await fetch(`http://ipwhois.app/json/${ip}`);
        const data = await response.json();
        return data; //return's a promise
    }

    componentDidMount() {
        this.getInfo().then(data => {
            this.setState({
                info: data,
                isLoading: false
            })
        })
    }

    render() {
        return (<>
            {this.state.isLoading && <BallTriangle color="red" height={80} width={80} />}
            {!this.state.isLoading &&
                <Info info={this.state.info} />}
        </>
        )
    }
}
