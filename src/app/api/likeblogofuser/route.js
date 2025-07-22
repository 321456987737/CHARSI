import { connectDB } from "@/lib/blogconnectdb";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function PATCH (req){
   try{
      await connectDB();
      const {email , id } = await req.json();

      const user = await User.findOne({email});
      if(!user){
         return NextResponse.json({sucess : false , message : "User not found"} , {status : 404})
      }

      const index = (user.likedblogs || []).indexOf(id);

      if (index === -1) {
        await User.updateOne({ email }, { $addToSet: { likedblogs: id } });
      } else {
        await User.updateOne({ email }, { $pull: { likedblogs: id } });
      }

      return NextResponse.json({sucess : true});
   }catch(err){
      console.error(err);
      return NextResponse.json({sucess : false , message : "Server error"} , {status : 500})
   }
}