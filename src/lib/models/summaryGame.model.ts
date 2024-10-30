import { imageUrlBuilder } from '$lib/utils/igdb'

export class IGDBSummaryGame {
  id: string
  name: string
  slug: string
  private cover?: { id: number; image_id: string }
  private firstReleaseDate: number

  constructor(game: SummaryGameFromIGDB) {
    this.id = String(game.id)
    this.name = game.name
    this.slug = game.slug
    this.cover = game.cover
    this.firstReleaseDate = game.first_release_date
  }

  get coverImageUrl() {
    if (this.cover) {
      return imageUrlBuilder(this.cover.image_id, 'cover_big')
    }
  }

  get launchYear() {
    const today = new Date(this.firstReleaseDate * 1000)
    return today.getFullYear()
  }
}

export class ZereiSummaryGame {
  id: string
  name: string
  slug: string
  coverImageUrl: string
  private releaseDate: string

  constructor(game: GameZerei) {
    this.id = game.$id
    this.name = game.name
    this.slug = game.slug
    this.coverImageUrl = game.coverImage
    this.releaseDate = game.releaseDate
  }

  get launchYear() {
    const today = new Date(this.releaseDate)
    return today.getFullYear()
  }
}
