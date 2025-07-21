import { connectMongoose } from "@/lib/reportConnectdb";
import { Report } from "@/model/Report";

export async function POST(req) {
  try {
    const { message,email } = await req.json();
    if (!message || message.trim() === "") {
      return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
    }
   console.log("POST request received");

    await connectMongoose();
   console.log("POST request received11");

    const newReport = await Report.create({
      message,
      userId: email, // or use session.user.id if you store user id
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
