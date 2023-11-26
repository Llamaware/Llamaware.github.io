import React from 'react';
import config from '../../config.json';

export const Ps1 = () => {
  return (
    <div>
      <span className="text-light-yellow dark:text-dark-yellow">
        {config.ps1_username}
      </span>
    </div>
  );
};

export default Ps1;
