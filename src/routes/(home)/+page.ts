import { GameController } from '$lib/controllers/game.controller'
import type { Models } from 'appwrite'

export async function load({depends, parent}) {
depends('data:recentlyAdded')
const {account} = await parent()
let recentlyAdded: Models.DocumentList<GameZerei> | undefined = undefined

if (account) {
    recentlyAdded = await GameController.getRecentlyAdded()
}

return {recentlyAdded}
}