const ButtonField = ({ type = 'submit', isSubmitting, name }) => {
  return (
    <button
      type={type}
      disabled={isSubmitting ? true : false}
      className='bg-color-red px-[10px] py-[5px] rounded-md text-white transition-all font-semibold hover:bg-opacity-90 mt-[2px] flex items-center justify-center'
    >
      {isSubmitting ? (
        <div className='w-[20px] h-[20px] border-2 border-white rounded-full animate-spin border-t-transparent'></div>
      ) : (
        name
      )}
    </button>
  );
};

export default ButtonField;
