import React from 'react';

import {
  Box,
  Button,
  Drawer as MuiDrawer,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import GHLogo from 'assets/gh-logo.png';
import SLLogo from 'assets/sl-logo.png';
import SwiftSSLogo from 'assets/swiftss-logo.png';
import TSALogoLocal from 'assets/tsa-logo-local.png';
import TSALogoTest from 'assets/tsa-logo-test.png';
import TSALogo from 'assets/tsa-logo.png';
import { useIsLoggedIn } from 'hooks/useIsLoggedIn';
import { useNavigate } from 'react-router-dom';
import urls from 'routing/urls';
import { clearUserStorage } from 'utils/storage';

import Navigation from './Navigation/Navigation';
import { MenuItem } from './types';

export type Props = {
  /** Defines if the drawer is expanded */
  expanded: boolean;
  /** Changes if the drawer is expanded */
  setExpanded: (v: boolean) => void;
  /** The menu items to be displayed in the drawer */
  menuItems: MenuItem[];
  handleClick?: () => void;
};

let SiteLogo: string;
// If domain is not recognised, default to Tanzania
SiteLogo = TSALogo;
if (
  window.location.hostname === 'tz-registry.swiftss.org' ||
  window.location.hostname === 'tmh-registry-client.herokuapp.com'
) {
  // Tanzania
  SiteLogo = TSALogo;
} else if (
  window.location.hostname === 'gh-registry.swiftss.org' ||
  window.location.hostname === 'tmh-registry-client-gh-6a64e51863f6.herokuapp.com'
) {
  // Ghana
  SiteLogo = GHLogo;
} else if (
  window.location.hostname === 'sl-registry.swiftss.org' ||
  window.location.hostname === 'tmh-registry-client-sl.herokuapp.com'
) {
  // Sierra Leone
  SiteLogo = SLLogo;
} else if (
  window.location.hostname === 'test-registry.swiftss.org' ||
  window.location.hostname === 'tmh-registry-client-staging.herokuapp.com'
) {
  // Staging site
  SiteLogo = TSALogoTest;
} else if (window.location.hostname === 'localhost') {
  // Localhost
  SiteLogo = TSALogoLocal;
}

const Drawer: React.FC<Props> = (props) => {
  const theme = useTheme();
  const isSmallDesktop = useMediaQuery(theme.breakpoints.between('des1200', 'des1440'));
  const { isLoggedIn } = useIsLoggedIn();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserStorage();
    navigate('/');
  };

  const handleSettings = () => {
    handleClick();
    navigate(urls.settings());
  };

  const handleClick = () => {
    props.setExpanded(false);
  };

  const getLocalisedFooterText = () => {
    const commonStyle = { color: 'inherit', textDecoration: 'underline' };
    if (
      window.location.hostname === 'tz-registry.swiftss.org' ||
      window.location.hostname === 'tmh-registry-client.herokuapp.com'
    ) {
      // Tanzania
      return (
        <Typography variant="caption" sx={{ fontSize: 11, lineHeight: '17px' }}>
          The Tanzania National Mesh Hernia Project is an original collaboration between SWIFTSS and
          the TSA (and the forerunner of the Affordable Mesh Hernia Surgery Initiative). For more
          information visit{' '}
          <Link href="https://swiftss.org/" sx={commonStyle}>
            www.swiftss.org
          </Link>
          .
        </Typography>
      );
    } else if (
      window.location.hostname === 'gh-registry.swiftss.org' ||
      window.location.hostname === 'tmh-registry-client-gh-6a64e51863f6.herokuapp.com'
    ) {
      // Ghana
      return (
        <Typography variant="caption" sx={{ fontSize: 11, lineHeight: '17px' }}>
          The Affordable Mesh Hernia Surgery Initiative is a collaboration between SWIFTSS and the
          Ghanaian AMHSI working group. For more information visit{' '}
          <Link href="https://swiftss.org/" sx={commonStyle}>
            www.swiftss.org
          </Link>
          .
        </Typography>
      );
    } else if (
      window.location.hostname === 'sl-registry.swiftss.org' ||
      window.location.hostname === 'tmh-registry-client-sl.herokuapp.com'
    ) {
      // Sierra Leone
      return (
        <Typography variant="caption" sx={{ fontSize: 11, lineHeight: '17px' }}>
          The Affordable Mesh Hernia Surgery Initiative is a collaboration between SWIFTSS and the
          Sierra Leone AMHSI working group. For more information visit{' '}
          <Link href="https://swiftss.org/" sx={commonStyle}>
            www.swiftss.org
          </Link>
          .
        </Typography>
      );
    } else if (
      window.location.hostname === 'test-registry.swiftss.org' ||
      window.location.hostname === 'tmh-registry-client-staging.herokuapp.com'
    ) {
      // Staging site
      return (
        <Typography variant="caption" sx={{ fontSize: 11, lineHeight: '17px' }}>
          This is the test site for the AMHSI. Please enjoy the freedom to try it out. Look around
          and create some fake patients, episodes, discharges and follow ups. PLEASE DO NOT USE ANY
          REAL DATA ON THIS SITE.
        </Typography>
      );
    } else if (window.location.hostname === 'localhost') {
      // Localhost
      return (
        <Typography variant="caption" sx={{ fontSize: 11, lineHeight: '17px' }}>
          The Tanzania National Mesh Hernia Project is an original collaboration between SWIFTSS and
          the TSA (and the forerunner of the Affordable Mesh Hernia Surgery Initiative). For more
          information visit{' '}
          <Link href="https://swiftss.org/" sx={commonStyle}>
            www.swiftss.org
          </Link>
          .
        </Typography>
      );
    } else {
      // If domain is not recognised, default to Tanzania
      return (
        <Typography variant="caption" sx={{ fontSize: 11, lineHeight: '17px' }}>
          The Tanzania National Mesh Hernia Project is an original collaboration between SWIFTSS and
          the TSA (and the forerunner of the Affordable Mesh Hernia Surgery Initiative). For more
          information visit{' '}
          <Link href="https://swiftss.org/" sx={commonStyle}>
            www.swiftss.org
          </Link>
          .
        </Typography>
      );
    }
  };

  const footerText = getLocalisedFooterText();

  const getLocalisedHeaderText = () => {
    if (
      window.location.hostname === 'tz-registry.swiftss.org' ||
      window.location.hostname === 'tmh-registry-client.herokuapp.com'
    ) {
      // Tanzania
      return (
        <>
          Tanzania National
          <br />
          Mesh Hernia Project
          <br />
          eRegistry
        </>
      );
    } else if (
      window.location.hostname === 'gh-registry.swiftss.org' ||
      window.location.hostname === 'tmh-registry-client-gh-6a64e51863f6.herokuapp.com'
    ) {
      // Ghana
      return (
        <>
          Ghana Affordable
          <br />
          Mesh Hernia Project
          <br />
          eRegistry
        </>
      );
    } else if (
      window.location.hostname === 'sl-registry.swiftss.org' ||
      window.location.hostname === 'tmh-registry-client-sl.herokuapp.com'
    ) {
      // Sierra Leone
      return (
        <>
          Sierra Leone Affordable
          <br />
          Mesh Hernia Project
          <br />
          eRegistry
        </>
      );
    } else if (
      window.location.hostname === 'test-registry.swiftss.org' ||
      window.location.hostname === 'tmh-registry-client-staging.herokuapp.com'
    ) {
      // Staging site
      return (
        <>
          Affordable Mesh
          <br />
          Hernia Surgery Initiative
          <br />
          eRegistry TEST SITE
        </>
      );
    } else if (window.location.hostname === 'localhost') {
      // Localhost
      return (
        <>
          Tanzania National
          <br />
          Mesh Hernia Project
          <br />
          eRegistry
        </>
      );
    } else {
      // If domain is not recognised, default to Tanzania
      return (
        <>
          Tanzania National
          <br />
          Mesh Hernia Project
          <br />
          eRegistry
        </>
      );
    }
  };

  const headerText = getLocalisedHeaderText();

  return (
    <MuiDrawer
      variant="permanent"
      sx={{
        width: props.expanded ? 308 : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: props.expanded ? 308 : 0,
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflow: 'hidden',
          borderRight: `1px solid ${theme.palette.grey[200]}`,
          position: isSmallDesktop ? 'absolute' : 'relative',
          zIndex: 100,
          backgroundColor: 'white',
        },
      }}
      onMouseEnter={() => isSmallDesktop && props.setExpanded(true)}
      onMouseLeave={() => isSmallDesktop && props.setExpanded(false)}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          sx={{
            backgroundColor: 'primary.dark',
            color: 'white',
            height: 176,
            p: 2,
            position: 'relative',
          }}
        >
          {isLoggedIn && (
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button variant="text" color="inherit" onClick={handleSettings}>
                Settings
              </Button>
              <Button variant="text" color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
          <Typography
            variant="h6"
            sx={{
              position: 'absolute',
              bottom: 24,
              left: 16,
              lineHeight: '24px',
              fontWeight: 500,
            }}
          >
            {headerText}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <Navigation handleClick={handleClick} {...props} />
        </Box>

        <Box
          sx={{
            borderTop: `1px solid ${theme.palette.grey[200]}`,
            p: 2,
            height: 131,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <img width={44} src={SwiftSSLogo} alt="SwiftSS Logo" />
            <img width={52} src={SiteLogo} alt="Site Logo" />
          </Box>
          {footerText}
        </Box>
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
