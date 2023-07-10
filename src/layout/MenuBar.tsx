import type { Page } from '../pages'

import React, { useState } from 'react'
import { NavLink as RouterLink } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors'

import MenuIcon from '@mui/icons-material/Menu'
import UserIcon from '@mui/icons-material/Person'

import { lookupLanguageString } from '../i18n'
import { DansLogoWhite } from '../images/DansLogo'
import useScrollTrigger from '@mui/material/useScrollTrigger'

const settings = ['Account', 'Logout'];

interface MenuBarProps {
  pages: Page[]
}
const MenuBar = ({ pages }: MenuBarProps) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 })
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (!Array.isArray(pages)) return null

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar variant={trigger ? 'dense' : 'regular'}>

          {/* mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {
                pages
                  .filter(page => page.inMenu)
                  .map(page =>
                    <MenuItem
                      key={page.id}
                      onClick={handleCloseNavMenu}
                    >
                      <Link 
                        underline="none" 
                        color="inherit" 
                        component={RouterLink} 
                        to={page.id}
                      >
                        {lookupLanguageString(page.title || page.id)}
                      </Link>
                    </MenuItem>
                  )
              }
            </Menu>
            <Link
              component={RouterLink}
              to="/"
              sx={{ ml: 2, width: 100, display: { xs: 'flex', md: 'none' } }}
            >
              <DansLogoWhite/>
            </Link>
          </Box>

          {/* desktop menu */}
          <Link
            component={RouterLink}
            to="/"
            sx={{ mr: 2, width: 100, display: { xs: 'none', md: 'flex' } }}
          >
            <DansLogoWhite/>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {
              pages
                .filter(page => page.inMenu) 
                .map(page =>
                  <Button
                    key={page.id}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 1, color: 'white', display: 'block' }}
                    component={RouterLink} 
                    to={page.id}
                  >
                    {lookupLanguageString(page.title || page.id)}
                  </Button>
              )
            }
          </Box>

          {/* user menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar
                  sx={{bgcolor: grey[300]}}
                >
                  <UserIcon sx={{color: 'black'}} />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default MenuBar;