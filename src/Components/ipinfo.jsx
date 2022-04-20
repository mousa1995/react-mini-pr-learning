import React, { Component } from 'react'
import { BallTriangle } from 'react-loader-spinner';

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
                <div className="card-container">
                    <span className="info">Info</span>
                    <img className="round" src={this.state.info.country_flag} alt={this.state.info.country} />
                    <h3>{this.state.info.country}</h3>
                    <h6>{this.state.info.city}</h6>
                    <p>isp: {this.state.info.isp}</p>
                    <div className="footer">
                        <p>IP: {this.state.info.ip}</p>
                        <p>latitude: {this.state.info.latitude}</p>
                        <p>longitude: {this.state.info.longitude}</p>
                    </div>
                </div>}
        </>
        )
    }
}
