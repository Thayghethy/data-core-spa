import React from 'react';

interface NeonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const NeonInput: React.FC<NeonInputProps> = ({ label, ...props }) => (
  <div className="flex flex-col mb-4">
    <label className="text-neon-purple text-neon-glow mb-1 font-medium tracking-wide">
      {label}:
    </label>
    <input
      {...props}
      className={`
        bg-transparent border border-neon-purple text-white p-2 rounded-md
        focus:outline-none focus:ring-2 focus:ring-neon-purple
        transition duration-200 shadow-sm
      `}
      style={{ boxShadow: '0 0 5px rgba(187,134,252,0.3)', border: '1px solid rgba(187,134,252,0.5)' }}
    />
  </div>
);

export default NeonInput;