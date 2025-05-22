'use client';

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useTranslations } from 'next-intl';
import { useEffect, useState, type MouseEvent } from 'react';

import { Autocomplete, Box } from '@mui/material';
import Popover from '@mui/material/Popover';

import styled from './styles.module.scss';
import api from '@/api';
import TextField from '@/components/Form/Textfield';
import { ETypeEquips, EEquipSet } from '@/enum/equips.enum';
import { getImageEquip } from '@/handler/blobStorage';
import { IEquips } from '@/interface/equip';
import { changeEquip } from '@/store/char';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

interface IOptions {
  label: string;
  value: string;
}

interface IProps {
  equip: IEquips | undefined;
  type: ETypeEquips;
}

export default function CardEquip({ equip, type }: IProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [selectedEquip, setSelectedEquip] = useState({} as IOptions);
  const charSelected = useAppSelector((state) => state.char);
  const dispatch = useAppDispatch();
  const t = useTranslations('Equip');
  useEffect(() => {
    if (equip?.equip_set) {
      setSelectedEquip({
        value: equip.equip_set,
        label: t(equip.equip_set),
      } as IOptions);
    }
  }, [equip, t]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!charSelected.data?.id) return;
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
      return;
    }
    const req = await api.post('equips', data);
    dispatch(changeEquip(req.data));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={styled.square}
        data-char={!!charSelected.data?.id}
      >
        {equip?.type === type ? (
          <img
            style={{ borderRadius: 4 }}
            src={getImageEquip(`${equip.img}.png`)}
          />
        ) : null}
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        aria-hidden={!Boolean(anchorEl)}
      >
        <Autocomplete
          sx={{ width: 300 }}
          options={Object.keys(EEquipSet).map((item) => ({
            label: item ? t(item) : item,
            value: item,
          }))}
          getOptionLabel={(option) => {
            return option.label || '';
          }}
          disableClearable
          value={selectedEquip}
          autoHighlight
          onChange={(_, value) => {
            handleChangeEquip(value?.value as ETypeEquips);
          }}
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
                {option.label}
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
