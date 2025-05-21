'use client';

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState, type MouseEvent } from 'react';

import { Autocomplete, Box } from '@mui/material';
import Popover from '@mui/material/Popover';

import styled from './styles.module.scss';
import api from '@/api';
import TextField from '@/components/Form/Textfield';
import { ETypeEquips, EEquipSet } from '@/enum/equips.enum';
import { IEquips } from '@/interface/equip';
import { changeEquip } from '@/store/char';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

interface IProps {
  equip: IEquips | undefined;
  type: ETypeEquips;
}

export default function CardEquip({ equip, type }: IProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const charSelected = useAppSelector((state) => state.char);
  const dispatch = useAppDispatch();
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangeEquip = async (equip_set: ETypeEquips) => {
    const data = {
      equip_set: equip_set,
      charId: charSelected.data?.id,
      rarity: 'common',
      type,
    };
    if (equip?.type === type) {
      const req = await api.put(`equips/${equip.id}`, data);
      dispatch(changeEquip(req.data));
      console.log('data 1 ->', req.data);
      return;
    } else {
      const req = await api.post('equips', data);
      dispatch(changeEquip(req.data));
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {equip?.type === type ? (
        <div onClick={handleClick} className={styled.square}>
          <img
            style={{ borderRadius: 4 }}
            src="https://i.imgur.com/FErjbNu.png"
          />
        </div>
      ) : (
        <div onClick={handleClick} className={styled.square} />
      )}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Autocomplete
          sx={{ width: 300 }}
          options={Object.keys(EEquipSet)}
          defaultValue={equip?.equip_set}
          autoHighlight
          onChange={(_, value) => handleChangeEquip(value as ETypeEquips)}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                <img
                  loading="lazy"
                  width="20"
                  src="https://i.imgur.com/FErjbNu.png"
                  alt=""
                />
                {option}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Escolha o equipamento"
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                },
              }}
            />
          )}
        />
      </Popover>
    </>
  );
}
