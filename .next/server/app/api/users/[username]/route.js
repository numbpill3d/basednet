"use strict";(()=>{var e={};e.id=749,e.ids=[749],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},5900:e=>{e.exports=require("pg")},3999:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>T,originalPathname:()=>m,patchFetch:()=>S,requestAsyncStorage:()=>d,routeModule:()=>E,serverHooks:()=>R,staticGenerationAsyncStorage:()=>p,staticGenerationBailout:()=>y});var s={};t.r(s),t.d(s,{GET:()=>l});var a=t(5419),n=t(9108),u=t(9678),i=t(8070),o=t(4111),c=t(5566);async function l(e,{params:r}){try{let{username:e}=r,t=await o.T.findByUsername(e);if(!t)return i.Z.json({error:"User not found"},{status:404});let s=await c.t.findByUserId(t.id),{auth_domain:a,email:n,...u}=t;return i.Z.json({user:u,profile:s})}catch(e){return console.error("Error fetching user:",e),i.Z.json({error:"Failed to fetch user"},{status:500})}}let E=new a.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/users/[username]/route",pathname:"/api/users/[username]",filename:"route",bundlePath:"app/api/users/[username]/route"},resolvedPagePath:"/workspaces/basednet/src/app/api/users/[username]/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:d,staticGenerationAsyncStorage:p,serverHooks:R,headerHooks:T,staticGenerationBailout:y}=E,m="/api/users/[username]/route";function S(){return(0,u.patchFetch)({serverHooks:R,staticGenerationAsyncStorage:p})}},3783:(e,r,t)=>{t.d(r,{Z:()=>s});let s=new(t(5900)).Pool({user:process.env.POSTGRES_USER,password:process.env.POSTGRES_PASSWORD,host:process.env.POSTGRES_HOST,port:parseInt(process.env.POSTGRES_PORT||"5432"),database:process.env.POSTGRES_DB,ssl:{rejectUnauthorized:!1}})},5566:(e,r,t)=>{t.d(r,{t:()=>a});var s=t(3783);class a{static async create(e,r){let t=["user_id",...Object.keys(r)],a=[e,...Object.values(r)],n=t.map((e,r)=>`$${r+1}`).join(", "),u=`
      INSERT INTO profiles (${t.join(", ")})
      VALUES (${n})
      RETURNING *
    `;return(await s.Z.query(u,a)).rows[0]}static async findByUserId(e){return(await s.Z.query("SELECT * FROM profiles WHERE user_id = $1",[e])).rows[0]||null}static async update(e,r){let t=["display_name","bio","avatar_url","theme_preferences","custom_css","custom_html","social_links"],a=Object.keys(r).filter(e=>t.includes(e));if(0===a.length)return null;let n=a.map((e,r)=>`${e} = $${r+2}`).join(", "),u=a.map(e=>{let t=r[e];return["theme_preferences","social_links"].includes(e)?JSON.stringify(t):t}),i=`
      UPDATE profiles 
      SET ${n}, updated_at = CURRENT_TIMESTAMP 
      WHERE user_id = $1 
      RETURNING *
    `;return(await s.Z.query(i,[e,...u])).rows[0]||null}static async delete(e){return((await s.Z.query("DELETE FROM profiles WHERE user_id = $1 RETURNING id",[e])).rowCount??0)>0}static async getTheme(e){let r=await s.Z.query("SELECT theme_preferences FROM profiles WHERE user_id = $1",[e]);return r.rows[0]?.theme_preferences||null}static async updateTheme(e,r){let t=`
      UPDATE profiles
      SET theme_preferences = $2, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
    `;return((await s.Z.query(t,[e,JSON.stringify(r)])).rowCount??0)>0}}},4111:(e,r,t)=>{t.d(r,{T:()=>a});var s=t(3783);class a{static async create(e,r,t){let a=`
      INSERT INTO users (username, email, auth_domain)
      VALUES ($1, $2, $3)
      RETURNING *
    `;return(await s.Z.query(a,[e,r,t])).rows[0]}static async findById(e){return(await s.Z.query("SELECT * FROM users WHERE id = $1",[e])).rows[0]||null}static async findByUsername(e){return(await s.Z.query("SELECT * FROM users WHERE username = $1",[e])).rows[0]||null}static async update(e,r){let t=["username","email","auth_domain"],a=Object.keys(r).filter(e=>t.includes(e));if(0===a.length)return null;let n=a.map((e,r)=>`${e} = $${r+2}`).join(", "),u=a.map(e=>r[e]),i=`
      UPDATE users 
      SET ${n}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;return(await s.Z.query(i,[e,...u])).rows[0]||null}static async delete(e){return((await s.Z.query("DELETE FROM users WHERE id = $1 RETURNING id",[e])).rowCount??0)>0}static async list(e=10,r=0){return(await s.Z.query("SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2",[e,r])).rows}}}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,206],()=>t(3999));module.exports=s})();