"use strict";(()=>{var e={};e.id=508,e.ids=[508],e.modules={2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9491:e=>{e.exports=require("assert")},8709:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},2361:e=>{e.exports=require("events")},3685:e=>{e.exports=require("http")},5687:e=>{e.exports=require("https")},3477:e=>{e.exports=require("querystring")},7310:e=>{e.exports=require("url")},3837:e=>{e.exports=require("util")},9796:e=>{e.exports=require("zlib")},5781:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>R,originalPathname:()=>m,patchFetch:()=>S,requestAsyncStorage:()=>y,routeModule:()=>p,serverHooks:()=>f,staticGenerationAsyncStorage:()=>T,staticGenerationBailout:()=>w});var s={};r.r(s),r.d(s,{DELETE:()=>E,GET:()=>d,PATCH:()=>l});var n=r(5419),a=r(9108),i=r(9678),o=r(8070),u=r(2002),c=r(6707);async function d(e,{params:t}){try{let{cid:e}=t,r=await c.Q.findByCid(e);if(!r)return o.Z.json({error:"Content not found"},{status:404});return o.Z.json({content:r})}catch(e){return console.error("Error fetching IPFS content:",e),o.Z.json({error:"Failed to fetch IPFS content"},{status:500})}}async function l(e,{params:t}){try{let r=await (0,u.ts)();if(!r)return o.Z.json({error:"Unauthorized"},{status:401});let{cid:s}=t,{pinned:n}=await e.json();if(void 0===n)return o.Z.json({error:"No valid update fields provided"},{status:400});let a=await c.Q.findByCid(s);if(!a)return o.Z.json({error:"Content not found"},{status:404});if(!await (0,u.Fs)(r.id,a.user_id))return o.Z.json({error:"Forbidden"},{status:403});let i=await c.Q.setPinStatus(s,n);return o.Z.json({content:i})}catch(e){return console.error("Error updating IPFS content:",e),o.Z.json({error:"Failed to update IPFS content"},{status:500})}}async function E(e,{params:t}){try{let e=await (0,u.ts)();if(!e)return o.Z.json({error:"Unauthorized"},{status:401});let{cid:r}=t,s=await c.Q.findByCid(r);if(!s)return o.Z.json({error:"Content not found"},{status:404});if(!await (0,u.Fs)(e.id,s.user_id))return o.Z.json({error:"Forbidden"},{status:403});if(!await c.Q.delete(r,e.id))return o.Z.json({error:"Failed to delete content"},{status:500});return o.Z.json({success:!0})}catch(e){return console.error("Error deleting IPFS content:",e),o.Z.json({error:"Failed to delete IPFS content"},{status:500})}}let p=new n.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/ipfs/[cid]/route",pathname:"/api/ipfs/[cid]",filename:"route",bundlePath:"app/api/ipfs/[cid]/route"},resolvedPagePath:"C:\\Users\\adoni\\Desktop\\projects\\basednet\\src\\app\\api\\ipfs\\[cid]\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:y,staticGenerationAsyncStorage:T,serverHooks:f,headerHooks:R,staticGenerationBailout:w}=p,m="/api/ipfs/[cid]/route";function S(){return(0,i.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:T})}},9470:(e,t,r)=>{r.r(t),r.d(t,{GET:()=>a,POST:()=>a,authOptions:()=>n});var s=r(9605);!function(){var e=Error("Cannot find module '@/lib/db'");throw e.code="MODULE_NOT_FOUND",e}();let n={providers:[{id:"indieauth",name:"IndieAuth",type:"oauth",authorization:{url:"https://indieauth.com/auth",params:{scope:"profile email"}},token:{url:"https://tokens.indieauth.com/token"},userinfo:{url:"https://indieauth.com/userinfo",request:async({tokens:e,client:t})=>({id:e.me,name:e.name||e.me,email:e.email,image:e.photo})},profile:e=>({id:e.id,name:e.name,email:e.email,image:e.image}),clientId:process.env.INDIE_AUTH_CLIENT_ID,clientSecret:process.env.INDIE_AUTH_CLIENT_SECRET}],callbacks:{async signIn({user:e,account:t,profile:r}){try{return await Object(function(){var e=Error("Cannot find module '@/lib/db'");throw e.code="MODULE_NOT_FOUND",e}())(async e=>{let t=await e.query("SELECT * FROM users WHERE auth_domain = $1",[r.id]);0===t.rows.length&&(await e.query("INSERT INTO users (username, auth_domain, email) VALUES ($1, $2, $3)",[r.name,r.id,r.email]),await e.query("INSERT INTO profiles (user_id) VALUES (currval('users_id_seq'))"))}),!0}catch(e){return console.error("Error during sign in:",e),!1}},async session({session:e,user:t}){try{return await Object(function(){var e=Error("Cannot find module '@/lib/db'");throw e.code="MODULE_NOT_FOUND",e}())(async t=>{let r=await t.query("SELECT * FROM users WHERE email = $1",[e.user?.email]);return r.rows[0]?{...e,user:{...e.user,id:r.rows[0].id,username:r.rows[0].username}}:e})}catch(t){return console.error("Error getting session:",t),e}}},pages:{signIn:"/auth/signin",error:"/auth/error"},debug:!1},a=(0,s.ZP)(n)},9537:(e,t,r)=>{r.d(t,{Z:()=>s});let s=new(require("pg")).Pool({user:process.env.POSTGRES_USER,password:process.env.POSTGRES_PASSWORD,host:process.env.POSTGRES_HOST,port:parseInt(process.env.POSTGRES_PORT||"5432"),database:process.env.POSTGRES_DB,ssl:{rejectUnauthorized:!1}})},6707:(e,t,r)=>{r.d(t,{Q:()=>n});var s=r(9537);class n{static async create(e,t,r,n,a){let i=`
      INSERT INTO ipfs_content (user_id, cid, content_type, filename, size)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;return(await s.Z.query(i,[e,t,r,n,a])).rows[0]}static async findByCid(e){return(await s.Z.query("SELECT * FROM ipfs_content WHERE cid = $1",[e])).rows[0]||null}static async findByUser(e,t=10,r=0){let n=`
      SELECT * FROM ipfs_content 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3
    `;return(await s.Z.query(n,[e,t,r])).rows}static async setPinStatus(e,t){let r=`
      UPDATE ipfs_content 
      SET pinned = $2 
      WHERE cid = $1 
      RETURNING *
    `;return(await s.Z.query(r,[e,t])).rows[0]||null}static async delete(e,t){return(await s.Z.query("DELETE FROM ipfs_content WHERE cid = $1 AND user_id = $2 RETURNING id",[e,t])).rowCount>0}static async getPinnedContent(e=100){let t=`
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
    `,r=await s.Z.query(t,[e]);return{total:parseInt(r.rows[0].total),pinned:parseInt(r.rows[0].pinned),totalSize:parseInt(r.rows[0].total_size)}}}},5566:(e,t,r)=>{r.d(t,{t:()=>n});var s=r(9537);class n{static async create(e,t){let r=["user_id",...Object.keys(t)],n=[e,...Object.values(t)],a=r.map((e,t)=>`$${t+1}`).join(", "),i=`
      INSERT INTO profiles (${r.join(", ")})
      VALUES (${a})
      RETURNING *
    `;return(await s.Z.query(i,n)).rows[0]}static async findByUserId(e){return(await s.Z.query("SELECT * FROM profiles WHERE user_id = $1",[e])).rows[0]||null}static async update(e,t){let r=["display_name","bio","avatar_url","theme_preferences","custom_css","custom_html","social_links"],n=Object.keys(t).filter(e=>r.includes(e));if(0===n.length)return null;let a=n.map((e,t)=>`${e} = $${t+2}`).join(", "),i=n.map(e=>{let r=t[e];return["theme_preferences","social_links"].includes(e)?JSON.stringify(r):r}),o=`
      UPDATE profiles 
      SET ${a}, updated_at = CURRENT_TIMESTAMP 
      WHERE user_id = $1 
      RETURNING *
    `;return(await s.Z.query(o,[e,...i])).rows[0]||null}static async delete(e){return(await s.Z.query("DELETE FROM profiles WHERE user_id = $1 RETURNING id",[e])).rowCount>0}static async getTheme(e){let t=await s.Z.query("SELECT theme_preferences FROM profiles WHERE user_id = $1",[e]);return t.rows[0]?.theme_preferences||null}static async updateTheme(e,t){let r=`
      UPDATE profiles 
      SET theme_preferences = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE user_id = $1
    `;return(await s.Z.query(r,[e,JSON.stringify(t)])).rowCount>0}}},4111:(e,t,r)=>{r.d(t,{T:()=>n});var s=r(9537);class n{static async create(e,t,r){let n=`
      INSERT INTO users (username, email, auth_domain)
      VALUES ($1, $2, $3)
      RETURNING *
    `;return(await s.Z.query(n,[e,t,r])).rows[0]}static async findById(e){return(await s.Z.query("SELECT * FROM users WHERE id = $1",[e])).rows[0]||null}static async findByUsername(e){return(await s.Z.query("SELECT * FROM users WHERE username = $1",[e])).rows[0]||null}static async update(e,t){let r=["username","email","auth_domain"],n=Object.keys(t).filter(e=>r.includes(e));if(0===n.length)return null;let a=n.map((e,t)=>`${e} = $${t+2}`).join(", "),i=n.map(e=>t[e]),o=`
      UPDATE users 
      SET ${a}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;return(await s.Z.query(o,[e,...i])).rows[0]||null}static async delete(e){return((await s.Z.query("DELETE FROM users WHERE id = $1 RETURNING id",[e])).rowCount??0)>0}static async list(e=10,t=0){return(await s.Z.query("SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2",[e,t])).rows}}},2002:(e,t,r)=>{r.d(t,{Fs:()=>o,mk:()=>u,ts:()=>i});var s=r(9605),n=r(9470),a=r(4111);async function i(){let e=await (0,s.Z1)(n.authOptions);return e?.user?.id?await a.T.findById(e.user.id):null}async function o(e,t){return e===t}async function u(){let e=await (0,s.Z1)(n.authOptions);if(!e?.user?.id)throw Error("Authentication required");return e}r(5566)}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,536,70],()=>r(5781));module.exports=s})();