"use server";

import { createClient } from "@/utils/supabase/server";
import { checkUser } from "@/lib/actions/user";
import { generateUUID } from "@/lib/uuid";
import { revalidatePath } from "next/cache";
import { NextResponse } from 'next/server';
import createSqliteConnection from "@/lib/sqlite/createConn";
import insertLocalJournal from "@/lib/sqlite/insert";
import { redirect } from "next/dist/server/api-utils";

// Types
interface JournalRequest {
  sentiments: Record<string, any>;
  content: string;
  browserInfo: string;
}

/**
 * Create a journal
 * @param {Request} request - The request object containing journal data
 * @returns {Promise<NextResponse>} - JSON response with status
 */
export async function POST(request: Request): Promise<NextResponse> {
  const uuid = generateUUID();

  try {
    const { sentiments, content, browserInfo } = await request.json() as JournalRequest;
    const supabase = await createClient();
    const { data: user, error: userError } = await supabase.auth.getUser();
    console.log("Auth check - userError:", userError);
    console.log("Auth check - user object:", user?.user ? { id: user.user.id, email: user.user.email } : 'null');
    
    const userId = await checkUser();
    console.log("checkUser() result:", userId);

    // Handle unauthenticated user - store in SQLite
    if (!userId || !user) {
      try {
        console.log("userId", userId);
        const db = await createSqliteConnection();
        await insertLocalJournal(db, [
          uuid,
          new Date(),
          browserInfo,
          JSON.stringify(sentiments),
          content
        ]);

        return NextResponse.json({
          success: true,
          id: uuid,
          message: "Journal saved locally"
        }, { status: 201 });
      } catch (dbError) {
        console.error('Local database error:', dbError);
        return NextResponse.json({
          error: "Failed to save journal locally"
        }, { status: 500 });
      }
    }

    // Handle authenticated user - store in Supabase
    try {

      const { error: supabaseError } = await supabase
        .from("Journals")
        .insert({
          id: uuid,
          user_id: userId,
          sentiments: JSON.stringify(sentiments),
          content
        });

      if (supabaseError) {
        console.error("Supabase insert error details:", {
          code: supabaseError.code,
          message: supabaseError.message,
          details: supabaseError.details,
          hint: supabaseError.hint
        });
        throw new Error(supabaseError.message);
      }

      revalidatePath("/journals");
      
      return NextResponse.json({
        success: true,
        id: uuid,
        message: "Journal created successfully"
      }, { status: 201 });
    } catch (supabaseError) {
      console.error('Supabase error:', supabaseError);
      return NextResponse.json({
        error: "Failed to save journal to database"
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json({
      error: "Failed to process journal creation request"
    }, { status: 400 });
  }
}

/**
 * Delete a journal
 * @param {Request} request - The request object containing journal ID
 * @returns {Promise<NextResponse>} - JSON response with status
 */
// export async function DELETE(request: Request) {
//   try {
//     const { id } = await request.json() as { id: string };
    
//     if (!id) {
//       return NextResponse.json({
//         error: "Journal ID is required"
//       }, { status: 400 });
//     }

//     const supabase = await createClient();
//     const { error } = await supabase
//       .from("journals")
//       .delete()
//       .eq("id", id);

//     if (error) {
//       throw new Error(error.message);
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Journal deleted successfully"
//     }, { status: 200 });
//   } catch (error) {
//     console.error('Delete operation error:', error);
//     return NextResponse.json({
//       error: "Failed to delete journal"
//     }, { status: 500 });
//   }
// }

