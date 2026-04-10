const releases = [
  { title: "Ten Days", artist: "Fred again.." },
  { title: "Nurture", artist: "Porter Robinson" },
  { title: "Conversations with the Moon", artist: "grentperez" },
  { title: "In a Dream", artist: "Troye Sivan" },
  { title: "USB", artist: "Fred again.." },
  { title: "Backflips in a Restaurant", artist: "grentperez" },
];

function coverPath(title) {
  const filename = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return `./covers/${filename}.png`;
}

const container = document.querySelector(".releases");

for (const { title, artist } of releases) {
  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = coverPath(title);
  img.alt = `${title} Album Cover`;

  const figcaption = document.createElement("figcaption");

  const strong = document.createElement("strong");
  strong.textContent = title;

  const br = document.createElement("br");

  const artistText = document.createTextNode(artist);

  figcaption.append(strong, br, artistText);
  figure.append(img, figcaption);
  container.append(figure);
}
