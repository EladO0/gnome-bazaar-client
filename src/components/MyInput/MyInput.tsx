import "./MyInput.scss";

interface MyInputProps {
  children: React.ReactNode;
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number | undefined;
  className?: string;
  disabled?: boolean;
  type: "text" | "number";
}

const MyInput: React.FC<MyInputProps> = ({
  callback,
  value,
  children,
  className,
  disabled,
  type,
}) => {
  return (
    <div className={`my-input ${value && "static"}`}>
      <input
        type={type}
        className={className}
        onChange={callback}
        value={value}
        disabled={disabled}
      />
      <div className="placeholder">{children}</div>
    </div>
  );
};

export default MyInput;
