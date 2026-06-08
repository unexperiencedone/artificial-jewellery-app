import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const PRODUCTS = [
  {
    name: "Aurelia Drop Earrings",
    slug: "aurelia-drop-earrings",
    price: 3499,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUq2zJp1hcqt8qU4EF9Iqd8fwUi3lz_InBHF3tnS-8GyEkOFdEOB9N69l5Pt2fzBZFiu-l3wmJwjoGk0--CkVa91Ck62VSpjW3vv5hrcTf70LBxoLVqMbigMiJSPRIHgo1eu-7Zu5Ojeu6eMjjzWZzqPXU0OmIsq1g03uuulH3az6HIrTkjj3MDiGakacEzm_7uA57x6reFY9-CK9aUrdIdfn-UcmVGKRwrdZq06xY_Rz9cH2po7TzKv78DzH-ReQa1OAYKhhrVNw",
    collection: "pearl-essentials",
    bestseller: true,
  },
  {
    name: "Elysian Pendant",
    slug: "elysian-pendant",
    price: 2850,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAVY-hitPabtb6sBfs9i3rEVQcsVvIhrqkay5yxIPcq09voytOmxW1LJf727Gah5gac7nz66ywhQ3777iZgR7LZea11qsOEeaA9Iy895P08Zmf1614GQRfX0_5JCp6vr03IkdRnigSAmPxE7HwJ2gvweCK5fMzwoBoqapWiohM8y6_f58lVZEaXlrPmR4F-tHz5g6-BEUHNEZ4pVXp0LOxxO0wYlMcYzeqk0ySiLJlG39kKDskMuXlZcuTBb2G6G3JIIWxfwD9IGfo",
    collection: "minimalist-gold",
    bestseller: true,
  },
  {
    name: "Moonlit Flora Cuff",
    slug: "moonlit-flora-cuff",
    price: 4200,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAO4ADEKmx23sQqtCpt1EKfmMTjlYoBkW7sDFBtK2h_4sTzvmd3ifXmG0rSdj4cDOdw3nXvWpInt3xiqWY99h53MfIcJ9NaxQZLTYa0ryB2_k6AqPB62kTgH__ZFdM6J9QS8iTeWbwBVlm3JegYD4DEBXnDBy129nIPvDMFS12YdiK_585cn8le5j-WGaClPxKxwnpRUUpnDtT-g9FS24R7wHh_DH_TfP09WRzkYOG24HhLGwGWWmxLvUIVZ-iCgaybgJgDjNld47I",
    collection: "statement-pieces",
    bestseller: true,
  },
  {
    name: "Stardust Ring Set",
    slug: "stardust-ring-set",
    price: 5100,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBx1ApUoEgTRnRmEzZEWgkbKfHzNwlpSR829mBJe_Onjt7GS_aOa-d0JhqYXJOZAYFLntpTdsIqd24iwVcygq_j-EBkoXZFN-SC3pGIJLvns4jxZRo9j01qNue71wdYB2w3iBYjhzv9mdKRGXglLBrbhduOZSmuBR2Gvl2PZyQDqFJMb6W4WMsjYtiGbZ-Jhfh2zpmVXL6fIOESES5U_M8-MsgBBAd9QuRtTtIDn9FEznVsf1he7pH93TdQIEP8wQiUYT0-tUAu8Dw",
    collection: "bridal-edit",
    bestseller: true,
  },
  {
    name: "Celeste Pearl Choker",
    slug: "celeste-pearl-choker",
    price: 6200,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAanoOPynoBG-qfbkPlMEY02hipig61yYr0ad0PPW3dIwG2T_u4ustf0qKaWhy_78IneIAlJoqmDuFnfGuYqM2JE06myTXpZ9rAY83TdWL0oEcAEN9KYR9RRiW-RiPvBWvo11RHY-53t_CrQ5mrYDV3W_K0Dd--sdfbDFt8NGTUn5VKsQelrRkCwNUMZunmgqmtv0jPrWc_tLn_v9cboxFocg3QpgQWIbB1-OauKvgt4Z_gsIucntsjtfaRKfFf498f-7b63eEUGs",
    collection: "pearl-essentials",
    bestseller: false,
  },
  {
    name: "Gilded Horizon Bracelet",
    slug: "gilded-horizon-bracelet",
    price: 3750,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTTLqwFEsZ9nL2QH1M7MgxJrbTCx5nnvNc7RkZA7BYAkU4padS9_Sz6K58uv3UxpoFqS6DONvYkiAAKBAqRCuEmupRf8Ni8y9LOK91UROp_hfoq9ynbdXGYJ094LhnCs9mgOXe-MlVZjHpbVSkVRFQ5wWRGqyeL_QpEueLkft6DCYw91LZkyQCTgg1SkaWNc1zXRWeWdjfT0EUys6mHLm9QbheeMMz9XJVsEz7eiSx3DNhpWejdWgmJm6kfFNl9Y9BCyywdGSq28c",
    collection: "minimalist-gold",
    bestseller: false,
  },
];

async function main() {
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@lumiere.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin@123456";
  const adminName = process.env.ADMIN_NAME ?? "Lumière Admin";

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN", passwordHash, name: adminName },
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`Admin seeded: ${adminEmail}`);

  for (const product of PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log(`Seeded ${PRODUCTS.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
