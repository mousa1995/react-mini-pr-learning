import React, { Component } from 'react'

export default class IpInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            info: null
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
                info: data
            })
        })
    }

    render() {
        return (
            <div className="card-container">
                <span className="info">Info</span>
                <img className="round" src="./br.svg" alt="brazil" />
                <h3>Brazil</h3>
                <h6>Guarulhos</h6>
                <p>isp: Akamai International B.V.</p>
                <div className="footer">
                    <p>IP: 2.21.90.0</p>
                    <p>latitude: -23.4543395</p>
                    <p>longitude: -46.5336678</p>
                </div>
            </div>
        )
    }
}
