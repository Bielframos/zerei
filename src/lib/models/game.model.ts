export class GameModel {
  id: string
  name: string
  coverImage: string
  description: string
  genres: string
  platforms: string
  developer: string
  publisher: string
  private releaseDate: string
  private launchedAt: Date

  constructor(game: GameZerei) {
    this.id = game.$id
    this.name = game.name
    this.coverImage = game.coverImage
    this.releaseDate = game.releaseDate
    this.launchedAt = new Date(game.releaseDate)
    this.description = game.description
    this.genres = game.genres.map(genre => genre.name).join(', ')
    this.platforms = game.platforms.map(platform => platform.name).join(', ')
    this.developer = game.developer.name
    this.publisher = game.publisher.name
  }

  get launchYear() {
    return this.launchedAt.getFullYear()
  }

  get localeReleaseDate() {
    return this.launchedAt.toLocaleDateString("pt-BR", {day: '2-digit', month: "2-digit", year: "numeric"})
  }

  
}
