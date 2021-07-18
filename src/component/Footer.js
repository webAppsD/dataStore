import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Footer extends Component{
    render() {
        return(
            <div className="footer">
                <div className="container">
                    <h4>Quick Links</h4>
                    <div className="col-12 col-sm-4">
                        <Link to="https://github.com/">GitHub</Link><br></br>
                        <Link to="https://web.whatsapp.com/">WhatsApp</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;