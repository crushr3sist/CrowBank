import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigator = useNavigate();
  const [loginPage, onLoginPage] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [OTPFields, setOTPFields] = useState(["", "", "", "", "", ""]);
  const [userFound, setUserFound] = useState(false);
  const OTPInputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const authorizeCreds = () => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:8000/users/check",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: { email: email, password: password },
    };
    try {
      axios
        .request(config)
        .then((res) => {
          if (res.status === 200) {
            setUserFound(true);
          } else {
            setUserFound(false);
          }
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  };

  const loginPageHandler = () => {
    authorizeCreds();
    if (userFound) {
      onLoginPage(false);
    } else {
      onLoginPage(true);
    }
  };

  const sendData = (otp: any) => {
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8000/users/otp/mobile/verify",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: { creds: { email: email, password: password }, otp: otp },
    };
    try {
      axios
        .request(config)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.access_token.token);
            localStorage.setItem("expire", res.data.access_token.expire);
            navigator("/");
          } else {
            // cause error card
          }
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  };

  const handleOTPChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOTPFields = [...OTPFields];
      newOTPFields[index] = value;
      setOTPFields(newOTPFields);

      if (value && index < OTPFields.length - 1) {
        OTPInputRefs[index + 1].current.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const clipboardData = e.clipboardData.getData("Text");
    if (/^\d{1,6}$/.test(clipboardData)) {
      const newOTPFields = [...OTPFields];
      for (let i = 0; i < clipboardData.length; i++) {
        if (i < OTPFields.length) {
          newOTPFields[i] = clipboardData[i];
        }
      }
      setOTPFields(newOTPFields);
    }
  };

  useEffect(() => {
    const handleKeyNavigation = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const currentIndex = OTPInputRefs.findIndex(
          (ref) => ref.current === document.activeElement
        );
        if (currentIndex !== -1) {
          if (e.key === "ArrowLeft" && currentIndex > 0) {
            OTPInputRefs[currentIndex - 1].current.focus();
          } else if (
            e.key === "ArrowRight" &&
            currentIndex < OTPFields.length - 1
          ) {
            OTPInputRefs[currentIndex + 1].current.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyNavigation);
    return () => {
      document.removeEventListener("keydown", handleKeyNavigation);
    };
  }, []);

  return (
    <>
      <div className="absolute h-screen w-screen bg-gradient-to-r from-[#eee3c1] to-[#f8fafc]">
        <div className="relative flex flex-col justify-center items-center mt-44">
          <Card className="w-1/2 h-1/2 flex-col items-center">
            <CardHeader className="flex w-full flex-row items-center justify-center uppercase">
              <h4 className="font-logo font-black text-4xl mt-4">Login</h4>
            </CardHeader>
            {loginPage ? (
              <div className="flex flex-row ">
                <div className="flex flex-col items-center  mr-10 ml-10 mb-5">
                  <Input
                    className="mt-2 w-full shadow-md"
                    size="md"
                    type="email"
                    label="Email"
                    variant="bordered"
                    onValueChange={(value) => setEmail(value)}
                  ></Input>
                  <Input
                    className="mt-2 w-full shadow-md"
                    size="md"
                    label="Password"
                    variant="bordered"
                    type="password"
                    onValueChange={(value) => {
                      setPassword(value);
                    }}
                  ></Input>
                  <Button
                    className="mt-2"
                    onClick={() => {
                      loginPageHandler();
                    }}
                  >
                    login
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-row items-center justify-center">
                  <CardBody className="mb-10">
                    <div className="flex flex-row text-justify">
                      {OTPFields.map((value, index) => (
                        <Input
                          key={index}
                          ref={OTPInputRefs[index]}
                          type="text"
                          className="OTP-input p-1 text-center border-gray-300 focus:border-primary-500 focus:ring-0"
                          value={value}
                          onChange={(e) =>
                            handleOTPChange(index, e.target.value)
                          }
                          onPaste={handlePaste}
                        />
                      ))}
                    </div>
                  </CardBody>
                </div>
                <Button
                  onClick={() => {
                    sendData(OTPFields.join(""));
                  }}
                  className=" w-1/4 mb-5"
                >
                  Login
                </Button>
              </>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
