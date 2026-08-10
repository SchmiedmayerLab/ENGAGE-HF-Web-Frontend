//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { env } from "../../env";

export const firebaseConfig = {
  apiKey: env.VITE_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_PUBLIC_FIREBASE_APP_ID,
};
