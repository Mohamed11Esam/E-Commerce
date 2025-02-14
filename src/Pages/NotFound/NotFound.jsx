import styles from './NotFound.module.css'
import noProducts from '../../assets/images/error.084f5f5b0eb10d3216cb7c939108e1f6.svg'
function NotFound() {
    return (
        <div className='flex justify-center items-center min-h-dvh'>
            <img src={noProducts}className='w-3/4' />
        </div>
    )
}

export default NotFound
