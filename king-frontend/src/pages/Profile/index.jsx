import { useEffect, useState } from 'react';
import { IoSettings } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiDeletePin, apiGetUser } from '~/api/config';
import PinItem from '~/components/PinItem';
import Skeleton from '~/components/Skeleton';

const Profile = () => {
  const { profileId } = useParams();
  const location = useLocation();

  const { user } = useSelector((state) => state.authReducer);

  const [dataPins, setDataPins] = useState([]);
  const [dataProfile, setDataProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async (uid) => {
    setIsLoading(true);
    const response = await apiGetUser(uid);
    if (response.success === true) {
      setDataProfile(response.result);
      setIsLoading(false);
      setDataPins(response.result.pins);
    }
  };

  const handleDeletePin = async (pinId) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this pin?'
    );
    if (isConfirmed) {
      const response = await apiDeletePin(pinId);
      if (response && response.success === true) {
        toast.success(response.deletedPin);
        fetchUser(profileId);
      } else {
        toast.error(response.deletedPin);
      }
    }
  };

  useEffect(() => {
    fetchUser(profileId);
  }, [profileId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <section className='flex flex-col gap-5'>
      {!isLoading ? (
        <div className='flex flex-col items-center w-full  bg-white px-[15px] py-10 rounded-md '>
          <img
            src={dataProfile?.avatar?.url || '/avatar.png'}
            alt='Profile avatar image'
            className='w-[150px] h-[150px] object-cover rounded-full p-[5px] border-2 border-color-black'
          />

          <h2 className='text-4xl font-semibold mt-[15px] text-center'>
            {dataProfile?.username}
          </h2>

          <p className='mt-[10px] text-center'>{dataProfile?.about}</p>

          <div className='flex items-center mt-5 text-base font-normal gap-x-[10px]'>
            <p>
              <span className='font-semibold'> {dataProfile?.pins.length}</span>{' '}
              post
            </p>
          </div>

          {user === dataProfile?._id && (
            <Link
              to={`/profile/edit/${dataProfile._id}`}
              className='mt-5 transition-all hover:text-color-red'
            >
              <IoSettings size={25} />
            </Link>
          )}
        </div>
      ) : (
        <div className='flex flex-col items-center w-full  bg-white px-[15px] py-10 rounded-md '>
          <Skeleton
            height='150px'
            width='150px'
            radius='100%'
          />

          <Skeleton
            height='30px'
            width='200px'
          />

          <Skeleton
            height='20px'
            className='mt-[10px]'
          />

          <div className='flex items-center mt-5 text-base font-normal gap-x-[10px]'>
            <Skeleton
              height='25px'
              width='100px'
            />
          </div>

          <Skeleton
            height='30px'
            width='30px'
            radius='100%'
            className='mt-[10px]'
          />
        </div>
      )}

      <div>
        <div className='bg-white h-[50px] flex items-center justify-center rounded-lg mx-auto w-[250px] -top-[60px] shadow-lg gap-x-5'>
          <span
            className={`cursor-pointer px-[10px] relative h-full flex items-center justify-center after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-color-red after:transition-all after:rounded-md after:scale-x-100 font-bold transition-all capitalize`}
          >
            Created
          </span>
        </div>

        <div className='w-full mt-5'>
          {dataPins && dataPins.length > 0 ? (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 490: 1, 640: 3, 1024: 4 }}
            >
              <Masonry gutter='20px'>
                {dataPins.map((item, index) => (
                  <PinItem
                    key={index}
                    data={item}
                    user={user === profileId ? true : false}
                    isProfile
                    onDelete={() => handleDeletePin(item?._id)}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          ) : (
            <div className='flex items-start justify-center'>
              <img
                src='/not-image.png'
                alt='Not pin'
                className='w-[350px] object-cover rounded-2xl'
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
