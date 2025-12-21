"use strict";(()=>{var e={};e.id=622,e.ids=[622],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},5900:e=>{e.exports=require("pg")},7205:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>c,originalPathname:()=>T,patchFetch:()=>g,requestAsyncStorage:()=>m,routeModule:()=>w,serverHooks:()=>l,staticGenerationAsyncStorage:()=>R,staticGenerationBailout:()=>b});var a={};t.r(a),t.d(a,{GET:()=>o});var s=t(5419),n=t(9108),i=t(9678),u=t(8070),E=t(3168),d=t(4111);async function o(e,{params:r}){try{let{searchParams:t}=new URL(e.url),a=t.get("direction")||"next",s=parseInt(t.get("from")||"0"),n=parseInt(r.id);if(isNaN(n)||isNaN(s)||0===s)return u.Z.json({error:"Invalid parameters",data:null},{status:400});if(!await E.m.findById(n))return u.Z.json({error:"Webring not found",data:null},{status:404});let i=null;switch(a){case"next":i=await E.m.getNextMember(n,s);break;case"previous":i=await E.m.getPreviousMember(n,s);break;case"random":i=await E.m.getRandomMember(n,s);break;default:return u.Z.json({error:"Invalid direction. Use: next, previous, or random",data:null},{status:400})}if(!i)return u.Z.json({error:"No target user found",data:null},{status:404});let o=await d.T.findById(i);if(!o)return u.Z.json({error:"Target user not found",data:null},{status:404});return u.Z.json({data:{userId:o.id,username:o.username,url:`/users/${o.username}`},error:null})}catch(e){return console.error("Error navigating webring:",e),u.Z.json({error:"Failed to navigate webring",data:null},{status:500})}}let w=new s.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/webrings/[id]/navigate/route",pathname:"/api/webrings/[id]/navigate",filename:"route",bundlePath:"app/api/webrings/[id]/navigate/route"},resolvedPagePath:"/workspaces/basednet/src/app/api/webrings/[id]/navigate/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:m,staticGenerationAsyncStorage:R,serverHooks:l,headerHooks:c,staticGenerationBailout:b}=w,T="/api/webrings/[id]/navigate/route";function g(){return(0,i.patchFetch)({serverHooks:l,staticGenerationAsyncStorage:R})}},3783:(e,r,t)=>{t.d(r,{Z:()=>a});let a=new(t(5900)).Pool({user:process.env.POSTGRES_USER,password:process.env.POSTGRES_PASSWORD,host:process.env.POSTGRES_HOST,port:parseInt(process.env.POSTGRES_PORT||"5432"),database:process.env.POSTGRES_DB,ssl:{rejectUnauthorized:!1}})},4111:(e,r,t)=>{t.d(r,{T:()=>s});var a=t(3783);class s{static async create(e,r,t){let s=`
      INSERT INTO users (username, email, auth_domain)
      VALUES ($1, $2, $3)
      RETURNING *
    `;return(await a.Z.query(s,[e,r,t])).rows[0]}static async findById(e){return(await a.Z.query("SELECT * FROM users WHERE id = $1",[e])).rows[0]||null}static async findByUsername(e){return(await a.Z.query("SELECT * FROM users WHERE username = $1",[e])).rows[0]||null}static async update(e,r){let t=["username","email","auth_domain"],s=Object.keys(r).filter(e=>t.includes(e));if(0===s.length)return null;let n=s.map((e,r)=>`${e} = $${r+2}`).join(", "),i=s.map(e=>r[e]),u=`
      UPDATE users 
      SET ${n}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;return(await a.Z.query(u,[e,...i])).rows[0]||null}static async delete(e){return((await a.Z.query("DELETE FROM users WHERE id = $1 RETURNING id",[e])).rowCount??0)>0}static async list(e=10,r=0){return(await a.Z.query("SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2",[e,r])).rows}}},3168:(e,r,t)=>{t.d(r,{m:()=>s});var a=t(3783);class s{static async create(e,r,t){let s=`
      INSERT INTO webrings (name, description, creator_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;return(await a.Z.query(s,[e,r,t])).rows[0]}static async findById(e){return(await a.Z.query("SELECT * FROM webrings WHERE id = $1",[e])).rows[0]||null}static async list(e=50,r=0){let t=`
      SELECT w.*, COUNT(wm.user_id) as member_count
      FROM webrings w
      LEFT JOIN webring_members wm ON w.id = wm.webring_id
      GROUP BY w.id
      ORDER BY w.created_at DESC
      LIMIT $1 OFFSET $2
    `;return(await a.Z.query(t,[e,r])).rows}static async delete(e){return((await a.Z.query("DELETE FROM webrings WHERE id = $1 RETURNING id",[e])).rowCount??0)>0}static async addMember(e,r){let t=`
      INSERT INTO webring_members (webring_id, user_id)
      VALUES ($1, $2)
      RETURNING *
    `;return(await a.Z.query(t,[e,r])).rows[0]}static async removeMember(e,r){return((await a.Z.query("DELETE FROM webring_members WHERE webring_id = $1 AND user_id = $2 RETURNING user_id",[e,r])).rowCount??0)>0}static async getMembers(e){let r=`
      SELECT wm.*, u.username, p.display_name, p.avatar_url
      FROM webring_members wm
      JOIN users u ON wm.user_id = u.id
      LEFT JOIN profiles p ON u.id = p.user_id
      WHERE wm.webring_id = $1
      ORDER BY wm.joined_at DESC
    `;return(await a.Z.query(r,[e])).rows}static async getUserWebrings(e){let r=`
      SELECT w.*
      FROM webrings w
      JOIN webring_members wm ON w.id = wm.webring_id
      WHERE wm.user_id = $1
      ORDER BY wm.joined_at DESC
    `;return(await a.Z.query(r,[e])).rows}static async isMember(e,r){return(await a.Z.query("SELECT 1 FROM webring_members WHERE webring_id = $1 AND user_id = $2",[e,r])).rows.length>0}static async getNextMember(e,r){let t=`
      WITH members AS (
        SELECT user_id, ROW_NUMBER() OVER (ORDER BY joined_at) as rn
        FROM webring_members
        WHERE webring_id = $1
      )
      SELECT user_id
      FROM members
      WHERE rn = (
        SELECT CASE
          WHEN rn = (SELECT MAX(rn) FROM members) THEN 1
          ELSE rn + 1
        END
        FROM members
        WHERE user_id = $2
      )
    `,s=await a.Z.query(t,[e,r]);return s.rows[0]?.user_id||null}static async getPreviousMember(e,r){let t=`
      WITH members AS (
        SELECT user_id, ROW_NUMBER() OVER (ORDER BY joined_at) as rn
        FROM webring_members
        WHERE webring_id = $1
      )
      SELECT user_id
      FROM members
      WHERE rn = (
        SELECT CASE
          WHEN rn = 1 THEN (SELECT MAX(rn) FROM members)
          ELSE rn - 1
        END
        FROM members
        WHERE user_id = $2
      )
    `,s=await a.Z.query(t,[e,r]);return s.rows[0]?.user_id||null}static async getRandomMember(e,r){let t=`
      SELECT user_id
      FROM webring_members
      WHERE webring_id = $1 ${r?"AND user_id != $2":""}
      ORDER BY RANDOM()
      LIMIT 1
    `,s=await a.Z.query(t,r?[e,r]:[e]);return s.rows[0]?.user_id||null}}}};var r=require("../../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),a=r.X(0,[638,206],()=>t(7205));module.exports=a})();