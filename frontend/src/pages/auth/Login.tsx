import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Image,
  Button,
  Divider,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="absolute h-screen w-screen bg-gradient-to-r from-[#eee3c1] to-[#f8fafc]">
      <div className="relative flex flex-col justify-center items-center mt-44">
        <Card className="w-1/2 h-1/2">
          <CardHeader className="flex w-full flex-row items-center justify-center uppercase">
            <h4 className="font-logo font-black text-4xl mt-4">Sign Up</h4>
          </CardHeader>
          <div className="flex flex-row items-center justify-center">
            <CardBody className="mb-10">
              <div className="flex flex-row">
                <div
                  className="flex flex-col items-center w-full mr-10 ml-10 mb-5"
                  id="rawRegister"
                >
                  left side
                </div>
                <Divider orientation="vertical" className="my-4" />
                <div className="flex flex-col items-center w-2/4 mr-10 ml-10">
                  <div className="flex flex-col items-center">
                    <h2 className="mt-2">right side</h2>
                  </div>
                </div>
                <Divider orientation="vertical" className="my-4" />
              </div>
            </CardBody>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
