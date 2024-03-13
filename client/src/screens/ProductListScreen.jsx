import React, { useEffect } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProducts,
  deleteProductAction,
  createProduct,
} from "../store/actions/productActions.js";
import { PRODUCT_CREATE_RESET } from "../store/types.js";
import Paginate from "../components/Paginate";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  //Get products from state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  //Get newly created product
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: createLoading,
    error: createError,
    product: createdProduct,
    success: successCreate,
  } = productCreate;

  //Get login user Details
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //Get login user Details
  const deleteProduct = useSelector((state) => state.deleteProduct);
  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError,
  } = deleteProduct;
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    //Check if the logged in user is an Admin
    if (!userInfo.isAdmin) {
      history.push("/");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo.isAdmin,
    deleteSuccess,
    successCreate,
    pageNumber,
  ]);

  //Handle admin deleting a product
  const deleteHandler = (id) => {
    if (window.confirm("Are you Sure You want to Delete this product ?")) {
      dispatch(deleteProductAction(id));
    }
  };

  //Handle admin adding a product
  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center  justify-content-lg-between">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col>
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {deleteLoading && <Loader />}
      {createLoading && <Loader />}
      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {createError && <Message variant="danger">{createError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>

                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
