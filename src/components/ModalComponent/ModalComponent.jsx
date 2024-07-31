function ModalComponent({ children, className, showModal, onClose }) {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
          onClick={handleClose}
        >
          <div
            className="bg-[#EEF4F8] rounded-3xl p-16 flex flex-col justify-center items-center gap-5"
          >
            <div className={`${className}`}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalComponent;