import { TbEdit } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { MdDeleteSweep } from 'react-icons/md';

const PinItem = ({ data, isProfile, user, onDelete }) => {
  return (
    <article className='relative overflow-hidden bg-white group rounded-2xl'>
      <div className='absolute top-[10px] left-[10px] z-50 opacity-0 scale-[0.8] transition-all group-hover:scale-100 group-hover:opacity-100 flex items-center gap-[10px]'>
        {isProfile && user === true && (
          <>
            <Link
              to={`/pin/edit/${data?._id}`}
              className={` w-[35px] h-[35px] flex items-center justify-center text-color-26 bg-white rounded-lg hover:text-color-red transition-all`}
            >
              <TbEdit size={20} />
            </Link>

            <button
              onClick={onDelete}
              className={`w-[35px] h-[35px] flex items-center justify-center text-color-26 bg-white rounded-lg hover:text-color-red transition-all`}
            >
              <MdDeleteSweep size={20} />
            </button>
          </>
        )}
      </div>

      <div className='absolute top-[5px] right-[5px] p-2 rounded-[32px] text-[11px] text-white font-black capitalize flex items-center gap-x-[5px] bg-black bg-opacity-50 max-w-[130px] '>
        <span className='w-[11px] h-[11px] rounded-full border-color-blue border-2'></span>
        <span className='capitalize line-clamp-1'>{data?.category}</span>
      </div>

      <img
        src={data?.thumbnail.url}
        alt='Pin image'
        className='object-cover'
      />

      <div className='absolute opacity-0 text-white scale-[0.8] transition-all group-hover:scale-100 group-hover:opacity-100 rounded-lg z-10 p-3 bg-black bg-opacity-80 right-[10px] left-[10px] bottom-[10px]'>
        <Link to={`/pin/${data?._id}`}>
          <h2 className='text-xl font-medium text-white capitalize transition-all line-clamp-1 hover:text-color-red'>
            {data?.title}
          </h2>
        </Link>
        <div className='flex items-center justify-between text-xs mt-[5px]'>
          <p className='max-w-[100px] line-clamp-1'>
            <Link
              to={`/profile/${data?.author._id}`}
              className='flex items-center gap-x-5'
            >
              {data?.author.username}
            </Link>
          </p>
          <p className=''>
            {new Date(data?.createdAt).toLocaleDateString('vi-VI')}
          </p>
        </div>
      </div>
    </article>
  );
};

export default PinItem;
