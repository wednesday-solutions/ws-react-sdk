/**
 *
 * DetectOffline
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import If from '@components/If';

function DetectOffline({ children, OfflineComponent }) {
  const [isOffline, setIsOffline] = useState(false);
  useEffect(() => {
    window.addEventListener('offline', () => {
      setIsOffline(true);
    });
    window.addEventListener('online', () => {
      setIsOffline(false);
    });
    return () => {
      window.removeEventListener('offline', null);
      window.removeEventListener('online', null);
    };
  }, []);

  return (
    <>
      <If condition={!isOffline} otherwise={<OfflineComponent testId="offline_component" />}>
        {children}
      </If>
    </>
  );
}

DetectOffline.propTypes = {
  children: PropTypes.node,
  OfflineComponent: PropTypes.node
};

export default DetectOffline;
