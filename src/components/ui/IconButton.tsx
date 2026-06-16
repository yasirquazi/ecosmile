const PATHS: Record<string, string> = {
  plus:  'M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z',
  minus: 'M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z',
};

interface Props {
  icon: keyof typeof PATHS;
}

/* Circular dark button with a Phosphor icon inside.
   Not interactive itself — wrap in a <button> from the parent. */
export default function IconButton({ icon }: Props) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: '1.75rem',   /* 28px = 20px icon + 4px padding each side */
        height: '1.75rem',
        padding: '0.25rem',
        backgroundColor: 'var(--color-ink)',
        borderRadius: '9999px',
        color: '#fff',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        fill="currentColor"
        width="20"
        height="20"
      >
        <path d={PATHS[icon]} />
      </svg>
    </span>
  );
}
