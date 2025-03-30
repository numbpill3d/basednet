"use strict";(()=>{var e={};e.id=682,e.ids=[682],e.modules={2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},5900:e=>{e.exports=require("pg")},9491:e=>{e.exports=require("assert")},8709:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},2361:e=>{e.exports=require("events")},3685:e=>{e.exports=require("http")},5687:e=>{e.exports=require("https")},3477:e=>{e.exports=require("querystring")},7310:e=>{e.exports=require("url")},3837:e=>{e.exports=require("util")},9796:e=>{e.exports=require("zlib")},9160:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>w,originalPathname:()=>S,patchFetch:()=>f,requestAsyncStorage:()=>p,routeModule:()=>d,serverHooks:()=>R,staticGenerationAsyncStorage:()=>y,staticGenerationBailout:()=>T});var s={};r.r(s),r.d(s,{GET:()=>l,POST:()=>E});var a=r(5419),n=r(9108),i=r(9678),o=r(8070),u=r(2002),c=r(6707);async function l(e){try{let t=await (0,u.ts)();if(!t)return o.Z.json({error:"Unauthorized"},{status:401});let r=new URL(e.url),s=parseInt(r.searchParams.get("limit")||"10"),a=parseInt(r.searchParams.get("offset")||"0"),n=await c.Q.findByUser(t.id,s,a),i=await c.Q.getContentStats(t.id);return o.Z.json({content:n,stats:i})}catch(e){return console.error("Error fetching IPFS content:",e),o.Z.json({error:"Failed to fetch IPFS content"},{status:500})}}async function E(e){try{let t=await (0,u.ts)();if(!t)return o.Z.json({error:"Unauthorized"},{status:401});let{cid:r,contentType:s,filename:a,size:n}=await e.json();if(!r)return o.Z.json({error:"CID is required"},{status:400});let i=await c.Q.create(t.id,r,s,a,n);return o.Z.json({content:i},{status:201})}catch(e){return console.error("Error creating IPFS content:",e),o.Z.json({error:"Failed to create IPFS content"},{status:500})}}let d=new a.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/ipfs/route",pathname:"/api/ipfs",filename:"route",bundlePath:"app/api/ipfs/route"},resolvedPagePath:"C:\\Users\\adoni\\Desktop\\projects\\basednet\\src\\app\\api\\ipfs\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:p,staticGenerationAsyncStorage:y,serverHooks:R,headerHooks:w,staticGenerationBailout:T}=d,S="/api/ipfs/route";function f(){return(0,i.patchFetch)({serverHooks:R,staticGenerationAsyncStorage:y})}},3783:(e,t,r)=>{r.d(t,{Z:()=>s});let s=new(r(5900)).Pool({user:process.env.POSTGRES_USER,password:process.env.POSTGRES_PASSWORD,host:process.env.POSTGRES_HOST,port:parseInt(process.env.POSTGRES_PORT||"5432"),database:process.env.POSTGRES_DB,ssl:{rejectUnauthorized:!1}})},6707:(e,t,r)=>{r.d(t,{Q:()=>a});var s=r(3783);class a{static async create(e,t,r,a,n){let i=`
      INSERT INTO ipfs_content (user_id, cid, content_type, filename, size)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;return(await s.Z.query(i,[e,t,r,a,n])).rows[0]}static async findByCid(e){return(await s.Z.query("SELECT * FROM ipfs_content WHERE cid = $1",[e])).rows[0]||null}static async findByUser(e,t=10,r=0){let a=`
      SELECT * FROM ipfs_content 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3
    `;return(await s.Z.query(a,[e,t,r])).rows}static async setPinStatus(e,t){let r=`
      UPDATE ipfs_content 
      SET pinned = $2 
      WHERE cid = $1 
      RETURNING *
    `;return(await s.Z.query(r,[e,t])).rows[0]||null}static async delete(e,t){let r=await s.Z.query("DELETE FROM ipfs_content WHERE cid = $1 AND user_id = $2 RETURNING id",[e,t]);return null!==r.rowCount&&r.rowCount>0}static async getPinnedContent(e=100){let t=`
      SELECT * FROM ipfs_content 
      WHERE pinned = true 
      ORDER BY created_at DESC 
      LIMIT $1
    `;return(await s.Z.query(t,[e])).rows}static async getContentStats(e){let t=`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN pinned THEN 1 ELSE 0 END) as pinned,
        COALESCE(SUM(size), 0) as total_size
      FROM ipfs_content 
      WHERE user_id = $1
    `,r=await s.Z.query(t,[e]);return{total:parseInt(r.rows[0].total),pinned:parseInt(r.rows[0].pinned),totalSize:parseInt(r.rows[0].total_size)}}}},5566:(e,t,r)=>{r.d(t,{t:()=>a});var s=r(3783);class a{static async create(e,t){let r=["user_id",...Object.keys(t)],a=[e,...Object.values(t)],n=r.map((e,t)=>`$${t+1}`).join(", "),i=`
      INSERT INTO profiles (${r.join(", ")})
      VALUES (${n})
      RETURNING *
    `;return(await s.Z.query(i,a)).rows[0]}static async findByUserId(e){return(await s.Z.query("SELECT * FROM profiles WHERE user_id = $1",[e])).rows[0]||null}static async update(e,t){let r=["display_name","bio","avatar_url","theme_preferences","custom_css","custom_html","social_links"],a=Object.keys(t).filter(e=>r.includes(e));if(0===a.length)return null;let n=a.map((e,t)=>`${e} = $${t+2}`).join(", "),i=a.map(e=>{let r=t[e];return["theme_preferences","social_links"].includes(e)?JSON.stringify(r):r}),o=`
      UPDATE profiles 
      SET ${n}, updated_at = CURRENT_TIMESTAMP 
      WHERE user_id = $1 
      RETURNING *
    `;return(await s.Z.query(o,[e,...i])).rows[0]||null}static async delete(e){let t=await s.Z.query("DELETE FROM profiles WHERE user_id = $1 RETURNING id",[e]);return null!==t.rowCount&&t.rowCount>0}static async getTheme(e){let t=await s.Z.query("SELECT theme_preferences FROM profiles WHERE user_id = $1",[e]);return t.rows[0]?.theme_preferences||null}static async updateTheme(e,t){let r=`
      UPDATE profiles 
      SET theme_preferences = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE user_id = $1
    `,a=await s.Z.query(r,[e,JSON.stringify(t)]);return null!==a.rowCount&&a.rowCount>0}}},4111:(e,t,r)=>{r.d(t,{T:()=>a});var s=r(3783);class a{static async create(e,t,r){let a=`
      INSERT INTO users (username, email, auth_domain)
      VALUES ($1, $2, $3)
      RETURNING *
    `;return(await s.Z.query(a,[e,t,r])).rows[0]}static async findById(e){return(await s.Z.query("SELECT * FROM users WHERE id = $1",[e])).rows[0]||null}static async findByUsername(e){return(await s.Z.query("SELECT * FROM users WHERE username = $1",[e])).rows[0]||null}static async update(e,t){let r=["username","email","auth_domain"],a=Object.keys(t).filter(e=>r.includes(e));if(0===a.length)return null;let n=a.map((e,t)=>`${e} = $${t+2}`).join(", "),i=a.map(e=>t[e]),o=`
      UPDATE users 
      SET ${n}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;return(await s.Z.query(o,[e,...i])).rows[0]||null}static async delete(e){return((await s.Z.query("DELETE FROM users WHERE id = $1 RETURNING id",[e])).rowCount??0)>0}static async list(e=10,t=0){return(await s.Z.query("SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2",[e,t])).rows}}},874:(e,t,r)=>{r.d(t,{L:()=>i});var s=r(5900);if(!process.env.DATABASE_URL)throw Error("DATABASE_URL is not defined");let a=new s.Pool({connectionString:process.env.DATABASE_URL,max:20,idleTimeoutMillis:3e4,connectionTimeoutMillis:2e3});async function n(e){let t=await a.connect();try{await t.query("BEGIN");let r=await e(t);return await t.query("COMMIT"),r}catch(e){throw await t.query("ROLLBACK"),e}finally{t.release()}}a.query("SELECT NOW()",e=>{e?console.error("Database connection error:",e.message):console.log("Database connected successfully")}),process.on("SIGTERM",async()=>{console.log("Closing database pool"),await a.end()});let i={providers:[(0,r(6485).Z)({name:"IndieAuth",credentials:{username:{label:"Username",type:"text"},password:{label:"Password",type:"password"}},authorize:async e=>e?.username?{id:"1",name:e.username,email:`${e.username}@example.com`}:null})],callbacks:{async session({session:e,token:t}){try{if(e.user)return await n(async t=>{let r=await t.query("SELECT * FROM users WHERE email = $1",[e.user?.email]);return r.rows[0]?{...e,user:{...e.user,id:r.rows[0].id,username:r.rows[0].username}}:e});return e}catch(t){return console.error("Error getting session:",t),e}},jwt:async({token:e,user:t})=>(t&&(e.id=t.id),e)},pages:{signIn:"/auth/signin",error:"/auth/error"},debug:!1,session:{strategy:"jwt"}}},2002:(e,t,r)=>{r.d(t,{Fs:()=>o,mk:()=>u,ts:()=>i});var s=r(9605),a=r(874),n=r(4111);async function i(){let e=await (0,s.Z1)(a.L);return e?.user?.id?await n.T.findById(e.user.id):null}async function o(e,t){return e===t}async function u(){let e=await (0,s.Z1)(a.L);if(!e?.user?.id)throw Error("Authentication required");return e}r(5566)}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,938,70],()=>r(9160));module.exports=s})();