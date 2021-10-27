import { FC, memo } from 'react';
import { TagWrap } from './Tag.style';

type TagType = {
  text: string;
  active: boolean;
  onClickEvent: () => void;
};

const Tag: FC<TagType> = ({ text, active, onClickEvent }): JSX.Element => {
  return (
    <TagWrap active={active} onClick={onClickEvent}>
      {text}
    </TagWrap>
  );
};

export default memo(Tag);
