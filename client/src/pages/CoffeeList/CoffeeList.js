import { useEffect } from 'react';
import CoffeeItem from '../../components/CoffeeItem/CoffeeItem';
import { useStoreContext } from '../../util/GlobalState';
import { UPDATE_COFFEES } from '../../util/actions';
import { useQuery } from '@apollo/client';
import { QUERY_COFFEE } from '../../util/queries';
import { idbPromise } from '../../util/helpers';
import spinner from '../../assets/spinner.gif';

function CoffeeList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_COFFEE);
  console.log(data);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_COFFEES,

        coffees: data.coffees,
      });
      data.coffees.forEach((coffee) => {
        idbPromise('coffees', 'put', coffee);
      });
    } else if (!loading) {
      idbPromise('coffees', 'get').then((coffee) => {
        dispatch({
          type: UPDATE_COFFEES,
          coffee: coffee,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterCoffee() {
    if (!currentCategory) {
      return state.coffee;
    }

    return state.coffee.filter((coffee) => coffee.category._id === currentCategory);
  }

  return (
    <div className='box has-text-centered'>
    <h1 className='title'>Our Coffees</h1>
    {state.coffee.length ? (
     <div class="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd">

        {filterCoffee().map((coffee) => (
          <CoffeeItem
            key={coffee._id}
            _id={coffee._id}
            image={coffee.image}
            name={coffee.name}
            type={coffee.type}
            price={coffee.price}
            location={coffee.location}
            profile={coffee.profile}
            history={coffee.history}
            />
          ))}
        </div>
      ) : (
        <h3>Out of Stock!</h3>
      )}
      {loading ? <img src={spinner} alt='loading' /> : null}
    </div>
  );
}
export default CoffeeList;
