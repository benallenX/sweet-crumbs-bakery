// Edit this file each week before the Monday cron run (see app/api/cron/weekly-deals/route.ts)
// to update what subscribers receive. There's no admin UI yet — changes require a redeploy.

export type WeeklyDealItem = {
  name: string
  note: string
}

export const weeklyDeal = {
  subject: "This Week's Deals at Sweet Crumbs Bakery",
  headline: 'This Week at Sweet Crumbs',
  intro:
    "Here's what's fresh, new, and on sale this week. Stop by before it's gone!",
  items: [
    { name: '20% off Sourdough Loaves', note: 'Monday – Wednesday only.' },
    { name: 'New: Pistachio Croissant', note: 'Available starting this weekend.' },
    { name: 'Buy 6 Cinnamon Rolls, Get 2 Free', note: 'While supplies last.' },
  ] satisfies WeeklyDealItem[],
  smsBody:
    "Sweet Crumbs Bakery: This week — 20% off sourdough (Mon-Wed), new Pistachio Croissant, and buy 6 get 2 free cinnamon rolls! Reply STOP to unsubscribe.",
}
