import notFound from '../../assets/NotFound.svg'
import './NotFound.css'

const NotFound = () => {
    return (
        <div className='NotFound'>
            <div className='notFoundText'>
                <h2>Sorry...</h2>
                <h2>We cannot find the song you request</h2>
            </div>
            <div className='notFoundImg'>
                <img src={notFound} alt="Song not found" />
            </div>
        </div>
    )
}

export default NotFound
