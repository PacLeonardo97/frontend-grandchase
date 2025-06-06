'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState, type MouseEvent } from 'react';

import { Autocomplete, Box, Tooltip } from '@mui/material';
import Popover from '@mui/material/Popover';

import styled from './styles.module.scss';
import TextField from '@/components/Form/Textfield';
import Image from '@/components/Image';
import { ETypeEquips, EEquipSet, ERarityItem } from '@/enum/equips.enum';
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
  equip: IEquips | undefined;
  type: ETypeEquips;
}

export default function CardEquip({ equip, type }: IProps) {
  const t = useTranslations('Equip');

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [selectedEquip, setSelectedEquip] = useState({} as IOptions);
  const { data: charSelected } = useCharByName();

  const { mutate: updateChar } = useLocalChageChar();

  const options = useMemo(() => {
    if (charSelected) {
      return equipsOptions(type, charSelected).map((item) => ({
        label: isWeapon(type) ? t(`weapon.${item}`) : t(item),
        value: item,
      }));
    }
    return [{ value: '', label: '' }];
  }, [charSelected, t, type]);

  useEffect(() => {
    return () => {
      setSelectedEquip({ label: '', value: '' });
    };
  }, [equip, t]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!charSelected?.name) return;
    setAnchorEl(event.currentTarget);
  };

  const handleChangeEquip = async (equip_set: EEquipSet) => {
    setSelectedEquip({
      value: equip_set,
      label: isWeapon(type) ? t(`weapon.${equip_set}`) : t(equip_set),
    } as IOptions);
    const img = getNameImage(
      { type: equip!.type, equip_set: equip_set },
      charSelected!,
    );
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

    updateChar({ ...charSelected, equips });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const typeTranslate = equip?.type ? t.raw(equip?.type as string) : '';

  return (
    <>
      <Tooltip title={typeTranslate}>
        <div
          onClick={handleClick}
          className={styled.square}
          data-char={!!charSelected?.name}
          data-label={typeTranslate}
        >
          {equip?.img ? (
            <Image
              width={64}
              height={60}
              alt={equip?.img}
              data-fooo={equip?.img}
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
              handleChangeEquip(value?.value as EEquipSet);
            }}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;

              const img = getImageOptions(option.value, type);
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
