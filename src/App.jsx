import { Form, Button, Container, Table } from "react-bootstrap";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import JSConfetti from "js-confetti";
import IconComp from "./components/IconButton";
import Fuse from "fuse.js";

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

  const [filteredName, setFilteredName] = useState("");
  const [filteredShopId, setFilteredShopId] = useState("");
  const [filteredCategoryId, setFilteredCategoryId] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("");

  const addProduct = () => {
    const product = {
      name: productName,
      shop: productShop,
      category: productCategory,
      id: uuidv4().slice(0, 5),
      isBought: false,
    };
    setProducts([...products, product]);
    setProductName("");
    setProductShop("");
    setProductCategory("");
  };

  const purchased = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, isBought: !product.isBought }
        : product
    );
    if (updatedProducts.every((upProducts) => upProducts.isBought === true)) {
      alert("Alışveriş Tamamlandı");
      jsConfetti.addConfetti();
    }
    setProducts(updatedProducts);
  };

  const jsConfetti = new JSConfetti();

  const filteredProducts = products.filter((product) => {
    let result = true;
    const fuse = new Fuse(products, { keys: ["name"] });
    const res = fuse.search(filteredName);

    if (filteredName !== "" && !res.find((r) => r.item.id === product.id)) {
      result = false;
    }
    if (filteredShopId !== "" && product.shop !== filteredShopId) {
      result = false;
    }
    if (filteredCategoryId !== "" && product.category !== filteredCategoryId) {
      result = false;
    }
    if (
      filteredStatus !== "all" &&
      ((product.isBought === true && filteredStatus !== "bought") ||
        (product.isBought === false && filteredStatus !== "notBought"))
    ) {
      result =  false
    }
    return result
  });

  return (
    <>
      <Container>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (!productName || !productShop || !productCategory) {
              alert("Lütfen boş alanları doldurunuz");
            } else {
              addProduct();
            }
          }}
          className="d-flex mb-4"
        >
          <Form.Group className="w-100">
            <Form.Control
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              type="text"
              placeholder="Name"
            />
          </Form.Group>
          <Form.Select
            value={productShop}
            onChange={(e) => setProductShop(e.target.value)}
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
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option>Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Form.Select>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Form className="d-flex mb-4">
          <Form.Group className="w-100">
            <Form.Control
              value={filteredName}
              onChange={(e) => setFilteredName(e.target.value)}
              type="text"
              placeholder="Name"
            />
          </Form.Group>
          <Form.Select
            className="h-100"
            value={filteredShopId}
            onChange={(e) => setFilteredShopId(e.target.value)}
          >
            <option>Shop</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.name}>
                {shop.name}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            className="h-100"
            value={filteredCategoryId}
            onChange={(e) => setFilteredCategoryId(e.target.value)}
          >
            <option>Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Form.Select>
          <Form.Group
            onChange={(e) => {
              setFilteredStatus(e.target.value);
            }}
            className="mb-3 d-flex align-items-center"
          >
            <Form.Check
              inline
              value={"all"}
              label="All"
              name="group1"
              type={"radio"}
              id={`radio-1`}
            />
            <Form.Check
              inline
              value={"bought"}
              label="Bought"
              name="group1"
              type={"radio"}
              id={`radio-2`}
            />
            <Form.Check
              inline
              value={"notBought"}
              name="group1"
              label="Not Bought"
              type={"radio"}
              id={`radio-3`}
            />
          </Form.Group>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Shop</th>
              <th>Category</th>
              <th>ID</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                onClick={() => purchased(product.id)}
                key={product.id}
                style={{
                  textDecoration:
                    product.isBought === true ? "line-through" : "unset",
                }}
              >
                <td>{product.name}</td>
                <td>{product.shop}</td>
                <td>{product.category}</td>
                <td>{product.id}</td>
                <td>
                  <IconComp
                    product={product}
                    products={products}
                    setProducts={setProducts}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default App;
