import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useLocation } from 'react-router-dom';
import { apiGetListPin } from '~/api/config';
import PinItem from '~/components/PinItem';
import Skeleton from '~/components/Skeleton';

const Home = () => {
  const location = useLocation();

  const [dataListPins, setDataListPins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchListPin = async (page) => {
    setIsLoading(true);
    const response = await apiGetListPin(page);
    if (response && response.success === true) {
      setDataListPins((prevDataPins) => {
        const newPins = response.pins.filter(
          (pin) => !prevDataPins.find((item) => item._id === pin._id)
        );
        return [...prevDataPins, ...newPins];
      });
      setHasMore(response.pins.length > 0);
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      !isLoading &&
      hasMore &&
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, hasMore]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  useEffect(() => {
    fetchListPin(page);
  }, [page]);

  return (
    <section className=''>
      {dataListPins && dataListPins.length > 0 ? (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 490: 1, 640: 3, 1024: 4 }}
        >
          <Masonry gutter='20px'>
            {!isLoading
              ? dataListPins.map((item) => (
                  <PinItem
                    key={item._id}
                    data={item}
                  />
                ))
              : Array(8)
                  .fill(0)
                  .map((item, index) => (
                    <Skeleton
                      key={index}
                      height='350px'
                      radius='8px'
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
    </section>
  );
};

export default Home;
