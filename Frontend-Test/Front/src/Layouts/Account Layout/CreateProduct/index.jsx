import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import './index.scss';
import { useUser } from '../../../Context/userContext';
import axios from 'axios';
import { useState } from 'react';

const initialValues = {
    title: "",
    image: "",
    price: 0,
    categories: "",
    discount: 0,
    inStock: 0,
}

const createProductSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, "Your name Can't be this Short!")
        .max(30, "Your name Can't be this Long!"),
    image: Yup.string(),
    price: Yup.number(),
    categories: Yup.string()
        .required("This is required!"),
    discount: Yup.number()
        .default(0),
    inStock: Yup.number()
})

function CreateProduct() {

    const { user } = useUser()

    const [res, setRes] = useState()

    async function handleValues(values, actions) {
        values.categories = values.categories.split(" ")
        console.log(values);
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8000/products',
            data: values,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            }

        }).then(res=>res.data)
        await actions.resetForm()
        console.log(response);
        setRes(response)
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={createProductSchema}
                onSubmit={(values, actions) => handleValues(values, actions)}
            >
                <Form
                    style={{ display: "flex", flexDirection: 'column', alignItems: 'center', rowGap: "30px" }}
                >
                    <Field id="title" name="title" placeholder="Enter Product Name" />
                    <ErrorMessage name="title" id='title' />

                    <Field id="image" name="image" placeholder="Add Image" />
                    <ErrorMessage name="image" id='image' />

                    <Field id="price" name="price" type={'number'} min={0} placeholder="Enter Price" />
                    <ErrorMessage name="price" id='price' />

                    <Field id="categories" name="categories" placeholder="Which categories ?" />
                    <ErrorMessage name="categories" id='categories' />

                    <Field id="discount" name="discount" type={'number'} min={0} placeholder="Any Discount ?" />
                    <ErrorMessage name="discount" id='discount' />

                    <Field id="inStock" name="inStock" type={'number'} min={0} placeholder="How many is in Stock ?" />
                    <ErrorMessage name="inStock" id='inStock' />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <h2>{res}</h2>
        </>
    )
}

export default CreateProduct;
