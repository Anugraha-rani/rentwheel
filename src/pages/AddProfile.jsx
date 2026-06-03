import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userEditAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";


function AddProfile() {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("users"));

    if (user) {
      setUserId(user._id);
    }
  }, []);

  const initialValues = {
    username: "",
    phone: "",
    address: "",
    idType: "",
    idNumber: "",
    picture: null,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username required"),
    phone: Yup.string().required("Phone required"),
    address: Yup.string().required("Address required"),
    idType: Yup.string().required("ID type required"),
    idNumber: Yup.string().required("ID number required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = sessionStorage.getItem("token");

      const reqBody = new FormData();

      Object.keys(values).forEach((key) => {
        reqBody.append(key, values[key]);
      });

      const reqHeader = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const result = await userEditAPI(
        userId,
        reqBody,
        reqHeader
      );

      if (result.status === 200) {
        alert("Profile updated successfully");
        resetForm();
        navigate('/')
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container">
      <h3>Add Profile</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty, setFieldValue }) => (
          <Form>

            <div>
              <Field
                name="username"
                placeholder="Username"
              />
              <ErrorMessage
                name="username"
                component="p"
              />
            </div>

            <div>
              <Field
                name="phone"
                placeholder="Phone"
              />
              <ErrorMessage
                name="phone"
                component="p"
              />
            </div>

            <div>
              <Field
                name="address"
                placeholder="Address"
              />
              <ErrorMessage
                name="address"
                component="p"
              />
            </div>

            <div>
              <Field
                name="idType"
                placeholder="ID Type"
              />
              <ErrorMessage
                name="idType"
                component="p"
              />
            </div>

            <div>
              <Field
                name="idNumber"
                placeholder="ID Number"
              />
              <ErrorMessage
                name="idNumber"
                component="p"
              />
            </div>

            <div>
              <input
                type="file"
                onChange={(e) =>
                  setFieldValue(
                    "picture",
                    e.currentTarget.files[0]
                  )
                }
              />
            </div>

            <button
              type="submit"
              disabled={!(isValid && dirty)}
            >
              Save
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddProfile;