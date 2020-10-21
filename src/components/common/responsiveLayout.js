import React from 'react'
import { useViewPort } from '../../services/screenDimension'
import ListGroup from './listGroup'
import Sidemenu from './side-menu'
import styled from 'styled-components'

const ListGroupWrapper = styled.div`
  flex: 0 1 200px;
  border-right: 1px solid rgb(179, 175, 175);
`

const ResponsiveLayout = (props) => {
  const {
    brands,
    tags,
    selectedBrand,
    selectedTag,
    onBrandSelect,
    onTagSelect,
  } = props
  const { screenWidth } = useViewPort()
  const breakpoint = 620

  return screenWidth < breakpoint ? (
    <Sidemenu
      brands={brands}
      tags={tags}
      selectedBrand={selectedBrand}
      onBrandSelect={onBrandSelect}
      onTagSelect={onTagSelect}
      selectedTag={selectedTag}
    />
  ) : (
    <ListGroupWrapper>
      <ListGroup
        brands={brands}
        tags={tags}
        selectedBrand={selectedBrand}
        onBrandSelect={onBrandSelect}
        onTagSelect={onTagSelect}
        selectedTag={selectedTag}
      />
    </ListGroupWrapper>
  )
}

export default ResponsiveLayout
