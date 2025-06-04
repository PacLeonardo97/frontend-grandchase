/* eslint-disable @next/next/no-img-element */
'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState, type MouseEvent } from 'react';

import { Autocomplete, Box, Tooltip } from '@mui/material';
import Popover from '@mui/material/Popover';

import styled from './styles.module.scss';
import TextField from '@/components/Form/Textfield';
import Image from '@/components/Image';
import { ETypeEquips, EEquipSet, ERarityItem } from '@/enum/equips.enum';
import { useCharByName } from '@/hooks/allChars/useCharByName';
import { useUpdateChar } from '@/hooks/allChars/useUpdateChar';
import { IEquips } from '@/interface/equip';

interface IOptions {
  label: string;
  value: string;
}

interface IProps {
  equip: IEquips | undefined;
  type: ETypeEquips;
}

export default function CardEquip({ equip, type }: IProps) {
  const [isClient, setIsClient] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [selectedEquip, setSelectedEquip] = useState({} as IOptions);
  const { data: charSelected } = useCharByName();

  const { mutate: updateChar } = useUpdateChar();
  const t = useTranslations('Equip');

  useEffect(() => {
    if (equip?.equip_set) {
      setSelectedEquip({
        value: equip.equip_set,
        label: t(equip.equip_set),
      } as IOptions);
    }
    return () => {
      setSelectedEquip({ label: '', value: '' });
    };
  }, [equip, t]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!charSelected?.name) return;
    setAnchorEl(event.currentTarget);
  };

  const handleChangeEquip = async (equip_set: EEquipSet) => {
    const img =
      `${charSelected?.name}_${equip?.type}_${equip_set}`.toLowerCase();
    const data = {
      equip_set: equip_set,
      charId: charSelected?.id,
      rarity: ERarityItem.common,
      type,
      img,
    };
    const equips = charSelected?.equips?.map((item) =>
      item.type === data.type
        ? {
            ...data,
          }
        : item,
    );

    updateChar({ name: charSelected?.name, equips });
    setSelectedEquip({
      value: data.equip_set,
      label: t(data.equip_set),
    } as IOptions);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => setIsClient(true), []);

  const typeTranslate = equip?.type ? t.raw(equip?.type as string) : '';
  return (
    <>
      <Tooltip title={isClient ? typeTranslate : ''}>
        <div
          onClick={handleClick}
          className={styled.square}
          data-char={isClient && !!charSelected?.name}
          data-label={isClient && typeTranslate}
        >
          {isClient && equip?.img ? (
            <Image
              width={64}
              height={60}
              alt={equip?.img}
              style={{ borderRadius: 4 }}
              src={equip?.img ? `/${equip?.img}.png` : ''}
            />
          ) : null}
        </div>
      </Tooltip>
      {Boolean(anchorEl) ? (
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
              handleChangeEquip(value?.value as EEquipSet);
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
                label={typeTranslate}
                slotProps={{
                  htmlInput: {
                    ...params.inputProps,
                  },
                }}
              />
            )}
          />
        </Popover>
      ) : null}
    </>
  );
}
