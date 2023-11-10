import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Image,
  Button,
  Divider,
} from "@nextui-org/react";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import crossIcon from "../../components/icons/crossIcon";

const RegisterPage = () => {
  const [qrCode, setQrCode] = useState("");
  const [satisfiedPassword, setSatisfiedPassword] = useState(false);

  const variation: string[] = ["success", "warning", "danger", "default"];
  const [passwordVariationIndex, setPasswordVariationIndex] = useState(
    variation.length
  );
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secret, setSecret] = useState("");
  const [phaseOneFormError, setPhaseOneFormError] = useState(false);
  const [firstPhase, setFirstPhase] = useState(true);

  const fetchOTPQrCode = () => {
    axios
      .get("http://localhost:8000/users/otp/mobile/generate")
      .then(async (request) => {
        await setQrCode(request.data.otp_qr_code);
        await localStorage.setItem("qrcode", request.data.otp_qr_code);
        await setSecret(request.data.secretKey);
      });
  };

  const passwordRulesEnforcer = (password: string) => {
    const passwordRegex =
      /^(?=(.*[A-Z]){2,})(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*]{12}$/;
    setSatisfiedPassword(passwordRegex.test(password));

    if (password === "") {
      setPasswordVariationIndex(variation.length);
    } else {
      setPasswordVariationIndex(satisfiedPassword ? 0 : 2);
    }
  };

  const registerUserRequest = async () => {
    const data = qs.stringify({
      email: email,
      username: username,
      password: password,
      address: address,
      firstName: firstName,
      lastName: lastName,
      secret: secret,
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8000/users/register",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    console.log(config);
    await axios.request(config).then(async (response) => {
      localStorage.setItem("token", response.data.access_token);
      navigate("/");
    });
  };

  useEffect(() => {
    fetchOTPQrCode();
  }, []);

  const errorAlert = () => {
    if (phaseOneFormError) {
      return (
        <div
          className={`
          bg-red-500 
          flex 
          flex-row 
          w-1/2 
          rounded-b-lg 
          p-2 absolute 
          translate-x-1/2 
          mt-1 
          border-s-red-200 
          border-spacing-1 
          `}
        >
          <div className="p-2 mx-auto">
            <p className="text-white flex-grow">
              Error: Please fill the form correctly
            </p>
          </div>
          <Button
            className="p-2"
            isIconOnly
            aria-label="close"
            onClick={() => setPhaseOneFormError(false)}
          >
            {crossIcon()}
          </Button>
        </div>
      );
    }
  };

  return (
    <>
      <div className="absolute h-screen w-screen bg-gradient-to-r from-[#eee3c1] to-[#f8fafc] ">
        <div>{errorAlert()}</div>
        <div className="relative flex flex-col justify-center items-center mt-44 sm:mt-33 ">
          <Card className="w-1/2 h-1/2">
            <CardHeader className="flex w-full flex-row flex-grow items-center justify-center uppercase">
              <h4 className="font-logo font-black text-4xl mt-4">Sign Up</h4>
            </CardHeader>
            <div className="flex flex-row items-center justify-center">
              <CardBody className="mb-10">
                <div className="flex flex-row">
                  <div
                    className="flex flex-col items-center w-full mr-10 ml-10 mb-5"
                    id="rawRegister"
                  >
                    {firstPhase ? (
                      <>
                        <Input
                          className="mt-2 shadow-md"
                          size="md"
                          type="email"
                          label="Email"
                          variant="bordered"
                          onValueChange={(value) => setEmail(value)}
                        ></Input>
                        <Input
                          className="mt-2 shadow-md"
                          size="md"
                          label="Username"
                          variant="bordered"
                          onValueChange={(value) => setUsername(value)}
                        ></Input>
                        <Input
                          className={`mt-2 shadow-md ${
                            variation[passwordVariationIndex] === "success"
                              ? "border-success"
                              : "border-danger"
                          }`}
                          size="md"
                          label="Password"
                          variant="bordered"
                          type="password"
                          onValueChange={(value) => {
                            setPassword(value);
                            passwordRulesEnforcer(value);
                          }}
                        ></Input>
                        <Button
                          onClick={() => {
                            if (
                              [password, username, email].some((element) => {
                                return element === "";
                              })
                            ) {
                              setPhaseOneFormError(true);
                            } else {
                              setFirstPhase(false);
                            }
                          }}
                          className="mt-2"
                        >
                          continue
                        </Button>
                      </>
                    ) : (
                      <>
                        <Input
                          className="mt-2 shadow-md"
                          size="md"
                          label="Address"
                          value={address}
                          variant="bordered"
                          onValueChange={(Address) => setAddress(Address)}
                        ></Input>
                        <Input
                          className="mt-2 shadow-md"
                          size="md"
                          value={firstName}
                          label="First Name"
                          variant="bordered"
                          onValueChange={(FirstName) => setFirstName(FirstName)}
                        ></Input>
                        <Input
                          className="mt-2 shadow-md"
                          size="md"
                          label="Last Name"
                          variant="bordered"
                          value={lastName}
                          onValueChange={(LastName) => {
                            setLastName(LastName);
                          }}
                        ></Input>
                        <Button
                          onClick={() => registerUserRequest()}
                          className="mt-2"
                        >
                          Sign Up
                        </Button>
                      </>
                    )}
                  </div>
                  {firstPhase ? (
                    <>
                      <Divider orientation="vertical" className="my-4" />
                      <div className="flex flex-col items-center w-2/4 mr-10 ml-10">
                        <div className="flex flex-col items-center">
                          <Image
                            className="mt-2 items-end"
                            src={qrCode}
                            style={{ width: "100%", height: "auto" }}
                          />
                          <h2 className="mt-2">Your OTP QR Code</h2>
                        </div>
                      </div>
                      <Divider orientation="vertical" className="my-4" />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </CardBody>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
