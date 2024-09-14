import ProductFilter from '@/components/shopping-view/ProductFilter'
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOption } from '@/config'
import { fertchAllFilterProduct } from '@/store/shop/product-slice'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { json } from 'react-router-dom'

const Listing = () => {

  const dispatch = useDispatch()
  const {productList} = useSelector(state => state.shopProduct)
  const [filter, setFilter] = useState({})
  const [sort, setSort] = useState(null)

  function handleSort(value){
    console.log(value);
    setSort(value)
  }

  function handleFilter(getSectionId, getCurrentOption){

    let copyFilter = {...filter};
    const indexOfCurrentSection = Object.keys(copyFilter).indexOf(getSectionId)
    if(indexOfCurrentSection === -1){
      copyFilter ={
        ...copyFilter,
        [getSectionId]: [getCurrentOption]
      }
    }else{
      const indexOfCurrentOption = copyFilter[getSectionId].indexOf(getCurrentOption)

      if(indexOfCurrentOption === -1) copyFilter[getSectionId].push(getCurrentOption) 
        else{
          copyFilter[getSectionId].splice(indexOfCurrentOption, 1)
      }
    }
    setFilter(copyFilter)
    sessionStorage.setItem('filters', JSON.stringify(copyFilter))
  }
  
  useEffect(()=>{
    setSort("price-lowtohigh")
    setFilter(JSON.parse(sessionStorage.getItem('filters')) || {})
  })

  useEffect(()=>{
    dispatch(fertchAllFilterProduct())
  },[dispatch])

  return (
    <div className='grid grid-cols-1 md:grid-cols-[270px_1fr] gap-5 p-4 md:p-6'>
      <ProductFilter filter={filter} handlefilter={handleFilter} />
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className='text-lg font-extrabold'>All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{productList.length} Products</span>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowUpDown className='h-4 w-4'/>
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    sortOption.map(sortItem => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>)
                  }
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2'>
                  {
                    productList && productList.length > 0 ?
                    productList.map(productItem=> <ShoppingProductTile product={productItem}/>) : null
                  }
        </div>
      </div>
    </div>
  )
}

export default Listing