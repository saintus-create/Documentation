# Notion CMS Integration

## 🔑 Step 1: Get Your Notion API Key

1. Go to [Notion Integrations](https://www.notion.so/profile/integrations)
2. Click **"+ New integration"**
3. Name it: `Docs Blog CMS`
4. Select your workspace
5. Click **Submit**
6. Copy the **Internal Integration Secret** (starts with `ntn_...`)

## 📊 Step 2: Create Your Blog Database

1. Open Notion and create a new page called **"Blog Posts"**
2. Add a **Database - Full page** (type `/database`)
3. Set up these columns (properties):

| Property Name | Type | Description |
|--------------|------|-------------|
| **Title** | Title | The blog post title (default) |
| **Slug** | Text | URL-friendly identifier (e.g., `my-first-post`) |
| **Excerpt** | Text | Short description for cards |
| **Date** | Date | Publication date |
| **Status** | Select | Options: `Draft`, `Published`, `Archived` |
| **Category** | Select | Options: `Engineering`, `Company`, `Community`, etc. |
| **Authors** | Multi-select | Add author names |
| **Cover** | Files & media | Cover image for the post |

## 🔗 Step 3: Connect Database to Integration

1. Open your Blog Posts database
2. Click **⋯** (three dots) in the top right
3. Go to **Connections** → **Connect to** → Select your integration
4. Click **Confirm**

## 🆔 Step 4: Get Your Database ID

1. Open your database in Notion
2. Look at the URL: `https://notion.so/yourworkspace/abc123def456...`
3. The database ID is the long string after your workspace name and before the `?`
   - Example: `abc123def456789...` (32 characters)

## 🌍 Step 5: Set Environment Variables

Add these to your `.env` file (create one if it doesn't exist):

```bash
# Notion CMS
NOTION_API_KEY=ntn_your_secret_key_here
NOTION_DATABASE_ID=your_database_id_here
```

For Vercel deployment, add these in:
**Vercel Dashboard → Your Project → Settings → Environment Variables**

## ✅ Step 6: Test It

1. Create a test blog post in Notion with Status = "Published"
2. Restart your dev server: `pnpm dev`
3. Visit: `http://localhost:5173/api/notion-blog`
4. You should see your posts as JSON!

## 📱 How to Use

### From Phone/Tablet:
1. Open Notion app
2. Go to your Blog Posts database
3. Add or edit posts
4. Set Status to "Published" when ready
5. Your site will pick up changes on next build/refresh

### From Browser (anywhere):
1. Go to notion.so
2. Edit your Blog Posts database
3. Same as above!

### GitHub Fallback:
If Notion is down or you need to make quick code changes:
1. Go to GitHub.com → your repo
2. Navigate to `content/` folder
3. Edit any `.md` file directly
4. Commit → Vercel auto-deploys

---

## 🔄 Auto-Rebuild on Notion Changes (Optional)

To automatically rebuild your site when Notion content changes:

1. Set up a **Notion webhook** using [Pipedream](https://pipedream.com) or [Make](https://make.com)
2. Point it to Vercel's Deploy Hook:
   - Vercel Dashboard → Project → Settings → Git → Deploy Hooks
   - Create hook: `Notion Update`
   - Copy the URL
3. Configure your automation to POST to that URL when Notion database changes

---

## 📁 Files Created

- `.mcp.json` - Added Notion MCP server
- `docs/src/routes/api/notion-blog/+server.ts` - API route to fetch from Notion
- `NOTION_CMS_SETUP.md` - This file!

