
import { Form, Button, Container, Table } from "react-bootstrap";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import styled from "styled-components";
import { useEffect } from "react";
import JSConfetti from "js-confetti";
import IconComp from "./components/IconButton";

const StyledTr = styled.tr`
  text-decoration: ${(props) => (props.$isBought ? "line-through" : "none")};
  cursor: pointer;
`;

const StyledTd = styled.td`
  background-color: red !important;
  color: white !important;
  width: 35px;
`;

function App() {
  const shops = [
    { id: 1, name: "Migros" },
    { id: 2, name: "Teknosa" },
    { id: 3, name: "Bim" },
  ];
  const categories = [
    { id: 1, name: "Elektronik" },
    { id: 2, name: "Şarküteri" },
    { id: 3, name: "Oyuncak" },
    { id: 4, name: "Bakliyat" },
    { id: 5, name: "Fırın" },
  ];

  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productShop, setProductShop] = useState("");
  const [productCategory, setProductCategory] = useState("");

  useEffect(() => {
    const isItCompleted = products.length > 0 && products.every((product) => product.isBought === true)
    if(isItCompleted){
      alert("Tüm ürünler satın alındı.");
      jsConfetti.addConfetti()
    }
  },[products])

  const addProduct = () => {
    const product = {
      id: uuidv4(),
      name: productName,
      shop: productShop,
      category: productCategory,
      isBought: false,
    };
    setProducts([...products, product]);
    setProductName("");
    setProductShop("");
    setProductCategory("");
  };

  const completed = (product) => {
    const newProducts = products.map((oldProduct) =>
      oldProduct.id === product.id
        ? { ...oldProduct, isBought: !oldProduct.isBought }
        : oldProduct
    );
    setProducts(newProducts);
  };

  const deleteProduct = (product, e) => {
    e.stopPropagation(); 
    const updatedProducts = products.filter(
      (oldProduct) => oldProduct.id !== product.id
    );
    setProducts(updatedProducts);
  };

  const jsConfetti = new JSConfetti()
 

  return (
    <>
      <Container>
        <Form className="form mb-4 d-flex align-items-center"
        onSubmit={(e) => {
          e.preventDefault();
          if(!productName || !productShop || !productCategory){
            alert("Lütfen boş alanları doldurunuz")
          }else(addProduct()) ;
          
        }}>
          <Form.Group className=" d-flex">
            <Form.Control
              
              type="text"
              placeholder="Product"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
              
            />
            <Form.Select
              value={productShop}
              onChange={(e) => {
                setProductShop(e.target.value);
              }}
              required
            >
              <option>Shop</option>
              {shops.map((shop) => (
                <option key={shop.id} value={shop.name}>
                  {shop.name}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              value={productCategory}
              onChange={(e) => {
                setProductCategory(e.target.value);
              }}
              required
            >
              <option>Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
            <p></p>
          </Form.Group>
          <Button type="submit"  variant="primary">
            Submit
          </Button>
        </Form>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Shop</th>
              <th>Category</th>
              <th>Id</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <StyledTr
                onClick={() => completed(product)}
                $isBought={product.isBought}
                key={product.id}
              >
                <td>{product.name}</td>
                <td>{product.shop}</td>
                <td>{product.category}</td>
                <td>{product.id}</td>
                <StyledTd onClick={(e) => deleteProduct(product, e)}><IconComp /></StyledTd>
              </StyledTr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default App;
