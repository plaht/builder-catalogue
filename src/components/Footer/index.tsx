import React from 'react';
import { Typography } from '@/materialui';

const SimpleFooter = () => {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 px-6 text-center md:justify-between">
      <Typography color="blue-gray" className="font-normal">
        &copy; 2023 Builder Catalogue
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
};

export default SimpleFooter;
