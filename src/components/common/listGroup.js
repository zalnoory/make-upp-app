import React, { Fragment } from 'react'
import List from './list'
import '../../style/listGroup.css'

const ListGroup = (props) => {
  const {
    brands,
    tags,
    onBrandSelect,
    onTagSelect,
    selectedTag,
    selectedBrand,
  } = props

  return (
    <div className="list_grp_container">
      <input type="checkbox" id="brands" />
      <label htmlFor="brands">Brands</label>

      <div className="content">
        <List
          items={brands}
          onItemSelect={onBrandSelect}
          selectedItem={selectedBrand}
        />
      </div>
      <input type="checkbox" id="byTag" />
      <label htmlFor="byTag">By Tag</label>
      <div className="content">
        <List
          items={tags}
          onItemSelect={onTagSelect}
          selectedItem={selectedTag}
        />
      </div>
    </div>
  )
}

export default ListGroup
