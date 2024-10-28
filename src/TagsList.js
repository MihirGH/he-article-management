import { TagButton } from './TagButton';

export const TagsList = ({ tags, selectedTags, onTagClick }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(({ tag, count }) => (
        <TagButton
          key={tag}
          // TODO: Handle this
          isSelected={false}
          // TODO: Handle this
          onClick={onTagClick}
        >
          {tag} ({count})
        </TagButton>
      ))}
    </div>
  );
};
