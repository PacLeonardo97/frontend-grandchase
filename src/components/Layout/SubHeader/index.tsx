import Typography from '@mui/material/Typography';

import styled from './styled.module.scss';

export default function SubHeader() {
  return (
    <div className={styled.container}>
      <div className={styled.content}>
        <Typography variant="h1">Bem vindo ao MinMaxed!</Typography>
      </div>
    </div>
  );
}
