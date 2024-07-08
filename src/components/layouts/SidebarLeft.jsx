import React,{useEffect,useContext,useState} from 'react'
import icons from '../../utils/icons.json'
import { CountriesContext } from '../../context/countries';
import types from '../../utils/types.json';

const SidebarLeft = React.memo(({handleFilters})=> {
  const [ opened , setOpened ] = useState(true);
  const { countries } = useContext(CountriesContext);
  
  return (
    <>
        <div className={`left-0 ${ opened ? 'w-80' : 'w-0'} relative top-0 min-h-screen p-4 text-muted-foreground rounded-md transition-all duration-300 w-20 shadow-lg`}>
            <button onClick={()=>setOpened(!opened)} className="absolute right-0 top-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10 mb-4">
                { opened ? (
                  <span dangerouslySetInnerHTML={{ __html: icons.leftArrow }}></span>
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: icons.rightArrow }}></span>
                )}
            </button>
            <nav className={`${ opened ? '' : 'hidden'} flex flex-col justify-around mt-10 h-80`}>
                
                <form className='w-full he-full flex flex-col justify-around space-y-10'>
                  {/* Countries */}
                  <x-link>
                    <label htmlFor="countries">
                      <span className="sr-only">Select a country</span>
                      <span className="block text-sm font-medium text-gray-900">Select a country</span>
                      <span className="block text-sm text-gray-500">
                        Showing {countries.length} countries
                      </span>
                    </label>
                    <select onChange={handleFilters} id='countries' name='country' className="w-full list-none overflow-hidden text-wrap space-y-1">
                      <option></option>
                      {countries.map((country, index) => (
                        <option key={index} value={`${country.country}--${country.country_code}`}>
                              {country.country}
                        </option>
                      ))}
                    </select>
                  </x-link>
                  {/* Types */}
                  <x-link>
                    <label htmlFor="types">
                      <span className="sr-only">Select a type</span>
                      <span className="block text-sm font-medium text-gray-900">Select a type</span>
                    </label>
                    <select onChange={handleFilters} id='types' name='type' className="w-full list-none overflow-hidden text-wrap space-y-1">
                      <option></option>
                      {
                      types?.map(item => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                        ))
                      }
                    </select>
                  </x-link>
                  {/* Destionation name */}
                  <x-link>
                    <label htmlFor="destination">
                      <span className="sr-only">Destionation</span>
                      <span className="block text-sm font-medium text-gray-900">Destination</span>
                    </label>
                    <input type='text' id='destination' onChange={handleFilters} name='destination_name' className="block w-full px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300" placeholder='Example' />
                  </x-link>
                  {/* Description */}
                  <x-link>
                    <label htmlFor="description">
                      <span className="sr-only">Description</span>
                      <span className="block text-sm font-medium text-gray-900">Description</span>
                    </label>
                    <input type='text' id='description' onChange={handleFilters} name='description' className="block w-full px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300" placeholder='This is a destination....' />
                  </x-link>
                </form> 
            </nav>
        </div>
    </>
    
  )
})

export default SidebarLeft;
