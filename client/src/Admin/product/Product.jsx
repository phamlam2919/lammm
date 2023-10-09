import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./product.css";
import Offcanvas from "react-bootstrap/Offcanvas";
function Product() {
    const [products, setProduct] = useState([]);
    const listProduct = () => {
        axios
            .get(`http://localhost:3001/api/v1/product`)
            .then((res) => {
                // console.log(res.data);
                setProduct(res.data.product);
            })
            .catch((err) => console.log(err));
    };

    // Add
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    const [newProducts, setProducts] = useState({
        title: "",
        price: "",
        material: "",
        color: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
    });
    const handleCreat = (e) => {
        const { name, value } = e.target;
        setProducts((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };
    const handleCreateUser = () => {
        axios
            .post(`http://localhost:3001/api/v1/product`, newProducts)
            .then((res) => {
                console.log(res);
                listProduct();
                // setShow(false);
            })
            .catch((err) => console.log(err));
    };

    // Edit
    const [editUser, setEditUser] = useState({
        product_id: null,
        title: "",
        price: "",
        material: "",
        color: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
    });
    const handleEdit = (products) => {
        setEditUser({
            product_id: products.product_id,
            title: products.title,
            price: products.price,
            material: products.material,
            color: products.color,
            img1: products.img1,
            img2: products.img2,
            img3: products.img3,
            img4: products.img4,
        });
        // console.log(products);
        handleShow2();
    };

    const handleUpdateUser = () => {
        axios
            .put(
                `http://localhost:3001/api/v1/product/${editUser.product_id}`,
                editUser
            )
            .then((res) => {
                console.log(res.data);
                listProduct();
                // handleClose();
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = (id) => {
        console.log(id);
        axios
            .delete(`http://localhost:3001/api/v1/product/${id}`)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data.product);
                listProduct();
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        listProduct();
    }, []);

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    return (
        <div>
            <h1>PRODUCT</h1>
            <Button variant="primary" onClick={handleShow}>
                ADD PRODUCT
            </Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD PRODUCT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="them">
                        <span>Title</span>
                        <br />
                        <input
                            type="text"
                            name="title"
                            onChange={handleCreat}
                        />
                        <br />
                        <span>Price</span>
                        <br />
                        <input
                            type="text"
                            name="price"
                            onChange={handleCreat}
                        />
                        <br />
                        <span>Material</span>
                        <br />
                        <input
                            type="text"
                            name="material"
                            onChange={handleCreat}
                        />
                        <br />
                        <span>Color</span> <br />
                        <input
                            type="text"
                            name="color"
                            onChange={handleCreat}
                        />
                        <br />
                        <span>Image1</span> <br />
                        <input type="text" name="img1" onChange={handleCreat} />
                        <br />
                        <span>Image2</span> <br />
                        <input type="text" name="img2" onChange={handleCreat} />
                        <br />
                        <span>Image3</span> <br />
                        <input type="text" name="img3" onChange={handleCreat} />
                        <br />
                        <span>Image4</span> <br />
                        <input type="text" name="img4" onChange={handleCreat} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleCreateUser();
                            handleClose();
                        }}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <table style={{ width: "115%" }} className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Material</th>
                        <th scope="col">Color</th>
                        <th scope="col">Image</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{product.product_id}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.material}</td>
                            <td>{product.color}</td>
                            <td>
                                <img
                                    style={{ width: "100px", height: "100px" }}
                                    src={product.img1}
                                    alt=""
                                />
                                <img
                                    style={{ width: "100px", height: "100px" }}
                                    src={product.img1}
                                    alt=""
                                />
                                <img
                                    style={{ width: "100px", height: "100px" }}
                                    src={product.img1}
                                    alt=""
                                />
                                <img
                                    style={{ width: "100px", height: "100px" }}
                                    src={product.img1}
                                    alt=""
                                />
                            </td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => handleEdit(product)}
                                >
                                    Update
                                </Button>

                                <Modal show={show2} onHide={handleClose2}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>
                                            UPDATE PRODUCT
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="them">
                                            <span>Title</span>
                                            <br />
                                            <input
                                                type="text"
                                                name="title"
                                                value={editUser.title}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        title: e.target.value,
                                                    })
                                                }
                                            />
                                            <br />
                                            <span>Price</span>
                                            <br />
                                            <input
                                                type="text"
                                                name="price"
                                                value={editUser.price}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        price: e.target.value,
                                                    })
                                                }
                                            />
                                            <br />
                                            <span>Material</span>
                                            <br />
                                            <input
                                                type="text"
                                                name="material"
                                                value={editUser.material}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        material:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                            <br />
                                            <span>Color</span> <br />
                                            <input
                                                type="text"
                                                name="color"
                                                value={editUser.color}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        color: e.target.value,
                                                    })
                                                }
                                            />
                                            <br />
                                            <span>Image1</span> <br />
                                            <input
                                                type="text"
                                                name="img1"
                                                value={editUser.img1}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        img1: e.target.value,
                                                    })
                                                }
                                            />
                                            <br />
                                            <span>Image2</span> <br />
                                            <input
                                                type="text"
                                                name="img2"
                                                value={editUser.img2}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        img2: e.target.value,
                                                    })
                                                }
                                            />
                                            <br />
                                            <span>Image3</span> <br />
                                            <input
                                                type="text"
                                                name="img3"
                                                value={editUser.img3}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        img3: e.target.value,
                                                    })
                                                }
                                            />
                                            <br />
                                            <span>Image4</span> <br />
                                            <input
                                                type="text"
                                                name="img4"
                                                value={editUser.img4}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        img4: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button
                                            variant="secondary"
                                            onClick={handleClose2}
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                handleUpdateUser();
                                                handleClose2();
                                            }}
                                        >
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() =>
                                        handleDelete(product.product_id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Product;
