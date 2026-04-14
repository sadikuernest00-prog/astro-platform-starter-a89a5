export type Deal = {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  interestRate: number;
  durationMonths: number;
  borrowerName: string;
  status: "open" | "funded" | "active" | "completed";
  location: string;
  category: string;
};

export const starterDeals: Deal[] = [
  {
    id: "solar-roof-upgrade",
    title: "Solar Roof Upgrade",
    description:
      "A local property owner is raising capital to install a solar roof system on a rental building. Investors join the pool and share structured returns over the project term.",
    targetAmount: 25000,
    currentAmount: 9200,
    interestRate: 11,
    durationMonths: 12,
    borrowerName: "Lars H.",
    status: "open",
    location: "Oslo, Norway",
    category: "Energy",
  },
  {
    id: "micro-warehouse-expansion",
    title: "Micro Warehouse Expansion",
    description:
      "A small logistics operator needs short-term growth capital to expand inventory handling and secure a new warehouse lease. Structured repayment over 10 months.",
    targetAmount: 40000,
    currentAmount: 18800,
    interestRate: 12,
    durationMonths: 10,
    borrowerName: "Ingrid T.",
    status: "open",
    location: "Bergen, Norway",
    category: "Logistics",
  },
  {
    id: "coastal-cafe-renovation",
    title: "Coastal Café Renovation",
    description:
      "An established café is upgrading equipment, seating, and outdoor service area ahead of tourist season. Pool members fund the renovation and share fixed returns.",
    targetAmount: 18000,
    currentAmount: 14000,
    interestRate: 9,
    durationMonths: 8,
    borrowerName: "Mikael S.",
    status: "open",
    location: "Stavanger, Norway",
    category: "Hospitality",
  },
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
