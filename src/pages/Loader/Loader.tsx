import { useEffect, useState } from 'react';
import GrooveLogo from '../../assets/GrooveLogo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './Loader.css';

const Loader = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // const divElement = document.querySelector('.loader') as HTMLDivElement;

        const timeout = setTimeout(() => {
            setIsVisible(true)
        }, 3000);

        return () => {
            clearInterval(timeout);
        };
    }, []);

    return (
        <div className={`container Loader ${isVisible ? 'fade-out' : 'hidden'}`}>
            <div className="row text-center"><h3 style={{ 'marginBottom': '0' }}>Search, Select and</h3></div>
            <img src={GrooveLogo}></img>
        </div>
    )
}

export default Loader