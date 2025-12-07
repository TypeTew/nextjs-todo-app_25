import NextAuth from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

interface RouteHandlerContext {
    params: Promise<{ nextauth: string[] }>;
}

const nextAuthHandler = async (req: NextRequest, context: RouteHandlerContext) => {

    const { params } = context;
    const resolvedParams = params instanceof Promise ? await params : params;

    return handler(req, { params: resolvedParams });
};

export { nextAuthHandler as GET, nextAuthHandler as POST };
