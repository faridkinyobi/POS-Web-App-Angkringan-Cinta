import { z } from "zod";

const toDate = z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
);

export const SchemaQueryParams = z.object({
    search: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    page: z.string().optional().default("1"),
    perPage: z.string().optional().default("10"),
});

export type IzSchemaQueryParams = z.infer<typeof SchemaQueryParams>