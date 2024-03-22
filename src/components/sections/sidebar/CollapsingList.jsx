import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, ListItemIcon, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

const CollapsingList = ({selectedOption, setSelectedOption }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const options = [
    {
      title: "Menu",
      subItems: [
        {
          title: "Tasks",
          id: 0,
          icon: <FormatListBulletedIcon style={{ color: selectedOption.id === 0 ? 'white' : '#333333', marginLeft: '10px', fontSize: '25px' }} />
        },
        {
          title: "Activities",
          id: 1,
          icon: <DirectionsBikeIcon style={{ color: selectedOption.id === 1 ? 'white' : '#333333', marginLeft: '10px', fontSize: '25px' }} />
        }
      ]
    }
  ];

  return (
    <List>
      {options.map((option) => (
        <div key={option.title}>
          <ListItem onClick={handleClick}>
            <ListItemText primary={option.title} style={{ color: '#333333' }} />
            <ListItemIcon>
              {open ? <ExpandLess style={{ color: '#333333', cursor: 'pointer' }} /> : <ExpandMore style={{ color: '#333333', cursor: 'pointer' }} />}
            </ListItemIcon>
          </ListItem>
          <Collapse in={open} timeout={700} unmountOnExit>
            <List component="div" disablePadding>
              {option.subItems.map((opt) => (
                <ListItem key={opt.id} >
                  <Box onClick={() => setSelectedOption({ id: opt.id, title: opt.title })} display="flex" alignItems="center" sx={{ backgroundColor: selectedOption.id === opt.id ?'#ab3003' : 'transparent', width: '175px', height: '60px', borderRadius: '16px',cursor:'pointer' }}>
                    {opt.icon}
                    <ListItemText primary={opt.title} style={{ color: selectedOption.id === opt.id ? 'white' : '#333333', marginLeft: '10px' }} />
                  </Box>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default CollapsingList;
