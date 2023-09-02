import React from 'react';
import SignupInputs from '../components/authInputs/SignupInputs';
import Link from 'next/link';

type signupProps = {
    
};

const signup:React.FC<signupProps> = () => {
    
    return (
        <>
        <div className='w-[476px]'>

        <Link href={''} className="flex gap-2 align-middle">
          <img src="./solar_link-circle-bold.svg" alt="logo" />
          <img
            src="./devlinks.svg"
            alt="logo text"
            />
          </Link>
        <SignupInputs/>
        </div>
        </>
    )
}
export default signup;