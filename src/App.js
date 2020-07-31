import React from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'
import Products from './components/products'
import ProductDetails from './components/product-details'
import Category from './components/category'
import imageLoader from './services/images'
import Loader from './components/common/loader'
import { getBrands, getProductTag } from './services/productsService'
import dataPagination from './utils/data-pagination'
import '././style/products.css'
import './App.css'
// import Navbar from './components/navbar'
// import Product from './components/common/product'
// import ListGroup from './components/common/listGroup'

class App extends React.Component {
  state = {
    isLoading: true,
    products: [],
    brands: [],
    tags: [],
    images: [],
    selectedBrand: 'All Brands',
    selectedTag: 'All Tags',
    pageSize: 42,
    currentPage: 1,
  }

  /*connect to backend*/
  async componentDidMount() {
    const { data } = await axios.get(
      'https://zahrah-products.s3.us-east-2.amazonaws.com/products.json'
    )

    /*adding *all Beauty Brands' to brands[]*/
    const brands = ['All Brands', ...getBrands()]

    this.setState({
      ...this.state,
      products: data.products,
      brands,
      tags: getProductTag(),
      images: imageLoader(),
      isLoading: false,
    })
  }

  handleBrandSelect = (brand) => {
    const state = this.state
    this.setState({ ...state, selectedBrand: brand, currentPage: 1 })
  }

  handleTagSelect = (tag) => {
    const state = this.state
    this.setState({ ...state, selectedTag: tag, currentPage: 1 })
  }

  handlePageChange = (page) => {
    const state = this.state
    this.setState({ ...state, currentPage: page })
  }

  filterLists = (selectedProducts) => {
    const { selectedBrand, selectedTag } = this.state

    const filtered = selectedProducts
      .filter((product) => {
        if (selectedBrand !== 'All Brands') {
          return product.brand === selectedBrand
        } else {
          return product
        }
      })
      .filter((product) => {
        if (selectedTag !== 'All Tags') {
          return product.tag_list.includes(selectedTag)
        } else {
          return product
        }
      })

    return filtered
  }

  // filterLists = () => {
  //   const { selectedBrand, selectedTag, products } = this.state

  //   const filtered = products
  //     .filter((product) => {
  //       if (selectedBrand !== 'All Brands') {
  //         return product.brand === selectedBrand
  //       } else {
  //         return product
  //       }
  //     })
  //     .filter((product) => {
  //       if (selectedTag !== 'All Tags') {
  //         return product.tag_list.includes(selectedTag)
  //       } else {
  //         return product
  //       }
  //     })

  //   return filtered
  // }

  render() {
    const {
      products,
      brands,
      tags,
      images,
      selectedBrand,
      selectedTag,
      pageSize,
      currentPage,
      isLoading,
    } = this.state

    const filtered = this.filterLists(this.state.products)

    const productsPagination = dataPagination(filtered, pageSize, currentPage)

    return (
      <React.Fragment>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="main-wrapper">
            <header className="header"></header>
            <main className="main">
              <Switch>
                {/* <div className="App"> */}
                {/* <Route path="/category/:productCategory" component={Category} /> */}
                <Route
                  path="/category/:productCategory"
                  render={(props) => (
                    <Category
                      {...props}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      filterLists={this.filterLists}
                      brands={brands}
                      tags={tags}
                      selectedBrand={selectedBrand}
                      selectedTag={selectedTag}
                      onBrandSelect={this.handleBrandSelect}
                      onTagSelect={this.handleTagSelect}
                    />
                  )}
                />
                <Route
                  path="/product-details/:productId"
                  component={ProductDetails}
                />
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Products
                      productsData={productsPagination}
                      filtered={filtered}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      brands={brands}
                      tags={tags}
                      selectedBrand={selectedBrand}
                      selectedTag={selectedTag}
                      onBrandSelect={this.handleBrandSelect}
                      onTagSelect={this.handleTagSelect}
                      onPageChange={this.handlePageChange}
                      images={images}
                    />
                  )}
                />
                {/* <Route path="/product_details/:id" component={ProductDetails} /> */}
                {/* <Route exact path="/" component={Products} /> */}
                {/* <Products /> */}
                {/* <ProductDetails /> */}
                {/* </div> */}
              </Switch>
            </main>
            <footer className="footer"></footer>
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default App

// import React from 'react'
// import { Route, Switch } from 'react-router-dom'
// import Products from './components/products'
// import ProductDetails from './components/product-details'
// import Category from './components/category'
// import './App.css'

// function App() {
//   return (
//     <div className="main-wrapper">
//       <header className="header"></header>
//       <main className="main">
//         <Switch>
//           {/* <div className="App"> */}
//           <Route path="/category/:productCategory" component={Category} />

//           <Route
//             path="/product-details/:productId"
//             component={ProductDetails}
//           />
//           <Route
//             exact
//             path="/"
//             render={() => (
//               <Products productsData={productsPagination} filtered={filtered} />
//             )}
//           />
//           {/* <Route path="/product_details/:id" component={ProductDetails} /> */}
//           {/* <Route exact path="/" component={Products} /> */}
//           {/* <Products /> */}
//           {/* <ProductDetails /> */}
//           {/* </div> */}
//         </Switch>
//       </main>
//       <footer className="footer"></footer>
//     </div>
//   )
// }

// export default App
