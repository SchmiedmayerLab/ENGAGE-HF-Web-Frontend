//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_FIREBASE_PROJECT_ID: string;
  readonly VITE_PUBLIC_FIREBASE_API_KEY: string;
  readonly VITE_PUBLIC_FIREBASE_APP_ID: string;
  readonly VITE_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_PUBLIC_EMULATOR: string;
  readonly VITE_PUBLIC_EMAIL_PASSWORD_SIGN_IN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
