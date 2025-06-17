import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import styled from './styled.module.scss';

export default function SubHeader() {
  return (
    <Box
      sx={(theme) => ({
        borderTop: `1px solid ${theme.palette.grey[800]}`,
        backgroundColor: theme.palette.grey[900],
      })}
      className={styled.container}
    >
      <div className={styled.content}>
        <Typography variant="h1">Bem vindo ao MinMaxed!</Typography>
      </div>
    </Box>
  );
}
