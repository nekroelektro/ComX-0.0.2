import * as React from 'react';
import './footer.scss';
//import { DataHelper } from './../../../helpers/DataHelper';

//let helper = new DataHelper();
function getYear(): number{
    return new Date().getFullYear();
}

class Footer extends React.Component {
    render() {
        return (
            <footer className="bottomFooter" id="bottomFooter">
                <p><span dangerouslySetInnerHTML={{ '__html': '&copy;' }} /> {getYear()} - Zero Fucks Given by NEKRO</p>
            </footer>
        );
    }
}

export default Footer;