import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      // 去dashboard页面，得看是否登录
      if (isOnDashboard) {
        return isLoggedIn; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // 否则判断是否登录，是登录的话就去dashboard页面
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true; // 其他情况正常访问
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
