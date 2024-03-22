import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function Avatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{bgcolor:'#ab3003'}}>H</Avatar>
    </Stack>
  );
}