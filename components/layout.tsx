import { Box, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div>
      <HStack position="fixed" bottom={0}>
        {canGoBack ? (
          <button onClick={onClick} className="absolute left-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>
          </button>
        ) : null}
        {title ? <span>{title}</span> : null}
      </HStack>
      <Box>{children}</Box>
      {hasTabBar ? (
        <nav className="bg-white max-w-xl text-gray-700 border-t fixed bottom-0 w-full px-10 pb-5 pt-3 flex justify-between text-xs">
          <Link href="/"></Link>
          <Link href="/community"></Link>
          <Link href="/chats"></Link>
          <Link href="/live"></Link>
          <Link href="/profile"></Link>
        </nav>
      ) : null}
    </div>
  );
}
