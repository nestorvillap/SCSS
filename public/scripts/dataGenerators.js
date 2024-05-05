// Generate a random IP address
export const generateRandomIP = () => {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
};

// Generate a random country from a predefined list
export const generateRandomCountry = () => {
  const countries = ["Spain", "Mexico", "United States", "United Kingdom", "France", "Germany", "Japan", "Brazil", "Australia"];
  return countries[Math.floor(Math.random() * countries.length)];
};

// Generate a random packet size between 500 and 1500 bytes
export const generateRandomPacketSize = () => {
  return `${Math.floor(Math.random() * 1000) + 500} bytes`;
};

// Generate a random protocol from a predefined list
export const generateRandomProtocol = () => {
  const protocols = ["TCP", "UDP", "ICMP", "HTTP", "HTTPS"];
  return protocols[Math.floor(Math.random() * protocols.length)];
};

// Generate a random connection time between 0 and 59 seconds
export const generateRandomConnectionTime = () => {
  return `${Math.floor(Math.random() * 60)} s`;
};

// Generate a random SSL/TLS certificate status
export const generateRandomCertificates = () => {
  const statuses = ["Valid", "Invalid", "Self-signed", "Expired"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};
