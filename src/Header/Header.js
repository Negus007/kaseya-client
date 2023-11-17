import porfile from '../images/Mask group.svg';
import question from '../images/material-symbols_question-mark.svg';
import setting from '../images/material-symbols-light_settings.svg';
import bell from '../images/ic_outline-notifications.svg';
import logo from '../images/SIX_829A8E82-3C75-4A5D-9D28-954994E90012.png';
import './Header.scss';

function Header(){
    return (
        <header>
        <section className='nav_bar'>
            <h2 className='nav_bar-title'>Dashboard</h2> 
            <div className='nav_bar-aside'>
                <img className='nav_bar-setting' src={setting}></img>
                <img className='nav_bar-bell' src={bell}></img>
                <img className='nav_bar-question' src={question}></img>
                <img className='nav_bar-porfile' src={porfile} ></img>  
            </div>
        </section>
    </header>
    )
} 


export default Header