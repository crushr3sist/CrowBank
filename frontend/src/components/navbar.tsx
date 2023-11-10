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

import useDarkMode from "use-dark-mode";
import { logOff } from "./logOff";

export default function NavBar() {
  const menuItems = ["Dashboard", "digest"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const darkMode = useDarkMode(true);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Navbar
      className={`${
        darkMode.value ? "dark" : ""
      } text-foreground bg-background`}
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
            <a href={"/"}>Homely</a>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">
            <a href={"/"}>Homely</a>
          </p>
        </NavbarBrand>
        <NavbarItem isActive>
          <Link href="#">shows</Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#">movies</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarItem>
        <Button
          variant="bordered"
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
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href={index === 1 ? "/digest" : "/"}
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
