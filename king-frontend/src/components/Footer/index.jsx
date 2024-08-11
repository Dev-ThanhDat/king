import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className='bg-white lg:pl-[270px] px-[30px] w-full flex  justify-center flex-col'>
      <div className='flex items-center justify-center gap-5 py-5'>
        <a
          href='https://www.linkedin.com/in/pham-thanh-dat-b194b5238/'
          target='_blank'
          className='border p-[7px] rounded-lg bg-color-black text-white border-color-black hover:bg-white hover:text-color-black transition-all'
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href='https://github.com/Dev-ThanhDat'
          target='_blank'
          className='border p-[7px] rounded-lg bg-color-black text-white border-color-black hover:bg-white hover:text-color-black transition-all'
        >
          <FaGithub size={20} />
        </a>
      </div>
      <div className='py-[15px] mt-[5px] border-t-2 border-color-border text-center'>
        &copy; Thanh Dat - King . All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
