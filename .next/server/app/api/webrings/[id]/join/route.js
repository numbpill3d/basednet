"use strict";(()=>{var e={};e.id=892,e.ids=[892],e.modules={2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},5900:e=>{e.exports=require("pg")},9491:e=>{e.exports=require("assert")},8709:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},2361:e=>{e.exports=require("events")},3685:e=>{e.exports=require("http")},5687:e=>{e.exports=require("https")},3477:e=>{e.exports=require("querystring")},7310:e=>{e.exports=require("url")},3837:e=>{e.exports=require("util")},9796:e=>{e.exports=require("zlib")},9569:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>p,originalPathname:()=>y,patchFetch:()=>_,requestAsyncStorage:()=>m,routeModule:()=>c,serverHooks:()=>R,staticGenerationAsyncStorage:()=>w,staticGenerationBailout:()=>T});var s={};t.r(s),t.d(s,{DELETE:()=>d,POST:()=>E});var a=t(5419),i=t(9108),n=t(9678),u=t(8070),o=t(3168),l=t(2002);async function E(e,{params:r}){try{let e=await (0,l.mk)(),t=e.user?.id;if(!t)return u.Z.json({error:"Unauthorized",data:null},{status:401});let s=parseInt(r.id);if(isNaN(s))return u.Z.json({error:"Invalid webring ID",data:null},{status:400});if(!await o.m.findById(s))return u.Z.json({error:"Webring not found",data:null},{status:404});if(await o.m.isMember(s,t))return u.Z.json({error:"Already a member of this webring",data:null},{status:400});return await o.m.addMember(s,t),u.Z.json({data:{message:"Successfully joined webring"},error:null})}catch(e){return console.error("Error joining webring:",e),u.Z.json({error:"Failed to join webring",data:null},{status:500})}}async function d(e,{params:r}){try{let e=await (0,l.mk)(),t=e.user?.id;if(!t)return u.Z.json({error:"Unauthorized",data:null},{status:401});let s=parseInt(r.id);if(isNaN(s))return u.Z.json({error:"Invalid webring ID",data:null},{status:400});let a=await o.m.findById(s);if(!a)return u.Z.json({error:"Webring not found",data:null},{status:404});if(!await o.m.isMember(s,t))return u.Z.json({error:"Not a member of this webring",data:null},{status:400});if(a.creator_id===t)return u.Z.json({error:"Creator cannot leave their own webring. Delete it instead.",data:null},{status:400});return await o.m.removeMember(s,t),u.Z.json({data:{message:"Successfully left webring"},error:null})}catch(e){return console.error("Error leaving webring:",e),u.Z.json({error:"Failed to leave webring",data:null},{status:500})}}let c=new a.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/webrings/[id]/join/route",pathname:"/api/webrings/[id]/join",filename:"route",bundlePath:"app/api/webrings/[id]/join/route"},resolvedPagePath:"/workspaces/basednet/src/app/api/webrings/[id]/join/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:m,staticGenerationAsyncStorage:w,serverHooks:R,headerHooks:p,staticGenerationBailout:T}=c,y="/api/webrings/[id]/join/route";function _(){return(0,n.patchFetch)({serverHooks:R,staticGenerationAsyncStorage:w})}},3783:(e,r,t)=>{t.d(r,{Z:()=>s});let s=new(t(5900)).Pool({user:process.env.POSTGRES_USER,password:process.env.POSTGRES_PASSWORD,host:process.env.POSTGRES_HOST,port:parseInt(process.env.POSTGRES_PORT||"5432"),database:process.env.POSTGRES_DB,ssl:{rejectUnauthorized:!1}})},5566:(e,r,t)=>{t.d(r,{t:()=>a});var s=t(3783);class a{static async create(e,r){let t=["user_id",...Object.keys(r)],a=[e,...Object.values(r)],i=t.map((e,r)=>`$${r+1}`).join(", "),n=`
      INSERT INTO profiles (${t.join(", ")})
      VALUES (${i})
      RETURNING *
    `;return(await s.Z.query(n,a)).rows[0]}static async findByUserId(e){return(await s.Z.query("SELECT * FROM profiles WHERE user_id = $1",[e])).rows[0]||null}static async update(e,r){let t=["display_name","bio","avatar_url","theme_preferences","custom_css","custom_html","social_links"],a=Object.keys(r).filter(e=>t.includes(e));if(0===a.length)return null;let i=a.map((e,r)=>`${e} = $${r+2}`).join(", "),n=a.map(e=>{let t=r[e];return["theme_preferences","social_links"].includes(e)?JSON.stringify(t):t}),u=`
      UPDATE profiles 
      SET ${i}, updated_at = CURRENT_TIMESTAMP 
      WHERE user_id = $1 
      RETURNING *
    `;return(await s.Z.query(u,[e,...n])).rows[0]||null}static async delete(e){return((await s.Z.query("DELETE FROM profiles WHERE user_id = $1 RETURNING id",[e])).rowCount??0)>0}static async getTheme(e){let r=await s.Z.query("SELECT theme_preferences FROM profiles WHERE user_id = $1",[e]);return r.rows[0]?.theme_preferences||null}static async updateTheme(e,r){let t=`
      UPDATE profiles
      SET theme_preferences = $2, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
    `;return((await s.Z.query(t,[e,JSON.stringify(r)])).rowCount??0)>0}}},4111:(e,r,t)=>{t.d(r,{T:()=>a});var s=t(3783);class a{static async create(e,r,t){let a=`
      INSERT INTO users (username, email, auth_domain)
      VALUES ($1, $2, $3)
      RETURNING *
    `;return(await s.Z.query(a,[e,r,t])).rows[0]}static async findById(e){return(await s.Z.query("SELECT * FROM users WHERE id = $1",[e])).rows[0]||null}static async findByUsername(e){return(await s.Z.query("SELECT * FROM users WHERE username = $1",[e])).rows[0]||null}static async update(e,r){let t=["username","email","auth_domain"],a=Object.keys(r).filter(e=>t.includes(e));if(0===a.length)return null;let i=a.map((e,r)=>`${e} = $${r+2}`).join(", "),n=a.map(e=>r[e]),u=`
      UPDATE users 
      SET ${i}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;return(await s.Z.query(u,[e,...n])).rows[0]||null}static async delete(e){return((await s.Z.query("DELETE FROM users WHERE id = $1 RETURNING id",[e])).rowCount??0)>0}static async list(e=10,r=0){return(await s.Z.query("SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2",[e,r])).rows}}},3168:(e,r,t)=>{t.d(r,{m:()=>a});var s=t(3783);class a{static async create(e,r,t){let a=`
      INSERT INTO webrings (name, description, creator_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;return(await s.Z.query(a,[e,r,t])).rows[0]}static async findById(e){return(await s.Z.query("SELECT * FROM webrings WHERE id = $1",[e])).rows[0]||null}static async list(e=50,r=0){let t=`
      SELECT w.*, COUNT(wm.user_id) as member_count
      FROM webrings w
      LEFT JOIN webring_members wm ON w.id = wm.webring_id
      GROUP BY w.id
      ORDER BY w.created_at DESC
      LIMIT $1 OFFSET $2
    `;return(await s.Z.query(t,[e,r])).rows}static async delete(e){return((await s.Z.query("DELETE FROM webrings WHERE id = $1 RETURNING id",[e])).rowCount??0)>0}static async addMember(e,r){let t=`
      INSERT INTO webring_members (webring_id, user_id)
      VALUES ($1, $2)
      RETURNING *
    `;return(await s.Z.query(t,[e,r])).rows[0]}static async removeMember(e,r){return((await s.Z.query("DELETE FROM webring_members WHERE webring_id = $1 AND user_id = $2 RETURNING user_id",[e,r])).rowCount??0)>0}static async getMembers(e){let r=`
      SELECT wm.*, u.username, p.display_name, p.avatar_url
      FROM webring_members wm
      JOIN users u ON wm.user_id = u.id
      LEFT JOIN profiles p ON u.id = p.user_id
      WHERE wm.webring_id = $1
      ORDER BY wm.joined_at DESC
    `;return(await s.Z.query(r,[e])).rows}static async getUserWebrings(e){let r=`
      SELECT w.*
      FROM webrings w
      JOIN webring_members wm ON w.id = wm.webring_id
      WHERE wm.user_id = $1
      ORDER BY wm.joined_at DESC
    `;return(await s.Z.query(r,[e])).rows}static async isMember(e,r){return(await s.Z.query("SELECT 1 FROM webring_members WHERE webring_id = $1 AND user_id = $2",[e,r])).rows.length>0}static async getNextMember(e,r){let t=`
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
    `,a=await s.Z.query(t,[e,r]);return a.rows[0]?.user_id||null}static async getPreviousMember(e,r){let t=`
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
    `,a=await s.Z.query(t,[e,r]);return a.rows[0]?.user_id||null}static async getRandomMember(e,r){let t=`
      SELECT user_id
      FROM webring_members
      WHERE webring_id = $1 ${r?"AND user_id != $2":""}
      ORDER BY RANDOM()
      LIMIT 1
    `,a=await s.Z.query(t,r?[e,r]:[e]);return a.rows[0]?.user_id||null}}},2002:(e,r,t)=>{t.d(r,{Fs:()=>u,mk:()=>o,ts:()=>n});var s=t(9605),a=t(2231),i=t(4111);async function n(){let e=await (0,s.Z1)(a.L);return e?.user?.id?await i.T.findById(e.user.id):null}async function u(e,r){return e===r}async function o(){let e=await (0,s.Z1)(a.L);if(!e?.user?.id)throw Error("Authentication required");return e}t(5566)},2231:(e,r,t)=>{t.d(r,{L:()=>n});var s=t(5900);if(!process.env.DATABASE_URL)throw Error("DATABASE_URL is not defined");let a=new s.Pool({connectionString:process.env.DATABASE_URL,max:20,idleTimeoutMillis:3e4,connectionTimeoutMillis:2e3});async function i(e){let r=await a.connect();try{await r.query("BEGIN");let t=await e(r);return await r.query("COMMIT"),t}catch(e){throw await r.query("ROLLBACK"),e}finally{r.release()}}a.query("SELECT NOW()",e=>{e?console.error("Database connection error:",e.message):console.log("Database connected successfully")}),process.on("SIGTERM",async()=>{console.log("Closing database pool"),await a.end()});let n={providers:[{id:"indieauth",name:"IndieAuth",type:"oauth",authorization:{url:"https://indieauth.com/auth",params:{scope:"profile email"}},token:{url:"https://tokens.indieauth.com/token"},userinfo:{url:"https://indieauth.com/userinfo"},profile:e=>({id:e.me||e.id,name:e.name||e.me,email:e.email,image:e.photo||e.image}),clientId:process.env.INDIE_AUTH_CLIENT_ID,clientSecret:process.env.INDIE_AUTH_CLIENT_SECRET}],callbacks:{async signIn({user:e,account:r,profile:t}){try{return await i(async r=>{let t=await r.query("SELECT * FROM users WHERE auth_domain = $1",[e.id||e.email]);if(0===t.rows.length){let t=e.name?.toLowerCase().replace(/[^a-z0-9]/g,"")||e.email?.split("@")[0]||`user${Date.now()}`;await r.query("INSERT INTO users (username, auth_domain, email) VALUES ($1, $2, $3)",[t,e.id||e.email,e.email]),await r.query("INSERT INTO profiles (user_id) VALUES (currval('users_id_seq'))")}}),!0}catch(e){return console.error("Error during sign in:",e),!1}},async session({session:e,token:r}){try{return await i(async r=>{let t=await r.query("SELECT * FROM users WHERE email = $1",[e.user?.email]);return t.rows[0]?{...e,user:{...e.user,id:t.rows[0].id,username:t.rows[0].username}}:e})}catch(r){return console.error("Error getting session:",r),e}}},pages:{signIn:"/auth/signin",error:"/auth/error"},debug:!1}}};var r=require("../../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,206,605],()=>t(9569));module.exports=s})();