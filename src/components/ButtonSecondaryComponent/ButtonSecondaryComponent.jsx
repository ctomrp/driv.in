import s from "./style.module.css";

function ButtonSecondaryComponent({
  children,
  className,
  isDisabled = false,
  onClick,
  type,
}) {
  return (
    <button
      className={`${className} ${isDisabled ? s.btnDisabled : s.btn
        } rounded-full font-semibold p-3`}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default ButtonSecondaryComponent;