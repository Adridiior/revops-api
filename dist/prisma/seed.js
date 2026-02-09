"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// prisma/seed.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("🌱 Seeding database...");
    // 1) Cleanup (ordine: prima children poi parents)
    await prisma.deal.deleteMany();
    await prisma.account.deleteMany();
    await prisma.rep.deleteMany();
    // 2) Accounts
    const acme = await prisma.account.create({
        data: {
            name: "Acme Inc",
            industry: "SaaS",
            website: "https://acme.com",
        },
    });
    const globex = await prisma.account.create({
        data: {
            name: "Globex Corp",
            industry: "Manufacturing",
            website: "https://globex.com",
        },
    });
    // 3) Reps
    await prisma.rep.createMany({
        data: [
            { id: "rep_adriano", name: "Adriano" },
            { id: "rep_alice", name: "Alice" },
            { id: "rep_marco", name: "Marco" },
        ],
    });
    // 4) Deals (almeno 3 >= 10k per KPI realistici)
    await prisma.deal.createMany({
        data: [
            // BIG deals (>= 10k)
            {
                name: "Enterprise Renewal",
                value: 12000,
                stage: "QUALIFIED",
                owner: "Adriano",
                accountId: acme.id,
            },
            {
                name: "Mid-Market Expansion",
                value: 18500,
                stage: "PROPOSAL",
                owner: "Marco",
                accountId: globex.id,
            },
            {
                name: "New Logo - Acme",
                value: 22000,
                stage: "WON",
                owner: "Alice",
                accountId: acme.id,
            },
            // Normal pipeline (< 10k)
            { name: "Starter Plan", value: 2500, stage: "LEAD", owner: "Adriano", accountId: null },
            { name: "SMB Trial", value: 4200, stage: "QUALIFIED", owner: "Marco", accountId: null },
            { name: "Pilot Project", value: 7800, stage: "PROPOSAL", owner: "Alice", accountId: null },
            { name: "Upsell Add-on", value: 6400, stage: "QUALIFIED", owner: "Adriano", accountId: acme.id },
            { name: "Churn Recovery", value: 3000, stage: "LEAD", owner: "Marco", accountId: null },
            { name: "Contract Review", value: 9500, stage: "PROPOSAL", owner: "Alice", accountId: globex.id },
        ],
    });
    // 5) Counts + single summary log
    const accountsCount = await prisma.account.count();
    const dealsCount = await prisma.deal.count();
    const repsCount = await prisma.rep.count();
    console.log(`✅ Seed completed: ${accountsCount} accounts, ${dealsCount} deals, ${repsCount} reps`);
}
main()
    .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map