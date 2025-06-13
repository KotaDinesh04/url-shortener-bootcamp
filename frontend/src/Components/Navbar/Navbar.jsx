import { ActionIcon, Avatar, Button, Group, Menu, Text } from '@mantine/core'
import React from 'react'
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconLogin,
} from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn, getUserAvatar, removeUser } from '../../redux/slices/User';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import classes from './HeaderSearch.module.css';
import { useState } from 'react';


const links = [
  { link: '/url/shortener', label: 'Shorten Url ' },
  { link: '/url/list', label: 'My URLs' },

];


const Navbar = () => {

    const userAvatar = useSelector(getUserAvatar);
    const isLoggedIn = useSelector(getIsLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // <--- This line is critical and must be inside the component body
  const [active, setActive] = useState(null);



const items = links.map((link) => (
  <NavLink
    key={link.label}
    to={link.link} // Use 'to' instead of 'href'
    // NavLink automatically provides an 'isActive' boolean.
    // This removes the need for your manual 'active' state!
    className={({ isActive }) => 
      `${classes.link} ${isActive ? classes.activeLink : ''}`
    }
  >
    {link.label}
  </NavLink>
));

   

  return (
    <nav className='navbar' style={{ height: 60, width: '100%', background: 'linear-gradient(45deg, rgba(0, 160, 206, 0.8), rgba(220, 82, 241, 0.5))'}}>
        <div className='logo' style={{ display: 'flex', alignItems: 'center', height: '100%'}}>
            <Text component={Link} to={'/'} mx={30} c='white' style={{ fontWeight: 'bolder'}}>URL <Text component='span'>Shortener</Text></Text>
        </div>
        <div style={{ width: '80%', display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
            {isLoggedIn && <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}

          </Group>}

            {isLoggedIn ? <Menu shadow="md" width={200} position='bottom-end'>
                <Menu.Target>
                    <Avatar mx={'lg'} src={userAvatar} alt='Profile' size={'md'} style={{ cursor: 'pointer'}}/>     
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>Actions</Menu.Label>
                    <Menu.Item onClick={()=> navigate('/profile')}>
                        Profile
                    </Menu.Item>
                    <Menu.Item onClick={() => dispatch(removeUser())}>
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu> : 
            <Button variant='transparent' color='black' mx={'lg'} component={Link} to={'/login'}>
                <IconLogin color='white'/>
            </Button>
            }
        </div>
    </nav>
  )
}

export default Navbar