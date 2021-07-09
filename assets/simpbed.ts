





export function simpbed(msg, discord, color: string, title: string, desc: string) { //simple embed making
	const embedColor = color || "#50792d"
	new discord.MessageEmbed()
		.setColor(embedColor)
		.setTitle(title)
		.setDescription(desc)
}