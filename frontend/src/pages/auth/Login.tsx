import { Card, CardHeader, CardBody, Input, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [qrCode, setQrCode] = useState("");
  const fetchOTPQrCode = () => {
    axios
      .get("http://localhost:8000/users/otp/generate")
      .then(async (request) => {
        await setQrCode(request.data.otp_qr_code);
        await localStorage.setItem("qrcode", request.data.otp_qr_code);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("qrcode") === null) {
      fetchOTPQrCode();
    } else {
      setQrCode(localStorage.getItem("qrcode"));
    }
  }, []);

  return (
    <div className="absolute h-screen w-screen bg-gradient-to-r from-[#eee3c1] to-[#f8fafc]">
      <div className=" flex flex-col justify-center items-center mt-44 ">
        <Card className="w-1/2 h-1/2 ">
          <CardHeader className="flex w-full flex-row items-center justify-center uppercase">
            <h4 className="font-logo font-black text-4xl mt-4">Login</h4>
          </CardHeader>
          <CardBody>
            <div id="rawRegister">
              <Input className="mt-2 shadow-sm" size="md" label="email"></Input>
              <Input
                className="mt-2 shadow-sm"
                size="md"
                label="username"
              ></Input>
              <Input
                className="mt-2 shadow-sm"
                size="md"
                label="password"
              ></Input>
            </div>
            <div id="otp-auth">
              <Image src={qrCode}></Image>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
