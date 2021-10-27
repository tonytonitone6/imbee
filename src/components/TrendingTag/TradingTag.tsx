import { FC, useEffect, useCallback } from 'react';

import { useStore, updateSelectTag } from '@contexts/GlobalContext';
import Tag from '@components/Tag/Tag';
import LoadingSkeleton from '@components/LoadSkelton/LoadSkelton';
import { TradingTagWrap, TagWrap } from './TradingTag.style';

const TradingTag: FC = () => {
  const { state, dispatch } = useStore();
  const { tags: { data: tagList = [], isLoading } = {}, selectedTag } = state;

  const updateSelectedTag = useCallback(
    (tagName: string) => () => {
      if (tagName !== selectedTag) {
        updateSelectTag(dispatch, tagName);
      }
    },
    [selectedTag, dispatch]
  );

  useEffect(() => {
    const hasTags = tagList.length > 0;

    if (hasTags) {
      const [firstTag] = tagList;
      const { name: tagName = '' } = firstTag;

      updateSelectTag(dispatch, tagName);
    }
  }, [tagList, dispatch]);

  return (
    <TradingTagWrap>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        tagList.map((tag) => {
          const { name } = tag;
          const isActive = name === selectedTag;

          return (
            <TagWrap key={tag.name}>
              <Tag
                onClickEvent={updateSelectedTag(name)}
                active={isActive}
                text={name}
              />
            </TagWrap>
          );
        })
      )}
    </TradingTagWrap>
  );
};

export default TradingTag;
