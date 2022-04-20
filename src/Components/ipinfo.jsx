import React, { Component } from 'react'

export default class IpInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            info: null
        }
    }

    async getIp() {
        const request = await fetch('https://api.ipify.org?format=json');
        const data = await request.json();
        return data;
    }

    async getInfo() {
        const ip = await this.getIp().ip;
        const data = await (await fetch(`http://ipwhois.app/json/${ip}`)).json();

        console.log(data);
    }

    componentDidMount() {
        this.getInfo()
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
