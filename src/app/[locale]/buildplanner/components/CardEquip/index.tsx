'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState, type MouseEvent } from 'react';

import { Autocomplete, Box, Tooltip } from '@mui/material';
import Popover from '@mui/material/Popover';

import styled from './styles.module.scss';
import TextField from '@/components/Form/Textfield';
import Image from '@/components/Image';
import { EEquipSet, ERarityItem, ETypeEquips } from '@/enum/equips.enum';
import { getImageOptions, getNameImage, isWeapon } from '@/helper/equips';
import { useLocalChageChar } from '@/hooks/allChars/localChangeChar';
import { useCharByName } from '@/hooks/allChars/useCharByName';
import { IEquips } from '@/interface/equip';
import { equipsOptions } from '@/mock/equip.mock';

interface IOptions {
  label: string;
  value: string;
}

interface IProps {
  type: ETypeEquips;
}

export default function CardEquip({ type }: IProps) {
  const t = useTranslations('Equip');
  const { data: charSelected } = useCharByName();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const equip = charSelected?.equips?.find(
    (item) => item.type === type,
  ) as IEquips;

  // value = equip_set, label = tradução
  const [selectedEquip, setSelectedEquip] = useState({} as IOptions);

  const { mutate: updateChar } = useLocalChageChar();

  const options = useMemo(() => {
    if (charSelected) {
      return equipsOptions(equip?.type, charSelected).map((item) => ({
        label: isWeapon(equip?.type) ? t(`weapon.${item}`) : t(item),
        value: item,
      }));
    }
    return [{ value: '', label: '' }];
  }, [charSelected, equip?.type, t]);

  useEffect(() => {
    if (equip?.type && equip?.equip_set) {
      setSelectedEquip({
        value: equip?.equip_set || '',
        label: isWeapon(equip?.type)
          ? t(`weapon.${equip.equip_set}`)
          : t(equip?.equip_set || ''),
      });
    }
    return () => {
      setSelectedEquip({ value: '', label: '' });
    };
  }, [equip, t]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!charSelected?.name) return;
    setAnchorEl(event.currentTarget);
  };
  const handleChangeEquip = async (equip_set: EEquipSet) => {
    setSelectedEquip({
      value: equip_set,
      label: isWeapon(equip.type) ? t(`weapon.${equip_set}`) : t(equip_set),
    } as IOptions);

    const img = getNameImage(
      { type: equip!.type, equip_set: equip_set },
      charSelected!,
    );
    const data = {
      equip_set: equip_set,
      charId: charSelected?.id,
      rarity: ERarityItem.common,
      type: equip.type,
      img,
    };

    const equips = charSelected?.equips?.map((item) =>
      item.type === data.type
        ? {
            ...data,
          }
        : item,
    );

    updateChar({ ...charSelected, equips });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const typeTranslate = () => {
    if (equip?.equip_set) {
      if (isWeapon(equip.type)) return t(`weapon.${equip?.equip_set}`);
      return t.raw(equip?.type as string);
    }
    return equip?.type ? t.raw(equip?.type as string) : '';
  };

  return (
    <>
      <Tooltip title={typeTranslate()}>
        <div
          onClick={handleClick}
          className={styled.square}
          data-char={!!charSelected?.name}
          data-label={typeTranslate()}
        >
          {equip?.img ? (
            <Image
              width={64}
              height={60}
              alt={equip?.img}
              style={{ borderRadius: 4 }}
              src={equip?.img ? `/equips/${equip?.img}.png` : ''}
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
            options={options}
            getOptionLabel={(option) => {
              return option.label;
            }}
            disableClearable
            value={selectedEquip}
            autoHighlight
            onChange={(_, value) => {
              handleChangeEquip(value.value as EEquipSet);
            }}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              const img = getImageOptions(option.value, equip.type);

              return (
                <Box
                  key={key}
                  component="li"
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...optionProps}
                >
                  {img ? (
                    <Image
                      width={24}
                      height={24}
                      alt={img}
                      src={img ? `/equips/${img}.png` : ''}
                    />
                  ) : null}

                  {option.label}
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={equip?.type ? t.raw(equip?.type as string) : ''}
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
