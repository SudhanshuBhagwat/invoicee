import * as admin from 'firebase-admin';

if (process.env.NODE_ENV === "development") {
  process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      //@ts-ignore
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    }),
  });
}

export const firestore = admin.firestore();
export const firebaseAuth = admin.auth();
