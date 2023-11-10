import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

import { logOff } from "./logOff";

export default function NavBar() {
  const menuItems = ["Dashboard", "digest"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Navbar
      className="bg-background"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">
            <a href={"/"}>CrowBank</a>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">
            <a href={"/"}>CrowBank</a>
          </p>
        </NavbarBrand>
        <NavbarItem isActive>
          <Link style={{ color: "#F7B750" }} href="#">
            Statements
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link style={{ color: "#F7B750" }} href="#">
            Accounts
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarItem>
        <Button
          variant="bordered"
          color="danger"
          onClick={() => {
            logOff();
          }}
        >
          Log Off
        </Button>
      </NavbarItem>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              style={{ color: "#F7B750" }}
              href={index === 1 ? "/transactions" : "/accounts"}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
