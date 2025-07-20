import { connectMongoose } from "@/lib/reportConnectdb";
import { Report } from "@/model/Report";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // update this path as per your project

export async function POST(req) {
  try {
   console.log("POST request received");
    const session = await getServerSession(authOptions);
   console.log("POST request received");

    if (!session || !session.user || !session.user.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
   console.log("POST request received");

    const { message } = await req.json();
    if (!message || message.trim() === "") {
      return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
    }
   console.log("POST request received");

    await connectMongoose();
   console.log("POST request received11");

    const newReport = await Report.create({
      message,
      userId: session.user.email, // or use session.user.id if you store user id
    });
   console.log("POST request received11");

    return new Response(JSON.stringify({ success: true, report: newReport }), {
      status: 201,
    });
  } catch (error) {
    console.error("Report submission error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
