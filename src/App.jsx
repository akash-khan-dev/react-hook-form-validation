import { Button, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
const schema = yup
  .object({
    firstName: yup.string().required("First Name is Requerd"),
    LastName: yup.string().required("Last Name is Requerd"),
    email: yup.string().required("email Name is Requerd"),
    password: yup.string().required("password Name is Requerd"),
  })
  .required();
function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = ({ firstName, LastName, email, password }) => {
    getData(firstName, LastName, email, password);
  };

  async function getData(firstName, LastName, email, password) {
    await axios.post("http://localhost:4444/v1/registration", {
      firstName: firstName,
      LastName: LastName,
      email: email,
      password: password,
    });
  }

  return (
    <>
      <div className="form-container">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("firstName")}
            placeholder="First Name"
            width={300}
            height={35}
          />
          <p>{errors.firstName?.message}</p>
          <Input
            {...register("LastName")}
            placeholder="Last Name"
            margin={20}
            width={300}
            height={35}
          />
          <p>{errors.LastName?.message}</p>

          <Input
            {...register("email")}
            placeholder="Email"
            width={300}
            height={35}
          />
          <p>{errors.email?.message}</p>

          <Input
            type="password"
            {...register("password")}
            placeholder="Password"
            margin={20}
            width={300}
            height={35}
          />
          <p>{errors.password?.message}</p>

          <div>
            <Button
              type="submit"
              className="button"
              colorScheme="teal"
              variant="outline"
            >
              Button
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
