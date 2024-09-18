import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PRODUCT } from "../utils/queries.js";
import exampleData from "../assets/example-data.json";
import ProductCard from "../components/product-card.jsx";

function ProductPage() {
  // get product id from url
  const { productId } = useParams();
  const { loading, data } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { productId },
  });

  const product = data ? data.singleProduct : [];
  console.log(product);
  // get product from json by id (get from db later)
  // const [product] = exampleData.products.filter((p) => p.id === productId);
  // destructure it
  const { id, category, description, image, quantity, price, name } = product;

  const InStock = () => {
    if (quantity < 0) {
      return "OUT OF STOCK";
    } else {
      return;
    }
  };

  // const updateForm = (() => {
  //   return(
  //     <h1>Test</h1>
  //   )
  // })

  const AdminStuff = () => {
    const UpdateForm = (() => {
      const [newName, setName] = useState(name);
      const [newPrice, setPrice] = useState(price);
      const [newCategory, setCategory] = useState(category);
      const [newDescription, setDescription] = useState(description);
      const [newQuantity, setQuantity] = useState(quantity);
      const [newImage, setImgae] = useState(image.URL);
      const [newImageName, setImageName] = useState(image.name);
      const [newImageDescription, setImageDescription] = useState(image.description);

      const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
    
        // set the state based on input type
        if (inputType === "name") {
          setName(inputValue);
        }
        if (inputType === "price") {
          setPrice(inputValue);
        }
      };
    
      return (
      <>
      <h2>Form to edit product</h2>
        <form onSubmit={""}>
          <input
            value={newName}
            name="name"
            onChange={handleInputChange}
            type="text"
            placeholder="Product name"
          ></input>
          <input
            value={newPrice}
            name="price"
            onChange={handleInputChange}
            type="text"
            placeholder="Price"
          ></input>
          <input
            value={newQuantity}
            name="quantity"
            onChange={handleInputChange}
            type="number"
            min="0"
            placeholder="Stock"
          ></input>
          <input
            value={newCategory}
            name="category"
            onChange={handleInputChange}
            type="text"
            placeholder="Category"
          ></input>
          <textarea
            value={newDescription}
            name="description"
            onChange={handleInputChange}
            type="text"
            placeholder="Description"
          ></textarea>
          <input value={image.URL} name="image" type="file"></input>
          <input
            value={newImageName}
            name="category"
            onChange={handleInputChange}
            type="text"
            placeholder="Image title"
          ></input>
          <input
            value={newImageDescription}
            name="imageDescription"
            onChange={handleInputChange}
            type="text"
            placeholder="Image caption"
          ></input>

          <button className="btn-2" type="submit">
            Submit
          </button>
          <br />
        </form>
      </>
      )
    })
    return (
      <section>
        Number in stock: {quantity} <br></br>
        Product id: {productId} <br></br>
        <button className="btn-1" onClick={""}>Edit Product</button>
        <button className="btn-1" onClick={""}>Delete Product</button>

        <UpdateForm/>
      </section>
    )
  }

  if (loading) {
    return <h1>Loading</h1>;
  }
  console.log(image.Url);
  return (
    <>
      <section className="product-section">
        <figure className="product-img">
          <img src={`../${image.Url}`}></img>
        </figure>

        <div className="product-info">
          <h2>{name}</h2>
          <p>
            Price: <span className="price">${price}</span> <InStock />{" "}
          </p>
          <p>{description}</p>
          {/* TODO: Make a dropdown or arrow selection thing to select quantity to add to cart */}
          <p>Quantity:{quantity}</p>

          <div className="button-container">
            <button className="btn-1">Add to Cart</button>
            <button className="btn-2">Leave a Review</button>
          </div>
        </div>
      </section>

      <AdminStuff />

      {/* I put some product info here just in case we want it to show if admin is logged in */}
      <div>
        Product info for Admin: <br></br>

      </div>
    </>
  );
}

export default ProductPage;
