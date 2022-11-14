import {AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai'

export default ({}: any): JSX.Element => {
  return (
    <div className='footer-container'>
      <p> 2022 JSM Headphones All rights reserved </p>

      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}
