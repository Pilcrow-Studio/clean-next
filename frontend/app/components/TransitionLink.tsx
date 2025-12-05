    // components/TransitionLink.tsx
    "use client";
    import Link, { LinkProps } from "next/link";
    import { useRouter } from "next/navigation";
    import React from "react";

    interface TransitionLinkProps extends LinkProps {
      href: string;
      children: React.ReactNode;
      className?: string;
    }

    export default function TransitionLink({ href, children, ...props }: TransitionLinkProps) {
      const router = useRouter();

      async function handleNavigation(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        const body = document.body;
        body.classList.add("exit-animation"); // Add exit animation class

        await new Promise((res) => setTimeout(res, 500)); // Wait for animation to complete

        body.classList.remove("exit-animation");
        router.push(href);

        // Optionally, add an enter animation class to the new page
        body.classList.add("enter-animation");
        setTimeout(() => {
          body.classList.remove("enter-animation");
        }, 500);
      }

      return (
        <Link onClick={handleNavigation} href={href} {...props}>
          {children}
        </Link>
      );
    }