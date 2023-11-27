
import React from 'react';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear(); // Get the current year
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <Link href="/">
            <div className="text-2xl font-bold">TradeSaga</div>
          </Link>
          <p className="mt-2">Your Gateway to Financial Literacy.</p>
          <p className="mt-2">&copy; {currentYear} TradeSaga. All rights reserved.</p>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h6 className="uppercase font-semibold mb-4">Resources</h6>
            <ul>
              <li className="mb-2">
                <Link href="">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h6 className="uppercase font-semibold mb-4">Follow Us</h6>
            <div className="flex">
              <IconButton aria-label="Twitter" color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="Facebook" color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" color="inherit">
                <LinkedInIcon />
              </IconButton>
            </div>
          </div>

        </div>
        <div className="text-center text-sm mt-4 md:mt-0">
            <p className="mb-4"></p>
          <p className="mb-4" >Terms of Service </p>
            <p className="mb-4">Privacy Policy</p>
            <p className="mb-4">Game Rules & Eligibility</p>


        </div>
      </div>
    </footer>
  );
};

export default Footer;
