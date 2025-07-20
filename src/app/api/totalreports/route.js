import { connectMongoose } from "@/lib/reportConnectdb";
import { Report } from "@/model/Report";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectMongoose();

  const allReports = await Report.find({});
  const now = new Date();
  const monthlyMap = new Map();

  // Initialize last 12 months
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthlyMap.set(key, 0);
  }

  // Count reports per month
  allReports.forEach((report) => {
    const createdAt = new Date(report.createdAt);
    const key = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, "0")}`;
    if (monthlyMap.has(key)) {
      monthlyMap.set(key, monthlyMap.get(key) + 1);
    }
  });

  // Format monthly response
  const monthlyReports = Array.from(monthlyMap.entries()).map(([key, count]) => {
    const [year, month] = key.split("-");
    const date = new Date(year, month - 1);
    const monthName = date.toLocaleString("default", { month: "short" });
    return { month: monthName, count };
  });

  // Get latest 5 reports
  const latestReports = await Report.find({})
    .sort({ createdAt: -1 })
    .limit(5);

  return NextResponse.json({
    totalReports: allReports.length,
    monthlyReports,
    latestReports, // 👈 added here
  });
}


// import {connectMongoose} from "@/lib/reportConnectdb";
// import { Report } from "@/model/Report";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//    await connectMongoose();

//   const allReports = await Report.find({});
//   const now = new Date();
//   const monthlyMap = new Map();

//   // Initialize last 12 months
//   for (let i = 11; i >= 0; i--) {
//     const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
//     const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
//     monthlyMap.set(key, 0);
//   }


//   // Count reports per month
//   allReports.forEach((report) => {
//     const createdAt = new Date(report.createdAt);
//     const key = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, "0")}`;
//     if (monthlyMap.has(key)) {
//       monthlyMap.set(key, monthlyMap.get(key) + 1);
//     }
//   });

//   // Format response
//   const monthlyReports = Array.from(monthlyMap.entries()).map(([key, count]) => {
//     const [year, month] = key.split("-");
//     const date = new Date(year, month - 1);
//     const monthName = date.toLocaleString("default", { month: "short" });
//     return { month: monthName, count };
//   });

//   return NextResponse.json({
//     totalReports: allReports.length,
//     monthlyReports,
//   });
// }
