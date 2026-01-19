import fs from "fs";
import path from "path";

export async function POST(req) {
  const { username, password } = await req.json();
  const file = path.join(process.cwd(), "data/users.json");
  const db = JSON.parse(fs.readFileSync(file));

  const user = db.users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return Response.json({ success:false, message:"Invalid login" });
  }

  if (user.expired_day === 0) {
    return Response.json({ success:true, expired:"PERMANENT" });
  }

  if (!user.first_login) {
    user.first_login = Date.now();
    fs.writeFileSync(file, JSON.stringify(db, null, 2));
  }

  const expireAt = user.first_login + user.expired_day * 86400000;
  if (Date.now() > expireAt) {
    return Response.json({ success:false, message:"Expired" });
  }

  const left = Math.ceil((expireAt - Date.now()) / 86400000);
  return Response.json({ success:true, expired_in_day:left });
}