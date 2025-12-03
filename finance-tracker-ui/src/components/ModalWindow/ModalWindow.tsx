type ModalWindowProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function ModalWindow({
  isOpen,
  onClose,
  children,
}: Readonly<ModalWindowProps>) {
  return (
    <button
      className={`${
        isOpen ? "block" : "hidden"
      } fixed z-2 inset-0 bg-black/60 flex justify-center items-center`}
      onClick={onClose}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-full sm:w-1/2 lg:w-1/4"
      >
        {children}
      </div>
    </button>
  );
}

export default ModalWindow;
