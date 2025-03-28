"use strict";exports.id=120,exports.ids=[120],exports.modules={2094:(e,t,r)=>{r.r(t),r.d(t,{DELETE:()=>_,GET:()=>p,HEAD:()=>w,OPTIONS:()=>m,PATCH:()=>S,POST:()=>R,PUT:()=>y,authOptions:()=>E}),r(80001);var a=r(16915),s=r(61907),n=r(58097),i=r(54580),o=r(8317),u=r(35900);if(!process.env.DATABASE_URL)throw Error("DATABASE_URL is not defined");let c=new u.Pool({connectionString:process.env.DATABASE_URL,max:20,idleTimeoutMillis:3e4,connectionTimeoutMillis:2e3});async function l(e){let t=await c.connect();try{await t.query("BEGIN");let r=await e(t);return await t.query("COMMIT"),r}catch(e){throw await t.query("ROLLBACK"),e}finally{t.release()}}c.query("SELECT NOW()",e=>{e?console.error("Database connection error:",e.message):console.log("Database connected successfully")}),process.on("SIGTERM",async()=>{console.log("Closing database pool"),await c.end()});let E={providers:[{id:"indieauth",name:"IndieAuth",type:"oauth",authorization:{url:"https://indieauth.com/auth",params:{scope:"profile email"}},token:{url:"https://tokens.indieauth.com/token"},userinfo:{url:"https://indieauth.com/userinfo",request:async({tokens:e,client:t})=>({id:e.me,name:e.name||e.me,email:e.email,image:e.photo})},profile:e=>({id:e.id,name:e.name,email:e.email,image:e.image}),clientId:process.env.INDIE_AUTH_CLIENT_ID,clientSecret:process.env.INDIE_AUTH_CLIENT_SECRET}],callbacks:{async signIn({user:e,account:t,profile:r}){try{return await l(async e=>{let t=await e.query("SELECT * FROM users WHERE auth_domain = $1",[r.id]);0===t.rows.length&&(await e.query("INSERT INTO users (username, auth_domain, email) VALUES ($1, $2, $3)",[r.name,r.id,r.email]),await e.query("INSERT INTO profiles (user_id) VALUES (currval('users_id_seq'))"))}),!0}catch(e){return console.error("Error during sign in:",e),!1}},async session({session:e,user:t}){try{return await l(async t=>{let r=await t.query("SELECT * FROM users WHERE email = $1",[e.user?.email]);return r.rows[0]?{...e,user:{...e.user,id:r.rows[0].id,username:r.rows[0].username}}:e})}catch(t){return console.error("Error getting session:",t),e}}},pages:{signIn:"/auth/signin",error:"/auth/error"},debug:!1},d=(0,o.ZP)(E);function T(e,t){return"phase-production-build"===process.env.NEXT_PHASE||"function"!=typeof e?e:new Proxy(e,{apply:(e,r,o)=>{let u,c,l;try{let e=i.requestAsyncStorage.getStore();u=(0,a.h)((0,s.x)([e,"optionalAccess",e=>e.headers,"access",e=>e.get,"call",e=>e("sentry-trace")]),()=>void 0),c=(0,a.h)((0,s.x)([e,"optionalAccess",e=>e.headers,"access",e=>e.get,"call",e=>e("baggage")]),()=>void 0),l=(0,s.x)([e,"optionalAccess",e=>e.headers])}catch(e){}return n.wrapRouteHandlerWithSentry(e,{method:t,parameterizedRoute:"/api/auth/[...nextauth]",sentryTraceHeader:u,baggageHeader:c,headers:l}).apply(r,o)}})}let p=T(d,"GET"),R=T(d,"POST"),y=T(void 0,"PUT"),S=T(void 0,"PATCH"),_=T(void 0,"DELETE"),w=T(void 0,"HEAD"),m=T(void 0,"OPTIONS")},80001:(e,t,r)=>{var a=r(58097),s="undefined"!=typeof global?global:"undefined"!=typeof self?self:{};s.__sentryRewritesTunnelPath__=void 0,s.SENTRY_RELEASE={id:"wdkRqJwFkIUdQPuSy7-Vq"},s.__sentryBasePath=void 0,s.__rewriteFramesDistDir__=".next",a.init({dsn:process.env.SENTRY_DSN,tracesSampleRate:.1,integrations:[new a.BrowserTracing({tracePropagationTargets:["localhost",/^https:\/\/[^/]*\.basednet\.com/]})],environment:"production",beforeSend(e){if(e.exception){let t=e.exception.values?.[0]?.value;if(t?.includes("ResizeObserver loop"))return null}return e},debug:!1,maxBreadcrumbs:50,attachStacktrace:!0})},56654:(e,t,r)=>{r.d(t,{Z:()=>a});let a=new(r(35900)).Pool({user:process.env.POSTGRES_USER,password:process.env.POSTGRES_PASSWORD,host:process.env.POSTGRES_HOST,port:parseInt(process.env.POSTGRES_PORT||"5432"),database:process.env.POSTGRES_DB,ssl:{rejectUnauthorized:!1}})},6417:(e,t,r)=>{r.d(t,{Q:()=>s});var a=r(56654);class s{static async create(e,t,r,s,n){let i=`
      INSERT INTO ipfs_content (user_id, cid, content_type, filename, size)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;return(await a.Z.query(i,[e,t,r,s,n])).rows[0]}static async findByCid(e){return(await a.Z.query("SELECT * FROM ipfs_content WHERE cid = $1",[e])).rows[0]||null}static async findByUser(e,t=10,r=0){let s=`
      SELECT * FROM ipfs_content 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3
    `;return(await a.Z.query(s,[e,t,r])).rows}static async setPinStatus(e,t){let r=`
      UPDATE ipfs_content 
      SET pinned = $2 
      WHERE cid = $1 
      RETURNING *
    `;return(await a.Z.query(r,[e,t])).rows[0]||null}static async delete(e,t){return(await a.Z.query("DELETE FROM ipfs_content WHERE cid = $1 AND user_id = $2 RETURNING id",[e,t])).rowCount>0}static async getPinnedContent(e=100){let t=`
      SELECT * FROM ipfs_content 
      WHERE pinned = true 
      ORDER BY created_at DESC 
      LIMIT $1
    `;return(await a.Z.query(t,[e])).rows}static async getContentStats(e){let t=`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN pinned THEN 1 ELSE 0 END) as pinned,
        COALESCE(SUM(size), 0) as total_size
      FROM ipfs_content 
      WHERE user_id = $1
    `,r=await a.Z.query(t,[e]);return{total:parseInt(r.rows[0].total),pinned:parseInt(r.rows[0].pinned),totalSize:parseInt(r.rows[0].total_size)}}}},95439:(e,t,r)=>{r.d(t,{t:()=>s});var a=r(56654);class s{static async create(e,t){let r=["user_id",...Object.keys(t)],s=[e,...Object.values(t)],n=r.map((e,t)=>`$${t+1}`).join(", "),i=`
      INSERT INTO profiles (${r.join(", ")})
      VALUES (${n})
      RETURNING *
    `;return(await a.Z.query(i,s)).rows[0]}static async findByUserId(e){return(await a.Z.query("SELECT * FROM profiles WHERE user_id = $1",[e])).rows[0]||null}static async update(e,t){let r=["display_name","bio","avatar_url","theme_preferences","custom_css","custom_html","social_links"],s=Object.keys(t).filter(e=>r.includes(e));if(0===s.length)return null;let n=s.map((e,t)=>`${e} = $${t+2}`).join(", "),i=s.map(e=>{let r=t[e];return["theme_preferences","social_links"].includes(e)?JSON.stringify(r):r}),o=`
      UPDATE profiles 
      SET ${n}, updated_at = CURRENT_TIMESTAMP 
      WHERE user_id = $1 
      RETURNING *
    `;return(await a.Z.query(o,[e,...i])).rows[0]||null}static async delete(e){return(await a.Z.query("DELETE FROM profiles WHERE user_id = $1 RETURNING id",[e])).rowCount>0}static async getTheme(e){let t=await a.Z.query("SELECT theme_preferences FROM profiles WHERE user_id = $1",[e]);return t.rows[0]?.theme_preferences||null}static async updateTheme(e,t){let r=`
      UPDATE profiles 
      SET theme_preferences = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE user_id = $1
    `;return(await a.Z.query(r,[e,JSON.stringify(t)])).rowCount>0}}},937:(e,t,r)=>{r.d(t,{T:()=>s});var a=r(56654);class s{static async create(e,t,r){let s=`
      INSERT INTO users (username, email, auth_domain)
      VALUES ($1, $2, $3)
      RETURNING *
    `;return(await a.Z.query(s,[e,t,r])).rows[0]}static async findById(e){return(await a.Z.query("SELECT * FROM users WHERE id = $1",[e])).rows[0]||null}static async findByUsername(e){return(await a.Z.query("SELECT * FROM users WHERE username = $1",[e])).rows[0]||null}static async update(e,t){let r=["username","email","auth_domain"],s=Object.keys(t).filter(e=>r.includes(e));if(0===s.length)return null;let n=s.map((e,t)=>`${e} = $${t+2}`).join(", "),i=s.map(e=>t[e]),o=`
      UPDATE users 
      SET ${n}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;return(await a.Z.query(o,[e,...i])).rows[0]||null}static async delete(e){return((await a.Z.query("DELETE FROM users WHERE id = $1 RETURNING id",[e])).rowCount??0)>0}static async list(e=10,t=0){return(await a.Z.query("SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2",[e,t])).rows}}},8593:(e,t,r)=>{r.d(t,{Fs:()=>o,mk:()=>u,ts:()=>i});var a=r(8317),s=r(2094),n=r(937);async function i(){let e=await (0,a.Z1)(s.authOptions);return e?.user?.id?await n.T.findById(e.user.id):null}async function o(e,t){return e===t}async function u(){let e=await (0,a.Z1)(s.authOptions);if(!e?.user?.id)throw Error("Authentication required");return e}r(95439)}};
//# sourceMappingURL=120.js.map