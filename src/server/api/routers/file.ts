import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const fileRouter = createTRPCRouter({
    uploadAll: publicProcedure.input(z.string()).query(({ input }) => {
        return true
    }),
});

export default fileRouter