type ImageSizes = "cover_small" | "cover_big"

export function imageUrlBuilder(hash: string, size: ImageSizes) {
	const url = `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}.jpg`
	return url
}
