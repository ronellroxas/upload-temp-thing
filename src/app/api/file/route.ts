import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/unstable-core-do-not-import";
import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

const fileHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    let ctx = await createTRPCContext({ headers: headers() });
    let caller = createCaller(ctx);

    try {
        const user = await caller.file.uploadAll("");
        return NextResponse.json({ success: true }, {
            status: 200
        });
    } catch (cause) {
        if (cause instanceof TRPCError) {
            let httpCode = getHTTPStatusCodeFromError(cause);
            return NextResponse.json(cause, {
                status: httpCode
            });
        }

        console.error(cause);
        return NextResponse.json({ message: "Internal server error" }, {
            status: 500
        });
    }
}

export { fileHandler as POST } ;