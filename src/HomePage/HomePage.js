import gitHub from '../images/image 5.svg';
import { Link } from 'react-router-dom';


function HomePage(){
    return (
    <div className='github'>
    <div className='github-title'>
        <img className='github-logo'src={gitHub}></img>
        <h3 className='github_info'>Insert GitHub Information</h3>
    </div>
    <form className='insert_github'>
        <input className='owner' placeholder='Search owner'></input>
        <input className='repo' placeholder='Search link'></input>
        <Link to={'/dahsboard'}>

            <button className='submit'>
                
                Submit</button>
        </Link>
    </form>    
    </div>

    )
}

export default HomePage