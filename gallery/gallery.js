const media = [
  {
    image: "at-the-bar",
    caption: "bro is applying to jobs at the bar...",
  },
  { image: "ddr", caption: "we have DDR at work" },
  { image: "long-ass-wait", caption: "din tai fung is good but not THIS good" },
  {
    image: "matcha",
    caption: "delectable matcha einspanner i had in las vegas",
  },
  {
    image: "bro-sitting",
    caption: "he swears that my sitting posture is worse",
  },
  {
    image: "linkedin-merch",
    caption: "some pre-internship merch",
  },
  {
    image: "curry-king",
    caption: "do NOT order the curry king from ramen nagi 😔 it was so bad",
  },
];

function imagePath(title) {
  return `/gallery/images/${title}.webp`;
}

const container = document.querySelector(".gallery-container");

for (const { image, caption } of media) {
  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = imagePath(image);
  img.alt = `${image} Image`;

  const figcaption = document.createElement("figcaption");
  const italics = document.createElement("i");

  italics.textContent = caption;
  figcaption.append(italics);

  figure.append(img, figcaption);
  container.append(figure);
}
