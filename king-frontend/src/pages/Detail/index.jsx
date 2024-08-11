import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link, useLocation, useParams } from 'react-router-dom';
import { apiGetDetailPin, apiQueryPins } from '~/api/config';
import PinItem from '~/components/PinItem';
import Skeleton from '~/components/Skeleton';

const Detail = () => {
  const { pinId } = useParams();
  const location = useLocation();

  const [dataPins, setDataPins] = useState(null);
  const [categoryPin, setCategoryPin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDetailPin = async (pinId) => {
    const response = await apiGetDetailPin(pinId);
    setIsLoading(true);
    if (response) {
      setIsLoading(false);
      setDataPins(response?.pin);
    }
  };

  const fetchQueryPin = async (query) => {
    const response = await apiQueryPins(query);
    if (response && response.success === true) {
      setCategoryPin(response.pins.filter((item) => item._id !== pinId));
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  useEffect(() => {
    fetchQueryPin(dataPins?.category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPins?.category]);

  useEffect(() => {
    fetchDetailPin(pinId);
  }, [pinId]);

  return (
    <section>
      <div className='flex items-center justify-center mb-[60px]'>
        {!isLoading ? (
          <div className='lg:max-w-[80%] bg-white w-full  min-h-[450px] flex flex-col lg:flex-row gap-5 p-5 rounded-lg overflow-hidden shadow-lg'>
            <div className='flex items-center justify-center overflow-hidden rounded-lg md:w-2/4 shrink-0'>
              <img
                src={dataPins?.thumbnail?.url}
                alt='Detail pin image'
                className='object-cover w-full rounded-lg'
              />
            </div>

            <div className='flex flex-col flex-1 object-cover w-full h-full gap-y-5'>
              <h2 className=' text-[28px] font-bold '>{dataPins?.title}</h2>

              <div className='flex items-center justify-between'>
                <p className='text-sm '>
                  {new Date(dataPins?.createdAt).toLocaleDateString('vi-VI')}
                </p>
                <p className='capitalize bg-color-black py-[5px] px-[10px] rounded-lg text-white'>
                  {dataPins?.category}
                </p>
              </div>

              <div className='flex'>
                <Link
                  to={`/profile/${dataPins?.author._id}`}
                  className='flex items-center gap-x-5'
                >
                  <img
                    src={dataPins?.author?.avatar?.url || '/avatar.png'}
                    alt='Detail avatar User'
                    className='object-cover w-[50px] h-[50px] rounded-full'
                  />
                  <p className='text-lg font-bold'>
                    {dataPins?.author.username}
                  </p>
                </Link>
              </div>

              <p className='max-h-[340px] h-full overflow-y-auto'>
                {dataPins?.description}
              </p>
            </div>
          </div>
        ) : (
          <div className='lg:max-w-[80%] bg-white w-full  min-h-[450px] flex flex-col lg:flex-row gap-5 p-5 rounded-lg overflow-hidden shadow-lg'>
            <div className='flex items-center justify-center overflow-hidden rounded-lg md:w-2/4 shrink-0'>
              <Skeleton height='600px' />
            </div>

            <div className='flex flex-col flex-1 object-cover w-full h-full gap-y-5'>
              <div className=' text-[28px] font-bold '>
                {' '}
                <Skeleton height='60px' />
              </div>

              <div className='flex items-center justify-between'>
                <div className='text-sm '>
                  <Skeleton
                    height='20px'
                    width='150px'
                  />
                </div>
                <Skeleton
                  height='40px'
                  width='100px'
                />
              </div>

              <div className='flex'>
                <Skeleton
                  height='90px'
                  width='250px'
                />
              </div>

              <div className='max-h-[340px] h-full overflow-y-auto'>
                <Skeleton height='20px' />
                <Skeleton
                  height='20px'
                  className='mt-[5px]'
                />
                <Skeleton
                  height='20px'
                  className='mt-[5px]'
                />
                <Skeleton
                  height='20px'
                  className='mt-[5px]'
                />
                <Skeleton
                  height='20px'
                  className='mt-[5px]'
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <ResponsiveMasonry columnsCountBreakPoints={{ 490: 1, 640: 3, 1024: 4 }}>
        <Masonry gutter='20px'>
          {categoryPin &&
            categoryPin.length > 0 &&
            categoryPin.map((item, index) => (
              <PinItem
                key={index}
                data={item}
                bookmark={true}
              />
            ))}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
};

export default Detail;
