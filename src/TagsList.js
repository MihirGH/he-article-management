import { TagButton } from './TagButton';

export const TagsList = ({ tags, selectedTags, onTagClick }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(({ tag, count }) => (
        <TagButton
          key={tag}
          isSelected={selectedTags.includes(tag)}
          onClick={() => onTagClick(tag)}
        >
          {tag} ({count})
        </TagButton>
      ))}
    </div>
  );
};
