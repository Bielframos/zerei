import { Client, Account, Databases, Functions } from 'node-appwrite'
import { APPWRITE_KEY } from '$env/static/private'
import {
  PUBLIC_APPWRITE_ENDPOINT,
  PUBLIC_APPWRITE_PROJECT,
} from '$env/static/public'
import type { RequestEvent } from '@sveltejs/kit'

export const SESSION_COOKIE = 'session'

export function createAdminClient() {
  const client = new Client()
    .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
    .setProject(PUBLIC_APPWRITE_PROJECT)
    .setKey(APPWRITE_KEY)

  return {
    get account() {
      return new Account(client)
    },
    get databases() {
      return new Databases(client)
    },
    get functions() {
      return new Functions(client)
    },
  }
}

export function createSessionClient(event: RequestEvent) {
  const client = new Client()
    .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
    .setProject(PUBLIC_APPWRITE_PROJECT)

  const session = event.cookies.get(SESSION_COOKIE)

  if (!session) {
    throw new Error('No user session')
  }

  client.setSession(session)

  return {
    get account() {
      return new Account(client)
    },
  }
}
