import { Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: FloatingButton) {
  return (
    <Link href={href}>
      <Box
        as="a"
        position="fixed"
        bottom={24}
        right={5}
        rounded="full"
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        color="white"
        w={10}
        h={10}
        bg="blue.500"
      >
        {children}
      </Box>
    </Link>
  );
}
