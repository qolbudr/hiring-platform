declare global {
  interface String {
    capitalizeWords(): string;
  }
}

if (!String.prototype.capitalizeWords) {
  String.prototype.capitalizeWords = function (): string {
    return this.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  };
}

export {};