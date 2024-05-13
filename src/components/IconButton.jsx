import { BsTrash } from "react-icons/bs";
import React from "react";

const IconComp = ({product,products,setProducts}) => {
  const deleteProduct =(e) => {
    e.stopPropagation();
    console.log(product)
    
    const newProducts = products.filter(oldproduct => oldproduct.id !== product.id)
    setProducts(newProducts)
    console.log(newProducts)
  }

  return <button onClick={deleteProduct} style={{background: "red",color:"white"}}><BsTrash /></button>;
};

export default IconComp;

