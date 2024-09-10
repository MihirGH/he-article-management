import { TagButton } from './TagButton';

export const TagsList = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(({ tag, count }) => (
        <TagButton key={tag}>
          {tag} ({count})
        </TagButton>
      ))}
    </div>
  );
};
