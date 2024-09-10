import cn from 'classnames';

export const TagButton = ({ children, disabled, onClick, isSelected }) => (
  <button
    type="button"
    disabled={disabled}
    className={cn('border px-2 py-0.5 rounded hover:border-blue-400', {
      'border-blue-400': isSelected,
      'border-gray-400 hover:border-gray-400 opacity-60 cursor-not-allowed':
        disabled,
    })}
    onClick={onClick}
  >
    {children}
  </button>
);
