export class GameModel {
  id: string
  name: string
  coverImage: string
  private releaseDate: string

  constructor(game: GameZerei) {
    this.id = game.$id
    this.name = game.name
    this.coverImage = game.coverImage
    this.releaseDate = game.releaseDate
  }

  get launchYear() {
    return new Date(this.releaseDate).getFullYear()
  }
}
