import fs from "fs";
import path from "path";

export async function POST(req) {
  const { username, password, expired_day } = await req.json();
  const file = path.join(process.cwd(), "data/users.json");
  const db = JSON.parse(fs.readFileSync(file));

  db.users.push({
    username,
    password,
    expired_day,
    first_login: null,
    active: true
  });

  fs.writeFileSync(file, JSON.stringify(db, null, 2));
  return Response.json({ success:true, message:"User created" });
}