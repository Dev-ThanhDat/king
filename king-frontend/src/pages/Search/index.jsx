import debounce from 'debounce';
import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useLocation } from 'react-router-dom';
import { apiGetListPin } from '~/api/config';
import PinItem from '~/components/PinItem';
import Skeleton from '~/components/Skeleton';

const Search = () => {
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [dataSearchPins, setDataSearchPins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleSearchQuery = debounce((e) => {
    setQuery(e.target.value);
    setDataSearchPins([]);
    setPage(1);
  }, 500);

  const fetchQueryPin = async (page, query) => {
    setIsLoading(true);
    const response = await apiGetListPin(page, query);
    if (response && response.success) {
      setDataSearchPins((prevDataPins) => {
        const newPins = response.pins.filter(
          (pin) => !prevDataPins.find((item) => item._id === pin._id)
        );
        return [...prevDataPins, ...newPins];
      });
      setHasMore(response.pins.length > 0);
    }
    setIsLoading(false);
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
    fetchQueryPin(page, query);
  }, [page, query]);

  return (
    <section>
      <div className='flex items-center justify-center mb-10'>
        <input
          onChange={handleSearchQuery}
          type='text'
          placeholder='Please! Enter your keyword.'
          className='bg-white rounded-lg outline-none max-w-[450px] px-[15px] py-[10px] w-full'
        />
      </div>

      <div>
        {dataSearchPins && dataSearchPins.length > 0 ? (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 490: 1, 640: 3, 1024: 4 }}
          >
            <Masonry gutter='20px'>
              {!isLoading
                ? dataSearchPins.map((item) => (
                    <PinItem
                      key={item._id}
                      data={item}
                      bookmark={true}
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
          <p className='flex items-center justify-center'>
            <img
              src='/search-notfound.jpg'
              alt='Search not found image'
              className='w-[150px] object-cover rounded-2xl'
            />
          </p>
        )}
      </div>
    </section>
  );
};

export default Search;
