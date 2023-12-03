"use client";

import {
    Container,
    Flex
} from "@radix-ui/themes";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="border-b  px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">HashiCorp</Link>
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
