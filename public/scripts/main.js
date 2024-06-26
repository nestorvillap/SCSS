// Import functions from other modules (assuming an ES6 environment)
import { generateRandomIP, generateRandomCountry, generateRandomPacketSize, generateRandomProtocol, generateRandomConnectionTime, generateRandomCertificates } from './dataGenerators.js';
import { setClassification, initializeClassificationButtons, confirmClassification } from './classification.js';
import { isValidPosition } from './utils.js';

// Function to change game styles based on the group
const adjustGameStyles = () => {
  const game = document.getElementById("game");
  game.style.maxWidth = "60vw";
  game.style.maxHeight = "60vh";
  game.style.marginRight = "1vw";
};

// Apply style adjustments based on the user's group
const applyGroupStyles = () => {
  if (userGroup === "noAdvisor") {
    adjustGameStyles();
  }
  // Add conditions for other groups if needed
};

// Execute `applyGroupStyles` when the page is fully loaded
document.addEventListener("DOMContentLoaded", applyGroupStyles);

// Initialize variables and elements
const gameObj = document.getElementById("game");
let selectedDotInfo = null;

// Initialize classification buttons
initializeClassificationButtons();

// Attach confirmation event
document.getElementById("confirmButton").addEventListener("click", () => confirmClassification(selectedDotInfo));

// Define the `start` function to initialize the game
const start = () => {
  const numberOfDots = 20;
  const dotSize = 10;
  const minDistance = 15;
  const radius = gameObj.clientWidth / 2 - dotSize;
  let selectedDot = null;

  // Create and add the central point without click events
  const visualCenterDot = document.createElement('div');
  visualCenterDot.classList.add('center-dot');
  visualCenterDot.style.left = `${radius}px`;
  visualCenterDot.style.top = `${radius}px`;
  gameObj.appendChild(visualCenterDot);

  let existingDots = [{ x: radius, y: radius, element: visualCenterDot }];

  // Generate random points
  for (let i = 0; i < numberOfDots; i++) {
    let isValid = false;
    let retries = 100;
    let x, y, distance, angle;

    while (!isValid && retries > 0) {
      angle = Math.random() * 2 * Math.PI;
      distance = Math.random() * radius;
      x = distance * Math.cos(angle) + radius;
      y = distance * Math.sin(angle) + radius;
      isValid = isValidPosition(x, y, existingDots, minDistance);
      retries--;
    }

    if (isValid) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      gameObj.appendChild(dot);

      const dotInfo = {
        ip: generateRandomIP(),
        country: generateRandomCountry(),
        packetSize: generateRandomPacketSize(),
        protocol: generateRandomProtocol(),
        connectionTime: generateRandomConnectionTime(),
        certificates: generateRandomCertificates(),
        classification: "Unclassified",
        element: dot
      };

      existingDots.push({ x, y, element: dot, data: dotInfo });

      // Add click event to update connection info and maintain reference
      dot.addEventListener('click', function() {
        updateConnectionInfo(dotInfo);
        selectedDotInfo = dotInfo;
        selectDot(this);
      });
    }
  }

  // Function to select a single dot
  const selectDot = (dotElement) => {
    if (selectedDot) {
      selectedDot.classList.remove('selected');
    }
    selectedDot = dotElement;
    selectedDot.classList.add('selected');
  };

  // Function to update connection information
  const updateConnectionInfo = (info) => {
    document.getElementById('info-ip').textContent = `IP Address: ${info.ip}`;
    document.getElementById('info-country').textContent = `Country: ${info.country}`;
    document.getElementById('info-packet').textContent = `Packet Size: ${info.packetSize}`;
    document.getElementById('info-protocol').textContent = `Protocol: ${info.protocol}`;
    document.getElementById('info-time').textContent = `Connection Time: ${info.connectionTime}`;
    document.getElementById('info-certificates').textContent = `Certificates: ${info.certificates}`;
    document.getElementById('info-classification').textContent = `Classification: ${info.classification}`;
  };
};

// Execute the `start` function after a delay
setTimeout(start, 1000);
