# Environment Variables Setup

Create a `.env` file in the root of your project with the following variables:

## For Supabase:
```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Get these from: https://supabase.com/dashboard/project/_/settings/api

## For Firebase (Alternative):
```
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Get these from: https://console.firebase.google.com/project/_/settings/general

**Note:** The `.env` file is already in `.gitignore` so your secrets won't be committed to git.



















