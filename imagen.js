const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const crypto = require('crypto');

const colors = [
  '#29abe2', // Blue
  '#1786d1', // Dark Blue
  '#26a0da', // Light Blue
  '#1c84c7', // Medium Blue
  '#1098ad', // Turquoise
  '#00a398', // Teal
  '#67b168', // Green
  '#8cc63f', // Light Green
  '#599e40', // Dark Green
  '#e06c75', // Pink
  '#f58963', // Orange
  '#ffb347', // Yellow
  '#c6994f', // Brown
  '#8e8e93', // Grey
  '#6b7c85', // Dark Grey
  '#404040', // Black
];

function generateProfilePicture(username, size = 100) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Generate random background color
  const backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Create initials
  const initials = username.split(' ').map(part => part[0]).join('');
  const font = `${size * 0.7}px Arial`; // Adjust font size
  ctx.fillStyle = '#fff';
  ctx.font = font;

  // Calculate text dimensions for centering
  const textWidth = ctx.measureText(initials).width;
  const textHeight = parseInt(font.split('px')[0], 10);
  const x = (canvas.width - textWidth) / 2;
  const y = canvas.height / 2 + textHeight / 4;

  // Draw text centered
  ctx.fillText(initials, x, y);

  // Add a random subtle border for visual variation
  const borderColor = getContrastingColor(backgroundColor);
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = size * 0.03; // Adjust border thickness
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Generate random filename
  const filename = `${crypto.randomBytes(16).toString('hex')}.png`;

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  const nodeFilepath = "/img/" + filename;
  const docFilepath  = "./public/img/" + filename;
  fs.writeFileSync(docFilepath, buffer);

  return nodeFilepath;
}

// Helper function to get a contrasting color based on the background color
function getContrastingColor(backgroundColor) {
  const luminance = (
    0.299 * parseInt(backgroundColor.slice(1, 3), 16) +
    0.587 * parseInt(backgroundColor.slice(3, 5), 16) +
    0.114 * parseInt(backgroundColor.slice(5, 7), 16)
  ) / 255;
  return luminance > 0.5 ? '#222' : '#eee';
}

// Example usage:
// const username = 'Raihan Arfarasyid';
// generateProfilePicture(username).then(filename => {
//   console.log(`Profile picture generated: ${filename}`);
// });


module.exports = {generateProfilePicture}
