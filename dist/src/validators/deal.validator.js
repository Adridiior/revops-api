"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealUpdateSchema = exports.dealCreateSchema = void 0;
const zod_1 = require("zod");
exports.dealCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    value: zod_1.z.number().int().nonnegative(),
    stage: zod_1.z.enum(["LEAD", "QUALIFIED", "PROPOSAL", "WON", "LOST"]).optional(),
    owner: zod_1.z.string().min(2)
});
exports.dealUpdateSchema = exports.dealCreateSchema
    .extend({
    accountId: zod_1.z.string().uuid().nullable().optional()
})
    .partial();
//# sourceMappingURL=deal.validator.js.map