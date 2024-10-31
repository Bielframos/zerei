import { imageUrlBuilder } from '$lib/utils/igdb'

export class IGDBSummaryGame {
  id: string
  name: string
  private cover?: { id: number; image_id: string }

  constructor(game: SummaryGameFromIGDB) {
    this.id = String(game.id)
    this.name = game.name
    this.cover = game.cover
  }

  get coverImageUrl() {
    if (this.cover) {
      return imageUrlBuilder(this.cover.image_id, 'cover_big')
    }
  }
}
